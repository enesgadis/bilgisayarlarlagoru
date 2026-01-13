"""
AI Vision Studio - Bilgisayarla Görü Modülü
Yazılım Mühendisliği Yüksek Lisans Projesi

Bu modül, MediaPipe kullanarak bilgisayarlı görü işlevleri sağlar.
"""

import cv2
import numpy as np
from typing import Tuple, List, Optional

# MediaPipe'ı güvenli şekilde yükle
MEDIAPIPE_AVAILABLE = False
mp_face_detection = None
mp_face_mesh = None
mp_hands = None
mp_pose = None
mp_selfie_segmentation = None
mp_drawing = None
mp_drawing_styles = None

try:
    import mediapipe as mp
    if hasattr(mp, 'solutions'):
        mp_face_detection = mp.solutions.face_detection
        mp_face_mesh = mp.solutions.face_mesh
        mp_hands = mp.solutions.hands
        mp_pose = mp.solutions.pose
        mp_selfie_segmentation = mp.solutions.selfie_segmentation
        mp_drawing = mp.solutions.drawing_utils
        mp_drawing_styles = mp.solutions.drawing_styles
        MEDIAPIPE_AVAILABLE = True
    else:
        print("MediaPipe solutions bulunamadi")
except Exception as e:
    print(f"MediaPipe yuklenemedi: {e}")


# ============================================================================
# YARDIMCI FONKSİYONLAR
# ============================================================================

