#!/usr/bin/python
import Adafruit_BMP.BMP085 as BMP085
import json 

readings = {
	"temperature": None,
	"pressure": None,
	"altitude": None,
	"sealevel_pressure": None 
}
try:
	sensor = BMP085.BMP085()
	readings["temperature"] = sensor.read_temperature();
	readings["pressure"] = sensor.read_pressure();
	readings["altitude"] = sensor.read_altitude();
	readings["sealevel_pressure"] = sensor.read_sealevel_pressure();
except:
	pass

print json.dumps(readings)
