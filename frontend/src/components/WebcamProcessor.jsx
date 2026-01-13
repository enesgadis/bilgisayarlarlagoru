import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import './WebcamProcessor.css'

const API_URL = 'http://localhost:8000'

const WebcamProcessor = ({ modes, projectType }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const processingRef = useRef(false)
  const animationRef = useRef(null)

  const [isStreaming, setIsStreaming] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMode, setSelectedMode] = useState(modes[0]?.modes[0]?.id || 'detection')
  const [processedFrame, setProcessedFrame] = useState(null)
  const [fps, setFps] = useState(0)
  const [facingMode, setFacingMode] = useState('user') // 'user' = ön kamera, 'environment' = arka kamera

  const lastFrameTime = useRef(Date.now())
  const frameCount = useRef(0)

  // Kamerayı başlat
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: facingMode
        },
        audio: false
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setIsStreaming(true)
      toast.success('Kamera başlatıldı!')
    } catch (error) {
      console.error('Kamera hatası:', error)
      toast.error('Kamera erişimi reddedildi veya kamera bulunamadı')
    }
  }

  // Kamerayı durdur
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    processingRef.current = false
    setIsStreaming(false)
    setIsProcessing(false)
    setProcessedFrame(null)
    setFps(0)
  }

  // Kamera değiştir
  const toggleCamera = async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user'
    setFacingMode(newFacingMode)
    
    if (isStreaming) {
      stopCamera()
      setTimeout(() => {
        startCamera()
      }, 500)
    }
  }

  // Frame yakala ve işle
  const captureAndProcess = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !processingRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Video boyutlarını al
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480

    // Frame'i canvas'a çiz
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Canvas'ı blob'a çevir
    canvas.toBlob(async (blob) => {
      if (!blob || !processingRef.current) return

      try {
        const formData = new FormData()
        formData.append('file', blob, 'frame.jpg')
        formData.append('mode', selectedMode)

        const response = await fetch(`${API_URL}/process-image/`, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const processedBlob = await response.blob()
          const url = URL.createObjectURL(processedBlob)
          
          // Önceki URL'i temizle
          if (processedFrame) {
            URL.revokeObjectURL(processedFrame)
          }
          
          setProcessedFrame(url)

          // FPS hesapla
          frameCount.current++
          const now = Date.now()
          if (now - lastFrameTime.current >= 1000) {
            setFps(frameCount.current)
            frameCount.current = 0
            lastFrameTime.current = now
          }
        }
      } catch (error) {
        console.error('Frame işleme hatası:', error)
      }

      // Sonraki frame
      if (processingRef.current) {
        animationRef.current = requestAnimationFrame(captureAndProcess)
      }
    }, 'image/jpeg', 0.8)
  }, [selectedMode, processedFrame])

  // İşlemeyi başlat/durdur
  const toggleProcessing = () => {
    if (isProcessing) {
      processingRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      setIsProcessing(false)
      setFps(0)
    } else {
      processingRef.current = true
      setIsProcessing(true)
      captureAndProcess()
    }
  }

  // Tek frame yakala
  const captureSnapshot = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(async (blob) => {
      if (!blob) return

      try {
        const formData = new FormData()
        formData.append('file', blob, 'snapshot.jpg')
        formData.append('mode', selectedMode)

        toast.loading('İşleniyor...', { id: 'snapshot' })

        const response = await fetch(`${API_URL}/process-image/`, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const processedBlob = await response.blob()
          const url = URL.createObjectURL(processedBlob)
          setProcessedFrame(url)
          toast.success('Görüntü işlendi!', { id: 'snapshot' })
        } else {
          toast.error('İşleme hatası', { id: 'snapshot' })
        }
      } catch (error) {
        toast.error('Bağlantı hatası', { id: 'snapshot' })
      }
    }, 'image/jpeg', 0.9)
  }

  // Görüntüyü indir
  const downloadImage = () => {
    if (!processedFrame) return

    const link = document.createElement('a')
    link.href = processedFrame
    link.download = `webcam_${selectedMode}_${Date.now()}.jpg`
    link.click()
    toast.success('Görüntü indirildi!')
  }

  // Cleanup
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  // Mode değiştiğinde processing'i yeniden başlat
  useEffect(() => {
    if (isProcessing) {
      processingRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setTimeout(() => {
        processingRef.current = true
        captureAndProcess()
      }, 100)
    }
  }, [selectedMode])

  return (
    <div className="webcam-processor">
      {/* Kontroller */}
      <div className="webcam-controls">
        <div className="control-row">
          {!isStreaming ? (
            <motion.button
              className="cam-btn start-btn"
              onClick={startCamera}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>📹</span> Kamerayı Başlat
            </motion.button>
          ) : (
            <>
              <motion.button
                className="cam-btn stop-btn"
                onClick={stopCamera}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>⏹️</span> Durdur
              </motion.button>

              <motion.button
                className={`cam-btn process-btn ${isProcessing ? 'active' : ''}`}
                onClick={toggleProcessing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{isProcessing ? '⏸️' : '▶️'}</span>
                {isProcessing ? 'İşlemeyi Durdur' : 'Gerçek Zamanlı İşle'}
              </motion.button>

              <motion.button
                className="cam-btn snapshot-btn"
                onClick={captureSnapshot}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📸</span> Anlık Görüntü
              </motion.button>

              <motion.button
                className="cam-btn toggle-btn"
                onClick={toggleCamera}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🔄</span>
              </motion.button>
            </>
          )}
        </div>

        {/* Mod Seçimi */}
        {isStreaming && (
          <div className="mode-select-row">
            <label>İşlem Modu:</label>
            <select 
              value={selectedMode} 
              onChange={(e) => setSelectedMode(e.target.value)}
              className="mode-dropdown"
            >
              {modes.map(category => (
                <optgroup key={category.id} label={`${category.icon} ${category.name}`}>
                  {category.modes.map(mode => (
                    <option key={mode.id} value={mode.id}>
                      {mode.icon} {mode.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        )}

        {/* FPS Göstergesi */}
        {isProcessing && (
          <div className="fps-indicator">
            <span className="fps-value">{fps}</span>
            <span className="fps-label">FPS</span>
          </div>
        )}
      </div>

      {/* Video Alanı */}
      <div className="webcam-display">
        <div className="video-container">
          <div className="video-wrapper">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className={isStreaming ? 'active' : ''}
            />
            {!isStreaming && (
              <div className="video-placeholder">
                <span className="placeholder-icon">📹</span>
                <p>Kamerayı başlatmak için butona tıklayın</p>
              </div>
            )}
            <div className="video-label">Orijinal</div>
          </div>

          <div className="video-wrapper processed">
            {processedFrame ? (
              <img src={processedFrame} alt="İşlenmiş" />
            ) : (
              <div className="video-placeholder">
                <span className="placeholder-icon">🖼️</span>
                <p>{isStreaming ? 'İşleme başlatın' : 'Kamera bekleniyor...'}</p>
              </div>
            )}
            <div className="video-label">İşlenmiş ({selectedMode})</div>
          </div>
        </div>

        {/* İndirme butonu */}
        {processedFrame && (
          <motion.button
            className="download-btn"
            onClick={downloadImage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>💾</span> Görüntüyü İndir
          </motion.button>
        )}
      </div>

      {/* Gizli canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default WebcamProcessor
