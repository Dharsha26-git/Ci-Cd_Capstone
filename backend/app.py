
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)   # 👈 THIS LINE IS IMPORTANT

@app.route("/")
def home():
    return jsonify({"message": "Backend is running"})

@app.route("/health")
def health():
    return jsonify({"status": "UP"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
