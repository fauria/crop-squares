Crop Squares - Optimize Irrigation of Crop Fields
------

# The event

![Future Hacks logo and partners](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/the_event.jpg)

This project was developed during [Future Hacks Internet of Things Edition](http://futurehacks.co/), held in Madrid, Spain between Ocrober 9th and 11th 2015.

The event was sponsored by [IBM](http://www.ibm.com/), [Dizmo](http://dizmo.com/), [Vodafone](http://www.vodafone.com/), [BQ](http://www.bq.com/) and [IE Business School](http://www.ie.edu/).

# The idea

![Idea draft](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/the_idea.jpg)

The original idea was to "optimize crop field irrigation by using an array of soil moisture sensors and a weather station". 

It aims to improve agricultural methods by continuously reading and sending sensor data to make the irrigation process sustainable and efficient.

The name of the project, "Crop Squares" was inspired by that concept: instead of alien circles, a square grid would provide information about the status of both the soil and the surrounding environment.

# The team

![Crop Squares team members](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/the_team.jpg)

Meet the team:

- Fernando Álvarez-Uría, Software Engineer. <fauria@gmail.com>
- Gabriel Aldaz, Business Dev. <galdaz.biz@gmail.com>
- Elena Arráez, Telecom Engineer. <arraez.elena@gmail.com>
- Diego Alvarado, MBA. <dalvarado@hotmail.com>
- Pablo Lozano - Industrial Engineer. <lozano.p15@gmail.com>
- Javier Yuste - International Management. <javier.yuste@alumni.ie.edu>

We were completely strangers before the hackathon started, but thanks to the excellent attitude and brilliant creativity of each member the vibe was great, making the overall experience absolutely fantastic.

A special mention has to be made to thank our mentors, Luke Allen (<luke.allen@dizmo.com>) and Markus Leutwyler (<mleutwyler@dizmo.com>) from Dizmo, who worked hard with us providing everything we needed to create a fantastic user interface.

# Hardware

![Individual soil moisture probe](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/hardware.jpg)

For this project, we relied on the following parts:

- [Raspberry Pi](https://www.raspberrypi.org/) model B, with GPIO header break out.
- Weather Station, including both wind speed and direction sensors and a rain gauge.
- [DHT22](https://hackaday.com/tag/dht22/) temperature and humidity sensor.
- [BMP180](https://hackaday.com/tag/bmp180/) temperature and pressure sensor.
- [Arduino](https://www.arduino.cc/) Pro Mini, Arduino Leonardo and several [soil moisture sensors](https://en.wikipedia.org/wiki/Soil_moisture_sensor).
- Breadboards, jumper wires and resistors.
- Servo motor, empty bottle and cardboard for the irrigation system.
- Four wooden boxes, moss, and a *[Thymus vulgaris](https://species.wikimedia.org/wiki/Thymus_vulgaris)* plant would complete the setup.


## Sparkfun Wishlist

This list can be used as a reference for the electronic components used in our project. Notice that the Raspberry Pi has been upgraded to model 2, as model B has been discontinued.

Link to the wishlist: [https://www.sparkfun.com/wish_lists/118213](https://www.sparkfun.com/wish_lists/118213)

### Individual part numbers

> DEV-11546, DEV-09873, PRT-11980, SEN-08942, SEN-10167, SEN-11824, SEN-13322, DEV-11114, DEV-11286, COM-10969, ROB-11882, KIT-12652, PRT-12046, WRL-13678, PRT-09567, PRT-12796, PRT-12794, PRT-12795.


# Software

![Weather station dizmos](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/software.jpg)
![Weather station desktop](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/screenshot.jpg)

For the Raspberry Pi, we used [Raspbian](https://www.raspbian.org/) operating system. 

We compiled [Node.js](https://nodejs.org/en/) runtime and installed [Node-RED](http://nodered.org/) workflow tool, to deliver sensor data through [IBM Bluemix IoTF](https://www.ibm.com/cloud-computing/bluemix/solutions/iot/) MQTT Broker.

However, some technical difficulties prevented Node-RED to stablish a stable connection to Bluemix, and we had to failover to [Mosquitto](http://mosquitto.org/) MQTT test server.

We wrote some Python scripts based on [Adafruid Industries](https://github.com/adafruit) libraries that read data from the weather station sensors and broadcast them through MQTT.

For the soil probes, we connected a moisture sensor to an Arduino Pro Mini, and then sent all data through an [ESP8266 WiFi module](http://hackaday.com/2015/09/24/hackaday-dictionary-the-esp8266/).

To make things easier, we flashed the ESP8266 module with [NodeMCU firmware](http://nodemcu.com/), providing an environment that allowed us to develop WiFi related routines using Lua programming language.

An Arduino Leonardo read another moisture probe, activating a servo motor that pushed up a water bottle to perform the irrigation process:

![Irrigation process based on moisture](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/irrigation.gif)

The Crop Squares grafical user interface was implemented using a touch screen interface running **[Dizmo](https://www.dizmo.com/developers/)** software to show the measurements collected by the sensors. The first thing displayed in this interface is a map of the crop field.

Rectangles asigned to each soil sensor change their color depending on moisture levels (green, yellow and red). 

They could also be selected to display the weather station results for that area in real time. During the demo version we show real time data from our weather station with its sensors connected to the Raspberri Pi. 

We performed variations in soil moisture level by watering some plants, so the color of the first area was updated in real time too. 

## Future improvements

IBM Watson would eventually help us to interact with the information and make decisions through the **Dialog** and **Question and Answer** services, with voice input/output through **Speech-to-Text** and **Text-to-Speech**.

**Visual Recognition** would allow Bluemix to recognize the different users and also identify posible threats to crops through the cameras located around the crops. 

The readings from the sensors were delivered to **Bluemix** through the **IoT Foundation**.  

Bluemix then would both store and receive data from related sources as the Spanish Weather Service or farming databases. 

This would allow **IBM Watson Analytics** to determine the optimal moment to irrigate, the ideal quantities of water to use and any additional risks to the crops such as excessive temperature, heavy winds or over watering. 

An eventual farmer would be helped by this data in his decision making.


# The prototype

![Fully functional prototype](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/the_prototype.jpg)

For the assembly of the prototype, we used four wooden boxes available at [IE's Area 31](http://www.ie.edu/entrepreneurship/the-ecosystem/spaces/area-31) assembled like a [rotated Tetris L-Block](http://mathworld.wolfram.com/L-Polyomino.html).

We mounted the weather station on top of two stacked boxes, connecting the Rapsi,  breadboards, Arduinos and servos inside the lower one.

A couple of empty plastic bottles were placed under the rain gauge to collect water. 

An impromptu rain gutter deliverd water from a plastic bottle actuated by a servo, watering three plants placed on the lower two boxed.

Thos plants had moisture sensors that both activated the servo and sent data to the MQTT broker to be suscribed by the Dizmo app.

As a gimmick, we outputted a rain and thunderstorm recording though Raspi's audio jack when the rain gauge activated, to add some special effects during the presentation.

# The pitch

![Crop Squares team in front of the jury](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/the_pitch.jpg)

The jury was formed by **Jorge Arévalo**, Software Developer from [Reclamador](https://www.reclamador.es/), **Enrique Martín**, Innovarion Director for Business from Vodafone, **Álvaro Everlet**, CTO from [Carriots](https://www.carriots.com/) and **Elisa Martín Garijo**, Director of Technology and Innovation from IBM Spain, Portugal, Greece and Israel.

We experienced some technical difficulties that prevented us from showing the Dizmo UI, sorting it out by using our slides and the actual display of the rig.

We were asked questions regarding possible uses and market differentiation before finishing out our pitch.

# Awards

We won two out of five possible awards, receiving an Acer touch screen, a perpetual Dizmo license for each team member and six bottles of champagne.

## Dizmo "Best Integration of Dizmo Award"
![Best integration of Dizmo award](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/award_1.jpg)

## IBM "Best Pitch Award"
![Best pitch award](https://raw.githubusercontent.com/fauria/crop-squares/master/pictures/award_2.jpg)

Overall, the experience was trully rewarding, and we hope to have the chance to participate in the next edition of Future Hacks.

# Coverage

> October 13th, 2015

### Video: [IBM Futurehacks just a view minutes before final presentation](https://www.youtube.com/watch?v=8ggzHbDdlDE)

> October 15th, 2015

### Article: [Making IoT tech “farmer-friendly” with dizmo](https://www.dizmo.com/making-iot-tech-farmer-friendly-with-dizmo/)

> November 17th, 2015

### Article: [Optimizing Crop Yield With IoT](http://hackaday.com/2015/11/16/optimizing-crop-yield-with-iot/)
