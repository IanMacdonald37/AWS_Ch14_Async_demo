const AWS = require('aws-sdk');
var { v4: uuidv4 }  = require('uuid');
const config = require('./config.json');
AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS({});



if (process.argv.length !== 4) {
  console.log('inccomplete call');
  process.exit(1);
}

const id = uuidv4();
const body = {
  id: id,
  date: new Date().toLocaleDateString(),
  account: process.argv[2],
  contents: process.argv[3]
};

sqs.sendMessage({
  MessageBody: JSON.stringify(body),
  QueueUrl: config.QueueUrl
}, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('Your order details will be soon available at http://' + config.Bucket + '.s3.amazonaws.com/' + id + '.txt');
  }
});
