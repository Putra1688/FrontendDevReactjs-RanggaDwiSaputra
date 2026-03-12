# LuxeEats - Premium Restaurant Discovery 🍽️

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

LuxeEats adalah aplikasi web pencarian restoran premium yang dirancang untuk memberikan pengalaman navigasi yang elegan dan responsif. Aplikasi ini mengintegrasikan data real-time melalui REST API, sistem otentikasi simulasi, dan fitur ulasan dinamis.

**Live Demo:** [https://luxeats.netlify.app](https://luxeats.netlify.app)

**Repositori Proyek:** [https://github.com/Putra1688/FrontendDevReactjs-RanggaDwiSaputra](https://github.com/Putra1688/FrontendDevReactjs-RanggaDwiSaputra)

---

## ✨ Fitur Unggulan

- **🌐 Integrasi Data Real-time**: Terhubung dengan REST API live ([MockAPI.io](https://mockapi.io)) menggunakan **Axios** dan React Hooks.
- **🔐 Sistem Otentikasi Simulasi**: 
  - Menggunakan **AuthContext** global untuk manajemen sesi.
  - Login sebagai "Guest" hanya dengan memasukkan nama.
  - Sesi login tersimpan secara lokal via **localStorage**.
- **✍️ Fitur Ulasan Dinamis**: 
  - Pengguna yang masuk dapat memberikan ulasan langsung ke MockAPI.
  - Data ulasan dikirim menggunakan metode `PUT` dan tetap tersimpan saat halaman dimuat ulang.
- **🔍 Sistem Filter Cerdas**: 
  - Toggle "Open Now" untuk melihat restoran yang sedang buka.
  - Filter rentang harga ($ hingga $$$$).
  - Seleksi kategori kuliner yang dinamis.
  - Tombol "Clear All" untuk mereset semua filter dengan cepat.
- **💎 Estetika Premium**:
  - **Tipografi**: Perpaduan *Plus Jakarta Sans* (sans-serif modern) dan *Playfair Display* (serif elegan).
  - **Hero Section**: Desain gelap yang imersif dengan tipografi sinematik.
  - **Glassmorphism**: Elemen UI transparan dengan efek blur pada navigasi dan filter.
  - **Micro-animations**: Transisi hover yang halus, fade-in, dan skeleton loading.
- **📱 Mobile-First & Responsif**: 
  - Sistem grid 100% responsif.
  - Layout filter yang dioptimalkan untuk perangkat layar sentuh.
- **🗺️ Integrasi Peta Interaktif**: Menggunakan Google Maps Embed API yang otomatis mendeteksi lokasi berdasarkan nama restoran.

---

## 🛠️ Teknologi yang Digunakan

- **Core**: React 19 (Functional Components & Hooks)
- **State Management**: React Context API (untuk Auth & Global UI state)
- **Styling**: Tailwind CSS v4.0
- **Navigation**: React Router v7
- **HTTP Client**: Axios
- **External API**: MockAPI.io   
- **Fonts**: Google Fonts (Plus Jakarta Sans, Playfair Display)

---

## 📦 Instalasi & Penggunaan

### Prasyarat
- **Node.js**: v18.x atau lebih tinggi
- **npm**: v9.x atau lebih tinggi

### Langkah-langkah Instalasi

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/Putra1688/FrontendDevReactjs-RanggaDwiSaputra.git
   cd FrontendDevReactjs-RanggaDwiSaputra
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Aplikasi secara Lokal**:
   ```bash
   npm run dev
   ```
   *Aplikasi akan berjalan di alamat `http://localhost:5173`*

### 🔑 Cara Mencoba Fitur Review
Untuk mencoba fitur **Tambah Review**, kamu harus login terlebih dahulu:
1. Klik tombol **Login** di pojok kanan atas Navbar.
2. Masukkan nama kamu -> Klik **"Let's Explore"**.
3. Pilih salah satu restoran dan scroll ke bawah untuk memberikan ulasan.

---

## 📂 Struktur Proyek

```text
src/
├── components/   # Komponen UI (Navbar, Card, Modal, dll)
├── context/      # State Management (AuthContext)
├── pages/        # Halaman Utama (Home & Detail)
├── services/     # Konfigurasi API
└── assets/       # Gambar & Asset statis
```

---

## 📄 Penilaian Teknis (Deliverables)

| Kriteria | Deskripsi | Status |
| :--- | :--- | :---: |
| **API Integration** | Fetch data restaurant & Post reviews (PUT) | ✅ |
| **Responsive Design** | Navigasi & Filter yang mobile-friendly | ✅ |
| **Clean Code** | Penggunaan Hooks & Context API yang efisien | ✅ |
| **UI/UX Polishing** | Penggunaan Glassmorphism & Premium Fonts | ✅ |
| **Documentation** | README lengkap (Bahasa Indonesia) | ✅ |

Project ini dikembangkan sebagai bagian dari **Technical Assessment Frontend Developer (React.js)**.
