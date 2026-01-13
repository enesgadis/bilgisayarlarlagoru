"""
MediaPipe modellerini önceden yüklemek için başlatma scripti
İlk çalıştırmada modeller indirilir
"""

import cv2
import numpy as np
import mediapipe as mp

print("MediaPipe modellerini başlatıyorum...")

# Test görüntüsü oluştur
test_img = np.zeros((480, 640, 3), dtype=np.uint8)
test_img_rgb = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)

# Face Detection
print("- Face Detection yükleniyor...")
try:
    with mp.solutions.face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.5) as face:
        face.process(test_img_rgb)
    print("  ✓ Face Detection hazır")
except Exception as e:
    print(f"  ✗ Face Detection hatası: {e}")

# Face Mesh
print("- Face Mesh yükleniyor...")
try:
    with mp.solutions.face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1) as mesh:
        mesh.process(test_img_rgb)
    print("  ✓ Face Mesh hazır")
except Exception as e:
    print(f"  ✗ Face Mesh hatası: {e}")

# Hands
print("- Hands yükleniyor...")
try:
    with mp.solutions.hands.Hands(static_image_mode=True, max_num_hands=1) as hands:
        hands.process(test_img_rgb)
    print("  ✓ Hands hazır")
except Exception as e:
    print(f"  ✗ Hands hatası: {e}")

# Pose
print("- Pose yükleniyor...")
try:
    with mp.solutions.pose.Pose(static_image_mode=True, model_complexity=0) as pose:
        pose.process(test_img_rgb)
    print("  ✓ Pose hazır")
except Exception as e:
    print(f"  ✗ Pose hatası: {e}")

print("\nModel başlatma tamamlandı!")

