import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SuperAdmin from './pages/SuperAdmin'
import GovAdmin from './pages/GovAdmin'
import ExpansionApproval from './pages/ExpansionApproval'
import BranchAdmin from './pages/BranchAdmin'
import EMonitoring from './pages/EMonitoring'
import WahanaManagement from './pages/WahanaManagement'
import StafManagement from './pages/StafManagement'
import AlertsPage from './pages/AlertsPage'
import FeedbackPage from './pages/FeedbackPage'
import ExpansionPage from './pages/ExpansionPage'
import VisitorApp from './pages/VisitorApp'
import TechnicalApp from './pages/TechnicalApp'

const basename = import.meta.env.BASE_URL   // set by vite 'base' config (e.g. '/PortofolioIndustri/')

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/gov-admin" element={<GovAdmin />} />
        <Route path="/expansion-approval" element={<ExpansionApproval />} />
        <Route path="/branch-admin" element={<BranchAdmin />} />
        <Route path="/e-monitoring" element={<EMonitoring />} />
        <Route path="/wahana" element={<WahanaManagement />} />
        <Route path="/staf" element={<StafManagement />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/expansion" element={<ExpansionPage />} />
        <Route path="/visitor" element={<VisitorApp />} />
        <Route path="/technical" element={<TechnicalApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

