import RPi.GPIO as GPIO
import time
import json

contacts = 0
delay = 2
per_contact = 2.4

readings = { 
	"windspeed": None
}

def doCount(arg):
	global contacts
	contacts += 1

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.IN)

GPIO.add_event_detect(23, GPIO.FALLING, callback=doCount)

time.sleep(2);
GPIO.cleanup()

readings["windspeed"] = (contacts * per_contact) / delay

print json.dumps(readings)