def _add_error_text(image: np.ndarray, message: str) -> np.ndarray:
    """Görüntüye hata mesajı ekler"""
    result = image.copy()
    h, w = result.shape[:2]
    
    overlay = result.copy()
    cv2.rectangle(overlay, (10, h-80), (w-10, h-10), (0, 0, 100), -1)
    cv2.addWeighted(overlay, 0.7, result, 0.3, 0, result)
    
    cv2.putText(result, message, (20, h-45), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    cv2.putText(result, "Diger modlari deneyin", (20, h-20), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)
    
    return result


def _add_info_overlay(image: np.ndarray, title: str, info: str = "") -> np.ndarray:
    """Görüntüye bilgi overlay'i ekler"""
    result = image.copy()
    h, w = result.shape[:2]
    
    # Üst kısma başlık ekle
    overlay = result.copy()
    cv2.rectangle(overlay, (0, 0), (w, 50), (0, 0, 0), -1)
    cv2.addWeighted(overlay, 0.6, result, 0.4, 0, result)
    
    cv2.putText(result, title, (15, 32), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    
    if info:
        cv2.putText(result, info, (w - 200, 32), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 1)
    
    return result


# ============================================================================
# BİLGİSAYARLI GÖRÜ - YÜZ ANALİZİ
# ============================================================================

def process_image_detection(image: np.ndarray) -> np.ndarray:
    """Yüz algılama - MediaPipe veya OpenCV Haar Cascade."""
    result_image = image.copy()
    face_count = 0
    
    if MEDIAPIPE_AVAILABLE:
        try:
            rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            with mp_face_detection.FaceDetection(
                model_selection=0, 
                min_detection_confidence=0.5
            ) as face_detection:
                results = face_detection.process(rgb_image)
                
                if results.detections:
                    for detection in results.detections:
                        mp_drawing.draw_detection(result_image, detection)
                        
                        bboxC = detection.location_data.relative_bounding_box
                        h, w, _ = image.shape
                        x = int(bboxC.xmin * w)
                        y = int(bboxC.ymin * h)
                        confidence = detection.score[0]
                        
                        cv2.putText(
                            result_image,
                            f"Face: {int(confidence * 100)}%",
                            (x, y - 10),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.7,
                            (0, 255, 0),
                            2
                        )
                        face_count += 1
                    return _add_info_overlay(result_image, "Face Detection (MediaPipe)", f"{face_count} face(s)")
        except Exception as e:
            print(f"MediaPipe Face Detection hatası: {e}")
    
    # Fallback: OpenCV Haar Cascade
    try:
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        
        for (x, y, w, h) in faces:
            cv2.rectangle(result_image, (x, y), (x+w, y+h), (0, 255, 0), 2)
            cv2.putText(result_image, "Face", (x, y-10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            face_count += 1
        
        return _add_info_overlay(result_image, "Face Detection (Haar)", f"{face_count} face(s)")
    except Exception as e:
        return _add_error_text(image, f"Yuz tespiti hatasi: {str(e)[:30]}")


def process_face_mesh(image: np.ndarray) -> np.ndarray:
    """MediaPipe Face Mesh - 468 noktalı yüz ağı."""
    if not MEDIAPIPE_AVAILABLE:
        return _add_error_text(image, "MediaPipe yuklu degil")
    
    try:
        result_image = image.copy()
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        with mp_face_mesh.FaceMesh(
            static_image_mode=True,
            max_num_faces=5,
            refine_landmarks=True,
            min_detection_confidence=0.5
        ) as face_mesh:
            results = face_mesh.process(rgb_image)
            
            if results.multi_face_landmarks:
                for face_landmarks in results.multi_face_landmarks:
                    mp_drawing.draw_landmarks(
                        image=result_image,
                        landmark_list=face_landmarks,
                        connections=mp_face_mesh.FACEMESH_TESSELATION,
                        landmark_drawing_spec=None,
                        connection_drawing_spec=mp_drawing_styles.get_default_face_mesh_tesselation_style()
                    )
                    mp_drawing.draw_landmarks(
                        image=result_image,
                        landmark_list=face_landmarks,
                        connections=mp_face_mesh.FACEMESH_CONTOURS,
                        landmark_drawing_spec=None,
                        connection_drawing_spec=mp_drawing_styles.get_default_face_mesh_contours_style()
                    )
                return _add_info_overlay(result_image, "Face Mesh", "468 landmarks")
            else:
                return _add_info_overlay(result_image, "Face Mesh", "No face found")
        
    except Exception as e:
        print(f"Face Mesh hatası: {e}")
        return _add_error_text(image, "Face Mesh hatasi")


def process_face_landmarks(image: np.ndarray) -> np.ndarray:
    """Yüz landmark tespiti."""
    return process_face_mesh(image)


# ============================================================================
# BİLGİSAYARLI GÖRÜ - VÜCUT VE HAREKET
# ============================================================================

def process_hand_detection(image: np.ndarray) -> np.ndarray:
    """El tespiti ve iskelet çizimi."""
    if not MEDIAPIPE_AVAILABLE:
        return _add_error_text(image, "MediaPipe yuklu degil")
    
    try:
        result_image = image.copy()
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        hand_count = 0
        
        with mp_hands.Hands(
            static_image_mode=True,
            max_num_hands=2,
            min_detection_confidence=0.5
        ) as hands:
            results = hands.process(rgb_image)
            
            if results.multi_hand_landmarks:
                for idx, hand_landmarks in enumerate(results.multi_hand_landmarks):
                    mp_drawing.draw_landmarks(
                        result_image,
                        hand_landmarks,
                        mp_hands.HAND_CONNECTIONS,
                        mp_drawing_styles.get_default_hand_landmarks_style(),
                        mp_drawing_styles.get_default_hand_connections_style()
                    )
                    
                    if results.multi_handedness:
                        hand_type = results.multi_handedness[idx].classification[0].label
                        hand_type_tr = "Right" if hand_type == "Right" else "Left"
                        
                        wrist = hand_landmarks.landmark[0]
                        h, w, _ = image.shape
                        x = int(wrist.x * w)
                        y = int(wrist.y * h)
                        
                        cv2.putText(
                            result_image,
                            hand_type_tr,
                            (x - 30, y - 20),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.8,
                            (255, 0, 255),
                            2
                        )
                    hand_count += 1
                return _add_info_overlay(result_image, "Hand Detection", f"{hand_count} hand(s), 21 landmarks")
            else:
                return _add_info_overlay(result_image, "Hand Detection", "No hands found")
        
    except Exception as e:
        print(f"Hand Detection hatası: {e}")
        return _add_error_text(image, "El tespiti hatasi")


def process_pose_detection(image: np.ndarray) -> np.ndarray:
    """Vücut pozu tespiti."""
    if not MEDIAPIPE_AVAILABLE:
        return _add_error_text(image, "MediaPipe yuklu degil")
    
    try:
        result_image = image.copy()
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        with mp_pose.Pose(
            static_image_mode=True,
            model_complexity=1,
            enable_segmentation=False,
            min_detection_confidence=0.5
        ) as pose:
            results = pose.process(rgb_image)
            
            if results.pose_landmarks:
                mp_drawing.draw_landmarks(
                    result_image,
                    results.pose_landmarks,
                    mp_pose.POSE_CONNECTIONS,
                    landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style()
                )
                return _add_info_overlay(result_image, "Pose Estimation", "33 landmarks")
            else:
                return _add_info_overlay(result_image, "Pose Estimation", "No pose found")
        
    except Exception as e:
        print(f"Pose Detection hatası: {e}")
        return _add_error_text(image, "Poz tespiti hatasi")


def process_gesture(image: np.ndarray) -> np.ndarray:
    """El jest tanıma - parmak pozisyonlarını analiz ederek."""
    if not MEDIAPIPE_AVAILABLE:
        return _add_error_text(image, "MediaPipe yuklu degil")
    
    def count_fingers(hand_landmarks, handedness):
        """Açık parmak sayısını hesapla."""
        finger_tips = [8, 12, 16, 20]
        finger_pips = [6, 10, 14, 18]
        
        fingers_up = []
        
        thumb_tip = hand_landmarks.landmark[4]
        thumb_ip = hand_landmarks.landmark[3]
        
        if handedness == "Right":
            if thumb_tip.x < thumb_ip.x:
                fingers_up.append(1)
            else:
                fingers_up.append(0)
        else:
            if thumb_tip.x > thumb_ip.x:
                fingers_up.append(1)
            else:
                fingers_up.append(0)
        
        for tip, pip in zip(finger_tips, finger_pips):
            if hand_landmarks.landmark[tip].y < hand_landmarks.landmark[pip].y:
                fingers_up.append(1)
            else:
                fingers_up.append(0)
        
        return fingers_up
    
    def recognize_gesture(fingers_up):
        """Parmak durumuna göre jest tanı."""
        total_fingers = sum(fingers_up)
        
        if fingers_up == [0, 0, 0, 0, 0]:
            return "Yumruk", "👊"
        elif fingers_up == [0, 1, 0, 0, 0]:
            return "Isaret", "☝️"
        elif fingers_up == [0, 1, 1, 0, 0]:
            return "Baris/Victory", "✌️"
        elif fingers_up == [1, 1, 0, 0, 1]:
            return "Rock", "🤟"
        elif fingers_up == [1, 0, 0, 0, 0]:
            return "Basparmak", "👍"
        elif fingers_up == [1, 1, 1, 1, 1]:
            return "Bes", "🖐️"
        elif fingers_up == [0, 1, 1, 1, 0]:
            return "Uc", "3️⃣"
        elif fingers_up == [0, 1, 1, 1, 1]:
            return "Dort", "4️⃣"
        elif fingers_up == [1, 1, 0, 0, 0]:
            return "Iki", "2️⃣"
        elif fingers_up == [0, 0, 0, 0, 1]:
            return "Serceparmak", "🤙"
        else:
            return f"{total_fingers} Parmak", "✋"
    
    try:
        result_image = image.copy()
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        with mp_hands.Hands(
            static_image_mode=True,
            max_num_hands=2,
            min_detection_confidence=0.5
        ) as hands:
            results = hands.process(rgb_image)
            
            if results.multi_hand_landmarks:
                gestures = []
                
                for idx, hand_landmarks in enumerate(results.multi_hand_landmarks):
                    mp_drawing.draw_landmarks(
                        result_image,
                        hand_landmarks,
                        mp_hands.HAND_CONNECTIONS,
                        mp_drawing_styles.get_default_hand_landmarks_style(),
                        mp_drawing_styles.get_default_hand_connections_style()
                    )
                    
                    handedness = "Right"
                    if results.multi_handedness:
                        handedness = results.multi_handedness[idx].classification[0].label
                    
                    fingers_up = count_fingers(hand_landmarks, handedness)
                    gesture_name, gesture_emoji = recognize_gesture(fingers_up)
                    gestures.append(gesture_name)
                    
                    wrist = hand_landmarks.landmark[0]
                    h, w, _ = image.shape
                    x = int(wrist.x * w)
                    y = int(wrist.y * h)
                    
                    hand_tr = "Sag" if handedness == "Right" else "Sol"
                    label = f"{hand_tr}: {gesture_name} {gesture_emoji}"
                    
                    (text_w, text_h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.8, 2)
                    cv2.rectangle(result_image, (x - 10, y - text_h - 30), (x + text_w + 10, y - 10), (0, 0, 0), -1)
                    cv2.rectangle(result_image, (x - 10, y - text_h - 30), (x + text_w + 10, y - 10), (0, 255, 0), 2)
                    cv2.putText(result_image, label, (x, y - 20), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
                    
                    finger_names = ["B", "I", "O", "Y", "S"]
                    y_bar = y + 30
                    for i, (finger, up) in enumerate(zip(finger_names, fingers_up)):
                        color = (0, 255, 0) if up else (0, 0, 255)
                        cv2.rectangle(result_image, (x + i*25, y_bar), (x + i*25 + 20, y_bar + 25), color, -1)
                        cv2.putText(result_image, finger, (x + i*25 + 5, y_bar + 18), 
                                   cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 255), 1)
                
                gesture_str = ", ".join(gestures)
                return _add_info_overlay(result_image, "Gesture Recognition (AI)", gesture_str)
            else:
                return _add_info_overlay(result_image, "Gesture Recognition", "No hands found")
        
    except Exception as e:
        print(f"Gesture Recognition hatası: {e}")
        return _add_error_text(image, "Jest tanima hatasi")


def process_action(image: np.ndarray) -> np.ndarray:
    """Aksiyon tanıma - Poz analizi ile hareket tespiti."""
    if not MEDIAPIPE_AVAILABLE:
        return _add_error_text(image, "MediaPipe yuklu degil")
    
    def analyze_pose(landmarks):
        """Poz landmarklarından aksiyon tahmin et."""
        nose = landmarks[0]
        left_shoulder = landmarks[11]
        right_shoulder = landmarks[12]
        left_wrist = landmarks[15]
        right_wrist = landmarks[16]
        left_hip = landmarks[23]
        right_hip = landmarks[24]
        left_knee = landmarks[25]
        right_knee = landmarks[26]
        
        hands_up = (left_wrist.y < left_shoulder.y) and (right_wrist.y < right_shoulder.y)
        left_hand_up = left_wrist.y < left_shoulder.y
        right_hand_up = right_wrist.y < right_shoulder.y
        
        shoulder_avg_y = (left_shoulder.y + right_shoulder.y) / 2
        hip_avg_y = (left_hip.y + right_hip.y) / 2
        bending = abs(shoulder_avg_y - hip_avg_y) < 0.15
        
        knees_bent = (left_knee.y < left_hip.y + 0.1) or (right_knee.y < right_hip.y + 0.1)
        
        if hands_up:
            return "Eller Yukari", "🙌", (0, 255, 0)
        elif left_hand_up and not right_hand_up:
            return "Sol El Yukari", "🙋", (255, 200, 0)
        elif right_hand_up and not left_hand_up:
            return "Sag El Yukari", "🙋", (255, 200, 0)
        elif bending:
            return "Egilme", "🙇", (255, 165, 0)
        elif knees_bent:
            return "Comelme", "🧎", (100, 200, 255)
        else:
            return "Ayakta Durma", "🧍", (200, 200, 200)
    
    try:
        result_image = image.copy()
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        with mp_pose.Pose(
            static_image_mode=True,
            model_complexity=1,
            enable_segmentation=False,
            min_detection_confidence=0.5
        ) as pose:
            results = pose.process(rgb_image)
            
            if results.pose_landmarks:
                mp_drawing.draw_landmarks(
                    result_image,
                    results.pose_landmarks,
                    mp_pose.POSE_CONNECTIONS,
                    landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style()
                )
                
                landmarks = results.pose_landmarks.landmark
                action_name, action_emoji, action_color = analyze_pose(landmarks)
                
                h, w, _ = image.shape
                
                label = f"{action_name} {action_emoji}"
                (text_w, text_h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 1.2, 3)
                
                x_center = (w - text_w) // 2
                cv2.rectangle(result_image, (x_center - 10, 60), (x_center + text_w + 10, 100), (0, 0, 0), -1)
                cv2.putText(result_image, label, (x_center, 90), 
                           cv2.FONT_HERSHEY_SIMPLEX, 1.0, action_color, 2)
                
                return _add_info_overlay(result_image, "Action Recognition (AI)", action_name)
            else:
                return _add_info_overlay(result_image, "Action Recognition", "No pose found")
        
    except Exception as e:
        print(f"Action Recognition hatası: {e}")
        return _add_error_text(image, "Aksiyon tanima hatasi")


# ============================================================================
# BİLGİSAYARLI GÖRÜ - NESNE TESPİTİ
# ============================================================================

def process_object_contours(image: np.ndarray) -> np.ndarray:
    """Görüntüdeki nesnelerin konturlarını tespit eder."""
    result_image = image.copy()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    thresh = cv2.adaptiveThreshold(
        blurred, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV,
        11, 2
    )
    
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    object_count = 0
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > 500:
            cv2.drawContours(result_image, [contour], -1, (0, 255, 0), 2)
            x, y, w, h = cv2.boundingRect(contour)
            cv2.rectangle(result_image, (x, y), (x + w, y + h), (255, 0, 0), 2)
            object_count += 1
    
    return _add_info_overlay(result_image, "Contour Detection", f"{object_count} objects")


def process_text_detection(image: np.ndarray) -> np.ndarray:
    """Metin bölgesi tespiti - MSER kullanarak."""
    try:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        mser = cv2.MSER_create()
        regions, _ = mser.detectRegions(gray)
        result = image.copy()
        
        hulls = [cv2.convexHull(p.reshape(-1, 1, 2)) for p in regions]
        
        text_regions = 0
        for hull in hulls:
            x, y, w, h = cv2.boundingRect(hull)
            # Metin benzeri bölgeleri filtrele
            aspect_ratio = w / float(h) if h > 0 else 0
            if 0.1 < aspect_ratio < 10 and w > 10 and h > 10 and w < image.shape[1] * 0.8:
                cv2.rectangle(result, (x, y), (x+w, y+h), (0, 255, 0), 1)
                text_regions += 1
        
        return _add_info_overlay(result, "Text Region Detection (MSER)", f"{text_regions} regions")
    except Exception as e:
        return _add_error_text(image, f"Text detection hatasi: {str(e)[:20]}")


# ============================================================================
# BİLGİSAYARLI GÖRÜ - SEGMENTASYON
# ============================================================================

def process_background(image: np.ndarray) -> np.ndarray:
    """Arka plan çıkarma - GrabCut algoritması."""
    try:
        mask = np.zeros(image.shape[:2], np.uint8)
        bgdModel = np.zeros((1, 65), np.float64)
        fgdModel = np.zeros((1, 65), np.float64)
        
        h, w = image.shape[:2]
        rect = (int(w*0.1), int(h*0.1), int(w*0.8), int(h*0.8))
        
        cv2.grabCut(image, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
        
        mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
        result = image * mask2[:, :, np.newaxis]
        
        return _add_info_overlay(result, "Background Removal", "GrabCut Algorithm")
    except Exception as e:
        return _add_error_text(image, f"Background hatasi: {str(e)[:20]}")


def process_selfie(image: np.ndarray) -> np.ndarray:
    """Selfie segmentation - portre modu."""
    if not MEDIAPIPE_AVAILABLE:
        return _add_error_text(image, "MediaPipe yuklu degil")
    
    try:
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        with mp_selfie_segmentation.SelfieSegmentation(model_selection=1) as selfie_seg:
            results = selfie_seg.process(rgb_image)
            
            condition = np.stack((results.segmentation_mask,) * 3, axis=-1) > 0.5
            
            # Arka planı bulanıklaştır
            blurred_bg = cv2.GaussianBlur(image, (55, 55), 0)
            result = np.where(condition, image, blurred_bg)
            
            return _add_info_overlay(result, "Selfie Segmentation", "Portrait Mode")
    except Exception as e:
        print(f"Selfie Segmentation hatası: {e}")
        return _add_error_text(image, "Segmentasyon hatasi")


# ============================================================================
# GÖRÜNTÜ ANALİZİ
# ============================================================================

def analyze_image_stats(image: np.ndarray) -> dict:
    """Görüntü istatistiklerini analiz eder."""
    height, width = image.shape[:2]
    channels = image.shape[2] if len(image.shape) > 2 else 1
    
    mean, std = cv2.meanStdDev(image)
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    brightness = np.mean(gray)
    
    return {
        "dimensions": {"width": width, "height": height},
        "channels": channels,
        "mean_values": {"B": float(mean[0][0]), "G": float(mean[1][0]), "R": float(mean[2][0])},
        "std_values": {"B": float(std[0][0]), "G": float(std[1][0]), "R": float(std[2][0])},
        "brightness": float(brightness),
        "total_pixels": width * height,
        "aspect_ratio": round(width / height, 2)
    }
