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
    viewPath: 'server/views/email/',
    extName: '.hbs'
  })
);
const nodeMailer = async data => {
  let mailOptions = {};
  mailOptions = {
    from: 'Welcome Heroku App', // sender address
    to: data.email, // list of receivers
    subject: 'Notification email ( Not reply)', // Subject line
    template: 'notifi-email',
    context: {
      name: data.email
    }
  };

  // console.log(mailOptions);

  const rs = await smtpTransport.sendMail(mailOptions);
  return rs;
};

export default nodeMailer;
