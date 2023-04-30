const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prahul89893@gmail.com",
    pass: "ebmkjrpqxpngyemw",
  },
});
var mailOptions = {
  from: "prahul89893@gmail.com",
  to: "da24m.test@inbox.testmail.app",
  subject: "Password reset - MIT Events",
  html: `<p>Click the following link to reset your password. If you did not request for password reset, you can ignore this mail.</p>
    <a href="http://localhost:5173">Reset password</a>`,
};

transporter.sendMail(mailOptions);
