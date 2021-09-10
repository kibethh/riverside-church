const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const pug = require('pug');
const htmlToText = require('html-to-text');
const viewsPath = path.join(__dirname, '../views');
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Humphrey Kibet <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV.trim() === 'production') {
      // sendgrid
      return 1;
    }
    return nodemailer.createTransport({
      // name: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  // Send the actual email
  async send(template, subject) {
    //1. Render HTML based on a template
    console.log(__dirname);
    console.log(viewsPath);
    // console.log(`${viewsPath}/email/`);

    // const html = ejs.renderFile(`${viewsPath}/emails/${template}.ejs`, {
    // const html = pug.renderFile(`${viewsPath}/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject,
    // });
    //2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      // html,
      text: 'htmlToText(html, { wordwrap: null })',
    };
    //3. Create a transport and send email
    this.newTransport();
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome To Riverside Family');
  }
};
