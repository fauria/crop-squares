// If your dizmo has a back side, include this function. Otherwise you
// can delete it!
function showBack() {
    dizmo.showBack();
}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {
        dizmo.showFront();
    };

var location={};

location.hostname="test.mosquitto.org";
location.port="8080";

var station=dizmo.publicStorage.getProperty("station");
dizmo.setAttribute("settings/title","Wind: "+station);

// Create a client instance
client = new Paho.MQTT.Client(location.hostname, Number(location.port), "dizmo_Wind");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("00e04c81aaca-wind");
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
  var data =JSON.parse(message.payloadString);
  var wd = data.windvane;
  var ws = data.windspeed;
  var imgsrc="assets/compass.png";
  
  if (wd) {
    document.getElementById("image").style.webkitTransform = "rotate("+wd+"deg)";
    document.getElementById("windDirection").innerHTML = wd+" º";
  }
  if (ws) {
    document.getElementById("windSpeed").innerHTML = ws+" Km/h";
  }  
}

});