import RPi.GPIO as GPIO
import time

class SoundSensor:
    def __init__(self, pin: int) -> None:
        self.pin = pin
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

    def detect_sound(self) -> bool:
        return GPIO.input(self.pin) == 1

    def cleanup(self) -> None:
        GPIO.cleanup()

    def __del__(self):
        # Ensure GPIO is cleaned up when object is deleted
        self.cleanup()



