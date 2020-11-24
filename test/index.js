const http = require("http");
const twilio = require("twilio");

const {
    PORT,
    ACCOUNT_SID,
    AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    MY_PHONE_NUMBER
} = process.env;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const { MessagingResponse } = twilio.twiml;

// client.messages.create({
//     to: MY_PHONE_NUMBER,
//     from: TWILIO_PHONE_NUMBER,
//     body: "this is text example",
//     mediaUrl: "https://images-na.ssl-images-amazon.com/images/I/71l1%2BAsGBxL._AC_SX522_.jpg"
// })
// .then(message => console.log(message));

// client.incomingPhoneNumbers("PN14e271c117f33e9e9b608c1c933eff57")
//     .fetch()
//     .then(incoming_phone_number => console.log(incoming_phone_number))
//     .catch(err => console.log(err));

client.availablePhoneNumbers("US")
    .local
    .list({
        inRegion: "CA",
        smsEnabled: true,
        limit: 5,
        beta: false,
        excludeAllAddressRequired: true
    })
    .then(local => console.log(local))
    .catch(err => console.warn(err))
