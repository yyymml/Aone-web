import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PaperCraft from './pages/PaperCraft'
import Products from './pages/Products'
import ShroudTryOn from './pages/ShroudTryOn'
import PetServices from './pages/PetServices'
import DigitalLife from './pages/DigitalLife'
import Memorial from './pages/Memorial'
import Community from './pages/Community'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paper-craft" element={<PaperCraft />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shroud" element={<ShroudTryOn />} />
          <Route path="/pet-services" element={<PetServices />} />
          <Route path="/digital-life" element={<DigitalLife />} />
          <Route path="/memorial" element={<Memorial />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}