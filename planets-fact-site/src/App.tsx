import './App.css'
import Button from './components/Button'
import MobileMenu from '../src/components/Mobile/MobileMenu'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Mercury from './Pages/MercuryPage';
import VenusPage from './Pages/VenusPage';
import EarthPage from './Pages/EarthPage';
import JupiterPage from './Pages/JupiterPage';
import MarsPage from './Pages/MarsPage';
import SaturnPage from './Pages/SaturnPage';
import UranusPage from './Pages/UranusPage';
import NeptunePage from './Pages/NeptunePage';



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Mercury" replace />} />
        <Route path="/Mercury" element={<Mercury />} />
        <Route path="/Venus" element={<VenusPage />} />
        <Route path="/Earth" element={<EarthPage />} />
        <Route path="/Mars" element={<MarsPage />} />
        <Route path="/Jupiter" element={<JupiterPage />} />
        <Route path="/Saturn" element={<SaturnPage />} />
        <Route path="/Uranus" element={<UranusPage />} />
        <Route path="/Neptune" element={<NeptunePage />} />
      </Routes>
    </Router>
    </>
  )
}
export default App
