import RPi.GPIO as GPIO
import time
import json

per_drop = 0.2794
delay = 4
drops = 0

readings = {
	"rain": None
}

def doCount(arg):
	global drops
	drops += 1

GPIO.setmode(GPIO.BCM)
GPIO.setup(24, GPIO.IN)
GPIO.add_event_detect(24, GPIO.FALLING, callback=doCount, bouncetime=300)

time.sleep(delay)
GPIO.cleanup()
readings["rain"] = (drops * per_drop) / delay
print json.dumps(readings)
