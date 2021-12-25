const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config()

// AWS.config.update({
//     region: "ap-southeast-1"
// })

// Create a kinesis client
let kinesisClient = new AWS.Kinesis({region : "ap-southeast-1"})
const KINESIS_STREAM_NAME = 'click_stream'

app.get('/api/info', (req, res) => {
    res.send({ application: 'click-app is good', version: '1' });
});

app.post('/api/v1/getback',
    (req, res) => {
    res.send({ ...req.body });
}
);


app.post('/api/v1/userpage',(req,res)=>{
    var request = req.body;
    kinesisClient.putRecord(
        {
            Data: JSON.stringify(request),
            StreamName: KINESIS_STREAM_NAME,
            PartitionKey: '1'
        },
        (err, data) => {
            if (err) {
                throw err
            }
            console.log(data)
        }
    )
    res.send({
        'request':request,
        'version' : 1
    });
});



app.get('/api/v1/userpage',(req,res)=>{

    console.log('haha')
    try {
        for (let i = 0; i < 10; i++) {
            let exampleData = {
                voterid: Math.round(Math.random() * 100000),
                choice: Math.random() * 10 > 5 ? 'blue' : 'red',
                t: Date.now()
            }

            console.log(JSON.stringify(exampleData))

            kinesisClient.putRecord(
                {
                    Data: JSON.stringify(exampleData),
                    StreamName: KINESIS_STREAM_NAME,
                    PartitionKey: '1'
                },
                (err, data) => {
                    if (err) {
                        console.log(err)
                        throw err
                    }
                    console.log(data)
                }
            )
        }
    } catch (error) {
        console.error(error);
    }
    console.log("finish")
    res.send({ result: 'send successful', version: '1' });
})

//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);