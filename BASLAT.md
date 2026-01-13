# 🚀 AI Vision Studio - Başlatma Kılavuzu

## Hızlı Başlatma

### Adım 1: Backend'i Başlat
PowerShell veya Terminal aç ve şu komutları çalıştır:

```powershell
cd C:\yl\goruntuisleme\backend
.\venv2\Scripts\Activate.ps1
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

✅ Başarılı olduğunda şu mesajı göreceksin:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

---

### Adım 2: Frontend'i Başlat
**Yeni bir terminal aç** ve şu komutları çalıştır:

```powershell
cd C:\yl\goruntuisleme\frontend
npm run dev
```

✅ Başarılı olduğunda şu mesajı göreceksin:
```
VITE v5.4.21  ready in 1000 ms
➜  Local:   http://localhost:3000/
```

---

### Adım 3: Tarayıcıda Aç
Tarayıcını aç ve şu adrese git:

```
http://localhost:3000
```

---

## 🔧 Sorun Giderme

### Backend başlamıyorsa:
1. venv2 klasörünün var olduğundan emin ol
2. Python yüklü olmalı (3.12+)

### Frontend başlamıyorsa:
1. Node.js yüklü olmalı
2. `npm install` komutunu çalıştır

### Port kullanılıyorsa:
```powershell
# 8000 portunu kullanan işlemi kapat
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force
```

---

## 📁 Proje Yapısı

```
C:\yl\goruntuisleme\
├── backend\
│   ├── venv2\          # Python sanal ortamı
│   ├── main.py         # FastAPI ana dosyası
│   ├── ai_core.py      # AI işleme fonksiyonları
│   └── video_processor.py
├── frontend\
│   ├── src\
│   │   ├── components\ # React bileşenleri
│   │   └── App.jsx
│   └── package.json
├── SUNUM.md            # Proje sunumu
└── BASLAT.md           # Bu dosya
```

---

## 🎯 Demo için Önerilen Akış

1. **Proje Seçim Ekranı** - İki proje göster
2. **Görüntü İşleme Lab**
   - Bir resim yükle
   - AI Super Resolution dene
   - AI Style Transfer (Van Gogh) dene
   - AI Background Blur dene
3. **Bilgisayarla Görü Lab**
   - Yüz tespiti göster
   - El tespiti göster
   - Poz tahmini göster
4. **Webcam** - Gerçek zamanlı demo

---

İyi sunumlar! 🎓
