from flask import Flask, jsonify
from lock import Lock
from servocontroller import ServoController
from KY037 import SoundSensor  # Assuming you have this
from KY002 import ShockSensor  # Assuming you have this
import threading
import time


app = Flask(__name__)

# Initialize your sensors and lock
servo_controller = ServoController()
sound_sensor = SoundSensor(pin=4)  # Replace with actual pin
shock_sensor = ShockSensor(pin=17)  # Replace with actual pin

# Create a Lock object
lock:Lock = None


@app.route('/')
def index():
    return jsonify({"status": "GO TO A REAL PAGE"})


@app.route('/lock', methods=['GET'])
def lock_the_lock():
    lock.lock()
    return jsonify({"status": "Lock is locked!"})


@app.route('/unlock', methods=['GET'])
def unlock_the_lock():
    lock.unlock()
    return jsonify({"status": "Lock is unlocked!"})


@app.route('/sus', methods=['GET'])
def check_suspicious_activity():
    print(lock.suspicious_activity_flag)
    if lock.suspicious_activity_flag:
        return jsonify({"status": "SUS"})
    else:
        return jsonify({"status": ""})


if __name__ == "__main__":
    # Create the lock object
    lock = Lock(controller=servo_controller, sound_sensor=sound_sensor, shock_sensor=shock_sensor)

    # Start the alert thread to monitor suspicious activity
    lock.start_alert_thread()

    # Run the Flask server on Raspberry Pi (port 5000 by default)
    try:
        app.run(host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("Shutting down server.")
        lock.stop_alert_thread()
        sound_sensor.cleanup()
        shock_sensor.cleanup()