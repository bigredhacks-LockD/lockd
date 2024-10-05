import RPi.GPIO as GPIO

class ShockSensor:
    def __init__(self, pin: int, callback=None, bouncetime: int = 100) -> None:
        self.pin = pin
        self.bouncetime = bouncetime
        self.shock_detected = False  # Flag to track shock detection

        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

        # Register the callback function for shock detection
        if callback is not None:
            self.set_callback(callback)

    def set_callback(self, callback) -> None:
        """Set the callback function for detecting a shock event."""
        GPIO.add_event_detect(self.pin, GPIO.FALLING, callback=self._handle_shock_event, bouncetime=self.bouncetime)

    def _handle_shock_event(self, channel) -> None:
        """Internal method to handle shock detection event."""
        self.shock_detected = True  # Set the flag when shock is detected

    def clear_shock_flag(self):
        """Manually clear the shock detected flag."""
        self.shock_detected = False

    def cleanup(self) -> None:
        """Clean up the GPIO setup."""
        GPIO.cleanup()

    def __del__(self):
        # Ensure cleanup happens when the object is deleted
        self.cleanup()
