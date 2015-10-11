var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');



function getWind(){
	return JSON.stringify({
		speed: Math.floor(Math.random() * 99) + 9,
		direction: Math.floor(Math.random() * 359) + 0
	});	
}

function getDHT22(){
	return JSON.stringify({
		temperature: Math.floor(Math.random() * 33) + 22,
		humidity: Math.floor(Math.random() * 75) + 10
	});	
}

function getBMP180(){
	return JSON.stringify({
		'sealevel_pressure': Math.floor(Math.random() * 1000000) + 900000,
		pressure: Math.floor(Math.random() * 1000000) + 900000,
		altitude: Math.floor(Math.random() * 900) + 100,
		temperature: Math.floor(Math.random() * 33) + 22
	});	
}

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

client.on('connect', function () {
  client.subscribe('18fe34fc04de-soil');
  client.subscribe('00e04c81aaca-wind');
  client.subscribe('00e04c81aaca-rain');
  client.subscribe('00e04c81aaca-bmp180');
  client.subscribe('00e04c81aaca-dht22');
  //sendWind(getWind());
  //sendBMP180(getBMP180());
  //sendDHT22(getDHT22());
});

client.on('message', function (topic, message) {	
	console.log(message.toString());
});

/*

wlan0     Link encap:Ethernet  HWaddr 00:e0:4c:81:aa:ca  
          inet addr:192.168.0.23  Bcast:192.168.0.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:143 errors:0 dropped:0 overruns:0 frame:0
          TX packets:44 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:18491 (18.0 KiB)  TX bytes:6775 (6.6 KiB)
*/