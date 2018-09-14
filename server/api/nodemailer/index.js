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
const nodeMailer = async (data, hasTemplate) => {
  let mailOptions = {};
  const {email} = data;
  
  if (hasTemplate) {
    mailOptions = {
      from: 'Welcome Heroku App', // sender address
      to: email, // list of receivers
      subject: 'Notification email ( Not reply)', // Subject line
      html: `Hello ${email}. This is a text email`,
    };
  }

  else {
    mailOptions = {
    from: 'Welcome Heroku App', // sender address
    to: email, // list of receivers
    subject: 'Notification email ( Not reply)', // Subject line
    template: 'notifi-email',
    context: {
      name: email
    }
  };
  }

  const rs = await smtpTransport.sendMail(mailOptions);
  return rs;
};

export default nodeMailer;
