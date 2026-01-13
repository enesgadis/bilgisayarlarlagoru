import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import FileUploader from './FileUploader'
import ResultDisplay from './ResultDisplay'
import StatsPanel from './StatsPanel'
import WebcamProcessor from './WebcamProcessor'
import './ComputerVisionLab.css'

const API_URL = 'http://localhost:8000'

// Bilgisayarlı Görü Kategorileri - Çalışan Modlar
const categories = [
  {
    id: 'face',
    name: 'Yüz Analizi',
    icon: '👤',
    modes: [
      { id: 'detection', label: 'Yüz Tespiti', icon: '👤', desc: 'BlazeFace ile yüz algılama' },
      { id: 'face_mesh', label: 'Yüz Mesh (468 nokta)', icon: '🔷', desc: 'MediaPipe Face Mesh' },
      { id: 'face_landmarks', label: 'Yüz Landmarkları', icon: '📍', desc: '468 noktalı landmark tespiti' },
    ]
  },
  {
    id: 'body',
    name: 'Vücut & Hareket',
    icon: '🏃',
    modes: [
      { id: 'pose', label: 'Poz Tahmini', icon: '🏃', desc: '33 noktalı vücut pozu (BlazePose)' },
      { id: 'hands', label: 'El Tespiti', icon: '✋', desc: '21 noktalı el iskeleti' },
      { id: 'gesture', label: 'Jest Tanıma', icon: '👌', desc: 'El hareketleri tanıma' },
      { id: 'action', label: 'Aksiyon Tanıma', icon: '🎬', desc: 'İnsan aktivitesi tespiti' },
    ]
  },
  {
    id: 'object',
    name: 'Nesne Tespiti',
    icon: '📦',
    modes: [
      { id: 'contours', label: 'Kontur Analizi', icon: '⭕', desc: 'Şekil ve kontur tespiti' },
      { id: 'text_detection', label: 'Metin Bölgesi Tespiti', icon: '🔍', desc: 'MSER ile metin algılama' },
    ]
  },
  {
    id: 'segmentation',
    name: 'Segmentasyon',
    icon: '🎨',
    modes: [
      { id: 'selfie', label: 'Selfie Segmentation', icon: '🤳', desc: 'Portre modu efekti (MediaPipe)' },
      { id: 'background', label: 'Arka Plan Çıkarma', icon: '🌅', desc: 'GrabCut algoritması' },
    ]
  }
]

