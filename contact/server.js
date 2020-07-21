//Global variables
const process = require('dotenv').config({ path: '../.env' });
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

//App variable
const app = express();

//Mounting body-parser
app.use(bodyParser.urlencoded({ extended: true }))


// POST route from contact form
app.post('/contact', (req, res) => {

    // Instantiate the SMTP server
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.parsed.EMAIL_USERNAME,
            pass: process.parsed.EMAIL_PASSWORD
        }
    });

    // Specify what the email will look like
    const mailOpts = {
        from: 'Your sender info here', // This is ignored by Gmail
        to: 'lura96@ethereal.email',
        subject: `New message from contact form [${req.body.subject}]`,
        text: `${req.body.name} (${req.body.email}) says: \n\r\n\r ${req.body.message}`
    }

    // Attempt to send the email
    transporter.sendMail(mailOpts, (error, response) => {
        if (error) {
            res.send({success: false}) // Send error
        }
        else {
            res.send({success: true}) // Send success
        }
    })
})
//Listener
app.listen(process.parsed.PORT, function () {
    console.log(`App listening on port ${process.parsed.PORT}!`);
});