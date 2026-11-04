import { useState } from 'react'
import Sidebar from './Sidebar'

export default function PageWrapper({ role = 'branch', active, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        role={role}
        active={active}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-60 min-h-screen">
        {typeof children === 'function'
          ? children({ toggleSidebar: () => setSidebarOpen(v => !v) })
          : children}
      </div>
    </div>
  )
}

