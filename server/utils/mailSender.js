const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,        // ye add karo
      secure: false,    // TLS start later
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER || "Studybuddy <no-reply@studybuddy.com>",
      to: email,
      subject: title,
      html: body,
    });

    console.log(
      "MAIL SENT:",
      info?.response || info?.messageId || "no response from server"
    );
    return info;
  } catch (error) {
    console.log("MAIL SENDER ERROR:", error.message);
    // ⚠ yaha THROW MAT KARO
    return null; // fail ko silently ignore karo (API ko crash nahi karne dega)
  }
};

module.exports = mailSender;
