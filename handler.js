const AWS = require('aws-sdk');
// using basic AWS security replace with yours
const ses = new AWS.SES({ region: 'us-east-1' }); 

module.exports.sendEmail = async (event) => {
  const { receiver_email, body_text, subject } = JSON.parse(event.body);

  if (!receiver_email || !body_text || !subject) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' })
    };
  }

  const params = {
    Destination: {
      ToAddresses: [receiver_email]
    },
    Message: {
      Body: {
        Text: { Data: body_text }
      },
      Subject: { Data: subject }
    },
    Source: 'roker.octavia88@gmail.com' // Replace with your email
  };

  try {
    await ses.sendEmail(params).promise(); //function should be promise and it will not keep thread blocked
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' })
    };
  }
};
