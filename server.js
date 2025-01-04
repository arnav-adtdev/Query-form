const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Add the missing 'path' module
const connectDB = require('./db/dbconnect');
const Contact = require('./models/Contact');
const nodemailer = require('nodemailer'); // Add Nodemailer
const app = express();
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

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
      service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
      port: 465,
      secure:true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS // Your email password
      },
      tls:{
        rejectUnauthorized: true
      }
    });

    const mailOptions = { //lagat hai ye json dataset
      from: process.env.EMAIL_USER,
      to: 'arnavchaturvedi0@gmail.com', // Where you want to receive the email //dynamic karo isse!
      subject: `Query Form : ${req.body.subject}`,
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nMessage: ${req.body.message}`
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
        window.location.href = '/'; // Redirect to the home page or any other page
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
