import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



def sendSuspicions(recipients:list[str]):
    sender_email = "beluga.sturgeon.financial@gmail.com"
    password = "zrub mjqj xsew yoho"

    message = MIMEMultipart("alternative")
    message["Subject"] = "Suspicious Activity Detected"
    message["From"] = sender_email

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

    # Attach parts into the message
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)

    # Send the email via Gmail's SMTP server
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, password)

            for recipient in recipients:
                message["To"] = recipient
                server.sendmail(sender_email, recipient, message.as_string())
            print("Alert email sent!")
    except Exception as e:
        print(f"Error sending email: {e}")



if __name__ == "__main__":
    recipients = ["geneustace.wicaksono@gmail.com"]
    sendSuspicions(recipients)