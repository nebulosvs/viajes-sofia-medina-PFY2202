import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        ✈️ Viajes
      </NavLink>

      <nav className="nav-links" aria-label="Navegación principal">
        <NavLink to="/" end>
          Inicio
        </NavLink>

        <NavLink to="/destinos">
          Destinos
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
