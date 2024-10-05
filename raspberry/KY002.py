import RPi.GPIO as GPIO
import time

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
        else:
            # Default callback prints a message
            self.set_callback(self.default_callback)

    def set_callback(self, callback) -> None:
        """Set the callback function for detecting a shock event."""
        GPIO.add_event_detect(self.pin, GPIO.FALLING, callback=self._handle_shock_event, bouncetime=self.bouncetime)

    def _handle_shock_event(self, channel) -> None:
        """Internal method to handle shock detection event."""
        self.shock_detected = True  # Set the flag when shock is detected
        print("Shock detected!")

    def default_callback(self, channel) -> None:
        """Default callback that prints a message."""
        print("Shock detected by default callback!")

    def clear_shock_flag(self):
        """Manually clear the shock detected flag."""
        self.shock_detected = False

    def cleanup(self) -> None:
        """Clean up the GPIO setup."""
        GPIO.cleanup()

    def __del__(self):
        # Ensure cleanup happens when the object is deleted
        self.cleanup()

def main():
    # Pin number where the shock sensor is connected
    SHOCK_SENSOR_PIN = 17

    # Create a ShockSensor object
    shock_sensor = ShockSensor(pin=SHOCK_SENSOR_PIN)

    try:
        print("Testing ShockSensor. Waiting for shocks...")
        while True:
            # Check if shock was detected and clear the flag
            if shock_sensor.shock_detected:
                print("Shock event has been handled.")
                shock_sensor.clear_shock_flag()

            # Sleep to reduce CPU usage
            time.sleep(0.1)

    except KeyboardInterrupt:
        print("Test interrupted. Cleaning up GPIO.")
        shock_sensor.cleanup()

if __name__ == "__main__":
    main()
