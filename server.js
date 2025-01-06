const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./db/dbconnect');
const Contact = require('./models/Contact');
const nodemailer = require('nodemailer');
const app = express();
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit-form', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: req.body.email, // Use the user's email address
      to: process.env.EMAIL_USER,
      subject: `Query Form : ${req.body.subject}`,
      html: `
        <h3>Contact Form Submission</h3>
        <table border="1" cellpadding="10" cellspacing="0">
          <tr>
            <th>Name</th>
            <td>${req.body.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${req.body.email}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>${req.body.phone}</td>
          </tr>
          <tr>
            <th>Service</th>
            <td>${req.body.service}</td>
          </tr>
          <tr>
            <th>Message</th>
            <td>${req.body.message}</td>
          </tr>
        </table>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    console.log('Form Data Saved:', req.body);
    res.send(`
      <script>
        alert('Form data has been received. Thank you!');
        window.location.href = '/';
      </script>
    `);
  } catch (error) {
    console.error('Error saving form data:', error);
    res.send(`
      <script>
        alert('There was an error saving the form data. Please try again.');
        window.location.href = '/';
      </script>
    `);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
