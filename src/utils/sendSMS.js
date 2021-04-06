const accountSID =
  process.env.NODE_ENV == 'development'
    ? process.env.DEV_TWILIO_ACCOUNT_SID
    : process.env.PROD_TWILIO_ACCOUNT_SID;

const authToken =
  process.env.NODE_ENV == 'development'
    ? process.env.DEV_TWILIO_AUTH_TOKEN
    : process.env.PROD_TWILIO_AUTH_TOKEN;

const phoneNumberFrom =
  process.env.NODE_ENV == 'development'
    ? process.env.DEV_TWILIO_NUMBER
    : process.env.PROD_TWILIO_NUMBER;

const serviceID =
  process.env.NODE_ENV == 'development'
    ? process.env.DEV_TWILIO_SERVICEID
    : process.env.PROD_TWILIO_SERVICEID;

const client = require('twilio')(accountSID, authToken, { lazyLoading: true });

const sentMessage = async (reciever) => {
  try {
    const messageRes = await client.messages.create({
      body: 'This is a Test Message',
      from: phoneNumberFrom,
      to: `+91${reciever}`,
    });

    return messageRes;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const sendOtp = async (countryCode, reciever, channel) => {
  try {
    const otpRes = await client.verify
      .services(serviceID)
      .verifications.create({
        to: `${countryCode}${reciever}`,
        channel: `${channel}`,
      });

    return otpRes;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const recieveOtp = async (countryCode, reciever, otpCode) => {
  try {
    const otpRes = await client.verify
      .services(serviceID)
      .verificationChecks.create({
        to: `${countryCode}${reciever}`,
        code: `${otpCode}`,
      });

    /**
     * The status of the verification. Can be: pending, approved, or canceled.
     * .then(verification_check => console.log(verification_check.status));
     */

    return otpRes;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = { sentMessage, sendOtp, recieveOtp };
