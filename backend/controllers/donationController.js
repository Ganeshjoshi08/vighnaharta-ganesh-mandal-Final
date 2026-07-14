const Donation = require("../models/Donation");

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
// 📥 GET ALL DONATIONS (ADMIN)
//--------------------------------------------------
exports.getDonations = async (req, res) => {
  try {
    const data = await Donation.find()
      .populate("user", "name email")   // 🔥 ADD THIS
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    console.log("GET ERROR:", err.message);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// 💰 CREATE DONATION
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

      // 🔥 MAIN FIX (USER LINK)
      user: req.user?._id   // ← logged-in user
    });

    await donation.save();

    res.status(201).json({
      msg: "Donation successful 🙏",
      donation
    });

  } catch (err) {
    console.log("DONATION ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};