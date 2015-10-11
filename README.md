# Crop Squares

The Project consists of an **Intelligent Weather Station** that will improve agricultural methods by continuously reading sensor data and automatically providing data to make the irrigation process more efficient.

The Crop Square environment consists of the following **sensors**:

- BMP 180: Pressure, Sea level pressure, Altitude, Temperature
- DHT 22: Humidity, Temperature
-	Soil Moisture Sensor v1.4
-	Wind direction sensor
-	Wind speed sensor
-   Rain Gauge sensor


These sensors will be connected through the following **devices**:

-	Raspberry Pi
-	Arduino Pro/Leonardo

For demo purposes, we will also use a **Servo engine** to simulate rain on the system.

Connection to the devices on the filed will be carried out wirelessly through a **Vodafone B970 modem**.

Plastic elements of the system such as the Wind direction, Wind speed and Rain gauge sensors will be built by our team with a **BQ Prusa i3 3D printer**.


The Crop Square environment has a touch interface through **Dizmo** to show the measurements collected by the sensors. The first thing that appears in this interface is a map of the crop field. The little rectangulars asigned to each soil sensor change their color depending on moisture levels (green, yellow and red). They can also be selected to see the meterological station results for that area in real time.  During the demo version we show real time data from a specific meterological station where sensors are connected to a Raspberri Pi. The proptotype also has soil sensors buried in the land and connected to an Arduino and to the water system. We also vary the soil moisture level watering some plants, so the color of the first area will be updated in real time too. 

IBM Watson will help interact with the information and make decisions through the **Dialog** and **Question and Answer** services, with voice input/output through **Speech-to-Text** and **Text-to-Speech**. **Visual Recognition** will allow Bluemix to recognize the different users and also identify posible threats to crops through the cameras located around the crops. 

The readings from the sensors will be delivered to **Bluemix** through the **IoT Foundation**.  Bluemix will store all historical data on a **Database** and will also receive external data from related sources as the Spanish Weather Service and farming databases. This data will allow **IBM Watson Analytics** to determine the optimal moments to irrigate, the ideal quantities of water to use and any additional risks to the crops such as too much temperature, heavy winds, too much water, etc. These warning will help the farmer take the adequate measures.




