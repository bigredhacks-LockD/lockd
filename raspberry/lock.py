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

        # Flags and timers
        self.sound_flag = False
        self.shock_flag = False
        self.suspicious_activity_flag = False

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

    def activate_flag(self, flag_name: str, duration: int):
        """Helper function to activate a flag for a certain duration."""
        setattr(self, flag_name, True)
        time.sleep(duration)
        setattr(self, flag_name, False)

    def check_sensors(self):
        """Check if sound or shock sensors detect activity and handle the flags."""
        sound_detected = self.sound_sensor.detect_sound()
        shock_detected = self.shock_sensor.shock_detected

        # Activate sound flag for 3 seconds if sound is detected
        if sound_detected and not self.sound_flag:
            threading.Thread(target=self.activate_flag, args=("sound_flag", 3)).start()

        # Activate shock flag for 3 seconds if shock is detected
        if shock_detected and not self.shock_flag:
            threading.Thread(target=self.activate_flag, args=("shock_flag", 3)).start()
            self.shock_sensor.clear_shock_flag()  # Clear shock flag after detecting

        # Check if both sound and shock flags are active, activate suspicious activity flag for 5 seconds
        if self.sound_flag and self.shock_flag and not self.suspicious_activity_flag:
            print("Suspicious activity detected: Both sound and shock sensors triggered!")
            threading.Thread(target=self.activate_flag, args=("suspicious_activity_flag", 5)).start()

    def alert_suspicious_activity(self):
        """Run in a thread to constantly monitor sensors."""
        while self.thread_running:
            self.check_sensors()
            time.sleep(0.1)  # Slight delay to reduce CPU usage

    def start_alert_thread(self):
        self.thread_running = True
        self.alert_thread = threading.Thread(target=self.alert_suspicious_activity)
        self.alert_thread.start()

    def stop_alert_thread(self):
        self.thread_running = False
        self.alert_thread.join()  # Wait for the thread to finish