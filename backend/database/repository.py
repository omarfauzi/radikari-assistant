from db_config import get_db_connection
import json

class Repository:
    # --- Step 3: Context Assembly (RAG) ---
    @staticmethod
    def get_knowledge_by_division(division):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT content FROM knowledge_base WHERE division = %s", (division,))
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return [row[0] for row in rows]

    # --- Step 6: Permission Layer (Pending Approval) ---
    @staticmethod
    def create_approval_request(division, action_type, payload, reasoning):
        conn = get_db_connection()
        cur = conn.cursor()
        query = """
            INSERT INTO action_approvals (division, action_type, payload, ai_reasoning, status)
            VALUES (%s, %s, %s, %s, 'pending') RETURNING id;
        """
        cur.execute(query, (division, action_type, json.dumps(payload), reasoning))
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return new_id

    # --- Step 8: Update Audit Log ---
    @staticmethod
    def add_audit_log(user_identity, action, division, severity="INFO"):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO audit_logs (user_identity, action_description, division, severity) VALUES (%s, %s, %s, %s)",
            (user_identity, action, division, severity)
        )
        conn.commit()
        cur.close()
        conn.close()