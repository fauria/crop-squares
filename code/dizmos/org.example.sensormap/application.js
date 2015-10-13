// If your dizmo has a back side, include this function. Otherwise you
// can delete it!
function showBack() {
    dizmo.showBack();
}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
	dizmo.setAttribute('settings/usercontrols/allowresize',true);
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {
        dizmo.showFront();
    };

var location={};
location.hostname="test.mosquitto.org";
location.port="8080";


// Create a client instance
client = new Paho.MQTT.Client(location.hostname, Number(location.port), "dizmo_sensorMap");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("18fe34fc04de-soil");
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
  var s=data.sensor;
  var v=data.value;
  if (s==1) {
  	if (v>=0 && v<=400) r1.setStyle({color:"green"});
  	if (v>400 && v<=800) r1.setStyle({color:"yellow"});
  	if (v>800 && v<=1023) r1.setStyle({color:"red"});
  }
}

});
