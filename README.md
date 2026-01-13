# 🧠 AI Image Lab

**Yapay Zeka Tabanlı Görüntü ve Video İşleme Uygulaması**

> Yazılım Mühendisliği Yüksek Lisans Projesi

---

## 📋 Proje Hakkında

AI Image Lab, modern yapay zeka ve bilgisayarlı görü teknolojilerini kullanarak görüntü ve video işleme işlevleri sunan kapsamlı bir web uygulamasıdır. MediaPipe ve OpenCV kütüphaneleri ile geliştirilmiş olan bu proje, gerçek zamanlı yüz tespiti, el takibi, vücut pozu analizi ve çeşitli görüntü işleme filtreleri sunmaktadır.

## ✨ Özellikler

### Görüntü İşleme
- **Yüz Tespiti**: MediaPipe Face Detection ile yüksek doğruluklu yüz algılama
- **Yüz Mesh**: 468 noktalı detaylı yüz ağı çıkarma
- **El Tespiti**: 21 el noktası ile el iskeleti çıkarma
- **Vücut Pozu**: 33 vücut noktası ile poz tespiti
- **Kenar Algılama**: Canny algoritması ile kenar tespiti
- **Kontur Tespiti**: Nesne sınırlarını belirleme
- **Renk Segmentasyonu**: HSV uzayında renk bazlı segmentasyon
- **Artistik Filtreler**: Karikatür, kalem çizimi, kabartma efektleri
- **Histogram Eşitleme**: CLAHE ile kontrast iyileştirme

### Video İşleme
- **Gerçek Zamanlı Analiz**: Yüz, el ve poz tespiti
- **Hareket Algılama**: Kare farkı ile hareket tespiti
- **Video Dönüştürme**: Çeşitli filtrelerle video işleme

### Ek Özellikler
- **Görüntü Analizi**: Boyut, renk dağılımı, parlaklık analizi
- **Görüntü Karşılaştırma**: İki görüntü arasındaki farkları tespit
- **Toplu İşleme**: Birden fazla görüntüyü aynı anda işleme

## 🛠️ Teknolojiler

### Backend
- **FastAPI**: Modern, yüksek performanslı Python web framework
- **OpenCV**: Bilgisayarlı görü kütüphanesi
- **MediaPipe**: Google'ın makine öğrenmesi çözümleri
- **NumPy**: Sayısal hesaplama kütüphanesi

### Frontend
- **React 18**: Modern UI kütüphanesi
- **Vite**: Hızlı geliştirme aracı
- **Framer Motion**: Animasyon kütüphanesi
- **React Dropzone**: Dosya yükleme bileşeni

## 📁 Proje Yapısı

```
ai-image-lab/
├── backend/
│   ├── main.py              # FastAPI ana uygulama
│   ├── ai_core.py           # AI görüntü işleme fonksiyonları
│   ├── video_processor.py   # Video işleme modülü
│   └── requirements.txt     # Python bağımlılıkları
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React bileşenleri
│   │   ├── App.jsx          # Ana uygulama
│   │   └── index.css        # Global stiller
│   ├── package.json         # Node bağımlılıkları
│   └── vite.config.js       # Vite yapılandırması
│
└── README.md
```

## 🚀 Kurulum

### Gereksinimler
- Python 3.9+
- Node.js 18+
- pip
- npm

### Backend Kurulumu

```bash
# Backend klasörüne git
cd backend

# Sanal ortam oluştur (önerilir)
python -m venv venv

# Sanal ortamı aktive et
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Bağımlılıkları yükle
pip install -r requirements.txt

# Sunucuyu başlat
python main.py
```

Backend http://localhost:8000 adresinde çalışacaktır.

### Frontend Kurulumu

```bash
# Frontend klasörüne git
cd frontend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Frontend http://localhost:3000 adresinde çalışacaktır.

## 📖 API Dokümantasyonu

Backend çalışırken, API dokümantasyonuna şu adreslerden erişebilirsiniz:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Temel Endpoint'ler

| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/` | GET | API durum kontrolü |
| `/modes` | GET | Desteklenen işleme modları |
| `/process-image/` | POST | Görüntü işleme |
| `/process-video/` | POST | Video işleme |
| `/analyze-image/` | POST | Görüntü analizi |
| `/video-info/` | POST | Video bilgisi |
| `/analyze-motion/` | POST | Hareket analizi |
| `/compare/` | POST | Görüntü karşılaştırma |

## 🎯 Kullanım

1. Tarayıcınızda http://localhost:3000 adresine gidin
2. "Görüntü İşleme" veya "Video İşleme" sekmesini seçin
3. Bir dosya yükleyin
4. İstediğiniz işleme modunu seçin
5. "İşlemeyi Başlat" butonuna tıklayın
6. Sonucu görüntüleyin ve indirin

## 🔧 İşleme Modları

### Görüntü Modları
| Mod | Açıklama |
|-----|----------|
| `blur` | Gaussian bulanıklaştırma |
| `edges` | Canny kenar algılama |
| `detection` | Yüz tespiti |
| `face_mesh` | 468 noktalı yüz mesh |
| `hands` | El tespiti |
| `pose` | Vücut pozu tespiti |
| `contours` | Nesne konturları |
| `color_red/green/blue` | Renk segmentasyonu |
| `cartoon` | Karikatür efekti |
| `sketch` | Kalem çizimi |
| `emboss` | Kabartma efekti |
| `histogram` | Histogram eşitleme |

### Video Modları
| Mod | Açıklama |
|-----|----------|
| `motion` | Hareket algılama |
| Diğerleri | Görüntü modlarının video versiyonları |

## 📊 Teknik Detaylar

### Yüz Tespiti Algoritması
MediaPipe Face Detection, BlazeFace modelini kullanır. Bu model, tek bir görüntüde birden fazla yüzü algılayabilir ve her yüz için güven skoru döndürür.

### El Tespiti
MediaPipe Hands, her el için 21 anahtar nokta tespit eder. Bu noktalar, el hareketlerini ve jestlerini analiz etmek için kullanılabilir.

### Poz Tespiti
MediaPipe Pose, 33 vücut noktası tespit eder ve isteğe bağlı olarak arka plan segmentasyonu yapabilir.

### Hareket Algılama
İki ardışık kare arasındaki farkı hesaplayarak hareket eden bölgeleri tespit eder. Morfolojik işlemler ile gürültü filtrelenir.

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👤 Geliştirici

Yazılım Mühendisliği Yüksek Lisans Öğrencisi

---

**Not**: Bu proje, yapay zeka ve bilgisayarlı görü teknolojilerinin pratik uygulamalarını göstermek amacıyla hazırlanmıştır.

