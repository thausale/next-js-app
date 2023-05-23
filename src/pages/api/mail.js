import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp-auth.mailprotect.be",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_LOGIN, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

const mail = async (req, res) => {
  if ((req.method = "POST")) {
    const { subject, body } = JSON.parse(req.body);
    let info = await transporter.sendMail({
      from: "david-app@s9.syntradeveloper.be", // sender address
      to: "david-app@s9.syntradeveloper.be", // list of receivers
      subject, // Subject line
      text: body, // plain text body
      html: body, // html body
    });

    res.json("k").status(418);
  }
};

export default mail;

// send mail with defined transport object

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
