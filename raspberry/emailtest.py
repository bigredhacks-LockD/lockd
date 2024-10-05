import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def sendSuspicions(recipients: list[str]):
    sender_email = "beluga.sturgeon.financial@gmail.com"
    password = "zrub mjqj xsew yoho"

    # Plain text and HTML version of the email
    text = """\
    Suspicious activity has been detected at the lock."""
    html = """\
    <html>
    <body>
        <p>Suspicious activity has been detected at the lock.</p>
    </body>
    </html>
    """

    # Send the email via Gmail's SMTP server
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, password)

            for recipient in recipients:
                # Create a new message for each recipient
                message = MIMEMultipart("alternative")
                message["Subject"] = "Suspicious Activity Detected"
                message["From"] = sender_email
                message["To"] = recipient  # Set the To header for the current recipient

                # Attach parts into the message
                part1 = MIMEText(text, "plain")
                part2 = MIMEText(html, "html")
                message.attach(part1)
                message.attach(part2)

                server.sendmail(sender_email, recipient, message.as_string())  # Send email
            print("Alert email sent!")
    except Exception as e:
        print(f"Error sending email: {e}")

if __name__ == "__main__":
    recipients = ["geneustace.wicaksono@gmail.com", "taiying9627@gmail.com"]
    sendSuspicions(recipients)
