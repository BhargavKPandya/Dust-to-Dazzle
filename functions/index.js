const functions = require('firebase-functions');

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport =nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
admin.initializeApp();

exports.sendContactMessage = functions.database.ref('/dustToDazleInquiry/{pushKey}').onCreate(async (snap, context) => {
    const snapshot = snap.val();
    
    const mailOptions = {
      to: 'bhargavkpandya.22@gmail.com, dust2dazzle1@gmail.com',
      from: `${snapshot.userName}`,
      subject: `Dust to Dazzle cleaning Inquiry from ${snapshot.userName}`,
      html: `<p>User Mobile Number - ${snapshot.userPhoneNumber}</p>
             <p>User Message - ${snapshot.userMessage}</p>
             <p>You received the message from online inquiry website.</p>`,
      replyTo: `${snapshot.userEmail}`
    };
    try {
        return await mailTransport.sendMail(mailOptions);
    }
    catch (error) {
        return console.log("----Error sending email in ContactForm----", error);
    }
  });