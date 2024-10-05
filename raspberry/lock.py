from servocontroller import ServoController
from KY037 import SoundSensor  # Assuming you have SoundSensor in a separate module
from KY002 import ShockSensor
import time
import threading

class Lock:
    def __init__(self, controller: ServoController, sound_sensor: SoundSensor, shock_sensor: ShockSensor) -> None:
        self.controller = controller
        self.sound_sensor = sound_sensor
        self.shock_sensor = shock_sensor
        self.thread_running = False

    def lock(self):
        self.controller.move_servos({0: 2500})
        time.sleep(2)
        self.rest()

    def unlock(self):
        self.controller.move_servos({0: 500})
        time.sleep(2)
        self.rest()

    def rest(self):
        self.controller.hat.turnOffAllPWM()

    def check_sensors(self):
        """Check if both sound and shock sensors detect activity."""
        sound_detected = self.sound_sensor.detect_sound()
        shock_detected = self.shock_sensor.shock_detected  # Check if the shock sensor detected something

        if sound_detected and shock_detected:
            print("Suspicious activity detected: Sound and Shock sensors triggered!")
            # Reset the shock sensor flag after handling it
            self.shock_sensor.clear_shock_flag()
        elif sound_detected:
            print("Sound detected!")
        elif shock_detected:
            print("Shock detected!")
            # Reset the shock sensor flag
            self.shock_sensor.clear_shock_flag()
        else:
            print("No suspicious activity detected.")

    def alert_suspicious_activity(self):
        """Run in a thread to constantly monitor sensors."""
        while self.thread_running:
            self.check_sensors()
            time.sleep(1)  # Add a small delay between checks

    def start_alert_thread(self):
        self.thread_running = True
        self.alert_thread = threading.Thread(target=self.alert_suspicious_activity)
        self.alert_thread.start()

    def stop_alert_thread(self):
        self.thread_running = False
        self.alert_thread.join()  # Wait for the thread to finish

if __name__ == "__main__":
    try:
        # Create instances of the ServoController, SoundSensor, and ShockSensor
        servo_controller = ServoController()
        sound_sensor = SoundSensor(pin=4)  # Replace with actual pin
        shock_sensor = ShockSensor(pin=17)  # Replace with actual pin

        # Create the Lock object with both sensors
        lock = Lock(controller=servo_controller, sound_sensor=sound_sensor, shock_sensor=shock_sensor)

        # Start the alert thread
        lock.start_alert_thread()

        # Example usage of lock
        lock.lock()
        time.sleep(2)
        lock.unlock()

        # Keep the main thread alive to allow the sensor detection to continue
        while True:
            time.sleep(1)  # Keep the main program running

    except KeyboardInterrupt:
        print("PROGRAM INTERRUPTED. CLEANING UP GPIO")
        lock.stop_alert_thread()  # Stop the alert thread
        sound_sensor.cleanup()
        shock_sensor.cleanup()