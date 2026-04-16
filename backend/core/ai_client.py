import requests

# KITA GANTI KE ALAMAT STANDAR YANG DIKENALI OPENCLAW
OPENCLAW_URL = "http://127.0.0.1:3000/v1/chat/completions"

def ask_deepseek(prompt_text):
    # OpenClaw mengharapkan format data standar seperti OpenAI
    payload = {
        "model": "deepseek/deepseek-chat", # Memastikan OpenClaw memakai DeepSeek
        "messages": [
            {"role": "system", "content": "Anda adalah asisten HR digital Radikari."},
            {"role": "user", "content": prompt_text}
        ]
    }
    
    headers = {
        "Content-Type": "application/json"
    }

    try:
        # Menembak ke server OpenClaw Gateway
        response = requests.post(OPENCLAW_URL, json=payload, headers=headers)
        
        # Jika berhasil
        if response.status_code == 200:
            data = response.json()
            # Mengambil teks jawaban dari format OpenAI
            return data["choices"][0]["message"]["content"]
            
        # Jika OpenClaw meminta password/token keamanan (Error 401)
        elif response.status_code == 401:
            return "Error 401: OpenClaw meminta Token Keamanan. Kita perlu memasukkan Token di headers."
            
        else:
            print(f"OpenClaw Error {response.status_code}: {response.text}")
            return f"Gagal dari OpenClaw (Error {response.status_code}). Cek terminal backend."

    except requests.exceptions.ConnectionError:
        return "Gagal terhubung. Pastikan server OpenClaw di port 3000 masih menyala."
    except Exception as e:
        return f"Terjadi kesalahan internal: {e}"