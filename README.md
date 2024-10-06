# BigRedHacks 2024 Finalist, Best Beginner Hack
Project we built for BigRedHacks. It is motorized smart lock system with remote control and break-in detection, built with Raspberry Pi and a Servo.
You can lock and unlock the system using the app. In addition, you are able to form groups by inviting other users. Whenever a break-in or suspicious activity is detected, a push notification along with an email is sent to everyone in the group.
The app controlling the lock was scaffolded using React Native with Expo on the frontend, and Flask for the backend. 
The Pi hosts a web server with various API endpoints controlling the different functions of the lock, such as locking/unlocking and alerting users. The app then sends requests to those endpoings to send and receive state updates to the lock.

