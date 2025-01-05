
app.post('/submit-form', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS // Your email password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const recipientEmail = req.body.recipientEmail; // Assuming you have this in your form

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail, // Now dynamic
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

