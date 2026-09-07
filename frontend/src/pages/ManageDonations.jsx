import { useEffect, useState, useRef } from "react";
import API from "../api/api";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Import existing assets
import mandallogo from "../assets/mandallogo.png";
import TilakImg from "../assets/Tilak.jpg";
import savarkarImg from "../assets/savarkar.png";
import munimSign from "../assets/munim_sign.png";
import posterHeaderBanner from "../assets/poster_header_banner.png";

// Robust Indian Number System to Words Converter for Receipts
const numberToWords = (num) => {
  if (num === null || num === undefined || num === "") return "";
  
  // Clean string or number: remove commas, currency symbols, and get integer
  const cleaned = String(num).replace(/[^0-9.]/g, "");
  const integerPart = Math.floor(Number(cleaned) || 0);
  
  if (integerPart === 0) return "Zero Rupees Only";
  if (integerPart > 999999999) return "Amount Too Large";

  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const convertTwoDigits = (n) => {
    n = Number(n);
    if (n === 0) return "";
    if (n < 20) return units[n];
    const t = Math.floor(n / 10);
    const u = n % 10;
    return tens[t] + (u > 0 ? " " + units[u] : "");
  };

  const convertThreeDigits = (n) => {
    n = Number(n);
    const h = Math.floor(n / 100);
    const rem = n % 100;
    let res = "";
    if (h > 0) {
      res += units[h] + " Hundred";
    }
    if (rem > 0) {
      if (res !== "") res += " and ";
      res += convertTwoDigits(rem);
    }
    return res;
  };

  let str = "";
  const crore = Math.floor(integerPart / 10000000);
  let rem = integerPart % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  const thousand = Math.floor(rem / 1000);
  rem = rem % 1000;
  const hundredAndBelow = rem;

  if (crore > 0) {
    str += convertTwoDigits(crore) + " Crore ";
  }
  if (lakh > 0) {
    str += convertTwoDigits(lakh) + " Lakh ";
  }
  if (thousand > 0) {
    str += convertTwoDigits(thousand) + " Thousand ";
  }
  if (hundredAndBelow > 0) {
    str += convertThreeDigits(hundredAndBelow) + " ";
  }

  return str.trim() + " Rupees Only";
};

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [exportExcelLoading, setExportExcelLoading] = useState(false);
  const [exportPdfLoading, setExportPdfLoading] = useState(false);

  // Pagination & Search states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(10);

  // Dynamic Collection Summary states
  const [summary, setSummary] = useState({
    totalDonors: 0,
    totalCollection: 0,
    totalCash: 0,
    totalOnline: 0
  });

  // Form states
  const [donorName, setDonorName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [modeOfDonation, setModeOfDonation] = useState("Online");
  const [address, setAddress] = useState("");
  const [collectedBy, setCollectedBy] = useState("अक्षय कुलकर्णी");

  // Selected donation for generating/sharing PDF
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Clear / Reset all donations state & security passkey modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const receiptRef = useRef(null);

  useEffect(() => {
    fetchDonations();
  }, [page, search]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await API.get("/donations", {
        params: { page, limit, search }
      });
      setDonations(res.data.donations || []);
      setTotalPages(res.data.totalPages || 1);
      if (res.data.summary) {
        setSummary(res.data.summary);
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDonation = async (e) => {
    e.preventDefault();
    if (!donorName || !mobileNumber || !amount || !modeOfDonation || !collectedBy) {
      alert("कृपया सर्व आवश्यक माहिती भरा. (Please fill all required fields.)");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("कृपया योग्य १० अंकी मोबाईल नंबर टाका. (Please enter a valid 10-digit mobile number.)");
      return;
    }
    if (Number(amount) <= 0) {
      alert("वर्गणी रक्कम शून्यापेक्षा जास्त असावी. (Amount must be greater than zero.)");
      return;
    }

    setFormLoading(true);
    try {
      const res = await API.post("/donations/admin-create", {
        donorName,
        mobileNumber,
        amount: Number(amount),
        modeOfDonation,
        address,
        collectedBy
      });

      alert(res.data.msg || "Donation created successfully!");

      // Auto-select the newly created donation for immediate receipt download/share option
      setSelectedDonation(res.data.donation);

      // Reset form
      setDonorName("");
      setMobileNumber("");
      setAmount("");
      setAddress("");
      setCollectedBy("अक्षय कुलकर्णी");
      setPage(1); // Reset page to 1 to see the new entry

      fetchDonations();
    } catch (err) {
      console.error("Donation creation error:", err);
      alert(err.response?.data?.msg || "Donation could not be saved.");
    } finally {
      setFormLoading(false);
    }
  };

  // Download all donations as Excel file
  const handleDownloadExcel = async () => {
    if (donations.length === 0) {
      alert("No donations available to export.");
      return;
    }
    setExportExcelLoading(true);
    try {
      const response = await API.get("/donations/export-excel", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Donations_Report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Excel download error:", err);
      alert("Failed to download Excel report.");
    } finally {
      setExportExcelLoading(false);
    }
  };

  // Download entire collection report as PDF
  const handleDownloadPDFReport = async () => {
    if (donations.length === 0) {
      alert("No donations available to export.");
      return;
    }
    setExportPdfLoading(true);
    try {
      const response = await API.get("/donations/export-pdf", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Donation_Collection_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("PDF Report download error:", err);
      alert("Failed to download PDF report.");
    } finally {
      setExportPdfLoading(false);
    }
  };

  // Clear / Reset All Donations handler protected with secret security passkey on server
  const handleClearAllDonations = async (e) => {
    e.preventDefault();
    const trimmedPass = deletePassword.trim();
    if (!trimmedPass) {
      alert("कृपया सुरक्षितता पासवर्ड (Security Password) टाका.");
      return;
    }

    if (!window.confirm("तुम्हाला खात्री आहे का? सर्व वर्गणी डेटा कायमचा नष्ट होईल आणि परत मिळणार नाही!")) {
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await API.post("/donations/clear-all", { secretPasskey: trimmedPass });
      alert(res.data.msg || "सर्व वर्गणी डेटा यशस्वीरित्या हटवला गेला आहे!");
      setIsDeleteModalOpen(false);
      setDeletePassword("");
      setPage(1);
      fetchDonations();
    } catch (err) {
      console.error("Clear all error:", err);
      const errorMsg = err.response?.data?.msg || err.message || "डेटा हटवताना त्रुटी आली. कृपया बॅकएंड सर्व्हर चालू असल्याची खात्री करा.";
      alert(errorMsg);
    } finally {
      setDeleteLoading(false);
    }
  };

  // PDF download flow for individual receipt
  const downloadReceiptPDF = async (donation) => {
    setSelectedDonation(donation);
    setTimeout(async () => {
      try {
        const element = receiptRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`Receipt_${donation.receiptNumber}.pdf`);
      } catch (err) {
        console.error("PDF generation failed:", err);
        alert("Failed to generate PDF. You can try printing the page.");
      }
    }, 150);
  };

  // Web Share API flow for individual receipt
  const shareReceiptPDF = async (donation) => {
    setSelectedDonation(donation);
    const shareText = `🙏 विघ्नहर्ता मित्र मंडळ, बीड. \n\nनमस्कार ${donation.donorName || donation.name} जी, \nतुमची ₹${donation.amount} ची वर्गणी (${donation.modeOfDonation}) यशस्वीरित्या प्राप्त झाली आहे. \nपावती क्रमांक: ${donation.receiptNumber}\n\nगणपती बाप्पा मोरया! 🌺`;

    setTimeout(async () => {
      try {
        const element = receiptRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        const blob = pdf.output("blob");
        const file = new File([blob], `Receipt_${donation.receiptNumber}.pdf`, { type: "application/pdf" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Donation Receipt",
            text: shareText
          });
        } else {
          // Native file sharing not supported, fallback to WhatsApp web/API link
          const formattedMobile = donation.mobileNumber.startsWith("91") ? donation.mobileNumber : `91${donation.mobileNumber}`;
          const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedMobile}&text=${encodeURIComponent(shareText)}`;
          window.open(whatsappUrl, "_blank");
        }
      } catch (err) {
        console.error("Sharing failed:", err);
        // Fallback text sharing
        const formattedMobile = donation.mobileNumber.startsWith("91") ? donation.mobileNumber : `91${donation.mobileNumber}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedMobile}&text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, "_blank");
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-neutral-100 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Block */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <h1 className="text-3xl font-extrabold text-neutral-900 flex items-center gap-2">
            <span>💰</span> Donation Management
          </h1>
          <p className="text-neutral-500 mt-1">Manage public contributions and export collection reports.</p>
        </div>

        {/* Collection Summary Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Donors</p>
            <p className="text-2xl font-black text-neutral-900 mt-2">{summary.totalDonors}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Collection</p>
            <p className="text-2xl font-black text-amber-600 mt-2">₹{summary.totalCollection.toLocaleString("en-IN")}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Cash</p>
            <p className="text-2xl font-black text-emerald-600 mt-2">₹{summary.totalCash.toLocaleString("en-IN")}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Online</p>
            <p className="text-2xl font-black text-blue-600 mt-2">₹{summary.totalOnline.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Form and History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 1. DONATION FORM CARD */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-neutral-950 mb-6 pb-2 border-b border-neutral-100 flex items-center gap-2">
              <span>📝</span> New Donation Entry
            </h2>

            <form onSubmit={handleCreateDonation} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Donor Name / वर्गणीदाराचे नाव <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ganesh Joshi"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  WhatsApp / Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength="10"
                  placeholder="10-digit number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Donation Amount / वर्गणीची रक्कम (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Amount in Rupees"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Mode of Donation / वर्गणीचा प्रकार <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setModeOfDonation("Cash")}
                    className={`py-2 text-sm font-semibold rounded-lg transition ${modeOfDonation === "Cash"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900"
                      }`}
                  >
                    💵 Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeOfDonation("Online")}
                    className={`py-2 text-sm font-semibold rounded-lg transition ${modeOfDonation === "Online"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900"
                      }`}
                  >
                    💳 Online
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Address / पत्ता (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Optional Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                  कोणाकडे पैसे जमा केले / दिले (Collected By) <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={collectedBy}
                  onChange={(e) => setCollectedBy(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition font-medium bg-white text-neutral-900 text-sm cursor-pointer"
                >
                  <option value="अक्षय कुलकर्णी">१. अक्षय कुलकर्णी (Akshay Kulkarni)</option>
                  <option value="गौरव कुलकर्णी">२. गौरव कुलकर्णी (Gaurav Kulkarni)</option>
                  <option value="शुभम जोशी">३. शुभम जोशी (Shubham Joshi)</option>
                  <option value="गणेश जोशी">४. गणेश जोशी (Ganesh Joshi)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-bold rounded-xl transition shadow-md disabled:opacity-50"
              >
                {formLoading ? "⏳ Creating..." : "Save Donation & Generate Receipt"}
              </button>
            </form>
          </div>

          {/* 2. DONATION LIST TABLE */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col space-y-6">

            {/* Table Header and Export Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
                <span>📋</span> Donation History
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleDownloadExcel}
                  disabled={exportExcelLoading}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition text-xs flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <span>{exportExcelLoading ? "⏳ Exporting..." : "📊 Download Excel"}</span>
                </button>
                <button
                  onClick={handleDownloadPDFReport}
                  disabled={exportPdfLoading}
                  className="px-3.5 py-2 bg-[#4a1c02] hover:bg-[#301103] text-white font-bold rounded-xl transition text-xs flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <span>{exportPdfLoading ? "⏳ Exporting..." : "📄 Download PDF Report"}</span>
                </button>
                <button
                  onClick={() => {
                    setDeletePassword("");
                    setIsDeleteModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition text-xs flex items-center gap-1.5 shadow-sm"
                  title="Delete All Current Donations Data (Password Required)"
                >
                  <span>🗑️ सर्व डेटा नष्ट करा (Reset)</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div>
              <input
                type="text"
                placeholder="🔍 Search donor, mobile, or receipt number..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // reset to page 1 on search
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition text-sm"
              />
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-500 text-xs">
                    <th className="py-3 px-4 uppercase font-bold tracking-wider">Receipt No</th>
                    <th className="py-3 px-4 uppercase font-bold tracking-wider">Donor</th>
                    <th className="py-3 px-4 uppercase font-bold tracking-wider">Mobile</th>
                    <th className="py-3 px-4 uppercase font-bold tracking-wider">Amount</th>
                    <th className="py-3 px-4 uppercase font-bold tracking-wider">Mode</th>
                    <th className="py-3 px-4 uppercase font-bold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-neutral-500">Loading donations...</td>
                    </tr>
                  ) : donations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-neutral-500">No donations available to export.</td>
                    </tr>
                  ) : (
                    donations.map((d) => (
                      <tr key={d._id} className="hover:bg-neutral-50/50 transition">
                        <td className="py-3.5 px-4 font-mono text-xs text-neutral-900 font-semibold">
                          {d.receiptNumber || "N/A"}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-neutral-900">
                          <div>{d.donorName || d.name || "Unknown"}</div>
                          {d.collectedBy && (
                            <div className="text-[11px] text-amber-800 font-medium mt-0.5">
                              👤 {d.collectedBy}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600">
                          {d.mobileNumber || "N/A"}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-600">
                          ₹{d.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${d.modeOfDonation === "Online"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-orange-50 text-orange-700 border border-orange-200"
                            }`}>
                            {d.modeOfDonation || "N/A"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                          {d.receiptNumber && (
                            <>
                              <button
                                onClick={() => downloadReceiptPDF(d)}
                                className="px-2.5 py-1 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition"
                              >
                                📄 PDF
                              </button>
                              <button
                                onClick={() => shareReceiptPDF(d)}
                                className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition"
                              >
                                🔗 Share
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="px-3.5 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-bold rounded-xl transition disabled:opacity-50"
                >
                  ◀ Previous
                </button>
                <span className="text-xs text-neutral-500 font-semibold">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-3.5 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-bold rounded-xl transition disabled:opacity-50"
                >
                  Next ▶
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ================================================== */}
      {/* 🧾 HIDDEN PRINTABLE RECEIPT TEMPLATE (html2canvas)  */}
      {/* ================================================== */}
      {selectedDonation && (
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <div
            ref={receiptRef}
            style={{
              width: "800px",
              background: "#ffffff",
              padding: "30px",
              boxSizing: "border-box",
              fontFamily: "serif"
            }}
          >
            {/* Header Border Card */}
            <div
              style={{
                border: "3px double #D4AF37",
                borderRadius: "15px",
                padding: "20px",
                boxSizing: "border-box",
                backgroundColor: "#FCF9F2", // Premium royal parchment background color
                position: "relative",
                overflow: "hidden"
              }}
            >

              {/* Background Watermark Ganesha Logo */}
              <div
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0.05,
                  pointerEvents: "none",
                  zIndex: 0
                }}
              >
                <img
                  src={mandallogo}
                  alt="Watermark"
                  style={{ width: "350px", height: "350px", objectFit: "contain" }}
                />
              </div>

              {/* Printable Content relative wrapper to overlay watermark */}
              <div style={{ position: "relative", zIndex: 1 }}>

                {/* TOP AUTHENTIC GRAPHIC BANNER FROM POSTER */}
                <div
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1.5px solid #D4AF37",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    marginBottom: "12px",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <img
                    src={posterHeaderBanner}
                    alt="Mandal Header Banner"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "contain"
                    }}
                  />
                </div>

                {/* Title Section */}
                <div style={{ textAlign: "center", margin: "8px 0 16px 0" }}>
                  <h2
                    style={{
                      color: "#4a1c02",
                      fontSize: "19px",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      margin: 0,
                      letterSpacing: "0.5px"
                    }}
                  >
                    वर्गणी पावती / DONATION RECEIPT
                  </h2>
                </div>

                {/* Receipt Info Table */}
                <div style={{ fontSize: "15px", color: "#222", lineHeight: "1.7" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "50%", padding: "8px 0" }}>
                          <strong>पावती क्रमांक / Receipt No :</strong> {selectedDonation.receiptNumber}
                        </td>
                        <td style={{ width: "50%", padding: "8px 0", textAlign: "right" }}>
                          <strong>दिनांक / Date :</strong> {selectedDonation.date || new Date(selectedDonation.createdAt).toLocaleDateString("en-GB")}
                        </td>
                      </tr>

                      <tr style={{ borderTop: "1px solid #e2d6b5" }}>
                        <td colSpan="2" style={{ padding: "10px 0" }}>
                          <strong>वर्गणीदाराचे नाव / Donor Name :</strong> {selectedDonation.donorName || selectedDonation.name}
                        </td>
                      </tr>

                      <tr style={{ borderTop: "1px solid #e2d6b5" }}>
                        <td style={{ padding: "10px 0" }}>
                          <strong>मोबाईल नंबर / Mobile No :</strong> {selectedDonation.mobileNumber || "N/A"}
                        </td>
                        <td style={{ padding: "10px 0", textAlign: "right" }}>
                          <strong>वर्गणीचा प्रकार / Donation Mode :</strong> {selectedDonation.modeOfDonation}
                        </td>
                      </tr>

                      <tr style={{ borderTop: "1px solid #e2d6b5" }}>
                        <td colSpan="2" style={{ padding: "10px 0" }}>
                          <strong>कोणाकडे पैसे जमा केले / Collected By :</strong> <span style={{ color: "#4a1c02", fontWeight: "bold" }}>{selectedDonation.collectedBy || "अक्षय कुलकर्णी"}</span>
                        </td>
                      </tr>

                      {selectedDonation.address && (
                        <tr style={{ borderTop: "1px solid #e2d6b5" }}>
                          <td colSpan="2" style={{ padding: "10px 0" }}>
                            <strong>पत्ता / Address :</strong> {selectedDonation.address}
                          </td>
                        </tr>
                      )}

                      <tr style={{ borderTop: "1px solid #e2d6b5" }}>
                        <td style={{ padding: "10px 0" }}>
                          <strong>वर्गणीची रक्कम / Amount :</strong> <span style={{ fontSize: "18px", fontWeight: "bold", color: "#b45309" }}>₹{Number(selectedDonation.amount).toLocaleString("en-IN")}/-</span>
                        </td>
                        <td style={{ padding: "10px 0", textAlign: "right" }}>
                          <strong>रक्कम शब्दात / Amount in Words :</strong> <span style={{ fontStyle: "italic", color: "#333", fontWeight: "600" }}>{numberToWords(selectedDonation.amount)}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer text */}
                <div style={{ marginTop: "40px", borderTop: "2px solid #D4AF37", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    * This is an official donation receipt generated digitally.
                  </div>

                  {/* Munim Signature & Name */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img
                      src={munimSign}
                      alt="Munim Signature"
                      style={{
                        width: "125px",
                        height: "auto",
                        mixBlendMode: "multiply",
                        marginBottom: "-6px"
                      }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: "bold", color: "#4a1c02" }}>
                      विघ्नहर्ता मित्र मंडळ
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* ⚠️ DELETE ALL DATA CONFIRMATION MODAL (Vigh2026)   */}
      {/* ================================================== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-red-200 relative">
            
            {/* Header */}
            <div className="flex items-center gap-3 text-red-600 mb-4 pb-3 border-b border-red-100">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-2xl flex-shrink-0">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-black text-neutral-900 leading-tight">
                  सर्व वर्गणी डेटा नष्ट करा
                </h3>
                <p className="text-xs text-red-600 font-semibold mt-0.5">
                  Reset All Donations (Fresh Start)
                </p>
              </div>
            </div>

            {/* Warning Box */}
            <div className="p-3.5 bg-red-50/80 border border-red-200 rounded-2xl mb-5 text-xs text-red-900 leading-relaxed font-medium space-y-1.5">
              <p>
                <strong>⚠️ महत्त्वाची सूचना:</strong> हा पर्याय निवडल्यास सर्व वर्गणीदारांचा डेटा, पावत्या आणि जमा रकमा कायमच्या नष्ट (Delete) होतील.
              </p>
              <p className="text-neutral-600">
                हा डेटा नष्ट केल्यावर सर्व हिशोब शून्य (0) होऊन नवीन वर्गणीसाठी फ्रेश सुरुवात होईल.
              </p>
            </div>

            {/* Password Form */}
            <form onSubmit={handleClearAllDonations} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                  सुरक्षितता पासवर्ड टाका (Enter Password) <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="सुरक्षितता पासवर्ड प्रविष्ट करा..."
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition text-sm font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeletePassword("");
                  }}
                  disabled={deleteLoading}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-bold text-xs transition"
                >
                  रद्द करा (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={deleteLoading || !deletePassword}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {deleteLoading ? "डेटा नष्ट करत आहे..." : "🔴 खात्रीपूर्वक सर्व डेटा हटवा"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageDonations;