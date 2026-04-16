from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

from core.ai_client import ask_deepseek
from db_config import get_db_connection
from database.repository import Repository
import schemas
from core.rag_engine import assemble_context

app = FastAPI()

# Menambahkan port 5173 (bawaan Vite) agar frontend React bisa terkoneksi
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:5173", 
        "http://127.0.0.1:5173"
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat_with_ai(request: schemas.ChatRequest):
    try:
        # 1. Merakit Konteks dari Database PostgreSQL
        prompt_with_context = assemble_context(request.divisi, request.message)
        
        if not prompt_with_context:
            return {"reply": f"Maaf, dokumen SOP untuk divisi {request.divisi} belum tersedia di database."}

        # 2. Mengirim ke OpenClaw (DeepSeek)
        ai_response = ask_deepseek(prompt_with_context)
        
        # 3. Mengembalikan Jawaban Asli dari AI ke Pengguna
        return {
            "reply": ai_response,
            "status": "success"
        }

    except Exception as e:
        return {"error": f"Gagal memproses AI: {str(e)}"}

@app.get("/api/approval-logs")
async def get_approval_logs():
    try:
        # PERBAIKAN: Menggunakan get_db_connection() yang benar
        conn = get_db_connection()
        if not conn:
            return {"error": "Koneksi database gagal."}
            
        # (Opsional) Di sini kamu bisa menambahkan logika SELECT ke tabel action_approvals
        # cur = conn.cursor()
        # cur.execute("SELECT * FROM action_approvals")
        # logs = cur.fetchall()
        # cur.close()

        # Selalu tutup koneksi setelah selesai
        conn.close()
        
        return {"message": "Mengambil data pending approval dari Postgres", "status": "success"}
    except Exception as e:
        return {"error": f"Terjadi kesalahan: {str(e)}"}

@app.patch("/api/approval-logs/{log_id}")
async def update_approval_status(log_id: int, action: schemas.ApprovalAction):
    if action.status.lower() == "approved":
        pass
        # Logika update status persetujuan di database bisa ditambahkan di sini
        
    return {"message": f"Aksi {log_id} telah diproses."}

@app.get("/api/test-db")
async def test_database_connection():
    try:
        # Mencoba membuka koneksi ke PostgreSQL
        conn = get_db_connection()
        if conn:
            cur = conn.cursor()
            # Mengeksekusi perintah SQL sederhana untuk meminta versi Postgres
            cur.execute("SELECT version();")
            db_version = cur.fetchone()
            
            # Tutup koneksi agar tidak bocor
            cur.close()
            conn.close()
            
            return {
                "status": "BERHASIL", 
                "message": "Backend sukses terhubung ke PostgreSQL!", 
                "version": db_version[0]
            }
        else:
            return {"status": "GAGAL", "message": "Koneksi ditolak. Cek kredensial di file .env"}
            
    except Exception as e:
        return {"status": "ERROR", "detail": str(e)}

@app.get("/")
async def root():
    return {"status": "Backend Radikari Assistant V3 - Terhubung ke PostgreSQL!"}