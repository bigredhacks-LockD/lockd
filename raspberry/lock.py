from servocontroller import ServoController
from ky037test import SoundSensor  # Assuming you have SoundSensor in a separate module
import time
import threading

class Lock:
    def __init__(self, controller: ServoController, sensor: SoundSensor) -> None:
        self.controller = controller
        self.sensor = sensor
        self.thread_running = False

    def lock(self):
        self.controller.move_servos({0: 2500})
        time.sleep(2)
        self.rest()

    def unlock(self):
        self.controller.move_servos({0: 0})
        time.sleep(2)
        self.rest()

    def rest(self):
        self.controller.hat.turnOffAllPWM()

    def alertSuspiciousActivity(self):
        while self.thread_running:
            if self.sensor.detect_sound():
                print("Suspicious activity: Sound detected!")
            else:
                print("No suspicious activity detected")
            time.sleep(1)  # Reduce CPU usage by adding a small delay between checks

    def start_alert_thread(self):
        self.thread_running = True
        self.alert_thread = threading.Thread(target=self.alertSuspiciousActivity)
        self.alert_thread.start()

    def stop_alert_thread(self):
        self.thread_running = False
        self.alert_thread.join()  # Wait for the thread to finish

if __name__ == "__main__":
    try:
        # Create instances of the ServoController and SoundSensor
        servo_controller = ServoController()
        sound_sensor = SoundSensor(pin=4)

        # Create the Lock object with the sensor
        lock = Lock(controller=servo_controller, sensor=sound_sensor)

        # Start the alert thread
        lock.start_alert_thread()

        # Example usage of lock
        lock.lock()
        time.sleep(2)
        lock.unlock()

        # Keep the main thread alive to allow the sound detection to continue
        while True:
            time.sleep(1)  # Keep the main program running

    except KeyboardInterrupt:
        print("PROGRAM INTERRUPTED. CLEANING UP GPIO")
        lock.stop_alert_thread()  # Stop the alert thread
        sound_sensor.cleanup()
