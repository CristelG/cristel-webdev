//Global variables
const path = require('path');
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

//Env vars
require('dotenv').config({ path: path.join(__dirname, '.env') });

//App variable
const app = express();
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

//Mounting body-parser
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

// POST route from contact form
app.post('/contact', (req, res) => {
    //Checking reCAPTCHA v3
    axios({
        method: 'post',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        params: {
            secret: process.env.SECRET_GOOGLE_KEY,
            response: req.body.token,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
    })
        .then((googleRes) => {
            if (googleRes.data.success === true) {
                // Instantiate the SMTP server
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP,
                    port: process.env.SMTP_PORT,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });

                // Specify what the email will look like
                const mailOpts = {
                    from: process.env.SERVER_MAIL, // This is ignored by Gmail
                    to: process.env.EMAIL,
                    subject: `New message from contact form [${req.body.subject}]`,
                    text: `${req.body.name} (${req.body.email}) says: \n\r\n\r ${req.body.message}`,
                };

                // Attempt to send the email
                transporter.sendMail(mailOpts, (error, response) => {
                    if (error) {
                        res.status(500).send(
                            'There was an error with the mail sending.'
                        ); // Send error
                    } else {
                        res.status(200).send();
                    }
                });
            } else res.status(500).send('There was an error with the google captcha request.');
        })
        .catch((error) => console.log(error));
});
//Listener
app.listen(process.env.PORT, function () {
    console.log(`App listening on port ${process.env.PORT}!`);
});
