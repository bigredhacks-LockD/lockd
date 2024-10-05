
import RPi.GPIO as GPIO
import time
KY002 = 17

GPIO.setmode(GPIO.BCM)


def report(null):
    print("SHOCKED")

GPIO.setup(KY002, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.add_event_detect(KY002, GPIO.FALLING, callback=report, bouncetime=100)


while 1:
    time.sleep(.1)