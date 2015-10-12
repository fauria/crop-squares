#!/usr/bin/python
import json
import Adafruit_DHT

sensor = Adafruit_DHT.DHT22
pin = 4
readings = {
	"temperature": None,
	"humidity": None
}

try:
	readings["humidity"], readings["temperature"] = Adafruit_DHT.read_retry(sensor, pin, 5, 2)
except:
	pass
print json.dumps(readings)
