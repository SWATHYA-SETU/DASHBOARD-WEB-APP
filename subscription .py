from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import json
from datetime import datetime
import os

app = Flask(__name__)

# Email configuration
EMAIL_ADDRESS = "codertrio@gmail.com"
EMAIL_PASSWORD = "your-app-specific-password"  # Replace with your app-specific password
JSON_FILE = 'subscribers.json'

# Initialize JSON file if it doesn't exist
def init_json_file():
    if not os.path.exists(JSON_FILE):
        with open(JSON_FILE, 'w') as f:
            json.dump({"subscribers": []}, f)

def load_subscribers():
    try:
        with open(JSON_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"subscribers": []}

def save_subscribers(data):
    with open(JSON_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def send_email(to_email, subject, body, pdf_path=None):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(body, 'html'))
    
    if pdf_path:
        with open(pdf_path, 'rb') as f:
            pdf_attachment = MIMEApplication(f.read(), _subtype='pdf')
            pdf_attachment.add_header('Content-Disposition', 'attachment', filename=os.path.basename(pdf_path))
            msg.attach(pdf_attachment)
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    subscribers_data = load_subscribers()
    
    # Check if email already exists
    if any(sub['email'] == email for sub in subscribers_data['subscribers']):
        return jsonify({'error': 'Email already subscribed'}), 400
    
    # Add new subscriber
    new_subscriber = {
        'email': email,
        'subscribed_date': datetime.now().isoformat(),
        'last_report_date': None
    }
    subscribers_data['subscribers'].append(new_subscriber)
    save_subscribers(subscribers_data)
    
    # Send welcome email
    welcome_html = """
    <h2>Welcome to Swasthya Setu!</h2>
    <p>Thank you for subscribing to our health reports. You'll receive regular updates 
    and health insights directly to your inbox.</p>
    <p>Stay healthy!</p>
    """
    try:
        send_email(email, "Welcome to Swasthya Setu", welcome_html)
    except Exception as e:
        print(f"Error sending welcome email: {e}")
        # Still return success as the subscription was saved
    
    return jsonify({'message': 'Successfully subscribed'}), 200

@app.route('/send_report', methods=['POST'])
def send_report():
    data = request.get_json()
    pdf_path = data.get('pdf_path')
    
    if not pdf_path:
        return jsonify({'error': 'PDF path is required'}), 400
    
    subscribers_data = load_subscribers()
    success_count = 0
    
    for subscriber in subscribers_data['subscribers']:
        try:
            send_email(
                subscriber['email'],
                "Your Swasthya Setu Health Report",
                "Please find your health report attached.",
                pdf_path
            )
            subscriber['last_report_date'] = datetime.now().isoformat()
            success_count += 1
        except Exception as e:
            print(f"Error sending report to {subscriber['email']}: {e}")
    
    save_subscribers(subscribers_data)
    return jsonify({'message': f'Report sent to {success_count} subscribers'}), 200

@app.route('/unsubscribe', methods=['POST'])
def unsubscribe():
    data = request.get_json()
    email = data.get('email')
    
    subscribers_data = load_subscribers()
    
    # Remove subscriber if found
    initial_count = len(subscribers_data['subscribers'])
    subscribers_data['subscribers'] = [
        sub for sub in subscribers_data['subscribers'] 
        if sub['email'] != email
    ]
    
    if len(subscribers_data['subscribers']) < initial_count:
        save_subscribers(subscribers_data)
        return jsonify({'message': 'Successfully unsubscribed'}), 200
    return jsonify({'error': 'Email not found'}), 404

@app.route('/subscribers', methods=['GET'])
def get_subscribers():
    subscribers_data = load_subscribers()
    return jsonify(subscribers_data), 200

# Simple frontend HTML
@app.route('/')
def home():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Swasthya Setu Subscription</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .form-group { margin: 20px 0; }
            input[type="email"] { padding: 8px; width: 300px; }
            button { padding: 8px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer; }
            button:hover { background-color: #45a049; }
        </style>
    </head>
    <body>
        <h1>Swasthya Setu Newsletter</h1>
        <div class="form-group">
            <input type="email" id="email" placeholder="Enter your email">
            <button onclick="subscribe()">Subscribe</button>
        </div>
        <script>
            function subscribe() {
                const email = document.getElementById('email').value;
                fetch('/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: email})
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message || data.error);
                    if (!data.error) {
                        document.getElementById('email').value = '';
                    }
                })
                .catch(error => alert('Error: ' + error));
            }
        </script>
    </body>
    </html>
    """

if __name__ == '__main__':
    init_json_file()
    app.run(debug=True)