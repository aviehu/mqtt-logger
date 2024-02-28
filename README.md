# Step 1
`npm install`

# Step 2
create and add variables to `.env` file

* MQTT_URL - mqtt broker url including `mqtts://`
* MQTT_USER - mqtt user name
* MQTT_PASSWORD - mqtt password
* MQTT_PORT - mqtt port

# Step 3
`npm start`

# Logging
every mqtt message that is using the mqtt api will be logged on console as well as logged to a file.

the file name is the UNIX time when the app started to record logs