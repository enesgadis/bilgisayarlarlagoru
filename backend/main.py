"""
AI Vision Studio - Bilgisayarla Görü API
Yazılım Mühendisliği Yüksek Lisans Projesi

FastAPI tabanlı RESTful API servisi
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import uvicorn
import cv2
import numpy as np
import tempfile
import os
from typing import Optional

from video_processor import VideoProcessor

from ai_core import (
    # Bilgisayarlı Görü - Yüz
    process_image_detection,
    process_face_mesh,
    process_face_landmarks,
    
    # Bilgisayarlı Görü - Vücut
    process_hand_detection,
    process_pose_detection,
    process_gesture,
    process_action,
    
    # Bilgisayarlı Görü - Nesne
    process_object_contours,
    process_text_detection,
    
    # Bilgisayarlı Görü - Segmentasyon
    process_selfie,
    process_background,
    
    # Analiz
    analyze_image_stats,
)

app = FastAPI(
    title="AI Vision Studio - Bilgisayarla Görü",
    description="""
    Yapay Zeka Tabanlı Bilgisayarla Görü API'si
    
    ## Özellikler:
    - Yüz Tespiti (BlazeFace)
    - Yüz Mesh (468 landmark)
    - El Takibi (21 landmark)
    - Poz Tahmini (33 landmark)
    - Jest Tanıma
    - Arka Plan Segmentasyonu
    """,
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# DESTEKLENEN MODLAR - SADECE BİLGİSAYARLA GÖRÜ
# ============================================================================

COMPUTER_VISION_MODES = {
    # Yüz
    "detection": process_image_detection,
    "face_mesh": process_face_mesh,
    "face_landmarks": process_face_landmarks,
    
    # Vücut
    "pose": process_pose_detection,
    "hands": process_hand_detection,
    "gesture": process_gesture,
    "action": process_action,
    
    # Nesne
    "contours": process_object_contours,
    "text_detection": process_text_detection,
    
    # Segmentasyon
    "selfie": process_selfie,
    "background": process_background,
}

SUPPORTED_VIDEO_MODES = ["detection", "face_mesh", "hands", "pose", "gesture", "contours", "selfie"]

# Video işlemci instance
video_processor = VideoProcessor()


# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
def read_root():
    """API durum kontrolü"""
    return {
        "message": "AI Vision Studio - Bilgisayarla Görü API",
        "version": "2.0.0",
        "endpoints": {
            "image": "/process-image/",
            "analyze": "/analyze-image/",
            "modes": "/modes"
        }
    }


@app.get("/modes")
def get_modes():
    """Desteklenen işleme modlarını döndürür"""
    return {
        "computer_vision_modes": list(COMPUTER_VISION_MODES.keys()),
        "video_modes": SUPPORTED_VIDEO_MODES,
        "categories": {
            "face": ["detection", "face_mesh", "face_landmarks"],
            "body": ["pose", "hands", "gesture", "action"],
            "object": ["contours", "text_detection"],
            "segmentation": ["selfie", "background"]
        }
    }


@app.post("/process-image/")
async def process_image_endpoint(
    file: UploadFile = File(...),
    mode: str = Form(...)
):
    """
    Görüntü işleme endpoint'i
    
    Bilgisayarla Görü modlarını destekler.
    """
    if mode not in COMPUTER_VISION_MODES:
        raise HTTPException(
            status_code=400,
            detail=f"Geçersiz mod: {mode}. Desteklenen modlar: {list(COMPUTER_VISION_MODES.keys())}"
        )
    
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise HTTPException(status_code=400, detail="Geçersiz görüntü dosyası")
    
    # Modu çalıştır
    try:
        process_func = COMPUTER_VISION_MODES[mode]
        processed_img = process_func(img)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"İşleme hatası: {str(e)}")
    
    _, encoded_img = cv2.imencode('.jpg', processed_img, [cv2.IMWRITE_JPEG_QUALITY, 95])
    return Response(content=encoded_img.tobytes(), media_type="image/jpeg")


@app.post("/analyze-image/")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    """
    Görüntü analizi endpoint'i
    """
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise HTTPException(status_code=400, detail="Geçersiz görüntü dosyası")
    
    stats = analyze_image_stats(img)
    return stats


@app.post("/process-video/")
async def process_video_endpoint(
    file: UploadFile = File(...),
    mode: str = Form(...)
):
    """
    Video işleme endpoint'i
    """
    if mode not in SUPPORTED_VIDEO_MODES:
        raise HTTPException(
            status_code=400,
            detail=f"Geçersiz video modu. Desteklenen modlar: {SUPPORTED_VIDEO_MODES}"
        )
    
    contents = await file.read()
    
    # Geçici dosyalar oluştur
    with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as input_tmp:
        input_tmp.write(contents)
        input_path = input_tmp.name
    
    output_path = tempfile.mktemp(suffix='.mp4')
    
    try:
        success = video_processor.process_video_file(input_path, output_path, mode)
        
        if not success:
            raise HTTPException(status_code=500, detail="Video işleme hatası")
        
        with open(output_path, 'rb') as f:
            video_bytes = f.read()
        
        import re
        safe_filename = re.sub(r'[^\x00-\x7F]+', '', file.filename) or "video.mp4"
        
        return Response(
            content=video_bytes,
            media_type="video/mp4",
            headers={"Content-Disposition": f"attachment; filename=processed_{safe_filename}"}
        )
    finally:
        if os.path.exists(input_path):
            os.unlink(input_path)
        if os.path.exists(output_path):
            os.unlink(output_path)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
