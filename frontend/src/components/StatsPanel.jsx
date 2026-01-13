import React from 'react'
import { motion } from 'framer-motion'
import './StatsPanel.css'

const StatsPanel = ({ stats }) => {
  if (!stats) return null

  const getBrightnessLevel = (brightness) => {
    if (brightness < 85) return { label: 'Koyu', color: '#7b2cbf' }
    if (brightness < 170) return { label: 'Normal', color: '#00f5d4' }
    return { label: 'Parlak', color: '#ff6b6b' }
  }

  const brightnessInfo = getBrightnessLevel(stats.brightness)

  return (
    <motion.div 
      className="stats-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3 className="stats-title">
        <span>📊</span>
        Görüntü Analizi
      </h3>

      <div className="stats-grid">
        {/* Boyut */}
        <div className="stat-card">
          <span className="stat-icon">📐</span>
          <div className="stat-content">
            <span className="stat-label">Boyut</span>
            <span className="stat-value">
              {stats.dimensions.width} × {stats.dimensions.height}
            </span>
          </div>
        </div>

        {/* Toplam Piksel */}
        <div className="stat-card">
          <span className="stat-icon">🔢</span>
          <div className="stat-content">
            <span className="stat-label">Toplam Piksel</span>
            <span className="stat-value">
              {(stats.total_pixels / 1000000).toFixed(2)} MP
            </span>
          </div>
        </div>

        {/* Parlaklık */}
        <div className="stat-card">
          <span className="stat-icon">💡</span>
          <div className="stat-content">
            <span className="stat-label">Parlaklık</span>
            <span className="stat-value" style={{ color: brightnessInfo.color }}>
              {Math.round(stats.brightness)} ({brightnessInfo.label})
            </span>
          </div>
        </div>

        {/* Kanal Sayısı */}
        <div className="stat-card">
          <span className="stat-icon">🎨</span>
          <div className="stat-content">
            <span className="stat-label">Kanallar</span>
            <span className="stat-value">{stats.channels} (RGB)</span>
          </div>
        </div>
      </div>

      {/* Renk Ortalamaları */}
      <div className="color-stats">
        <h4>Renk Dağılımı</h4>
        <div className="color-bars">
          <div className="color-bar">
            <div className="bar-label">
              <span className="color-dot" style={{ background: '#ff4444' }}></span>
              Kırmızı
            </div>
            <div className="bar-track">
              <motion.div 
                className="bar-fill red"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.mean_values.R / 255) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="bar-value">{Math.round(stats.mean_values.R)}</span>
          </div>
          
          <div className="color-bar">
            <div className="bar-label">
              <span className="color-dot" style={{ background: '#44ff44' }}></span>
              Yeşil
            </div>
            <div className="bar-track">
              <motion.div 
                className="bar-fill green"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.mean_values.G / 255) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </div>
            <span className="bar-value">{Math.round(stats.mean_values.G)}</span>
          </div>
          
          <div className="color-bar">
            <div className="bar-label">
              <span className="color-dot" style={{ background: '#4444ff' }}></span>
              Mavi
            </div>
            <div className="bar-track">
              <motion.div 
                className="bar-fill blue"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.mean_values.B / 255) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <span className="bar-value">{Math.round(stats.mean_values.B)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StatsPanel

