# Invox — Invoice Management Dashboard

![Invox Dashboard](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald?style=flat-square&logo=supabase)
![License](https://img.shields.io/badge/License-Private-red?style=flat-square)

**Invox** adalah aplikasi dashboard manajemen faktur/invoice internal yang modern, cepat, dan terstruktur. Dirancang dengan prinsip desain Apple Human Interface Guidelines (HIG) — menghadirkan visual bersih, *frosted-glass elements*, skema warna netral yang elegan, dan mikro-interaksi yang halus.

Aplikasi ini menggantikan proses manual berbasis spreadsheet dengan alur kerja *invoice-to-cash* otomatis: mulai dari pembuatan invoice, pengiriman, pelacakan pembayaran, hingga portal mandiri untuk klien (*Client Portal*).

---

## 🚀 Fitur Utama

- **📊 Dashboard & Real-Time Analytics**
  - Ringkasan statistik pendapatan (*Outstanding Revenue*, *Paid This Month*, *Average Days-to-Payment*).
  - Grafik tren pendapatan dan breakdown status invoice.
- **📄 Lifecycle Invoice Lengkap**
  - Pembuatan invoice dengan kalkulasi subtotal, diskon, pajak, dan *multi-currency support*.
  - Manajemen status invoice (`Draft`, `Pending`, `Paid`, `Overdue`, `Cancelled`).
  - Fitur cetak / unduh faktur ke format PDF dan pengiriman via email.
- **🔐 Manajemen Peran (RBAC - 3 Layer Security)**
  - **Admin / Owner**: Akses penuh ke seluruh fitur, laporan keuangan, audit log, dan pengaturan.
  - **Staff Finance**: Pengelolaan invoice, data klien, pembayaran, dan laporan harian.
  - **Client**: Akses mandiri (*read-only*) khusus untuk melihat dan mengunduh invoice milik sendiri.
- **👥 Manajemen Klien (Customer Database)**
  - Pencatatan informasi kontak, riwayat transaksi, dan status tagihan per klien.
- **💳 Tracking Pembayaran & Verifikasi**
  - Pencatatan riwayat transaksi masuk, metode pembayaran, serta konfirmasi status lunas.
- **📜 Audit Log & Notifikasi**
  - Pelacakan riwayat aktivitas finansial secara transparan dan notifikasi sistem real-time.

---

## 🛠️ Tech Stack

| Kategori | Teknologi / Library |
|---|---|
| **Framework Frontend** | [Next.js 14](https://nextjs.org/) (App Router, Server Components) |
| **Bahasa Pemrograman**| [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | Vanilla CSS (CSS Modules & Custom Design Tokens) + [Lucide React Icons](https://lucide.dev/) |
| **State Management** | [TanStack React Query v5](https://tanstack.com/query) (Server State) + [Zustand](https://zustand-demo.pmnd.rs/) (Global App State) |
| **Backend & Database** | Next.js API Routes + [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security / RLS, Auth, Storage) |
| **Email Template** | [React Email](https://react.email/) + Resend / SendGrid |
| **Testing** | [Vitest](https://vitest.dev/) (Unit/Integration) + [Playwright](https://playwright.dev/) (E2E Testing) |

---

## 📋 Prasyarat System

Sebelum menjalankan project ini di lingkungan lokal, pastikan Anda telah menginstal:

- **Node.js**: versi `v18.x` atau lebih baru
- **Package Manager**: `npm` (v9+), `yarn`, `pnpm`, atau `bun`
- **Proyek Supabase**: Akun Supabase aktif dan sebuah proyek PostgreSQL baru

---

## ⚙️ Panduan Instalasi & Pengoperasian Lokal

### 1. Clone Repository
```bash
git clone <repository-url>
cd Invox
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Buka file `.env.local` dan lengkapi konfigurasi variabel lingkungan berikut:

```env
# Firebase Configuration (Opsional / Tergantung Setup Auth)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Service (Pilih salah satu)
RESEND_API_KEY=re_your_key
SENDGRID_API_KEY=SG.your_key

# OAuth & App Setup
GOOGLE_OAUTH_CLIENT_ID=your-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Security & Tracking
CRON_SECRET=your-random-secret
SENTRY_DSN=https://your-sentry-dsn
```

### 4. Setup Database Supabase
Jalankan skrip skema database di SQL Editor dashboard Supabase Anda secara berurutan:
1. Eksekusi file `supabase/migrations/001_initial_schema.sql` (Skema awal dasar).
2. Eksekusi file `supabase/migrations/002_multi_currency_and_complete_schema.sql` (Dukungan *multi-currency*, RLS policy, dan skema lengkap).

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser Anda dan akses halaman di **[http://localhost:3000](http://localhost:3000)**.

---

## 📜 Perintah Script yang Tersedia (`scripts`)

Di dalam file `package.json`, tersedia beberapa skrip untuk memfasilitasi pengembangan, testing, dan build:

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan Next.js dev server pada porta `http://localhost:3000` |
| `npm run build` | Melakukan kompilasi & build aplikasi untuk mode produksi |
| `npm run start` | Menjalankan server Next.js hasil build produksi |
| `npm run lint` | Menjalankan linters (ESLint) untuk mengecek standar kode |
| `npm run type-check` | Pengecekan tipe data TypeScript tanpa melakukan kompilasi file (`tsc --noEmit`) |
| `npm run test` | Menjalankan pengujian Unit & Integrasi menggunakan **Vitest** |
| `npm run test:e2e` | Menjalankan pengujian End-to-End menggunakan **Playwright** |

---

## 📁 Struktur Direktori Project

```text
Invox/
├── app/                  # Next.js 14 App Router (halaman & API endpoints)
│   ├── (app)/            # Halaman aplikasi internal (Dashboard, Invoices, Customers, dll)
│   ├── (auth)/           # Halaman otentikasi (Login, Register)
│   ├── portal/           # Portal mandiri khusus Klien (Client Portal)
│   └── api/              # Route handlers untuk REST API server-authoritative
├── components/           # Komponen UI Reusable
│   ├── ui/               # Atomic Design UI components (Button, Modal, Table, Input, dll)
│   ├── layout/           # Sidebar, Navbar, CommandPalette, Header
│   ├── features/         # Komponen khusus fitur (Invoices, Customers, Payments)
│   └── landing/          # Komponen landing page
├── config/               # File konfigurasi aplikasi
├── constants/            # Konstanta global dan daftar token warna/desain
├── docs/                 # Dokumentasi arsitektur & matriks akses RBAC
├── hooks/                # Custom React Hooks
├── lib/                  # Library pembantu & konfigurasi SDK external
├── middleware.ts         # Middleware otentikasi dan proteksi route Next.js
├── providers/            # React Context Providers (QueryClient, Auth, Theme)
├── services/             # Layer query database & bisnis logika (Supabase)
├── stores/               # Global state stores menggunakan Zustand
├── styles/               # CSS Modules & Custom Design Tokens (`tokens.css`)
├── supabase/             # Migration SQL, seeds, dan Edge Functions
├── tests/                # Unit test (Vitest) & E2E test (Playwright)
├── types/                # Definisi TypeScript interface & types
├── utils/                # Utility helper (format mata uang, tanggal, validator)
└── validators/           # Zod schema validators untuk data API
```

---

## 🛡️ Hak Akses (RBAC Matrix)

| Fitur / Modul | Admin / Owner | Staff Finance | Client |
|---|:---:|:---:|:---:|
| **Dashboard** | ✅ Akses Penuh | ✅ Akses Penuh | ❌ Tidak Ada |
| **Invoices** | ✅ Akses Penuh | ✅ Akses Penuh | 🔒 Hanya Invoice Milik Sendiri |
| **Customers** | ✅ Akses Penuh | ✅ Akses Penuh | 🔒 Data Profil Sendiri |
| **Payments** | ✅ Akses Penuh | ✅ Akses Penuh | ❌ Tidak Ada |
| **Analytics & Reports** | ✅ Akses Penuh | ✅ Akses Penuh | ❌ Tidak Ada |
| **Subscription & Settings** | ✅ Akses Penuh | ❌ Tidak Ada | ❌ Tidak Ada |
| **Audit Log** | ✅ Lihat Sahaja | ❌ Tidak Ada | ❌ Tidak Ada |

---

## 📄 Lisensi & Kontribusi

Project ini bersifat **Private / Internal** untuk organisasi. Hak cipta dilindungi undang-undang. Untuk pertanyaan teknis atau bantuan pengembangan, silakan hubungi tim Engineering.
