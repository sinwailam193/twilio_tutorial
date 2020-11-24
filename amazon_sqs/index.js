const http = require("http");
const express = require("express");
const aws = require("aws-sdk");

const app = express();

const { QUEUE_URL, PORT } = process.env;

// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath(__dirname + "/config.json");

// Instantiate SQS.
var sqs = new aws.SQS();

// Listing our queues.
app.get("/list", (req, res) => {
    sqs.listQueues(function(err, data) {
        if(err) {
            res.send(err);
            return;
        }
        res.send(data);
    });
});

// Sending a message.
// NOTE: Here we need to populate the queue url you want to send to.
// That variable is indicated at the top of app.js.
app.get("/send", (req, res) => {
    const params = {
        MessageBody: "Change with attributes",
        MessageAttributes: {
            user: {
                StringValue: "awesome world",
                DataType: "String"
            }
        },
        QueueUrl: QUEUE_URL,
        DelaySeconds: 0
    };

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            res.send(err);
            return;
        } 
        res.send(data);
    });
});

// Receive a message.
// NOTE: This is a great long polling example. You would want to perform
// this action on some sort of job server so that you can process these
// records.
app.get("/receive", function (req, res) {
    var params = {
        QueueUrl: QUEUE_URL,
        MessageAttributeNames: ["user"]
    };
    
    sqs.receiveMessage(params, function(err, data) {
        if(err) {
            res.send(err);
            return
        }
        res.send(data);
    });
});

http.createServer(app).listen(PORT, () => console.log(`listening on port ${PORT}`));
