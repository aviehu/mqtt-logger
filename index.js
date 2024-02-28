require('dotenv').config()
const mqtt = require('mqtt')
const fs = require('fs');

const brokerUrl = process.env.MQTT_URL
const user = process.env.MQTT_USER
const password = process.env.MQTT_PASSWORD
const port = process.env.MQTT_PORT

console.log({brokerUrl, user, password, port})

const fileName = Date.now()

const client = mqtt.connect(brokerUrl, {username: user, password: password, port: port});

client.on("connect", () => {
    console.log('connected to mqtt')
});


client.on("error", (error) => {
    console.log(error)
});

client.subscribe('+/+/+/+/+/+/+/+/+/+/+/+')

client.on('message',(topic, payload) => {
    fs.writeFile(`${fileName}.txt`,  `${topic} - ${payload.toString()}\n`, { flag: "a+" }, (err) => {

    });
    console.log(topic, payload.toString())
})

