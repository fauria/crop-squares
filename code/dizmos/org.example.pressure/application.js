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

dizmo.privateStorage.subscribeToProperty("doClose",function(a,b,c){if (b=="close") dizmo.close();});

var station=dizmo.publicStorage.getProperty("station");
var topic="00e04c81aaca-bmp180";

dizmo.setAttribute("settings/title","Pressure: "+station);
if (station=='CAC1') var topic="00e04c81aaca-bmp180";
if (station=='CAC2') var topic="random-bmp180";

var location={};

location.hostname="test.mosquitto.org";
location.port="8080";

// Create a client instance
client = new Paho.MQTT.Client(location.hostname, Number(location.port), "dizmo_pressure");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(topic);
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
  var sp=data.sealevel_pressure;
  var p=data.pressure;
  var h=data.altitude;

  document.getElementById("pressure").innerHTML=sp+" hPa"
  document.getElementById("seaLevelPressure").innerHTML=p+" hPa"
  document.getElementById("altitude").innerHTML=h+" m";
}

});
