import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Monitor,
  Cog,
  Users,
  Bell,
  MessageSquare,
  TrendingUp,
  Map,
  FileText,
  Download,
  Server,
  MapPin,
  Wifi,
  ScrollText,
  LogOut,
} from "lucide-react";

// ─── Nav Configs ────────────────────────────────────────────────────────────

const BRANCH_NAV = [
  { label: "Dashboard", to: "/branch-admin", icon: LayoutDashboard },
  { label: "E-Monitoring Live", to: "/e-monitoring", icon: Monitor },
  { label: "Manajemen Wahana", to: "/wahana", icon: Cog },
  { label: "Manajemen Staf", to: "/staf", icon: Users },
  { label: "Alert & Insiden", to: "/alerts", icon: Bell },
  { label: "Kritik & Saran", to: "/feedback", icon: MessageSquare },
  { label: "Prediksi Ekspansi", to: "/expansion", icon: TrendingUp },
];

const GOV_NAV = [
  { label: "Dashboard", to: "/gov-admin", icon: LayoutDashboard },
  { label: "Peta Sebaran", to: "/gov-admin", icon: Map },
  { label: "Proposal Masuk", to: "/expansion-approval", icon: FileText },
  { label: "Laporan & Ekspor", to: "/gov-admin", icon: Download },
];

const SUPER_NAV = [
  { label: "System Overview", to: "/super-admin", icon: Server },
  { label: "Manajemen Destinasi", to: "/super-admin", icon: MapPin },
  { label: "Manajemen Akun", to: "/super-admin", icon: Users },
  { label: "Infrastruktur IoT", to: "/super-admin", icon: Wifi },
  { label: "Audit Log", to: "/super-admin", icon: ScrollText },
];

const USER_INFO = {
  branch: {
    name: "Budi Santoso",
    sub: "Branch Admin · Jatim Park 2",
    initials: "BS",
    avatarBg: "bg-teal-600",
  },
  gov: {
    name: "Dinas Pariwisata",
    sub: "Admin Pemerintah · Kota Batu",
    initials: "DP",
    avatarBg: "bg-slate-500",
  },
  super: {
    name: "Dev Team",
    sub: "Super Admin",
    initials: "SA",
    avatarBg: "bg-slate-700",
  },
};

// ─── Sidebar Component ───────────────────────────────────────────────────────

export default function Sidebar({ role = "branch", active, isOpen = false, onClose }) {
  const navigate = useNavigate();

  const navItems =
    role === "branch" ? BRANCH_NAV : role === "gov" ? GOV_NAV : SUPER_NAV;

  const user = USER_INFO[role] || USER_INFO.branch;

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar panel */}
      <aside
        className={[
          "fixed top-0 left-0 h-full z-40 flex flex-col",
          "bg-[#0F172A] text-slate-100 transition-transform duration-300",
          "w-60",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
        style={{ width: 240 }}
      >
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
          <div className="w-8 h-8 rounded-md bg-teal-600 flex items-center justify-center flex-shrink-0">
            <MapPin size={16} className="text-white" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            WisataHub
          </span>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${user.avatarBg}`}
          >
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.sub}</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.to;
            return (
              <NavLink
                key={item.label + item.to}
                to={item.to}
                onClick={onClose}
                className={() =>
                  [
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  ].join(" ")
                }
              >
                <Icon size={16} className="flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut size={16} className="flex-shrink-0" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
