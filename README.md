# BigRed//Hacks 2024 Finalist and Best Beginner Hack

![image](https://github.com/user-attachments/assets/6593ee0b-fce2-41cd-8a36-bb40d980f227)

Project we built for BigRedHacks. We created a motorized smart lock system with remote control and break-in detection, along with an app to go with it. The lock system was built using a Raspberry Pi and a Servo, supported in a 3-D printed case. A shock and sound sensor connected to the Pi was responsible for break-in detection. The app was scaffolded using React Native with Expos for the frontend and Flask for the backend, and connects to a web server hosted by the Pi. By sending requests to various API endpoints from the Pi's web server, the app is able to remotely unlock and lock the system, and monitor for any red flags raised by the detection system. Whenever suspicious activity is detected i.e. the sensors detect activity beyond normal threshold, a push notification and email is sent out to everyone in the group.

