
import nodemailer = require("nodemailer");
import Email = require('email-templates');

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port:  465,// 587,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'tautivadaniel17@gmail.com', // user
    pass: 'kkwsrueuasaqjkmo', // pass
  },
});

export const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
    views: {
        options: {
          extension: 'pug',
        }
    },
    root: '/emails',
});

transporter.verify().then(() => {
    console.log('Ready for send emails');
});
