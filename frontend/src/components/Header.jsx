import React from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <motion.div 
          className="logo-section"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo">
            <span className="logo-icon">👁️</span>
            <div className="logo-text">
              <h1>Bilgisayarla Görü</h1>
              <span className="logo-subtitle">
                AI Vision Studio - Yüksek Lisans Projesi
              </span>
            </div>
          </div>
        </motion.div>

        <motion.nav 
          className="nav-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>API Aktif</span>
          </div>
          
          <a 
            href="http://localhost:8000/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            <span>📚</span>
            API Docs
          </a>
        </motion.nav>
      </div>

      {/* Dekoratif çizgi */}
      <motion.div 
        className="header-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ 
          background: 'linear-gradient(90deg, transparent, #f093fb, transparent)'
        }}
      />
    </header>
  )
}

export default Header
