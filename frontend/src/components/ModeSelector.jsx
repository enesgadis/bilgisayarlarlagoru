import React from 'react'
import { motion } from 'framer-motion'
import './ModeSelector.css'

const imageModes = [
  { id: 'detection', label: 'Yüz Tespiti', icon: '👤', desc: 'Yüz algılama ve işaretleme' },
  { id: 'face_mesh', label: 'Yüz Mesh', icon: '🔷', desc: '468 noktalı yüz ağı' },
  { id: 'hands', label: 'El Tespiti', icon: '✋', desc: 'El iskeleti çıkarma' },
  { id: 'pose', label: 'Poz Tespiti', icon: '🏃', desc: 'Vücut pozu analizi' },
  { id: 'edges', label: 'Kenar Algılama', icon: '📐', desc: 'Canny kenar tespiti' },
  { id: 'blur', label: 'Bulanıklaştırma', icon: '🌫️', desc: 'Gaussian blur' },
  { id: 'contours', label: 'Kontur', icon: '⭕', desc: 'Nesne konturları' },
  { id: 'cartoon', label: 'Karikatür', icon: '🎨', desc: 'Cartoon efekti' },
  { id: 'sketch', label: 'Çizim', icon: '✏️', desc: 'Kalem çizimi' },
  { id: 'emboss', label: 'Kabartma', icon: '🏔️', desc: 'Emboss efekti' },
  { id: 'histogram', label: 'Histogram', icon: '📊', desc: 'Kontrast iyileştirme' },
  { id: 'color_red', label: 'Kırmızı', icon: '🔴', desc: 'Kırmızı segmentasyon' },
  { id: 'color_green', label: 'Yeşil', icon: '🟢', desc: 'Yeşil segmentasyon' },
  { id: 'color_blue', label: 'Mavi', icon: '🔵', desc: 'Mavi segmentasyon' },
]

const videoModes = [
  { id: 'detection', label: 'Yüz Tespiti', icon: '👤', desc: 'Gerçek zamanlı yüz algılama' },
  { id: 'face_mesh', label: 'Yüz Mesh', icon: '🔷', desc: 'Yüz ağı takibi' },
  { id: 'hands', label: 'El Tespiti', icon: '✋', desc: 'El hareketi takibi' },
  { id: 'pose', label: 'Poz Tespiti', icon: '🏃', desc: 'Vücut hareketi analizi' },
  { id: 'motion', label: 'Hareket', icon: '🎯', desc: 'Hareket algılama' },
  { id: 'edges', label: 'Kenar', icon: '📐', desc: 'Kenar tespiti' },
  { id: 'blur', label: 'Blur', icon: '🌫️', desc: 'Bulanıklaştırma' },
]

const ModeSelector = ({ mode, selectedMode, onModeChange }) => {
  const modes = mode === 'image' ? imageModes : videoModes

  return (
    <motion.div 
      className="mode-selector"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="mode-title">
        <span>⚙️</span>
        İşleme Modu
      </h3>

      <div className="modes-grid">
        {modes.map((m, index) => (
          <motion.button
            key={m.id}
            className={`mode-card ${selectedMode === m.id ? 'active' : ''}`}
            onClick={() => onModeChange(m.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mode-icon">{m.icon}</span>
            <div className="mode-info">
              <span className="mode-label">{m.label}</span>
              <span className="mode-desc">{m.desc}</span>
            </div>
            {selectedMode === m.id && (
              <motion.div 
                className="mode-check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default ModeSelector

