from flask import Flask, jsonify, request
import subprocess
import csv
import os


app = Flask(__name__)

#path to recipients csv file
RECIPIENTS_LIST = "recipients.csv"

# Initialize the CSV file with headers if it doesn't exist
if not os.path.exists(RECIPIENTS_LIST):
    with open(RECIPIENTS_LIST, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['email', 'dorm', 'room'])

@app.route('/simulate-breakin', methods=['POST'])
def simulate_breakin():
    # run the python script
    subprocess.run(['python', 'email-script.py'], check=True)
    
    print("Simulating break-in...")
    return jsonify({"status": "Break-in simulation started!"})


# Route for adding a recipient to the CSV
@app.route('/add-recipient', methods=['POST'])
def add_recipient():
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    dorm = data.get('dorm')
    room = data.get('room')
    
    if not email or not dorm or not room:
        return jsonify({"error": "Missing email, dorm, or room fields"}), 400

    # Append the recipient data to the CSV file
    try:
        with open(RECIPIENTS_LIST, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([name, email, dorm, room])
        
        print(f"Added recipient: {email}, Dorm: {dorm}, Room: {room}")
        return jsonify({"status": "Recipient added successfully!"}), 200
    except Exception as e:
        print(f"Error adding recipient: {e}")
        return jsonify({"error": "Failed to add recipient"}), 500


# Route to list all recipients (optional for testing or viewing)
@app.route('/list-recipients', methods=['GET'])
def list_recipients():
    try:
        recipients = []
        with open(RECIPIENTS_LIST, mode='r') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header row
            for row in reader:
                recipients.append({"name": row[0], "email": row[1], "dorm": row[2], "room": row[3]})
        return jsonify({"recipients": recipients}), 200

    except Exception as e:
        print(f"Error reading recipients: {e}")
        return jsonify({"error": "Failed to read recipients"}), 500
    
# #Route to remove recipient
@app.route('/remove-recipient', methods=['DELETE'])
def remove_recipient():
    email_to_remove = request.json.get('email')  # Get email from request
    if not email_to_remove:
        return jsonify({"error": "Email is required"}), 400

    updated_recipients = []
    try:
        # Read the current recipients from the CSV file
        with open(RECIPIENTS_LIST, mode='r') as file:
            reader = csv.reader(file)
            header = next(reader)  # Store header row
            for row in reader:
                # Check if the current email matches the email to remove
                if row[1] != email_to_remove:  # row[1] is the email column
                    updated_recipients.append(row)

    except Exception as e:
        print(f"Error reading recipients: {e}")
        return jsonify({"error": "Failed to read recipients"}), 500

    # Write the updated recipients back to the CSV file
    try:
        with open(RECIPIENTS_LIST, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(header)  # Write header
            writer.writerows(updated_recipients)  # Write updated recipients
        return jsonify({"status": "Recipient removed successfully!"}), 200

    except Exception as e:
        print(f"Error writing recipients: {e}")
        return jsonify({"error": "Failed to write recipients"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
