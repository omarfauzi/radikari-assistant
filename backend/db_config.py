import psycopg2
import os
from dotenv import load_dotenv

# Memastikan Python mencari file .env di folder tempat skrip ini berada
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST", "127.0.0.1"),
            database=os.getenv("DB_NAME", "radikari_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASS"), # Sekarang mengambil dari .env
            port=os.getenv("DB_PORT", "5433")
        )
        return conn
    except Exception as e:
        print(f"Gagal konek ke Postgres: {e}")
        return None