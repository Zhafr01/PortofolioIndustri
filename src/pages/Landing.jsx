import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Monitor,
  AlertTriangle,
  TrendingUp,
  Wifi,
  ChevronRight,
  BarChart2,
  Shield,
  Users,
  MapPin,
  Menu,
  X,
  Server,
  Building,
  Store,
  Wrench,
  User,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// ─── destination images (from public/images/) ───────────────────────────────
const destinations = [
  {
    name: 'Jatim Park 1',
    tag: 'Taman Bermain',
    desc: 'Wahana edukatif dan taman bermain keluarga dengan tema sains dan budaya Jawa Timur.',
    img: `${import.meta.env.BASE_URL}images/jatimpark1.jpg`,
  },
  {
    name: 'Jatim Park 2',
    tag: 'Kebun Binatang',
    desc: 'Batu Secret Zoo dan Museum Satwa — destinasi satwa terlengkap di Jawa Timur.',
    img: `${import.meta.env.BASE_URL}images/jatimpark2.jpg`,
  },
  {
    name: 'Museum Angkut',
    tag: 'Museum',
    desc: 'Museum transportasi tematik dengan koleksi kendaraan dari berbagai era dan dunia.',
    img: `${import.meta.env.BASE_URL}images/museum-angkut.jpg`,
  },
  {
    name: 'BNS',
    tag: 'Hiburan Malam',
    desc: 'Batu Night Spectacular — taman hiburan malam dengan pertunjukan cahaya dan wahana.',
    img: `${import.meta.env.BASE_URL}images/bns.jpg`,
  },
  {
    name: 'Selecta',
    tag: 'Rekreasi Alam',
    desc: 'Taman rekreasi legendaris peninggalan Belanda dengan kolam renang dan taman bunga.',
    img: `${import.meta.env.BASE_URL}images/selecta.jpg`,
  },
  {
    name: 'Eco Green Park',
    tag: 'Edukasi Alam',
    desc: 'Taman burung dan alam hijau dengan konsep edukasi konservasi lingkungan.',
    img: `${import.meta.env.BASE_URL}images/ecogreen.jpg`,
  },
  {
    name: 'Coban Rondo',
    tag: 'Wisata Alam',
    desc: 'Air terjun legendaris setinggi 84 meter di tengah hutan pinus Kota Batu.',
    img: `${import.meta.env.BASE_URL}images/coban-rondo.jpg`,
  },
]

// ─── data ───────────────────────────────────────────────────────────────────
const visitorData = [
  { name: 'Sen', value: 1842 },
  { name: 'Sel', value: 2103 },
  { name: 'Rab', value: 1956 },
  { name: 'Kam', value: 2341 },
  { name: 'Jum', value: 2847 },
  { name: 'Sab', value: 3102 },
  { name: 'Min', value: 2890 },
];

const features = [
  {
    icon: Monitor,
    title: 'Dashboard Monitoring',
    desc: 'Statistik kunjungan, tren wahana, dan okupansi real-time per destinasi.',
    tag: 'Real-time',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Alert Center',
    desc: 'Pelaporan darurat medis dan keamanan langsung ke petugas tanpa perlu mencari bantuan manual.',
    tag: 'Push Notification',
  },
  {
    icon: TrendingUp,
    title: 'Prediksi Ekspansi',
    desc: 'Model skoring berbasis data nyata untuk mendukung keputusan ekspansi destinasi oleh pemerintah daerah.',
    tag: 'Data-driven',
  },
  {
    icon: Wifi,
    title: 'E-Monitoring IoT',
    desc: 'Sensor wahana, CCTV, smart gate, dan sensor lingkungan terintegrasi dalam satu dasbor live.',
    tag: 'IoT Sensor',
  },
];

