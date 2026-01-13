# AI Image Lab
Yapay Zeka Destekli Bilgisayarlı Görü ve Video Analiz Uygulaması

Yazılım Mühendisliği Yüksek Lisans Projesi

Bu proje, modern yapay zeka tekniklerini kullanarak gelişmiş bilgisayarlı görü (Computer Vision) uygulamaları sunan bir web platformudur. MediaPipe ve OpenCV kütüphanelerinin gücünü kullanarak, gerçek zamanlı nesne tespiti, yüz analizi ve hareket takibi gibi karmaşık görü problemlerini çözmektedir.

## Özellikler

### Bilgisayarlı Görü Modülleri
*   **Yüz Tespiti ve Analizi**: Gelişmiş derin öğrenme modelleri ile çoklu yüz algılama.
*   **Yüz Mesh Ağı**: Yüz geometrisini 468 nokta ile detaylı modelleme.
*   **El ve Jest Takibi**: 21 referans noktası üzerinden el hareketlerinin ve jestlerinin analizi.
*   **Vücut Poz Kestirimi**: 33 vücut noktası ile iskelet tespiti ve postür analizi.
*   **Nesne Takibi**: Videolarda nesne ve hareket takibi.

### Video Analiz Yetenekleri
*   **Gerçek Zamanlı İşleme**: Kamera veya video dosyaları üzerinde gecikmesiz analiz.
*   **Hareket Analizi**: Sahne üzerindeki hareketli bölgelerin tespiti ve takibi.

## Teknolojiler

Proje, modern web mimarisi standartlarına uygun olarak geliştirilmiştir:

### Backend (Sunucu Tarafı)
*   **Python**: Ana programlama dili.
*   **FastAPI**: Yüksek performanslı asenkron web çatısı.
*   **OpenCV & MediaPipe**: Bilgisayarlı görü ve makine öğrenmesi kütüphaneleri.

### Frontend (İstemci Tarafı)
*   **React**: Kullanıcı arayüzü kütüphanesi.
*   **Vite**: Modern ve hızlı derleme aracı.

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### Ön Gereksinimler
*   Python 3.9 veya üzeri
*   Node.js 18 veya üzeri

### 1. Backend Kurulumu

Terminali açın ve backend klasörüne gidin:

```bash
cd backend
```

Sanal ortam oluşturun ve aktif edin:

```bash
# Windows için
python -m venv venv
venv\Scripts\activate

# Mac/Linux için
# python3 -m venv venv
# source venv/bin/activate
```

Gerekli Python paketlerini yükleyin:

```bash
pip install -r requirements.txt
```

Sunucuyu başlatın:

```bash
python main.py
```

Backend servisi http://localhost:8000 adresinde çalışmaya başlayacaktır.

### 2. Frontend Kurulumu

Yeni bir terminal penceresi açın ve frontend klasörüne gidin:

```bash
cd frontend
```

Gerekli Node.js paketlerini yükleyin:

```bash
npm install
```

Uygulamayı başlatın:

```bash
npm run dev
```

Frontend uygulaması http://localhost:3000 adresinde çalışacaktır. Tarayıcınızda bu adresi açarak uygulamayı kullanmaya başlayabilirsiniz.

## Kullanım

Uygulama arayüzü üzerinden resim veya video dosyalarınızı yükleyerek analiz işlemlerini başlatabilirsiniz. Sol menüden kullanmak istediğiniz bilgisayarlı görü modülünü (Yüz Tespiti, El Takibi vb.) seçtikten sonra analiz sonuçları ekranınızda görüntülenecektir.

Çıktı ve uygulama kullanımı için drive linkinden çıktılar dosyasındaki 3 videonun izlenmesi gerekmektedir.
https://drive.google.com/drive/folders/15N9snpz3GYKRWSH8hj4zXBdiFpLWnaET?usp=sharing
