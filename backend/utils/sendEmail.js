const nodemailer = require("nodemailer");
const dns = require("dns").promises;

const sendOTP = async (email, otp) => {
  try {
    if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
      throw new Error("Missing EMAIL or EMAIL_PASS environment variables in backend .env");
    }

    // Resolve smtp.gmail.com to IPv4 dynamically
    let smtpIp = "smtp.gmail.com";
    try {
      const ips = await dns.resolve4("smtp.gmail.com");
      if (ips && ips.length > 0) {
        smtpIp = ips[0];
      }
    } catch (dnsErr) {
      console.error("DNS resolve4 failed, using default hostname:", dnsErr.message);
    }

    const transporter = nodemailer.createTransport({
      host: smtpIp,
      port: 465,
      secure: true,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        servername: "smtp.gmail.com"
      },
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