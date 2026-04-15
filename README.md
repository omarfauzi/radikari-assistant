# Radikari OS - AI Assistant Dashboard

Project ini adalah dashboard internal **Radikari** yang menggabungkan performa cepat dari **Vite + React** serta sistem komponen UI modern dari **Next.js** (Shadcn/UI & Radix UI). 

Dashboard ini dirancang untuk mengelola berbagai divisi perusahaan dengan sistem hak akses yang ketat dan antarmuka yang intuitif.

---

## 🚀 Tech Stack

Dashboard ini menggunakan teknologi terbaru untuk memastikan kecepatan pengembangan dan performa runtime:

* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS 4.0
* **Components:** Radix UI, Lucide React, Shadcn/UI
* **Animations:** Tailwind Animate & Framer Motion (Ready)
* **Language:** JavaScript (JSX) & TypeScript (TSX) Hybrid

---

## 🛠️ Fitur & Implementasi

### 1. Role-Based Access Control (RBAC)
Sistem navigasi otomatis menyaring menu berdasarkan peran pengguna (`userRole`).
* **Super Admin:** Akses penuh ke semua divisi.
* **HR:** Akses ke HR Division & Dashboard.
* **Finance:** Akses ke Finance Division & Dashboard.
* **Marketing:** Akses ke Marketing Division & Dashboard.

### 2. Sidebar Policy & Logic
Menu sidebar dilengkapi dengan kebijakan akses. Jika user login sebagai divisi HR, maka menu Finance dan Marketing akan disembunyikan secara otomatis untuk menjaga keamanan data.

### 3. Center Approval System
Fitur sub-menu dinamis yang hanya muncul pada divisi tertentu saat menu tersebut aktif, memberikan alur kerja yang lebih rapi untuk proses persetujuan (approval).

### 4. User Header & Profile
Dropdown profile yang mencakup informasi login user, email perusahaan, dan fitur logout yang sudah terintegrasi.

### 5. Radikari Intelligence Node (AI Assistant)
Integrasi asisten cerdas berbasis **DeepSeek** melalui gateway **OpenClaw**.
* **Proxy System**: Menggunakan Vite Proxy untuk menjembatani komunikasi browser ke port lokal `18789`.
* **Security**: Sistem autentikasi berbasis Token yang diamankan melalui variabel lingkungan (`.env`).
* **Automated Reporting**: Setiap aktivitas koordinasi otomatis tercatat ke dalam Google Sheets melalui Intelligence Skills.

---

## ⚙️ Setup Environment (PENTING)

Karena dashboard ini menggunakan Intelligence Node, kamu wajib melakukan langkah berikut sebelum menjalankan aplikasi:

1.  **Konfigurasi Gateway**: Salin file `openclaw.json.exemple` menjadi `openclaw.json` di folder konfigurasi sistem kamu.
2.  **Variabel Lingkungan**: Buat file `.env` di root folder dan masukkan token akses:
    ```env
    VITE_OPENCLAW_TOKEN=isi_token_anda_disini
    ```
3.  **Docker**: Pastikan kontainer **OpenClaw Gateway** sudah berjalan di port `18789` agar API `completions` dapat diakses.

---

## 🛠️ Instalasi & Pengembangan

```bash
# Install dependencies
npm install

# Run development server
npm run dev

## 🔍 Troubleshooting (Kendala Umum)

### 1. Pesan "Koneksi ke Node terputus"
* **Penyebab**: Browser tidak bisa menemukan gateway OpenClaw.
* **Solusi**: Pastikan Docker sudah running dan perintah `npm run dev` sudah dijalankan agar Vite Proxy aktif.

### 2. Error 400 Bad Request
* **Penyebab**: Nama model di `ChatAssistant.jsx` tidak sesuai dengan yang terdaftar di OpenClaw.
* **Solusi**: Pastikan properti `model` di body request bernilai `"openclaw"`.

### 3. File Tidak Terbaca (Timeout)
* **Penyebab**: Proses pencarian file di workspace memakan waktu lebih dari 60 detik.
* **Solusi**: Naikkan nilai `idleTimeoutSeconds` di file `openclaw.json` menjadi `300` atau lebih.
---