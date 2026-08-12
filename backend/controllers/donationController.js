const Donation = require("../models/Donation");
const { logActivity, createNotification } = require("../utils/activityLogger");
const xlsx = require("xlsx");
const PDFDocument = require("pdfkit");

// 🔐 Validation functions
const isValidName = (name) => {
  return /^[A-Za-z\s]{3,30}$/.test(name);
};

const isValidAmount = (amount) => {
  return !isNaN(amount) && amount > 0;
};

const isValidEmail = (email) => {
  if (!email) return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

//--------------------------------------------------
// 📥 GET ALL DONATIONS & SUMMARY (ADMIN)
//--------------------------------------------------
exports.getDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {};
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { donorName: searchRegex },
        { name: searchRegex },
        { mobileNumber: searchRegex },
        { receiptNumber: searchRegex }
      ];
    }

    const totalItems = await Donation.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const donations = await Donation.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Calculate Summary Stats dynamically from MongoDB via Aggregation
    const summaryStats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalDonors: { $sum: 1 },
          totalCollection: { $sum: "$amount" },
          totalCash: {
            $sum: {
              $cond: [{ $eq: ["$modeOfDonation", "Cash"] }, "$amount", 0]
            }
          },
          totalOnline: {
            $sum: {
              $cond: [{ $eq: ["$modeOfDonation", "Online"] }, "$amount", 0]
            }
          }
        }
      }
    ]);

    const summary = summaryStats[0] || {
      totalDonors: 0,
      totalCollection: 0,
      totalCash: 0,
      totalOnline: 0
    };

    res.json({
      donations,
      totalPages,
      currentPage: page,
      totalItems,
      summary
    });

  } catch (err) {
    console.log("GET ERROR:", err.message);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// 💰 CREATE PUBLIC/USER DONATION
//--------------------------------------------------
exports.createDonation = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, amount, email, message } = req.body;

    // validations
    if (!name || !amount) {
      return res.status(400).json({ msg: "Name and amount required" });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ msg: "Invalid name" });
    }

    if (!isValidAmount(amount)) {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const donation = new Donation({
      name,
      amount,
      email,
      message,
      user: req.user?._id
    });

    await donation.save();

    await logActivity(donation.name, `Donation Received: ₹${donation.amount}`);
    await createNotification(
      "DONATION",
      "New Donation Received 💰",
      `${donation.name} donated ₹${donation.amount}.`,
      "/admin/donations"
    );

    res.status(201).json({
      msg: "Donation successful 🙏",
      donation
    });

  } catch (err) {
    console.log("DONATION ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

//--------------------------------------------------
// 💰 CREATE ADMIN DONATION
//--------------------------------------------------
exports.createAdminDonation = async (req, res) => {
  try {
    const { donorName, mobileNumber, amount, modeOfDonation, address } = req.body;

    // validations
    if (!donorName || !mobileNumber || !amount || !modeOfDonation) {
      return res.status(400).json({ msg: "Donor name, mobile number, amount, and mode of donation are required." });
    }

    if (donorName.trim().length < 3) {
      return res.status(400).json({ msg: "Donor name must be at least 3 characters." });
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ msg: "Mobile number must be exactly 10 digits." });
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ msg: "Invalid donation amount." });
    }

    if (modeOfDonation !== "Cash" && modeOfDonation !== "Online") {
      return res.status(400).json({ msg: "Mode of donation must be Cash or Online." });
    }

    // Auto-generate unique receipt number VGM-2026-XXXX
    const currentYear = new Date().getFullYear();
    const prefix = `VGM-${currentYear}-`;

    const latestDonation = await Donation.findOne({
      receiptNumber: new RegExp(`^${prefix}`)
    }).sort({ receiptNumber: -1 });

    let nextNumber = 1;
    if (latestDonation && latestDonation.receiptNumber) {
      const parts = latestDonation.receiptNumber.split("-");
      const lastNum = parseInt(parts[2], 10);
      if (!isNaN(lastNum)) {
        nextNumber = lastNum + 1;
      }
    }
    const receiptNumber = `${prefix}${String(nextNumber).padStart(4, "0")}`;

    const formattedDate = new Date().toLocaleDateString("en-GB"); // DD/MM/YYYY

    const donation = new Donation({
      donorName,
      mobileNumber,
      amount: parsedAmount,
      modeOfDonation,
      address,
      receiptNumber,
      date: formattedDate,
      user: req.user?._id
    });

    // Save to MongoDB
    await donation.save();

    // Log Activity & Create Notification
    await logActivity("Admin", `Donation created: ${receiptNumber} - ₹${parsedAmount}`);
    await createNotification(
      "DONATION",
      "New Admin Donation Created 💰",
      `${donorName} donated ₹${parsedAmount} (${modeOfDonation}).`,
      "/admin/donations"
    );

    return res.status(201).json({
      msg: "Donation saved successfully! 🙏",
      donation
    });

  } catch (err) {
    console.error("ADMIN DONATION ERROR:", err.message);
    res.status(500).json({ msg: err.message || "Server error during donation creation ❌" });
  }
};

