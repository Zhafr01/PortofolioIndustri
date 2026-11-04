import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowLeft,
  User,
  MapPin,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ─── data ───────────────────────────────────────────────────────────────────
const trendData = [
  { day: 'Sen', visitors: 1420 },
  { day: 'Sel', visitors: 1875 },
  { day: 'Rab', visitors: 1560 },
  { day: 'Kam', visitors: 2210 },
  { day: 'Jum', visitors: 2680 },
  { day: 'Sab', visitors: 3050 },
  { day: 'Min', visitors: 2740 },
];

const destinations = [
  'Jatim Park 2',
  'Museum Angkut',
  'Batu Night Spectacular',
  'Eco Green Park',
  'Predator Fun Park',
];

const roles = [
  { label: 'Super Admin', route: '/super-admin' },
  { label: 'Admin Instansi Pemerintah', route: '/gov-admin' },
  { label: 'Branch Admin / Pengelola', route: '/branch-admin' },
  { label: 'Technical Staff', route: '/technical' },
];

// ─── component ───────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  function validate() {
    const newErrors = { email: '', password: '' };
    let valid = true;
    if (!email.trim()) {
      newErrors.email = 'Email tidak boleh kosong.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Format email tidak valid.';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Kata sandi tidak boleh kosong.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const selected = roles.find((r) => r.label === role) ?? roles[2]; // default branch-admin
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(selected.route);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Left Panel ───────────────────────────────────────────────────── */}
      <div className="hidden md:flex md:w-[45%] bg-slate-900 flex-col relative overflow-hidden">
        {/* Teal accent strip at top */}
        <div className="h-1 bg-teal-600 w-full flex-shrink-0" />

        <div className="flex flex-col flex-1 px-10 py-9">
          {/* Back link */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-slate-500 hover:text-teal-400 text-xs transition-colors w-fit mb-10"
          >
            <ArrowLeft size={13} />
            Kembali ke Beranda
          </Link>

          {/* Logo & name */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-teal-600 flex items-center justify-center rounded-lg flex-shrink-0 shadow-sm">
              <MapPin size={15} className="text-white" />
            </div>
            <h1
              className="text-white text-2xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Wisata Batu Platform
            </h1>
          </div>
          <p className="text-slate-500 text-sm mb-10 leading-relaxed max-w-xs">
            Sistem monitoring destinasi wisata terpadu untuk pengunjung, pengelola, dan pemerintah
            Kota Batu.
          </p>

          {/* Destination list */}
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">Destinasi Aktif</p>
          <div className="flex flex-col gap-2.5 mb-10">
            {destinations.map((d) => (
              <div key={d} className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin size={12} className="text-teal-500 shrink-0" />
                {d}
              </div>
            ))}
          </div>

          {/* Area chart */}
          <div className="mt-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3">Tren Kunjungan Minggu Ini</p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: 6,
                    color: '#e2e8f0',
                  }}
                  formatter={(v) => [v.toLocaleString('id-ID'), 'Pengunjung']}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#0D9488"
                  strokeWidth={2}
                  fill="url(#tealGrad)"
                  animationDuration={2000}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Right Panel ──────────────────────────────────────────────────── */}
      <div className="flex-1 bg-white flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10">

        {/* Mobile back link */}
        <div className="md:hidden mb-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-slate-500 hover:text-teal-600 text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            Beranda
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2
              className="text-3xl text-slate-900 mb-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Masuk ke Platform
            </h2>
            <p className="text-sm text-slate-500">
              Gunakan akun yang sesuai dengan peran Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@contoh.com"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-md bg-white text-slate-800 placeholder-slate-300 outline-none transition-all focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 ${
                    errors.email ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Kata Sandi</label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-md bg-white text-slate-800 placeholder-slate-300 outline-none transition-all focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 ${
                    errors.password ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Role dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Peran</label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none pl-10 pr-9 py-2.5 text-sm border border-slate-200 rounded-md bg-white text-slate-800 outline-none transition-all focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="" disabled>
                    Pilih peran Anda
                  </option>
                  {roles.map((r) => (
                    <option key={r.label} value={r.label}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-2">
              <a href="#" className="text-xs text-teal-600 hover:text-teal-700 transition-colors">
                Lupa kata sandi?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 text-white text-sm font-semibold rounded-md hover:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Memproses...
                </>
              ) : (
                'Masuk ke Platform'
              )}
            </button>
          </form>

          {/* Guest access */}
          <div className="mt-6 p-4 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-teal-800">Pengunjung?</p>
              <p className="text-xs text-teal-700 mt-0.5">Akses aplikasi pengunjung tanpa perlu login.</p>
            </div>
            <Link
              to="/visitor"
              className="flex-shrink-0 px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-md hover:bg-teal-700 transition-colors"
            >
              Masuk sebagai Pengunjung
            </Link>
          </div>

          {/* Footer note */}
          <p className="text-xs text-slate-400 mt-5 text-center border-t border-slate-100 pt-5">
            Belum punya akun?{' '}
            <span className="text-slate-700 font-medium">Hubungi pengelola platform</span>
          </p>
        </div>
      </div>
    </div>
  );
}
