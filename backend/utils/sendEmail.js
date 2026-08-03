const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  try {
    if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
      throw new Error("Missing EMAIL or EMAIL_PASS environment variables in backend .env");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    // Explicitly verify the SMTP connection credentials before sending
    await transporter.verify();

    await transporter.sendMail({
      from: `"Vighnaharta 🙏" <${process.env.EMAIL}>`,
      to: email,
      subject: "OTP Verification Code",
      text: `Your OTP is ${otp}. This code is valid for 10 minutes.`
    });

    console.log(`✅ OTP sent successfully to: ${email}`);
    return true;

  } catch (err) {
    console.error("❌ Nodemailer sendOTP failed with detailed stack:");
    console.error(err.stack || err);
    return false;
  }
};

module.exports = sendOTP;