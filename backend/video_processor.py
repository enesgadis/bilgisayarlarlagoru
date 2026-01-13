"""
Video İşleme Modülü - Bilgisayarla Görü
"""

import cv2
import numpy as np
import tempfile
import os

from ai_core import (
    process_image_detection,
    process_face_mesh,
    process_hand_detection,
    process_pose_detection,
    process_gesture,
    process_object_contours,
    process_selfie,
    MEDIAPIPE_AVAILABLE
)


class VideoProcessor:
    """Video işleme sınıfı"""
    
    def __init__(self):
        self.supported_modes = {
            'detection': process_image_detection,
            'face_mesh': process_face_mesh,
            'hands': process_hand_detection,
            'pose': process_pose_detection,
            'gesture': process_gesture,
            'contours': process_object_contours,
            'selfie': process_selfie,
        }
    
    def process_video_file(self, input_path: str, output_path: str, mode: str) -> bool:
        """Video dosyasını işler"""
        if mode not in self.supported_modes:
            print(f"Desteklenmeyen mod: {mode}")
            return False
        
        process_func = self.supported_modes[mode]
        
        cap = cv2.VideoCapture(input_path)
        if not cap.isOpened():
            print("Video açılamadı")
            return False
        
        # Video özellikleri
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        # Video yazıcı
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        
        frame_count = 0
        try:
            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                
                # Her kareyi işle
                processed_frame = process_func(frame)
                out.write(processed_frame)
                
                frame_count += 1
                if frame_count % 30 == 0:
                    print(f"İşlenen: {frame_count}/{total_frames} kare")
            
            print(f"Video işleme tamamlandı: {frame_count} kare")
            return True
            
        except Exception as e:
            print(f"Video işleme hatası: {e}")
            return False
            
        finally:
            cap.release()
            out.release()
    
    def get_video_info(self, video_bytes: bytes) -> dict:
        """Video bilgilerini döndürür"""
        with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as tmp:
            tmp.write(video_bytes)
            tmp_path = tmp.name
        
        try:
            cap = cv2.VideoCapture(tmp_path)
            
            info = {
                "fps": int(cap.get(cv2.CAP_PROP_FPS)),
                "width": int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
                "height": int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
                "frame_count": int(cap.get(cv2.CAP_PROP_FRAME_COUNT)),
                "duration": int(cap.get(cv2.CAP_PROP_FRAME_COUNT) / cap.get(cv2.CAP_PROP_FPS)) if cap.get(cv2.CAP_PROP_FPS) > 0 else 0
            }
            
            cap.release()
            return info
            
        finally:
            os.unlink(tmp_path)
