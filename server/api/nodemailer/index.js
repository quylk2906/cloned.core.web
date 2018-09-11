import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

var smtpTransport = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'lkquyit@gmail.com',
    pass: 'nguyetheo'
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true
});

smtpTransport.use(
  'compile',
  hbs({
    viewPath: 'server/views/email/email1',
    extName: '.hbs'
  })
);
const nodeMailer = async data => {
  let mailOptions = {};
  mailOptions = {
    from: 'Welcome Heroku App', // sender address
    to: data.emails, // list of receivers
    subject: 'Notification email ( Not reply)', // Subject line
    template: 'notifi-email',
    context: {}
  };

  // console.log(mailOptions);

  const rs = await smtpTransport.sendMail(mailOptions);
  return rs;
};

export default nodeMailer;
