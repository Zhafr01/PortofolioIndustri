import { useState } from 'react'
import { Shield, QrCode, Bell, MapPin, ChevronRight, Star, Clock, AlertTriangle, PhoneCall, CheckCircle2, User, X, Camera, Ticket, History, MessageSquare, Settings, HelpCircle, Check } from 'lucide-react'
import AnimatedBar from '../components/AnimatedBar'

const initialDestinations = [
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
  const [targetRide, setTargetRide] = useState('Jatim Park 2: Roller Coaster Alpha')
  const [submitted, setSubmitted] = useState(false)
  const [userFeedbackList, setUserFeedbackList] = useState([
    { dest: 'Jatim Park 2: Roller Coaster Alpha', rating: 5, tipe: 'Saran', text: 'Pengalaman sangat seru, antrian tertib dengan panduan sensor.', date: 'Hari ini, 13:40' },
    { dest: 'Museum Angkut: Gangster Town', rating: 4, tipe: 'Pujian', text: 'Koleksi mobil klasik sangat terawat dan edukatif.', date: '12 Okt 2026' }
  ])

  // Modals state
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [activeProfileModal, setActiveProfileModal] = useState(null) // 'ticket' | 'history' | 'feedback' | 'settings' | 'help'
  const [currentLocation, setCurrentLocation] = useState('Zona Wahana Utama, Jatim Park 2')
  const [callToast, setCallToast] = useState('')

  // Settings toggles
  const [settingNotif, setSettingNotif] = useState(true)
  const [settingGPS, setSettingGPS] = useState(true)
  const [settingCrowdAlert, setSettingCrowdAlert] = useState(true)

  const navTabs = [
    { id: 'beranda',   label: 'Beranda' },
    { id: 'destinasi', label: 'Destinasi & Ulasan' },
    { id: 'darurat',   label: 'Pusat Bantuan & Keamanan' },
    { id: 'profil',    label: 'Profil Pengunjung' },
  ]

  function handleSelectDestinationForReview(destName) {
    setTargetRide(`${destName}: Wahana Utama`)
    setTab('destinasi')
    setSubmitted(false)
  }

  function handleSimulateQRScan() {
    setTimeout(() => {
      setCurrentLocation('Jatim Park 2 • Zona Wahana Air & Bianglala')
      setQrModalOpen(false)
    }, 600)
  }

  function handleSubmitReview() {
    if (!komen) return
    setUserFeedbackList(prev => [
      { dest: targetRide, rating, tipe, text: komen, date: 'Baru saja' },
      ...prev
    ])
    setSubmitted(true)
  }

  function triggerCall(number, name) {
    setCallToast(`Menghubungkan panggilan ke ${name} (${number})...`)
    setTimeout(() => setCallToast(''), 3000)
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Toast Notification */}
      {callToast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in duration-200">
          <PhoneCall size={14} className="text-teal-400 animate-pulse" />
          <span>{callToast}</span>
        </div>
      )}

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
                <p className="text-xs text-teal-200">{currentLocation}</p>
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
              <button
                onClick={() => setTab('profil')}
                className="hidden sm:flex items-center gap-2 pl-2 border-l border-teal-600 hover:opacity-90 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                  AP
                </div>
                <div className="text-left text-xs">
                  <p className="font-medium text-white leading-none">Andi Pratama</p>
                  <p className="text-teal-200 text-[10px] mt-0.5">Pengunjung Umum</p>
                </div>
              </button>
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
                <button
                  onClick={() => setQrModalOpen(true)}
                  className="bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded border border-slate-200 text-xs text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <MapPin size={14} className="text-teal-600" />
                  <span>{currentLocation}</span>
                </button>
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
                    {initialDestinations.slice(0, 3).map((d) => (
                      <div
                        key={d.id}
                        onClick={() => handleSelectDestinationForReview(d.name)}
                        className="group rounded-md relative overflow-hidden bg-slate-900 border border-slate-200 flex flex-col h-40 cursor-pointer shadow-xs hover:border-teal-400 transition-all"
                      >
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
                    {initialDestinations.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => handleSelectDestinationForReview(d.name)}
                        className="p-3 bg-slate-50 rounded-md border border-slate-100 flex flex-col justify-between cursor-pointer hover:bg-slate-100/80 transition-colors"
                      >
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
                  <button 
                    onClick={() => setQrModalOpen(true)}
                    className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                  >
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
                  {initialDestinations.map(d => (
                    <div
                      key={d.id}
                      className="border border-slate-200 rounded-md overflow-hidden bg-white hover:border-teal-400 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-32 bg-slate-800 relative">
                          <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                          <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${levelColor[d.level]}`}>
                            {d.level} ({d.occ}%)
                          </span>
                        </div>
                        <div className="p-3">
                          <p className="font-semibold text-sm text-slate-900">{d.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{d.zone}</p>
                        </div>
                      </div>
                      <div className="px-3 pb-3">
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="text-slate-400">{d.jam}</span>
                          <button
                            onClick={() => handleSelectDestinationForReview(d.name)}
                            className="text-teal-600 font-semibold hover:underline"
                          >
                            Beri Masukan →
                          </button>
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
              <p className="text-xs text-teal-700 font-medium mb-4">{targetRide}</p>

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
                    onClick={handleSubmitReview}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded transition-colors shadow-xs"
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

        {/* PUSAT BANTUAN & KEAMANAN TAB */}
        {tab === 'darurat' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900">Pusat Pelaporan Gangguan Keamanan</p>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">
                    Fitur ini terhubung langsung ke pos keamanan destinasi dan pengawas CCTV. Gunakan saat terjadi insiden mendesak di sekitar Anda.
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
                    <p className="text-sm font-semibold text-slate-800">{currentLocation}</p>
                    <p className="text-xs text-slate-500">Akurasi GPS ± 5 meter • Terverifikasi Smart Gate</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Kontak Petugas Langsung</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => triggerCall('(0341) 597-777', 'Pos Keamanan Jatim Park 2')}
                    className="flex items-center gap-2 p-2.5 bg-slate-50 hover:bg-slate-100 rounded border border-slate-100 text-left transition-colors"
                  >
                    <PhoneCall size={15} className="text-teal-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Pos Keamanan Utama</p>
                      <p className="text-slate-500">(0341) 597-777</p>
                    </div>
                  </button>
                  <button
                    onClick={() => triggerCall('112', 'Panggilan Darurat Kota Batu')}
                    className="flex items-center gap-2 p-2.5 bg-slate-50 hover:bg-slate-100 rounded border border-slate-100 text-left transition-colors"
                  >
                    <PhoneCall size={15} className="text-teal-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Call Center Pariwisata Batu</p>
                      <p className="text-slate-500">112 / (0341) 591-111</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <p className="text-xs text-slate-500">Belum check-in? Pindai QR di tiang wahana untuk kalibrasi lokasi.</p>
                <button 
                  onClick={() => setQrModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 border border-teal-600 text-teal-600 hover:bg-teal-50 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
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
                <p className="text-xs text-slate-500">Akun Pengunjung Terverifikasi • ID: WB-2026-8849</p>
                <span className="inline-block mt-1 text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded border border-teal-200">
                  Status: Sedang di Lokasi
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {[
                { id: 'ticket',   title: 'Destinasi Aktif', desc: 'Jatim Park 2 • Tiket Reguler Terpindai', icon: Ticket },
                { id: 'history',  title: 'Riwayat Kunjungan', desc: '3 Kunjungan dalam 6 bulan terakhir', icon: History },
                { id: 'feedback', title: 'Ulasan & Feedback Terkirim', desc: `${userFeedbackList.length} masukan tersimpan di profil`, icon: MessageSquare },
                { id: 'settings', title: 'Pengaturan Notifikasi & Lokasi', desc: 'Kelola izin akses sensor dan alert', icon: Settings },
                { id: 'help',     title: 'Pusat Bantuan & Kebijakan Privasi', desc: 'Panduan operasional dan SOP keselamatan', icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveProfileModal(item.id)}
                    className="py-3.5 flex justify-between items-center hover:bg-slate-50 px-2 rounded cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                        <p className="text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                )
              })}
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

      {/* SOS Modal */}
      {sos && <SOSModal type={sos} onClose={() => setSos(null)} />}

      {/* QR Code Scanner Simulation Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-2xl relative flex flex-col gap-4 text-center">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              aria-label="Tutup pemindai"
            >
              <X size={20} />
            </button>

            <div>
              <p className="font-display text-lg text-slate-900">Pindai QR Lokasi Wahana</p>
              <p className="text-xs text-slate-500 mt-0.5">Arahkan kamera ke kode QR di tiang zona wahana</p>
            </div>

            {/* Viewfinder Simulator */}
            <div className="w-56 h-56 mx-auto bg-slate-900 rounded-lg relative overflow-hidden flex items-center justify-center border-2 border-teal-500 shadow-inner">
              <Camera size={36} className="text-white/40" />
              {/* Scanline animation */}
              <div className="absolute left-0 right-0 h-1 bg-teal-400 shadow-[0_0_8px_#2dd4bf] animate-bounce top-1/3" />
              <div className="absolute inset-4 border border-dashed border-white/40 rounded pointer-events-none" />
            </div>

            <p className="text-xs text-slate-500">Mendeteksi koordinat tiang zona wahana...</p>

            <button
              onClick={handleSimulateQRScan}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded transition-colors shadow-xs"
            >
              Simulasi Pindai Berhasil
            </button>
          </div>
        </div>
      )}

      {/* Modal: Destinasi Aktif / Tiket Digital */}
      {activeProfileModal === 'ticket' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <p className="text-xs text-teal-600 uppercase tracking-widest font-bold">E-TIKET AKTIF</p>
                <h3 className="font-display text-xl text-slate-900 mt-0.5">Jatim Park 2 (Reguler Terusan)</h3>
              </div>
              <button onClick={() => setActiveProfileModal(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center flex flex-col items-center gap-3">
              <div className="w-40 h-40 bg-white border border-slate-200 rounded p-2 flex items-center justify-center shadow-xs">
                {/* SVG Barcode QR */}
                <div className="w-full h-full flex flex-col justify-between p-2">
                  <div className="grid grid-cols-4 gap-1.5 h-full">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`rounded-xs ${i % 3 === 0 || i % 5 === 0 ? 'bg-slate-900' : 'bg-slate-200'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="font-mono font-bold text-sm text-slate-900 tracking-wider">#TKT-JP2-884920</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Berlaku hingga: Hari ini, 16.30 WIB</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
              <p>Pemegang Tiket: <strong className="text-slate-800">Andi Pratama (1 Orang)</strong></p>
              <p>Status Smart Gate: <strong className="text-teal-600">Check-in Terverifikasi</strong></p>
              <p>Fasilitas Termasuk: Batu Secret Zoo, Museum Satwa, Sweet Paradise</p>
            </div>

            <button
              onClick={() => setActiveProfileModal(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded transition-colors"
            >
              Tutup E-Tiket
            </button>
          </div>
        </div>
      )}

      {/* Modal: Riwayat Kunjungan */}
      {activeProfileModal === 'history' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-display text-xl text-slate-900">Riwayat Kunjungan Wisata</h3>
              <button onClick={() => setActiveProfileModal(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs max-h-72 overflow-y-auto">
              {[
                { name: 'Jatim Park 2', date: 'Hari ini, 09:15 WIB', status: 'Selesai Tiket', price: 'Rp 140.000' },
                { name: 'Selecta Taman Bunga', date: '18 Okt 2026', status: 'Selesai Tiket', price: 'Rp 50.000' },
                { name: 'Batu Night Spectacular (BNS)', date: '2 Okt 2026', status: 'Selesai Tiket', price: 'Rp 110.000' },
              ].map((h, i) => (
                <div key={i} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{h.name}</p>
                    <p className="text-slate-400 mt-0.5">{h.date} • {h.status}</p>
                  </div>
                  <span className="font-semibold text-slate-900">{h.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveProfileModal(null)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal: Riwayat Ulasan & Masukan */}
      {activeProfileModal === 'feedback' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-display text-xl text-slate-900">Ulasan &amp; Masukan Anda</h3>
              <button onClick={() => setActiveProfileModal(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs max-h-72 overflow-y-auto">
              {userFeedbackList.map((f, i) => (
                <div key={i} className="py-3 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-slate-800">{f.dest}</p>
                    <span className="text-[10px] text-slate-400">{f.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {'★'.repeat(f.rating)}
                    <span className="text-[10px] text-teal-600 font-semibold bg-teal-50 px-1.5 py-0.2 rounded ml-1">{f.tipe}</span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveProfileModal(null)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal: Pengaturan Notifikasi & Lokasi */}
      {activeProfileModal === 'settings' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl flex flex-col gap-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-display text-xl text-slate-900">Pengaturan Aplikasi</h3>
              <button onClick={() => setActiveProfileModal(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Notifikasi Push</p>
                  <p className="text-slate-500">Menerima info wahana dan status antrian</p>
                </div>
                <button
                  onClick={() => setSettingNotif(!settingNotif)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${settingNotif ? 'bg-teal-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settingNotif ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Akurasi GPS &amp; Sensor</p>
                  <p className="text-slate-500">Deteksi titik wahana otomatis di area destinasi</p>
                </div>
                <button
                  onClick={() => setSettingGPS(!settingGPS)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${settingGPS ? 'bg-teal-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settingGPS ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Peringatan Kepadatan Tinggi</p>
                  <p className="text-slate-500">Pemberitahuan bila wahana melebihi kuota 80%</p>
                </div>
                <button
                  onClick={() => setSettingCrowdAlert(!settingCrowdAlert)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${settingCrowdAlert ? 'bg-teal-600' : 'bg-slate-300'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settingCrowdAlert ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveProfileModal(null)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded transition-colors"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      )}

      {/* Modal: Pusat Bantuan & FAQ */}
      {activeProfileModal === 'help' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-display text-xl text-slate-900">Pusat Bantuan &amp; Panduan</h3>
              <button onClick={() => setActiveProfileModal(null)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs max-h-72 overflow-y-auto">
              {[
                { q: 'Bagaimana cara check-in wahana?', a: 'Pindai kode QR yang terpasang di tiang masuk setiap wahana menggunakan tombol Pindai QR di aplikasi.' },
                { q: 'Apa yang harus dilakukan saat kehilangan barang?', a: 'Buka menu Pusat Bantuan & Keamanan, lalu tekan tombol Lapor Gangguan Keamanan. Petugas pos terdekat akan menghubungi Anda.' },
                { q: 'Apakah tiket berlaku untuk re-entry?', a: 'Ya, tiket terusan berlaku keluar-masuk hingga jam operasional destinasi berakhir dengan verifikasi cap smart gate.' },
                { q: 'Bagaimana cara menghubungi pengelola?', a: 'Hubungi call center pariwisata Batu di nomor 112 atau telepon kantor pos Jatim Park 2 di (0341) 597-777.' }
              ].map((faq, i) => (
                <div key={i} className="py-3">
                  <p className="font-semibold text-slate-800 text-sm mb-1">{faq.q}</p>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveProfileModal(null)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded transition-colors"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
