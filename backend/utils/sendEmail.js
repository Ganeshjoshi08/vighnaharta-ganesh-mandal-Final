const sendOTP = async (email, otp) => {
  try {
    const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_PASS;
    
    if (!apiKey) {
      throw new Error("Missing Resend API Key");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Vighnaharta 🙏 <onboarding@resend.dev>",
        to: email,
        subject: "OTP Verification Code",
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px; max-width: 500px;">
            <h2 style="color: #735c00;">विघ्नहर्ता गणेश मंडळ</h2>
            <p>Your OTP verification code is:</p>
            <div style="font-size: 24px; font-weight: bold; color: #8c0c05; background: #fcf8e3; padding: 10px; text-align: center; border-radius: 4px; letter-spacing: 4px;">
              ${otp}
            </div>
            <p style="margin-top: 15px; font-size: 12px; color: #666;">This code is valid for 10 minutes. Please do not share this OTP with anyone.</p>
          </div>
        `
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`✅ Resend OTP sent successfully to: ${email}`, data);
      return true;
    } else {
      console.error("❌ Resend API response error:", data);
      return false;
    }

  } catch (err) {
    console.error("❌ Resend sendOTP failed with error:");
    console.error(err.stack || err);
    return false;
  }
};

module.exports = sendOTP;