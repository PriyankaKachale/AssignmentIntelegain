var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});



const async = require('async');
const fs = require("fs");
request = require('request');

exports.userSignUpMail = (details,cb)=>{
  
    sgMail.setApiKey(config['SENDGRID_API_KEY']);
            const msg = {
                to: details.email,
                from: 'notification@alleviz.in',
                subject: 'Login credentials of Alleviz',
                text: 'HELLO',
                html: '<strong>Dear '+details.first_name+', </strong><br/><br/>'+
                      'You Registration with Alleviz for company  '+ details.company_name +' , is Done Successfully. <br/>'+
                      'It is a Visitor Management system of your company. <br/><br/>' +
                       
                      'your User Name is '+details.email + ' and  <br/>' +
                      'your password  is '+details.password + ' <br/>' + 
                      'Use below Link to Login: <br/>'+
                      'http://alleviz.in/ <br/><br/>' +
                      'Request you to please change the password after your first login.'                

        };

        sgMail.send(msg)
                .then(() => {
                         console.log('Mail sent successfully'),
                         cb(null,'Email Send successfully') 
                        })
                 .catch(error => 
                       { 
                           console.error(error.toString()),
                         cb(error)
                    }
                );
}


exports.employee_signup_mail = (empdetails,cb) =>{
   
    sgMail.setApiKey(config['SENDGRID_API_KEY']);
    const msg = {
        to: empdetails.email,
        from: 'notification@alleviz.in',
        subject: 'Login credentials of Alleviz',
        text: 'HELLO',
        html: '<strong>Dear '+empdetails.first_name+'   </strong><br/><br/>'+
              'You Registration of '+ empdetails.company_name +' , is Successfully Done. <br/>'+
              'in Branch '+empdetails.branch_name + ' at the position of ' +empdetails.designation+
              ' for ' + empdetails.purpose + ' purpose and <br/>' +
              'your User Name is '+empdetails.email + ' and  <br/>' +
              'your password  is '+empdetails.password + ' <br/>' + 
              'http://www.alleviz.in'                

};

sgMail.send(msg)
        .then(() => {
                 console.log('Mail sent successfully'),
                 cb(null,'Email Send successfully') 
                })
         .catch(error => 
               { 
                   console.error(error.toString()),
                 cb(error)
            }
        );
}



