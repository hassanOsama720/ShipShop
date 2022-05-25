const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {

    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: true,
        auth: {
          user: process.env.hashed_user ,
          pass: process.env.hashed_pass,
        },
      });


    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;