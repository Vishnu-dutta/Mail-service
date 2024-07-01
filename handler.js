'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const ses = new AWS.SES();

module.exports.sendEmail = async (event) => {
  const { receiver_email, subject, body_text } = JSON.parse(event.body);

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
    Source: 'winniebeargo600@gmail.com' // Replace with your verified SES email
  };

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
