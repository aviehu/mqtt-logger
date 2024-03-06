import mqtt = require('mqtt');
import {format, transports, createLogger} from "winston";
import {config} from 'dotenv'

config()

const envVars = {
    brokerUrl: process.env.MQTT_URL || '',
    user: process.env.MQTT_USER || '',
    password: process.env.MQTT_PASSWORD || '',
    port: process.env.MQTT_PORT || ''
}

console.log(envVars)

const {combine, label, timestamp, printf} = format

const myFormat = printf(({message, timestamp, topic }) => {
    return `${timestamp}: ${topic} --- ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: `${Date.now()}.log` })
    ],
});

const client = mqtt.connect(envVars.brokerUrl, {username: envVars.user, password: envVars.password, port: parseInt(envVars.port)});

client.on("connect", () => {
    console.log('connected to mqtt')
});

client.on("error", (error) => {
    console.log(error)
});

client.subscribe('+/#')

client.on('message',(topic, payload) => {
    logger.info({topic, message: payload.toString()})
})