const ComputerVisionLab = () => {
  const [activeTab, setActiveTab] = useState('image')
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('face')
  const [selectedMode, setSelectedMode] = useState('detection')
  const [processedResult, setProcessedResult] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [imageStats, setImageStats] = useState(null)
  const [originalPreview, setOriginalPreview] = useState(null)
  const [detectionResults, setDetectionResults] = useState(null)

  const handleFileSelect = useCallback((file) => {
    setSelectedFile(file)
    setProcessedResult(null)
    setImageStats(null)
    setDetectionResults(null)
    
    const reader = new FileReader()
    reader.onload = (e) => setOriginalPreview(e.target.result)
    reader.readAsDataURL(file)
  }, [])

  const handleProcess = async () => {
    if (!selectedFile) {
      toast.error('Lütfen bir dosya seçin')
      return
    }

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('mode', selectedMode)

    try {
      const endpoint = activeTab === 'video' ? '/process-video/' : '/process-image/'
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('İşleme hatası')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setProcessedResult(url)
      
      // İstatistikleri al (sadece görüntü için)
      if (activeTab === 'image') {
        const statsFormData = new FormData()
        statsFormData.append('file', selectedFile)
        const statsResponse = await fetch(`${API_URL}/analyze-image/`, {
          method: 'POST',
          body: statsFormData
        })
        if (statsResponse.ok) {
          const stats = await statsResponse.json()
          setImageStats(stats)
        }
      }

      toast.success('Analiz tamamlandı!')
    } catch (error) {
      console.error('Error:', error)
      toast.error('İşleme sırasında hata oluştu')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setProcessedResult(null)
    setImageStats(null)
    setOriginalPreview(null)
    setDetectionResults(null)
  }

  const currentCategory = categories.find(c => c.id === selectedCategory)

  return (
    <motion.div 
      className="computer-vision-lab"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Başlık */}
      <div className="lab-header cv-header">
        <div className="lab-title-section">
          <span className="lab-icon">👁️</span>
          <div>
            <h1>Bilgisayarla Görü</h1>
            <p>MediaPipe derin öğrenme modelleri</p>
          </div>
        </div>

        {/* Tab Seçici */}
        <div className="tab-switcher cv-tabs">
          <button 
            className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
            onClick={() => { setActiveTab('image'); handleReset(); }}
          >
            <span>🖼️</span> Görüntü
          </button>
          <button 
            className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => { setActiveTab('video'); handleReset(); }}
          >
            <span>🎬</span> Video
          </button>
          <button 
            className={`tab-btn ${activeTab === 'webcam' ? 'active' : ''}`}
            onClick={() => { setActiveTab('webcam'); handleReset(); }}
          >
            <span>📹</span> Webcam
          </button>
        </div>
      </div>

      <div className="lab-content">
        {/* Sol Panel - Kontroller */}
        <div className="control-panel cv-control">
          {/* Dosya Yükleme */}
          {activeTab !== 'webcam' && (
            <FileUploader 
              onFileSelect={handleFileSelect}
              acceptedTypes={activeTab === 'video' ? 'video/*' : 'image/*'}
              currentFile={selectedFile}
            />
          )}

          {activeTab === 'webcam' && (
            <div className="webcam-info">
              <span className="webcam-icon">📹</span>
              <p>Gerçek Zamanlı AI İşleme</p>
              <span className="webcam-hint">Sağ panelde webcam kontrollerini kullanın</span>
            </div>
          )}

          {/* Kategori Seçimi */}
          <div className="category-selector cv-category">
            <h3><span>🧠</span> AI Modülü</h3>
            <div className="category-grid">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setSelectedMode(categories.find(c => c.id === cat.id).modes[0].id)
                  }}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-name">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mod Seçimi */}
          <div className="mode-selector-compact cv-modes">
            <h3><span>⚡</span> Algoritma</h3>
            <div className="modes-list">
              {currentCategory?.modes.map(mode => (
                <motion.button
                  key={mode.id}
                  className={`mode-item ${selectedMode === mode.id ? 'active' : ''}`}
                  onClick={() => setSelectedMode(mode.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mode-icon">{mode.icon}</span>
                  <div className="mode-info">
                    <span className="mode-label">{mode.label}</span>
                    <span className="mode-desc">{mode.desc}</span>
                  </div>
                  {selectedMode === mode.id && (
                    <motion.span 
                      className="check-mark"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* İşlem Butonu */}
          <motion.button
            className="process-btn-large cv-process"
            onClick={handleProcess}
            disabled={!selectedFile || isProcessing || activeTab === 'webcam'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span>
                Analiz Ediliyor...
              </>
            ) : (
              <>
                <span>🧠</span>
                AI Analizi Başlat
              </>
            )}
          </motion.button>

          {selectedFile && (
            <button className="reset-btn" onClick={handleReset}>
              🔄 Sıfırla
            </button>
          )}
        </div>

        {/* Sağ Panel - Sonuçlar */}
        <div className="result-panel cv-result">
          {activeTab === 'webcam' ? (
            <WebcamProcessor modes={categories} projectType="vision" />
          ) : (
            <>
              <ResultDisplay 
                originalImage={originalPreview}
                processedImage={processedResult}
                isVideo={activeTab === 'video'}
                isProcessing={isProcessing}
              />

              {/* Detection Results */}
              {detectionResults && (
                <motion.div 
                  className="detection-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3>🎯 Tespit Sonuçları</h3>
                  <div className="results-grid">
                    {detectionResults.map((result, idx) => (
                      <div key={idx} className="result-item">
                        <span className="result-label">{result.label}</span>
                        <span className="result-confidence">{result.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {imageStats && <StatsPanel stats={imageStats} />}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ComputerVisionLab
