#!/usr/bin/python
import spidev
import json
from intervals import IntInterval
 
input_voltage = 5.0
external_resistor = 10000
windrose = {}

spi = spidev.SpiDev()
spi.open(0,0)

readings = {
	"windvane": None
}
degrees = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5]
resistors = [33000, 6570, 8200, 891, 1000, 688, 2200, 1410, 3900, 3140, 16000, 14120, 120000, 42120, 64900, 21880]
outputs = []
windrose = {}

# Acts as a voltage divider:
for resistor in resistors:	
 	voltage = (input_voltage * resistor) / (resistor + external_resistor)
 	outputs.append(int( round (( voltage *  1024 ) / input_voltage)))

lookup_degrees = dict(zip(outputs, degrees))

outputs = sorted(outputs)

for idx, output in enumerate(outputs):
	if( idx == 0 ):
		min_val = 0
		max_val = output + ((outputs[idx+1] - output) / 2) - 1						
	elif( idx == len(outputs)-1 ):
		min_val = max_val + 1
		max_val = 1023
	else:
		min_val = max_val + 1
		max_val = output + ((outputs[idx+1] - output) / 2) - 1	
	windrose[lookup_degrees[output]] = IntInterval([min_val, max_val])

def get_direction(output):
    for direction in windrose:
        if(output in windrose[direction]):
            return direction
    return None

def read_spi(channel):
    spidata = spi.xfer2([96,0])
    data = ((spidata[0] & 3) << 8) + spidata[1]
    return data
 
channeldata = read_spi(0)
readings["windvane"] = get_direction(channeldata)
print (json.dumps(readings)+"\n")
