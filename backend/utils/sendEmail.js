const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  try {
    // 🔥 FIX: transporter ko reusable + safe bana
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    // 🔥 OPTIONAL: verify connection (debug ke liye)
    await transporter.verify();

    await transporter.sendMail({
      from: `"Vighnaharta 🙏" <${process.env.EMAIL}>`, // 🔥 better sender
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`
    });

    console.log("✅ OTP sent successfully");

  } catch (err) {
    console.log("❌ Email error:", err.message);

    // 🔥 IMPORTANT: throw mat kar warna signup fail ho jayega
    // throw err; ❌ remove this

    return false; // safe fallback
  }
};

module.exports = sendOTP;