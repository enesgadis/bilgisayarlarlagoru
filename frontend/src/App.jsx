import React from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import ComputerVisionLab from './components/ComputerVisionLab'
import './App.css'

function App() {
  return (
    <div className="app">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#0a0a1a',
            color: '#fff',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(10px)'
          }
        }}
      />
      
      <Header />
      
      <main className="main-content">
        <ComputerVisionLab />
      </main>

      <footer className="footer">
        <p>AI Vision Studio © 2024 - Bilgisayarla Görü Projesi</p>
        <p className="tech-stack">FastAPI • OpenCV • MediaPipe • React</p>
      </footer>
    </div>
  )
}

export default App