const roles = [
  {
    icon: Server,
    title: 'Super Admin',
    bullets: [
      'Kelola semua pengguna & hak akses',
      'Konfigurasi sistem platform',
      'Audit log aktivitas seluruh aktor',
    ],
  },
  {
    icon: Building,
    title: 'Admin Pemerintah',
    bullets: [
      'Pantau laporan semua destinasi',
      'Setujui keputusan ekspansi',
      'Lihat analitik kota secara agregat',
    ],
  },
  {
    icon: Store,
    title: 'Branch Admin',
    bullets: [
      'Kelola data destinasi masing-masing',
      'Monitor kunjungan & wahana',
      'Kelola staf teknis lapangan',
    ],
  },
  {
    icon: Wrench,
    title: 'Technical Staff',
    bullets: [
      'Pantau sensor IoT wahana',
      'Laporkan kerusakan peralatan',
      'Tangani emergency alert lapangan',
    ],
  },
  {
    icon: User,
    title: 'Pengunjung',
    bullets: [
      'Akses informasi destinasi',
      'Laporkan kejadian darurat',
      'Beri kritik & saran layanan',
    ],
  },
];

const roadmap = [
  {
    phase: '1',
    label: 'Manajemen User & Dasbor Dasar',
    desc: 'Registrasi dan autentikasi berbasis peran, dashboard kunjungan, modul kritik-saran.',
    done: true,
  },
  {
    phase: '2',
    label: 'Sistem Emergency Alert',
    desc: 'Push-notification insiden medis & keamanan, eskalasi otomatis ke petugas terdekat.',
    done: true,
  },
  {
    phase: '3',
    label: 'Modul Prediksi Ekspansi',
    desc: 'Skoring lokasi berbasis data historis, rekomendasi investasi untuk pemerintah daerah.',
    done: true,
  },
  {
    phase: '4',
    label: 'Laporan Otomatis & Approval',
    desc: 'Generasi laporan bulanan PDF, alur persetujuan kebijakan antar-aktor.',
    done: false,
  },
  {
    phase: '5',
    label: 'E-Monitoring Dasar',
    desc: 'Integrasi smart gate kunjungan dan sensor kondisi wahana secara real-time.',
    done: false,
  },
  {
    phase: '6',
    label: 'E-Monitoring Lanjutan',
    desc: 'Stream CCTV in-platform, sensor kualitas lingkungan, heatmap kepadatan area.',
    done: false,
  },
];

// ─── custom bar shape with rounded top ──────────────────────────────────────
function RoundedBar(props) {
  const { x, y, width, height } = props;
  const r = 4;
  if (height <= 0) return null;
  return (
    <path
      d={`M${x},${y + height} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} Z`}
      fill="#0D9488"
    />
  );
}

