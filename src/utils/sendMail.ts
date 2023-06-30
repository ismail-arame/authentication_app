import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

export default async function sendMail(
  to: string,
  name: string,
  image: string,
  url: string,
  subject: string,
  template: string
) {
  const {
    MAILING_EMAIL,
    MAILING_PASSWORD,
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_PORT,
  } = process.env;

  /* ---------- using SMTP service ---------- */
  let transporter = nodemailer.createTransport({
    port: Number(SMTP_PORT),
    host: SMTP_HOST,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  /* ---------- using Gmail service ---------- */
  /*let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAILING_EMAIL,
      pass: MAILING_PASSWORD,
    },
  }); */

  /* using handlebars to replace values in html template */
  const data = handlebars.compile(template);
  const replacements = {
    name: name,
    email_link: url,
    image: image,
  };
  const html = data(replacements);

  /* Verify Connection Congif */
  await new Promise((resolve, reject) => {
    //verifies if we can connect to the SMTP server
    transporter.verify((error, success) => {
      if (error) {
        console.log("Error connecting to the SMTP server : ", error);
        reject(error);
      } else {
        console.log("SMTP server is listening...");
        resolve(success);
      }
    });
  });

  /* ---------- Send Mail ---------- */
  const options = {
    from: SMTP_EMAIL,
    to,
    subject,
    html,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.error("Error sending email : ", err);
        reject(err);
      } else {
        console.log("Email sent successfully : ", info);
        resolve(info);
      }
    });
  });
}
