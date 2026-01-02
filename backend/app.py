import os
import psycopg2
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


DB_HOST = os.getenv("DB_HOST", "db")
DB_NAME = os.getenv("POSTGRES_DB", "appdb")
DB_USER = os.getenv("POSTGRES_USER", "admin")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "admin123")


def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )


@app.route("/health")
def health():
    return jsonify({"status": "ok"})



def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            course TEXT NOT NULL
        )
    """)
    conn.commit()
    cur.close()
    conn.close()



@app.route("/data", methods=["GET"])
def get_data():
    conn = get_db_connection()
    cur = conn.cursor()

    
    cur.execute("SELECT id, name, course FROM students ORDER BY id")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    data = [
        {"id": r[0], "name": r[1], "course": r[2]}
        for r in rows
    ]
    return jsonify(data)



@app.route("/add", methods=["POST"])
def add_data():
    try:
        body = request.get_json()
        name = body.get("name")
        course = body.get("course")

        if not name or not course:
            return jsonify({"error": "Missing fields"}), 400

        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            "INSERT INTO students (name, course) VALUES (%s, %s)",
            (name, course)
        )

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Data inserted successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/update/<int:id>", methods=["PUT"])
def update_data(id):
    try:
        body = request.get_json()
        name = body.get("name")
        course = body.get("course")

        if not name or not course:
            return jsonify({"error": "Missing fields"}), 400

        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            "UPDATE students SET name=%s, course=%s WHERE id=%s",
            (name, course, id)
        )

        if cur.rowcount == 0:
            cur.close()
            conn.close()
            return jsonify({"error": "Record not found"}), 404

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Data updated successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_data(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("DELETE FROM students WHERE id=%s", (id,))

        if cur.rowcount == 0:
            cur.close()
            conn.close()
            return jsonify({"error": "Record not found"}), 404

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Data deleted successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    init_db()   
    app.run(host="0.0.0.0", port=5000, debug=True)
