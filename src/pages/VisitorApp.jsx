import { useState } from 'react'
import { Shield, QrCode, Bell, MapPin, ChevronRight, Star, Clock, AlertTriangle, PhoneCall, CheckCircle2, User } from 'lucide-react'
import AnimatedBar from '../components/AnimatedBar'

const destinations = [
  { id: 1, name: 'Jatim Park 2',      occ: 72, level: 'Ramai',   img: `${import.meta.env.BASE_URL}images/jatimpark2.jpg`,       jam: '08.30 - 16.30', zone: 'Zona Wahana Utama' },
  { id: 2, name: 'BNS',               occ: 45, level: 'Sedang',  img: `${import.meta.env.BASE_URL}images/bns.jpg`,               jam: '15.00 - 23.00', zone: 'Area Lampion & Wahana' },
  { id: 3, name: 'Selecta',           occ: 28, level: 'Lengang', img: `${import.meta.env.BASE_URL}images/selecta.jpg`,           jam: '07.00 - 17.00', zone: 'Taman Bunga & Kolam' },
  { id: 4, name: 'Museum Angkut',     occ: 74, level: 'Ramai',   img: `${import.meta.env.BASE_URL}images/museum-angkut.jpg`,    jam: '12.00 - 20.00', zone: 'Hall Utama & Gangster Town' },
  { id: 5, name: 'Jatim Park 1',      occ: 58, level: 'Sedang',  img: `${import.meta.env.BASE_URL}images/jatimpark1.jpg`,       jam: '08.30 - 16.30', zone: 'Zona Sains & Waterpark' },
  { id: 6, name: 'Coban Rondo',       occ: 35, level: 'Lengang', img: `${import.meta.env.BASE_URL}images/coban-rondo.jpg`,     jam: '08.00 - 17.00', zone: 'Kawasan Air Terjun' },
]

const levelColor = { 
  Ramai:   'text-amber-600 bg-amber-50 border-amber-200', 
  Sedang:  'text-teal-600 bg-teal-50 border-teal-200', 
  Lengang: 'text-emerald-600 bg-emerald-50 border-emerald-200' 
}

