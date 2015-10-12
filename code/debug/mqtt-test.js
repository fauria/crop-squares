var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');

// Generate random wind data
function getWind(){
	return JSON.stringify({
		speed: Math.floor(Math.random() * 99) + 9,
		direction: Math.floor(Math.random() * 359) + 0
	});	
}

// Generate random dht22 data
function getDHT22(){
	return JSON.stringify({
		temperature: Math.floor(Math.random() * 33) + 22,
		humidity: Math.floor(Math.random() * 75) + 10
	});	
}

// Generate random bmp180 data
function getBMP180(){
	return JSON.stringify({
		'sealevel_pressure': Math.floor(Math.random() * 1000000) + 900000,
		pressure: Math.floor(Math.random() * 1000000) + 900000,
		altitude: Math.floor(Math.random() * 900) + 100,
		temperature: Math.floor(Math.random() * 33) + 22
	});	
}

// Publish to Moquitto
function sendWind(payload){
	setTimeout(function(){		
		client.publish('00e04c81aaca-wind', payload);						
		console.log('ok wind '+payload);
		sendWind(getWind());
	}, Math.floor(Math.random() * 3000) + 1000 );
}

function sendBMP180(payload){
	setTimeout(function(){		
		client.publish('00e04c81aaca-bmp180', payload);						
		console.log('ok bmp180 '+payload);
		sendBMP180(getBMP180());
	}, Math.floor(Math.random() * 3500) + 1500 );
}

function sendDHT22(payload){
	setTimeout(function(){		
		client.publish('00e04c81aaca-dht22', payload);						
		console.log('ok dht22 '+payload);
		sendDHT22(getDHT22());
	}, Math.floor(Math.random() * 4000) + 2000);
}

// Subscribe to the weather station and soil moisture topics.
client.on('connect', function () {
  client.subscribe('18fe34fc04de-soil');
  client.subscribe('00e04c81aaca-wind');
  client.subscribe('00e04c81aaca-rain');
  client.subscribe('00e04c81aaca-bmp180');
  client.subscribe('00e04c81aaca-dht22');

  /*
  	Stop sending random data.
  	sendWind(getWind());
  	sendBMP180(getBMP180());
  	sendDHT22(getDHT22());
  */

});

client.on('message', function (topic, message) {	
	console.log(message.toString());
});