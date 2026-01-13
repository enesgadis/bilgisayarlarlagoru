import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import './FileUploader.css'

const FileUploader = ({ onFileSelect, acceptedTypes, currentFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes === 'image/*' 
      ? { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] }
      : { 'video/*': ['.mp4', '.avi', '.mov', '.webm'] },
    multiple: false
  })

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <motion.div 
      className="uploader-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="uploader-title">
        <span>📁</span>
        Dosya Yükle
      </h3>

      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''} ${currentFile ? 'has-file' : ''}`}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {currentFile ? (
            <motion.div 
              className="file-preview"
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="file-icon">
                {acceptedTypes === 'image/*' ? '🖼️' : '🎬'}
              </div>
              <div className="file-info">
                <span className="file-name">{currentFile.name}</span>
                <span className="file-size">{formatFileSize(currentFile.size)}</span>
              </div>
              <div className="file-check">✓</div>
            </motion.div>
          ) : (
            <motion.div 
              className="dropzone-content"
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="upload-icon">
                {isDragActive ? '📥' : '☁️'}
              </div>
              <p className="upload-text">
                {isDragActive 
                  ? 'Dosyayı bırakın...' 
                  : 'Dosyayı sürükleyip bırakın veya tıklayın'}
              </p>
              <span className="upload-hint">
                {acceptedTypes === 'image/*' 
                  ? 'JPEG, PNG, GIF, WebP desteklenir'
                  : 'MP4, AVI, MOV, WebM desteklenir'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default FileUploader

