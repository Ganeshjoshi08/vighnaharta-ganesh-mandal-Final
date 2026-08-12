import { useEffect, useState, useRef } from "react";
import API from "../api/api";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Import existing assets
import mandallogo from "../assets/mandallogo.png";
import TilakImg from "../assets/Tilak.jpg";
import savarkarImg from "../assets/savarkar.png";
import munimSign from "../assets/munim_sign.png";

// Number to Words Converter for Receipts
const numberToWords = (num) => {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if ((num = num.toString()).length > 9) return 'Amount Too Large';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return ''; 
  let str = '';
  str += (Number(n[1]) != 0) ? (a[Number(n[1])] || b[Number(n[1])[0]] + ' ' + a[Number(n[1])[1]]) + 'Crore ' : '';
  str += (Number(n[2]) != 0) ? (a[Number(n[2])] || b[Number(n[2])[0]] + ' ' + a[Number(n[2])[1]]) + 'Lakh ' : '';
  str += (Number(n[3]) != 0) ? (a[Number(n[3])] || b[Number(n[3])[0]] + ' ' + a[Number(n[3])[1]]) + 'Thousand ' : '';
  str += (Number(n[4]) != 0) ? (a[Number(n[4])] || b[Number(n[4])[0]] + ' ' + a[Number(n[4])[1]]) + 'Hundred ' : '';
  str += (Number(n[5]) != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[Number(n[5])[0]] + ' ' + a[Number(n[5])[1]]) + 'Rupees Only' : 'Rupees Only';
  return str.trim();
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
  
  // Selected donation for generating/sharing PDF
  const [selectedDonation, setSelectedDonation] = useState(null);
  
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
    if (!donorName || !mobileNumber || !amount || !modeOfDonation) {
      alert("Please fill all required fields.");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (Number(amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    setFormLoading(true);
    try {
      const res = await API.post("/donations/admin-create", {
        donorName,
        mobileNumber,
        amount: Number(amount),
        modeOfDonation,
        address
      });

      alert(res.data.msg || "Donation created successfully!");
      
      // Auto-select the newly created donation for immediate receipt download/share option
      setSelectedDonation(res.data.donation);
      
      // Reset form
      setDonorName("");
      setMobileNumber("");
      setAmount("");
      setAddress("");
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

  // PDF download flow for individual receipt
  const downloadReceiptPDF = async (donation) => {
    setSelectedDonation(donation);
    setTimeout(async () => {
      try {
        const element = receiptRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 2 });
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
    }, 100);
  };

  // Web Share API flow for individual receipt
  const shareReceiptPDF = async (donation) => {
    setSelectedDonation(donation);
    const shareText = `🙏 विघ्नहर्ता मित्र मंडळ, बीड. \n\nनमस्कार ${donation.donorName || donation.name} जी, \nतुमची ₹${donation.amount} ची वर्गणी (${donation.modeOfDonation}) यशस्वीरित्या प्राप्त झाली आहे. \nपावती क्रमांक: ${donation.receiptNumber}\n\nगणपती बाप्पा मोरया! 🌺`;

    setTimeout(async () => {
      try {
        const element = receiptRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 2 });
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
                    className={`py-2 text-sm font-semibold rounded-lg transition ${
                      modeOfDonation === "Cash"
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    💵 Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeOfDonation("Online")}
                    className={`py-2 text-sm font-semibold rounded-lg transition ${
                      modeOfDonation === "Online"
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
                          {d.donorName || d.name || "Unknown"}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600">
                          {d.mobileNumber || "N/A"}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-600">
                          ₹{d.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                            d.modeOfDonation === "Online"
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
                
                {/* TOP FESTIVE HEADER / BANNER */}
                <div
                  style={{
                    background: "linear-gradient(to right, #200b02, #4a1c02, #200b02)",
                    border: "2px solid #D4AF37",
                    padding: "15px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxSizing: "border-box"
                  }}
                >
                  {/* Left: Logo */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        border: "1px solid rgba(212,175,55,0.4)",
                        padding: "4px",
                        borderRadius: "10px",
                        background: "rgba(48,17,3,0.2)"
                      }}
                    >
                      <img
                        src={mandallogo}
                        alt="Logo"
                        style={{ width: "65px", height: "65px", objectFit: "contain" }}
                      />
                    </div>
                  </div>

                  {/* Center Title in AMS Chhatrapati with address */}
                  <div style={{ textAlign: "center", flex: 1, paddingLeft: "10px", paddingRight: "10px" }}>
                    <h1
                      style={{
                        fontFamily: "'AMS Chhatrapati', 'AMSChhatrapati', serif",
                        fontSize: "36px",
                        color: "#FFE9A3", // Royal Golden typography
                        margin: 0,
                        letterSpacing: "normal",
                        lineHeight: "1.25",
                        textShadow: "0 2px 4px rgba(0,0,0,0.85)"
                      }}
                    >
                      ivaGnahtaa_ imaPa ma/DL, baID.
                    </h1>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#ffffff",
                        margin: "4px 0 0 0",
                        fontWeight: "normal",
                        fontFamily: "serif"
                      }}
                    >
                      स्थापना: १९९० • विघ्नहर्ता चौक, बीड
                    </p>
                  </div>

                  {/* Right: Portraits */}
                  <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <img
                        src={TilakImg}
                        alt="Tilak"
                        style={{ width: "42px", height: "54px", objectFit: "cover", borderRadius: "3px", border: "1px solid #D4AF37" }}
                      />
                      <span style={{ color: "#FFE9A3", fontSize: "8px", marginTop: "2px" }}>लोकमान्य टिळक</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <img
                        src={savarkarImg}
                        alt="Savarkar"
                        style={{ width: "42px", height: "54px", objectFit: "cover", borderRadius: "3px", border: "1px solid #D4AF37" }}
                      />
                      <span style={{ color: "#FFE9A3", fontSize: "8px", marginTop: "2px" }}>स्वा. सावरकर</span>
                    </div>
                  </div>
                </div>

                {/* Title Section */}
                <div style={{ textAlign: "center", margin: "25px 0" }}>
                  <h2
                    style={{
                      color: "#4a1c02", // Saffron/maroon color
                      fontSize: "24px",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      margin: 0
                    }}
                  >
                    वर्गणी पावती / DONATION RECEIPT
                  </h2>
                </div>

                {/* Receipt Info Table */}
                <div style={{ fontSize: "16px", color: "#222", lineHeight: "1.8" }}>
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
                        <td colSpan="2" style={{ padding: "12px 0" }}>
                          <strong>वर्गणीदाराचे नाव / Donor Name :</strong> {selectedDonation.donorName || selectedDonation.name}
                        </td>
                      </tr>

                      <tr style={{ borderTop: "1px solid #e2d6b5" }}>
                        <td style={{ padding: "12px 0" }}>
                          <strong>मोबाईल नंबर / Mobile No :</strong> {selectedDonation.mobileNumber || "N/A"}
                        </td>
                        <td style={{ padding: "12px 0", textAlign: "right" }}>
                          <strong>वर्गणीचा प्रकार / Donation Mode :</strong> {selectedDonation.modeOfDonation}
                        </td>
                      </tr>

                      {selectedDonation.address && (
                        <tr style={{ borderTop: "1px solid #e2d6b5" }}>
                          <td colSpan="2" style={{ padding: "12px 0" }}>
                            <strong>पत्ता / Address :</strong> {selectedDonation.address}
                          </td>
                        </tr>
                      )}

                      <tr style={{ borderTop: "1px solid #e2d6b5" }}>
                        <td style={{ padding: "12px 0" }}>
                          <strong>वर्गणीची रक्कम / Amount :</strong> <span style={{ fontSize: "20px", fontWeight: "bold", color: "#b45309" }}>₹{Number(selectedDonation.amount).toLocaleString("en-IN")}/-</span>
                        </td>
                        <td style={{ padding: "12px 0", textAlign: "right" }}>
                          <strong>रक्कम शब्दात / Amount in Words :</strong> <span style={{ fontStyle: "italic", color: "#444" }}>{numberToWords(selectedDonation.amount)}</span>
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

    </div>
  );
};

export default ManageDonations;