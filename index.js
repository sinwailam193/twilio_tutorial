const http = require("http");
const express = require("express");
const twilio = require("twilio");

const {
    PORT,
    ACCOUNT_SID,
    AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    MY_PHONE_NUMBER
} = process.env;

const app = express();
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const { MessagingResponse } = twilio.twiml;

app.post("/sms", (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message("Testing something 123");
    res.writeHead(200, {
        "Content-Type": "text/xml"
    });
    res.end(twiml.toString());
});

// client.messages.create({
//     to: MY_PHONE_NUMBER,
//     from: TWILIO_PHONE_NUMBER,
//     body: "this is text example"
// })
// .then(message => console.log(message));

http.createServer(app).listen(PORT, () => console.log(`listening on port ${PORT}`));
