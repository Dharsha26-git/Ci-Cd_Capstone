
import os
import psycopg2
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)





def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "db"),
        database=os.getenv("POSTGRES_DB", "appdb"),
        user=os.getenv("POSTGRES_USER", "admin"),
        password=os.getenv("POSTGRES_PASSWORD", "admin123")
    )
    return conn

@app.route("/")
def home():
    return jsonify({"message": "Backend with DB running"})

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/init")
def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS test_data (
            id SERIAL PRIMARY KEY,
            name TEXT
        );
    """)
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Table created"})

@app.route("/data")
def data():
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("INSERT INTO test_data (name) VALUES 	('DevOps');")
        conn.commit()

        cur.execute("SELECT * FROM test_data;")
        rows = cur.fetchall()

        cur.close()
        conn.close()
        return jsonify(rows)

    except Exception as e:
        return jsonify({"error": "Database not reachable"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

