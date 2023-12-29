const ElasticEmail = require("@elasticemail/elasticemail-client");
const { ELASTIC_API_KEY, EMAIL_FROM } = process.env;
const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;
const api = new ElasticEmail.EmailsApi();

const callback = (error, data, response) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log("API called successfully.");
  }
};

const sendEmail = ({ to, html: content, subject }) => {
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(to)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: content,
        }),
      ],
      Subject: subject,
      From: EMAIL_FROM,
    },
  });
  api.emailsPost(email, callback);
};

// const data = {
//   to: "wapis71141@vkr1.com",

//   subject: "Test email",
//   html: "<p><strong>Test email</strong>from localhost:3000</p>",
// };

module.exports = sendEmail;
