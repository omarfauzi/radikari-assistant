from db_config import get_db_connection

def create_tables():
    conn = get_db_connection()
    if not conn: return
    
    cur = conn.cursor()
    # Membuat tabel untuk SOP, Approval, dan Audit
    cur.execute("""
        CREATE TABLE IF NOT EXISTS knowledge_base (
            id SERIAL PRIMARY KEY,
            division VARCHAR(50) NOT NULL,
            file_name VARCHAR(255) NOT NULL,
            content TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS action_approvals (
            id SERIAL PRIMARY KEY,
            division VARCHAR(50) NOT NULL,
            action_type VARCHAR(50) NOT NULL,
            payload JSONB NOT NULL,
            status VARCHAR(20) DEFAULT 'pending',
            ai_reasoning TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS audit_logs (
            id SERIAL PRIMARY KEY,
            user_identity VARCHAR(100),
            action_description TEXT NOT NULL,
            division VARCHAR(50),
            severity VARCHAR(20) DEFAULT 'INFO',
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    
    conn.commit()
    cur.close()
    conn.close()
    print("✅ Semua tabel berhasil dibuat di PostgreSQL!")

if __name__ == "__main__":
    create_tables()