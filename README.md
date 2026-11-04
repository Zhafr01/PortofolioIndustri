# Platform Monitoring Destinasi Wisata Kota Batu

Prototipe UI berbasis **Vite + React 19 + Tailwind CSS v3**  
Semua data bersifat mock/statis — tidak ada koneksi backend.

---

## Cara Menjalankan

```bash
npm install      # instalasi dependensi
npm run dev      # dev server → http://localhost:5173
npm run build    # production build → ./dist/
npm run preview  # preview hasil build
```

---

## Halaman & Route

| Route | Halaman | Peran |
|---|---|---|
| `/` | Landing Page | Publik |
| `/login` | Login | Publik |
| `/branch-admin` | Dashboard Branch Admin | Branch Admin |
| `/e-monitoring` | E-Monitoring Live | Branch Admin |
| `/wahana` | Manajemen Wahana | Branch Admin |
| `/staf` | Manajemen Staf | Branch Admin |
| `/alerts` | Manajemen Alert | Branch Admin |
| `/feedback` | Ulasan & Feedback | Branch Admin |
| `/expansion` | Skor Ekspansi | Branch Admin |
| `/gov-admin` | Dashboard Gov Admin | Pemerintah Kota |
| `/expansion-approval` | Persetujuan Ekspansi | Pemerintah Kota |
| `/super-admin` | Super Admin Panel | Super Admin |
| `/visitor` | Aplikasi Pengunjung (mobile) | Publik |
| `/technical` | Aplikasi Staf Teknis (mobile) | Staf Teknis |

---

## Stack

- **React 19** + **React Router v7**
- **Vite 6** (manual chunks: vendor, charts)
- **Tailwind CSS 3** (custom teal, Instrument Serif font-display)
- **Recharts 2** (semua grafik teranimate)
- **Lucide React** (ikon garis tipis SVG)

---

## Desain

- Aksen tunggal: **Teal `#0D9488`**
- Font heading: **Instrument Serif** (Google Fonts)
- Font body: **system-ui**
- Jarak antar elemen: **24px (gap-6)**
- Responsif: **320px – 1440px**
- Tahun footer: **2026**