//--------------------------------------------------
// 📊 EXPORT ALL RECORD TO EXCEL (.xlsx)
//--------------------------------------------------
exports.exportExcel = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    if (!donations || donations.length === 0) {
      return res.status(400).json({ msg: "No donations available to export." });
    }

    const data = donations.map((d) => ({
      "Receipt No": d.receiptNumber || "N/A",
      "Date": d.date || new Date(d.createdAt).toLocaleDateString("en-GB"),
      "Donor Name": d.donorName || d.name || "Unknown",
      "Mobile Number": d.mobileNumber || "N/A",
      "Address": d.address || "",
      "Amount": `₹${d.amount}`,
      "Mode of Donation": d.modeOfDonation || "N/A"
    }));

    // Create workbook
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Donations");

    // Generate buffer
    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", 'attachment; filename="Donations_Report.xlsx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);

  } catch (err) {
    console.error("Excel export error:", err.message);
    res.status(500).json({ msg: "Failed to generate Excel file ❌" });
  }
};

//--------------------------------------------------
// 📄 EXPORT PDF COLLECTION REPORT
//--------------------------------------------------
exports.exportPdfReport = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    if (!donations || donations.length === 0) {
      return res.status(400).json({ msg: "No donations available to export." });
    }

    // Dynamic Summary calculation
    const totalDonors = donations.length;
    const totalCollection = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalCash = donations.reduce((sum, d) => sum + (d.modeOfDonation === "Cash" ? d.amount : 0), 0);
    const totalOnline = donations.reduce((sum, d) => sum + (d.modeOfDonation === "Online" ? d.amount : 0), 0);

    const doc = new PDFDocument({ margin: 40, size: "A4" });

    res.setHeader("Content-Disposition", 'attachment; filename="Donation_Collection_Report.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Title / Header
    doc.fontSize(18).font("Helvetica-Bold").fillColor("#301103").text("SHREE VIGHNAHARTA MITRA MANDAL, BEED", { align: "center" });
    doc.moveDown(0.3);
    doc.fontSize(12).font("Helvetica").fillColor("#555").text("Donation Collection Report", { align: "center" });
    doc.moveDown(1.5);

    // Summary section title
    doc.fontSize(12).font("Helvetica-Bold").fillColor("#301103").text("Collection Summary", { underline: true });
    doc.moveDown(0.5);

    // Render 4 Summary Blocks side-by-side
    const startY = doc.y;
    doc.rect(40, startY, 120, 50).fillAndStroke("#f9fafb", "#e5e7eb");
    doc.rect(170, startY, 120, 50).fillAndStroke("#f9fafb", "#e5e7eb");
    doc.rect(300, startY, 120, 50).fillAndStroke("#f9fafb", "#e5e7eb");
    doc.rect(430, startY, 125, 50).fillAndStroke("#f9fafb", "#e5e7eb");

    doc.fillColor("#666").fontSize(8).font("Helvetica");
    doc.text("TOTAL DONORS", 45, startY + 8);
    doc.text("TOTAL COLLECTION", 175, startY + 8);
    doc.text("TOTAL CASH", 305, startY + 8);
    doc.text("TOTAL ONLINE", 435, startY + 8);

    doc.fillColor("#111").fontSize(11).font("Helvetica-Bold");
    doc.text(`${totalDonors}`, 45, startY + 25);
    doc.text(`₹${totalCollection.toLocaleString("en-IN")}`, 175, startY + 25);
    doc.text(`₹${totalCash.toLocaleString("en-IN")}`, 305, startY + 25);
    doc.text(`₹${totalOnline.toLocaleString("en-IN")}`, 435, startY + 25);

    doc.moveDown(4.0);

    // Table Listing
    doc.fontSize(12).font("Helvetica-Bold").fillColor("#301103").text("Donation Records", { underline: true });
    doc.moveDown(0.5);

    const tableTop = doc.y;
    doc.rect(40, tableTop, 515, 20).fill("#301103");
    
    doc.fillColor("#fff").fontSize(9).font("Helvetica-Bold");
    doc.text("Receipt No", 45, tableTop + 5);
    doc.text("Date", 130, tableTop + 5);
    doc.text("Donor Name", 210, tableTop + 5);
    doc.text("Mobile No", 360, tableTop + 5);
    doc.text("Amount", 440, tableTop + 5);
    doc.text("Mode", 510, tableTop + 5);

    let y = tableTop + 20;
    doc.fillColor("#333").font("Helvetica");

    for (let d of donations) {
      if (y > 750) {
        doc.addPage();
        y = 40;
        // redraw table headers
        doc.rect(40, y, 515, 20).fill("#301103");
        doc.fillColor("#fff").fontSize(9).font("Helvetica-Bold");
        doc.text("Receipt No", 45, y + 5);
        doc.text("Date", 130, y + 5);
        doc.text("Donor Name", 210, y + 5);
        doc.text("Mobile No", 360, y + 5);
        doc.text("Amount", 440, y + 5);
        doc.text("Mode", 510, y + 5);
        y += 20;
        doc.fillColor("#333").font("Helvetica");
      }

      // Border lines
      doc.moveTo(40, y + 18).lineTo(555, y + 18).stroke("#f3f4f6");

      const dateStr = d.date || new Date(d.createdAt).toLocaleDateString("en-GB");
      const donorStr = d.donorName || d.name || "Unknown";

      doc.text(d.receiptNumber || "N/A", 45, y + 5);
      doc.text(dateStr, 130, y + 5);
      doc.text(donorStr.substring(0, 24), 210, y + 5);
      doc.text(d.mobileNumber || "N/A", 360, y + 5);
      doc.text(`₹${d.amount.toLocaleString("en-IN")}`, 440, y + 5);
      doc.text(d.modeOfDonation || "N/A", 510, y + 5);

      y += 20;
    }

    doc.end();

  } catch (err) {
    console.error("PDF report export error:", err.message);
    res.status(500).json({ msg: "Failed to generate PDF report ❌" });
  }
};