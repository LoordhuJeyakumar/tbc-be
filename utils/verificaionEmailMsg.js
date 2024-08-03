function verificaionEmailMsg(verificationLink, name) {
  const message = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Email Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 40px auto;
                  padding: 20px;
                  background-image: linear-gradient(to bottom, #d6ffb7, #f5ff90);
                  border: 1px solid #ddd;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #08034f;
                  color: #fff;
                  padding: 10px;
                  text-align: center;
                  border-bottom: 1px solid #ddd;
              }
              .content {
                  padding: 20px;
              }
              .verification-link {
                  color: #08034f;
                  text-decoration: none;
                  border-bottom: 2px solid #08034f;
              }
              .verification-link:hover {
                  color: #ff9f1c;
                  border-bottom: 2px solid #ff9f1c;
              }
              .social-media-link {
                  color: #d6ffb7;
                  text-decoration: none;
                  border-bottom: 2px solid #d6ffb7;
              }
              .social-media-link:hover {
                  color: #f5ff90;
                  border-bottom: 2px solid #f5ff90;
              }
        
      
      
      /* CSS */
      .button-33 {
        background-color: #08034f;
        color: #d6ffb7 !important;
        border-radius: 100px;
        box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
        color: green;
        cursor: pointer;
        display: inline-block;
        font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
        padding: 7px 20px;
        text-align: center;
        text-decoration: none;
        transition: all 250ms;
        border: 0;
        font-size: 16px;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }
      
      .button-33:hover {
        box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
        transform: scale(1.05) rotate(-1deg);
      }
      .button-33 a{
          text-decoration: none !important;
          color: #d6ffb7;
      }
      .social{
          display: flex;
          width: 20%;
          justify-content: space-between;
      }
          </style>
          <script src="https://kit.fontawesome.com/a4a620facd.js" crossorigin="anonymous"></script>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1><strong>TBC</strong></h1>
                  <h2>Unlock the Power of TBC!</h2>
              </div>
              <div class="content">
                  <p>Hey ${name},</p>
                  <p>You're one step away from unlocking the full potential of TBC! We're building a community that's all about empowering citizens and shaping the future of democracy. And we want you to be a part of it!</p>
                  <p>To confirm your email address and join the movement, simply click the link below:</p>
                  <button class="button-33 "><a href=${verificationLink}>Verify Your Email Now</a></button>
                  
                  <ul>
                      <li><i class="fas fa-unlock"></i> Get access to exclusive updates and features</li>
                      <li><i class="fas fa-users"></i> Be able to engage with other users and join discussions</li>
                      <li><i class="fas fa-bell"></i> Receive personalized notifications and recommendations</li>
                  </ul>
                  <p>Plus, you'll be helping to create a more informed, engaged, and inclusive democracy!</p>
                  <p>If you have any questions or issues, just hit reply or contact our support team. We're here to help.</p>
                  <p>Thanks for being part of this journey!</p>
              
                      <p>Best regards,</p>
                  <p>TBC Team</p>
                  <p>P.S. Don't forget to follow us on social media for the latest updates and news!</p>
                  <p class="social"><i class="fa fa-facebook" aria-hidden="true"></i> <i class="fa fa-instagram" aria-hidden="true"></i> <i class="fa fa-whatsapp" aria-hidden="true"></i> </p>
              </div>
          </div>
      </body>
      </html>
      
        `;

  return message;
}

module.exports = verificaionEmailMsg;
