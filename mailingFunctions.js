var nodemailer = require('nodemailer');

function sendEmail(dest,subject,html){
  
  const email = "testing.bebeymami@gmail.com";
  const pass = "bym20202";

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: pass
    }
  });

  
  console.log("transporter")

  var mailOptions = {
    from: email,
    to: dest,
    subject: subject,
    html: html
  };

  console.log("transporter2")

  await transporter.sendMail(mailOptions, function(error, info){

    if(error){
      return false
    }

    return true

  });

}

module.exports = sendEmail;