import './App.css'
import Button from './components/Button'
import MobileMenu from '../src/components/Mobile/MobileMenu'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Mercury from './Pages/MercuryPage';



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Mercury" replace />} />
        <Route path="/Mercury" element={<Mercury />} />
        <Route path="/Venus" element={<h1>Venus</h1>} />
        <Route path="/Earth" element={<h1>Earth</h1>} />
        <Route path="/Mars" element={<h1>Mars</h1>} />
        <Route path="/Jupiter" element={<h1>Jupiter</h1>} />
        <Route path="/Saturn" element={<h1>Saturn</h1>} />
        <Route path="/Uranus" element={<h1>Uranus</h1>} />
        <Route path="/Neptune" element={<h1>Neptune</h1>} />
      </Routes>
    </Router>
    </>
  )
}
export default App
