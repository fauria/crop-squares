// If your dizmo has a back side, include this function. Otherwise you
// can delete it!
function showBack() {
    dizmo.showBack();
}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
var location={};

location.hostname="test.mosquitto.org";
location.port="8080";

var station=dizmo.publicStorage.getProperty("station");
dizmo.setAttribute("settings/title","RainGauge: "+station);


// Create a client instance
client = new Paho.MQTT.Client(location.hostname, Number(location.port), "dizmo_rainGauge");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("00e04c81aaca-rain");
  //message = new Paho.MQTT.Message("Hello");
  //message.destinationName = "/World";
  //client.send(message); 
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  var data=JSON.parse(message.payloadString);
  var r=data.rain;
  var imgsrc="assets/weather-icons/sunny_250.png";
  if (r==0) imgsrc="assets/weather-icons/sunny_250.png";
  if (r>0.2) imgsrc="assets/weather-icons/light_250.png";
  if (r>0.5) imgsrc="assets/weather-icons/heavy_250.png";
  document.getElementById("image").src=imgsrc;
  document.getElementById("text").innerHTML=r+" l/m2";
}

});

