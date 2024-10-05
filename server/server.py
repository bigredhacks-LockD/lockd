from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/simulate-breakin', methods=['GET'])
def simulate_breakin():
    subprocess.run(['python', 'email-script.py'], check=True)
    print("Simulating break-in...")
    return jsonify({"status": "Break-in simulation started!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
