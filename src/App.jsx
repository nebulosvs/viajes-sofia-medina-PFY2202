import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinos from './pages/Destinos'
import DetalleDestino from './pages/DetalleDestino'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:id" element={<DetalleDestino />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
