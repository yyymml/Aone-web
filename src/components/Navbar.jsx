import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/paper-craft', label: '纸扎定制' },
    { path: '/products', label: '精选商品' },
    { path: '/shroud', label: '寿衣试穿' },
    { path: '/pet-services', label: '毛星驿站' },
    { path: '/digital-life', label: '毛孩子星球' },
    { path: '/memorial', label: '云祭扫' },
    { path: '/community', label: '生命社区' },
  ]

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🕊️</span>
          <span className="brand-text">安往</span>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}