function SOSModal({ type, onClose }) {
  const [sent, setSent] = useState(false)
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        {!sent ? (
          <>
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={22} />
              </div>
              <div>
                <p className="font-display text-lg text-slate-900">Konfirmasi {type}</p>
                <p className="text-xs text-slate-500">Peringatan Keamanan Langsung</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Petugas keamanan terdekat akan segera dikerahkan ke lokasi Anda di <span className="font-semibold text-slate-800">Zona Wahana Utama, Jatim Park 2</span>.
            </p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded text-sm font-medium hover:bg-slate-50">
                Batalkan
              </button>
              <button onClick={() => setSent(true)} className="flex-1 bg-red-600 text-white py-2.5 rounded text-sm font-semibold hover:bg-red-700 transition-colors">
                Kirim Laporan
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={30} className="text-emerald-600" />
            </div>
            <p className="font-semibold text-slate-900 text-base mb-1">Petugas Keamanan Sedang Menuju Lokasi</p>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">
              Tetap tenang di lokasi Anda. Tim keamanan terdekat telah menerima koordinat presisi Anda.
            </p>
            <button onClick={onClose} className="mt-5 w-full bg-teal-600 text-white py-2.5 rounded text-sm font-semibold hover:bg-teal-700">
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VisitorApp() {
  const [tab, setTab] = useState('beranda')
  const [sos, setSos] = useState(null)
  const [rating, setRating] = useState(5)
  const [tipe, setTipe] = useState('Saran')
  const [komen, setKomen] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const navTabs = [
    { id: 'beranda',   label: 'Beranda' },
    { id: 'destinasi', label: 'Destinasi & Ulasan' },
    { id: 'darurat',   label: 'Pusat Bantuan & Keamanan' },
    { id: 'profil',    label: 'Profil Pengunjung' },
  ]

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Top Header: Responsive for both mobile and desktop */}
      <header className="bg-teal-700 text-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-800 rounded-md flex items-center justify-center font-display text-lg text-teal-100">
                WB
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base tracking-tight leading-tight">Wisata Batu • Portal Pengunjung</p>
                <p className="text-xs text-teal-200">Jatim Park 2 • Zona Wahana Utama</p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {navTabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    tab === t.id
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'text-teal-100 hover:bg-teal-600 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            {/* Profile Pill & Alert */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setTab('darurat')}
                aria-label="Notifikasi Keamanan"
                className="w-8 h-8 rounded-full bg-teal-800/80 flex items-center justify-center text-teal-100 hover:text-white relative"
              >
                <Bell size={16} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-teal-600">
                <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                  AP
                </div>
                <div className="text-left text-xs">
                  <p className="font-medium text-white leading-none">Andi Pratama</p>
                  <p className="text-teal-200 text-[10px] mt-0.5">Pengunjung Umum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: Responsive container (full width on mobile, max-w-6xl on desktop) */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {/* BERANDA TAB */}
        {tab === 'beranda' && (
          <div className="flex flex-col gap-6">
            {/* Greeting Banner */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl text-slate-900">Halo, Andi Pratama</p>
                <p className="text-sm text-slate-500 mt-1">
                  Saat ini Anda terhubung di area <span className="font-semibold text-slate-700">Jatim Park 2</span> melalui Smart Gate &amp; QR Access.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-slate-50 px-3 py-2 rounded border border-slate-200 text-xs text-slate-600 flex items-center gap-1.5">
                  <MapPin size={14} className="text-teal-600" />
                  <span>Zona Wahana Utama</span>
                </div>
                <button 
                  onClick={() => setTab('darurat')}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Shield size={14} /> Bantuan Keamanan
                </button>
              </div>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Columns on Desktop */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Destinasi Favorit Cards */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Destinasi Favorit Hari Ini</p>
                    <span className="text-xs text-teal-600 font-medium">Diperbarui real-time</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {destinations.slice(0, 3).map((d) => (
                      <div key={d.id} className="group rounded-md relative overflow-hidden bg-slate-900 border border-slate-200 flex flex-col h-40">
                        <img 
                          src={d.img} 
                          alt={d.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" 
                          loading="lazy" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />
                        <div className="absolute top-2 right-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${levelColor[d.level]}`}>
                            {d.level}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white text-sm font-semibold truncate">{d.name}</p>
                          <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-0.5">
                            <Clock size={11} /> {d.jam}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kondisi Kepadatan Destinasi */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Kondisi Kepadatan Destinasi Kota Batu</p>
                    <span className="text-xs text-slate-400">Sensor Smart Gate</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destinations.map((d) => (
                      <div key={d.id} className="p-3 bg-slate-50 rounded-md border border-slate-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <img src={d.img} alt={d.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-slate-800">{d.name}</p>
                              <p className="text-[10px] text-slate-400">{d.zone}</p>
                            </div>
                          </div>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${levelColor[d.level]}`}>
                            {d.occ}%
                          </span>
                        </div>
                        <AnimatedBar value={d.occ} color={d.occ > 65 ? 'amber' : 'teal'} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Fasilitas & Cuaca */}
              <div className="flex flex-col gap-6">
                {/* Fasilitas Terkini */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                  <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Fasilitas Terkini (Jatim Park 2)</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      ['Parkir Utama', 'Tersedia', 'teal'],
                      ['Toilet Area Utama', 'Tersedia', 'teal'],
                      ['Food Court Central', 'Ramai', 'amber'],
                      ['Musholla Utama', 'Tersedia', 'teal'],
                      ['Loker Penitipan', 'Tersedia', 'teal'],
                      ['Area Kursi Roda', 'Siap Pakai', 'teal'],
                    ].map(([k, v, c]) => (
                      <div key={k} className="bg-slate-50 rounded p-3 border border-slate-100">
                        <p className="text-[11px] text-slate-500">{k}</p>
                        <p className={`text-xs font-bold mt-1 ${c === 'amber' ? 'text-amber-600' : 'text-teal-600'}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cuaca & Lingkungan */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Cuaca &amp; Kondisi Udara</p>
                    <span className="text-xs text-slate-400">Sensor Outdoor</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['Suhu Udara', '24°C'],
                      ['Kelembaban', '72%'],
                      ['Kualitas Udara', 'AQI 38 (Baik)'],
                      ['Kecepatan Angin', '12 km/h'],
                    ].map(([l, v]) => (
                      <div key={l} className="bg-slate-50 rounded p-3 border border-slate-100">
                        <p className="text-[11px] text-slate-500">{l}</p>
                        <p className="font-display text-base text-slate-800 mt-0.5">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Check-in Card */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <QrCode size={24} className="text-teal-700" />
                    <div>
                      <p className="text-xs font-bold text-teal-900">Pindai QR Lokasi</p>
                      <p className="text-[11px] text-teal-700">Perbarui posisi wahana Anda</p>
                    </div>
                  </div>
                  <button className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors">
                    Pindai
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DESTINASI & ULASAN TAB */}
        {tab === 'destinasi' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Destinations directory */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                <p className="font-display text-xl text-slate-900 mb-1">Daftar Destinasi Kota Batu</p>
                <p className="text-xs text-slate-500 mb-4">Pilih wahana atau fasilitas untuk memberikan ulasan dan rating langsung.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destinations.map(d => (
                    <div key={d.id} className="border border-slate-200 rounded-md overflow-hidden bg-white hover:border-teal-400 transition-colors">
                      <div className="h-32 bg-slate-800 relative">
                        <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                        <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColor[d.level]}`}>
                          {d.level} ({d.occ}%)
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm text-slate-900">{d.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{d.zone}</p>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-xs">
                          <span className="text-slate-400">{d.jam}</span>
                          <span className="text-teal-600 font-semibold cursor-pointer">Beri Masukan →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Rating Form */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs h-fit">
              <p className="font-display text-lg text-slate-900 mb-1">Form Masukan Pengunjung</p>
              <p className="text-xs text-slate-500 mb-4">Jatim Park 2: Roller Coaster Alpha</p>

              {!submitted ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Rating Pengalaman</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="p-1 hover:scale-110 transition-transform"
                          aria-label={`Beri bintang ${s}`}
                        >
                          <Star
                            size={24}
                            className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Jenis Masukan</label>
                    <div className="flex gap-4">
                      {['Saran', 'Kritik'].map(t => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                          <input
                            type="radio"
                            name="tipe"
                            checked={tipe === t}
                            onChange={() => setTipe(t)}
                            className="accent-teal-600"
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Detail Masukan</label>
                    <textarea
                      value={komen}
                      onChange={e => setKomen(e.target.value)}
                      rows={4}
                      placeholder="Bagikan pengalaman, saran perbaikan antrian, kebersihan, atau pelayanan staf..."
                      className="w-full text-xs border border-slate-200 rounded p-2.5 focus:outline-none focus:border-teal-500 resize-none"
                    />
                  </div>

                  <button
                    onClick={() => { if (komen) setSubmitted(true) }}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded transition-colors"
                  >
                    Kirim Masukan Pengunjung
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={24} className="text-teal-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Masukan Berhasil Dikirim</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Terima kasih atas partisipasi Anda dalam meningkatkan kenyamanan destinasi Kota Batu.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setKomen('') }}
                    className="mt-4 text-xs font-medium text-teal-600 hover:underline"
                  >
                    Kirim Masukan Lain
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PUSAT BANTUAN & KEAMANAN TAB (NO MEDICAL EMERGENCY) */}
        {tab === 'darurat' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900">Pusat Pelaporan Gangguan Keamanan</p>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">
                    Fitur ini terhubung langsung ke pos keamanan destinasi dan pengawas CCTV. Gunakan hanya saat terjadi insiden mendesak.
                  </p>
                </div>
              </div>
            </div>

            {/* Keamanan & Bantuan Lapangan */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setSos('Gangguan Keamanan')}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-6 text-left shadow-md hover:shadow-lg transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield size={32} className="text-white" />
                  </div>
                  <div>
                    <p className="font-display text-xl">Lapor Gangguan Keamanan</p>
                    <p className="text-red-100 text-xs sm:text-sm mt-1">
                      Kericuhan, barang hilang, tindak kejahatan, atau kerumunan tidak terkendali.
                    </p>
                  </div>
                </div>
                <ChevronRight size={24} className="text-white/60 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Location & Hotlines */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Lokasi Terdeteksi</p>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-100">
                  <MapPin size={18} className="text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Zona Wahana Utama, Jatim Park 2</p>
                    <p className="text-xs text-slate-500">Akurasi GPS ± 5 meter • Terverifikasi Smart Gate</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Kontak Petugas Langsung</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded border border-slate-100">
                    <PhoneCall size={15} className="text-slate-600" />
                    <div>
                      <p className="font-semibold text-slate-800">Pos Keamanan Utama</p>
                      <p className="text-slate-500">(0341) 597-777</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded border border-slate-100">
                    <PhoneCall size={15} className="text-slate-600" />
                    <div>
                      <p className="font-semibold text-slate-800">Call Center Pariwisata Batu</p>
                      <p className="text-slate-500">112 / (0341) 591-111</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <p className="text-xs text-slate-500">Belum check-in? Pindai QR di tiang wahana untuk kalibrasi lokasi.</p>
                <button className="w-full sm:w-auto px-4 py-2 border border-teal-600 text-teal-600 hover:bg-teal-50 rounded text-xs font-semibold flex items-center justify-center gap-2">
                  <QrCode size={14} /> Pindai QR
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROFIL TAB */}
        {tab === 'profil' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xs">
                AP
              </div>
              <div>
                <p className="font-display text-xl text-slate-900">Andi Pratama</p>
                <p className="text-xs text-slate-500">Akun Pengunjung Terverifikasi</p>
                <span className="inline-block mt-1 text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded border border-teal-200">
                  Status: Sedang di Lokasi
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {[
                { title: 'Destinasi Aktif', desc: 'Jatim Park 2 • Tiket Reguler Terpindai' },
                { title: 'Riwayat Kunjungan', desc: '3 Kunjungan dalam 6 bulan terakhir' },
                { title: 'Ulasan & Feedback Terkirim', desc: '1 ulasan dikirim hari ini' },
                { title: 'Pengaturan Notifikasi & Lokasi', desc: 'Akses sensor GPS aktif' },
                { title: 'Pusat Bantuan & Kebijakan Privasi', desc: 'Panduan operasional dan privasi data' },
              ].map((item, idx) => (
                <div key={idx} className="py-3.5 flex justify-between items-center hover:bg-slate-50 px-2 rounded cursor-pointer">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                    <p className="text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Bar: ONLY on mobile (hidden on desktop md:hidden) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white z-40 flex shadow-lg">
        {navTabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-xs font-medium flex flex-col items-center justify-center ${
              tab === t.id ? 'text-teal-600 font-semibold' : 'text-slate-400'
            } ${t.id === 'darurat' ? 'text-red-500' : ''}`}
          >
            {t.id === 'darurat' ? <Shield size={16} className="mb-0.5" /> : null}
            {t.label.split(' ')[0]}
          </button>
        ))}
      </nav>

      {sos && <SOSModal type={sos} onClose={() => setSos(null)} />}
    </div>
  )
}
