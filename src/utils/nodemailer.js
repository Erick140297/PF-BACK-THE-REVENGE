const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config;

const sendMail = async (contentHtml, email) => {

  // const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

  const CLIENT_ID =
    "1077631869308-iui2hkd43nicvuqrih4jj54jv4bfqbbg.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04pNoJHtzK6T5CgYIARAAGAQSNwF-L9IrTTFBNwhRydH8n5rbaby5a9pQh1GdzQD8xOrTd2ftq8A5x3QtQ5bd1J75-lgsue6NY28";

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "freelanceworkerspf@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "<ventas@galaxiatech.com>",
      to: `${email}`,
      subject: "Galaxia Tech",
      html: contentHtml,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