// ─── component ───────────────────────────────────────────────────────────────
export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">

      {/* ── Sticky Navbar ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-teal-600 flex items-center justify-center rounded-md shadow-sm">
              <MapPin size={15} className="text-white" />
            </div>
            <span className="font-semibold text-slate-900 text-sm hidden sm:block">
              Wisata Batu Platform
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Tentang', href: '#tentang' },
              { label: 'Fitur', href: '#fitur' },
              { label: 'Roadmap', href: '#destinasi' },
              { label: 'Kontak', href: '#kontak' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-slate-600 hover:text-teal-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/visitor"
              className="px-4 py-2 text-slate-600 text-sm font-medium rounded-md hover:text-teal-600 hover:bg-teal-50 transition-colors"
            >
              Masuk sebagai Pengunjung
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors shadow-sm"
            >
              Masuk Pengelola
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-teal-600 transition-colors rounded-md"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-5 pt-3 flex flex-col gap-3">
            {['Tentang', 'Fitur', 'Roadmap', 'Kontak'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-700 hover:text-teal-600 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Link
              to="/visitor"
              className="mt-1 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-md text-center hover:border-teal-400 hover:text-teal-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Masuk sebagai Pengunjung
            </Link>
            <Link
              to="/login"
              className="mt-1 px-4 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-md text-center hover:bg-teal-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Masuk ke Platform
            </Link>
          </div>
        )}
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 grid grid-cols-1 md:grid-cols-5 gap-14 items-start">

        {/* Left 60% */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-600 w-fit">
            <span className="w-5 h-px bg-teal-600 inline-block" />
            Platform Monitoring Destinasi Wisata
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-slate-900"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Kelola Destinasi Wisata Lebih Cerdas
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
            Sistem terpadu untuk pengunjung, pengelola destinasi, dan pemerintah daerah.
            Monitoring real-time, pelaporan darurat, dan pengambilan keputusan berbasis data
            di Kota Batu.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to="/login"
              className="px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              Masuk sebagai Pengelola <ArrowRight size={15} />
            </Link>
            <Link
              to="/visitor"
              className="px-5 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-md hover:border-teal-400 hover:text-teal-600 transition-colors"
            >
              Lihat sebagai Pengunjung
            </Link>
          </div>

          {/* Quick trust row */}
          <div className="flex flex-wrap gap-5 pt-2 border-t border-slate-100 mt-2">
            {[
              { icon: Shield, text: 'Autentikasi berbasis peran' },
              { icon: Wifi, text: 'Sensor IoT real-time' },
              { icon: BarChart2, text: 'Analitik berbasis data' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-slate-500">
                <Icon size={13} className="text-teal-500" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right 40% — chart card */}
        <div className="md:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden">
            {/* Card header */}
            <div className="px-5 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-900">Kunjungan Harian</p>
                <p className="text-xs text-slate-400 mt-0.5">Jatim Park 2 — 7 hari terakhir</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                +14% minggu ini
              </span>
            </div>
            <div className="px-4 pb-4 pt-2">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={visitorData} barCategoryGap="32%">
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    width={38}
                    tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    cursor={{ fill: '#f0fdfa' }}
                    formatter={(v) => [v.toLocaleString('id-ID'), 'Pengunjung']}
                  />
                  <Bar
                    dataKey="value"
                    shape={<RoundedBar />}
                    animationDuration={1500}
                    animationBegin={200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Destinasi Wisata', value: '7', sub: 'Kota Batu' },
            { label: 'Peran Pengguna', value: '5', sub: 'Berbasis akses' },
            { label: 'Sensor IoT Live', value: '24', sub: 'Real-time feed' },
            { label: 'Fase Implementasi', value: '6', sub: 'Bertahap' },
          ].map(({ label, value, sub }) => (
            <div key={label}>
              <p
                className="text-4xl font-semibold text-white mb-1"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {value}
              </p>
              <p className="text-sm text-slate-300 font-medium">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="fitur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-teal-600 inline-block" /> Modul Platform
          </p>
          <h2
            className="text-3xl text-slate-900 leading-snug"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Empat modul utama ekosistem wisata digital
          </h2>
          <p className="text-slate-500 mt-3 text-sm leading-relaxed">
            Dirancang untuk tiga jenis pengguna: pengunjung, pengelola, dan pemerintah daerah Kota Batu.
          </p>
        </div>

        {/* 2×2 asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc, tag }) => (
            <div
              key={title}
              className="border border-slate-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 flex items-center justify-center rounded-lg flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                  <Icon size={18} className="text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
                    <span className="text-xs text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0">{tag}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Roles ────────────────────────────────────────────────────────── */}
      <section id="tentang" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 flex items-center gap-2">
              <span className="w-5 h-px bg-teal-600 inline-block" /> Pengguna Platform
            </p>
            <h2
              className="text-3xl text-slate-900"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Lima Peran Pengguna
            </h2>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-3 -mx-4 px-4">
            {roles.map(({ icon: Icon, title, bullets }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-xl p-5 flex-shrink-0 hover:border-teal-200 hover:shadow-sm transition-all"
                style={{ minWidth: '210px' }}
              >
                <div className="w-9 h-9 bg-teal-50 flex items-center justify-center rounded-lg mb-4">
                  <Icon size={16} className="text-teal-600" />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm mb-3">{title}</h4>
                <ul className="flex flex-col gap-2">
                  {bullets.map((b) => (
                    <li key={b} className="text-xs text-slate-500 flex items-start gap-1.5">
                      <ChevronRight size={11} className="text-teal-500 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinasi Wisata Gallery ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-teal-600 inline-block" /> Destinasi
          </p>
          <h2
            className="text-3xl text-slate-900 leading-snug"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            7 destinasi wisata unggulan Kota Batu
          </h2>
          <p className="text-slate-500 mt-3 text-sm leading-relaxed">
            Platform memantau kondisi real-time seluruh destinasi — dari jumlah pengunjung, wahana aktif, hingga sensor IoT.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.slice(0, 6).map(({ name, tag, desc, img }) => (
            <div key={name} className="group border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-teal-200 transition-all duration-200">
              <div className="relative h-44 bg-slate-200 overflow-hidden">
                <img
                  src={img}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <span className="absolute top-3 left-3 text-xs font-medium bg-teal-600 text-white px-2 py-0.5 rounded">
                  {tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 7th destination — full width teaser */}
        <div className="mt-5 group border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-teal-200 transition-all duration-200 flex flex-col sm:flex-row">
          <div className="relative sm:w-72 h-48 sm:h-auto bg-slate-200 overflow-hidden flex-shrink-0">
            <img
              src={destinations[6].img}
              alt={destinations[6].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/10" />
          </div>
          <div className="p-5 flex flex-col justify-center">
            <span className="text-xs font-medium bg-teal-50 text-teal-700 px-2 py-0.5 rounded w-fit mb-2">
              {destinations[6].tag}
            </span>
            <h3 className="font-semibold text-slate-900 text-base mb-2">{destinations[6].name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{destinations[6].desc}</p>
          </div>
        </div>
      </section>

      {/* ── Roadmap ──────────────────────────────────────────────────────── */}
      <section id="destinasi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-teal-600 inline-block" /> Pengembangan
          </p>
          <h2
            className="text-3xl text-slate-900"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Roadmap Implementasi
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          {roadmap.map(({ phase, label, desc, done }, idx) => (
            <div key={phase} className="flex gap-5 pb-8 relative">
              {/* Phase marker */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg z-10 ${done ? 'bg-teal-600' : 'bg-slate-100 border border-slate-200'}`}>
                  <span className={`text-xs font-bold ${done ? 'text-white' : 'text-slate-400'}`}>{phase}</span>
                </div>
                {idx % 2 === 0 && idx < roadmap.length - 2 && (
                  <div className="w-px flex-1 bg-slate-200 my-1.5" style={{ minHeight: '28px' }} />
                )}
              </div>

              {/* Content */}
              <div className="pb-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900 text-sm">Fase {phase}: {label}</p>
                  {done && <span className="text-xs text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0">Selesai</span>}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="bg-teal-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-3xl text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Siap mengelola destinasi wisata Anda?
            </h2>
            <p className="text-teal-200 text-sm mt-2">
              Masuk ke platform dan mulai monitoring hari ini.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/visitor"
              className="px-5 py-2.5 border border-white/30 text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              Lihat sebagai Pengunjung
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-teal-700 text-sm font-semibold rounded-md hover:bg-teal-50 transition-colors inline-flex items-center gap-2 shadow-md"
            >
              Masuk ke Platform <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer id="kontak" className="bg-slate-900 text-slate-400 pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-slate-800">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-teal-600 flex items-center justify-center rounded-md">
                <MapPin size={15} className="text-white" />
              </div>
              <span className="text-white font-semibold text-sm">Wisata Batu Platform</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Sistem monitoring destinasi wisata terpadu untuk Kota Batu, Jawa Timur.
              Menghubungkan pengunjung, pengelola, dan pemerintah dalam satu ekosistem digital.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Navigasi</p>
            <ul className="flex flex-col gap-2.5">
              {['Tentang Platform', 'Modul Fitur', 'Roadmap', 'Kontak'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs text-slate-500 hover:text-teal-400 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Kontak</p>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-500">
              <li>Dinas Pariwisata Kota Batu</li>
              <li>Jl. Panglima Sudirman No. 507, Batu</li>
              <li className="text-teal-400">admin@wisatabatu.go.id</li>
              <li>(0341) 592 000</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-xs text-slate-600 flex items-center justify-between gap-4 flex-wrap">
          <span>© 2026 Platform Monitoring Wisata Kota Batu. Hak cipta dilindungi.</span>
          <span className="flex items-center gap-1.5">
            Dikembangkan oleh
            <span className="text-teal-500 font-medium">Tim Pengembang Platform</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
