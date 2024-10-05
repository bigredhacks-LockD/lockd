
import RPi.GPIO as GPIO
KY002 = 7

GPIO.setup(KY002, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while 1:
    vibrations = GPIO.input(KY002)


    print(vibrations)
