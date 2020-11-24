const http = require("http");
const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");

const {
    PORT,
    ACCOUNT_SID,
    AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    MY_PHONE_NUMBER
} = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const { MessagingResponse } = twilio.twiml;

app.post("/sms", (req, res) => {
    const twiml = new MessagingResponse();

    const msg = twiml.message();
    msg.body("Testing something 123");
    msg.media("https://images-na.ssl-images-amazon.com/images/I/71l1%2BAsGBxL._AC_SX522_.jpg");
    res.writeHead(200, {
        "Content-Type": "text/xml"
    });
    res.end(twiml.toString());
});

app.post("/verify", (req, res) => {
    
    console.log(req.body);

    res.writeHead(200, {
        "Content-Type": "text/xml"
    });
    res.end();
});

// client.messages.create({
//     to: MY_PHONE_NUMBER,
//     from: TWILIO_PHONE_NUMBER,
//     body: "this is text example",
//     mediaUrl: "https://images-na.ssl-images-amazon.com/images/I/71l1%2BAsGBxL._AC_SX522_.jpg"
// })
// .then(message => console.log(message));

http.createServer(app).listen(PORT, () => console.log(`listening on port ${PORT}`));
