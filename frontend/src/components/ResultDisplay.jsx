import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ResultDisplay.css'

const ResultDisplay = ({ originalImage, processedImage, isVideo, isProcessing }) => {
  const [viewMode, setViewMode] = useState('split') // 'split', 'original', 'processed'
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value)
  }

  return (
    <motion.div 
      className="result-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="result-header">
        <h3 className="result-title">
          <span>🖼️</span>
          Sonuç Görüntüsü
        </h3>

        {originalImage && processedImage && !isVideo && (
          <div className="view-toggle">
            <button 
              className={viewMode === 'original' ? 'active' : ''} 
              onClick={() => setViewMode('original')}
            >
              Orijinal
            </button>
            <button 
              className={viewMode === 'split' ? 'active' : ''} 
              onClick={() => setViewMode('split')}
            >
              Karşılaştır
            </button>
            <button 
              className={viewMode === 'processed' ? 'active' : ''} 
              onClick={() => setViewMode('processed')}
            >
              İşlenmiş
            </button>
          </div>
        )}
      </div>

      <div className="result-content">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div 
              className="processing-state"
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="processing-animation">
                <div className="processing-ring"></div>
                <span className="processing-icon">🧠</span>
              </div>
              <p>Yapay zeka görüntüyü işliyor...</p>
              <span className="processing-hint">Bu birkaç saniye sürebilir</span>
            </motion.div>
          ) : !originalImage && !processedImage ? (
            <motion.div 
              className="empty-state"
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="empty-icon">📷</span>
              <p>Henüz bir dosya yüklenmedi</p>
              <span className="empty-hint">
                Sol panelden {isVideo ? 'video' : 'görüntü'} yükleyin
              </span>
            </motion.div>
          ) : isVideo ? (
            <motion.div 
              className="video-result"
              key="video"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {processedImage ? (
                <video 
                  controls 
                  className="result-video"
                  autoPlay
                  key={processedImage}
                >
                  <source src={processedImage} type="video/mp4" />
                  Tarayıcınız video etiketini desteklemiyor.
                </video>
              ) : originalImage ? (
                <video controls className="result-video preview-video">
                  <source src={originalImage} type="video/mp4" />
                  Tarayıcınız video etiketini desteklemiyor.
                </video>
              ) : (
                <div className="video-preview">
                  <span>🎬</span>
                  <p>Video hazır, işlemeyi başlatın</p>
                </div>
              )}
            </motion.div>
          ) : viewMode === 'split' && originalImage && processedImage ? (
            <motion.div 
              className="comparison-view"
              key="comparison"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="comparison-container">
                <div 
                  className="comparison-original"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img src={originalImage} alt="Orijinal" />
                  <span className="image-label">Orijinal</span>
                </div>
                <div 
                  className="comparison-processed"
                  style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                >
                  <img src={processedImage} alt="İşlenmiş" />
                  <span className="image-label">İşlenmiş</span>
                </div>
                <div 
                  className="comparison-slider"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="slider-handle">
                    <span>↔</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="slider-input"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="single-view"
              key="single"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <img 
                src={viewMode === 'processed' && processedImage ? processedImage : originalImage} 
                alt={viewMode === 'processed' ? 'İşlenmiş' : 'Orijinal'} 
                className="result-image"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {processedImage && (
        <motion.div 
          className="result-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a 
            href={processedImage} 
            download={isVideo ? "processed_video.mp4" : "processed_image.jpg"}
            className="download-btn"
          >
            <span>💾</span>
            {isVideo ? 'Videoyu İndir' : 'İndir'}
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ResultDisplay

