import os
import psycopg2
from db_config import get_db_connection

# Karena file ini ada di dalam folder backend, dan folder knowledge_base 
# juga ada di dalam backend, kita pakai "./" (folder saat ini)
KNOWLEDGE_BASE_DIR = "./knowledge_base"

def migrate_documents_to_db():
    conn = get_db_connection()
    if not conn:
        print("Gagal konek ke database. Cek .env kamu.")
        return

    cur = conn.cursor()
    
    # Bersihkan tabel lama jika perlu (Opsional, agar tidak duplikat saat testing)
    cur.execute("TRUNCATE TABLE knowledge_base RESTART IDENTITY;")

    # Looping membaca folder per divisi
    if not os.path.exists(KNOWLEDGE_BASE_DIR):
        print(f"Folder {KNOWLEDGE_BASE_DIR} tidak ditemukan!")
        return

    for division in os.listdir(KNOWLEDGE_BASE_DIR):
        div_path = os.path.join(KNOWLEDGE_BASE_DIR, division)
        
        if os.path.isdir(div_path):
            print(f"Memproses divisi: {division}")
            for filename in os.listdir(div_path):
                if filename.endswith(".md"):
                    file_path = os.path.join(div_path, filename)
                    
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Insert ke PostgreSQL
                    cur.execute(
                        "INSERT INTO knowledge_base (division, file_name, content) VALUES (%s, %s, %s)",
                        (division, filename, content)
                    )
                    print(f"  -> Berhasil migrasi: {filename}")

    conn.commit()
    cur.close()
    conn.close()
    print("Migrasi selesai! Data SOP sudah masuk ke PostgreSQL.")

if __name__ == "__main__":
    migrate_documents_to_db()