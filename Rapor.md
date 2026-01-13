BİLGİSAYARLI GÖRÜ TEKNİKLERİ KULLANILARAK GELİŞTİRİLEN WEB TABANLI YAPAY ZEKA UYGULAMASI
Yazılım Mühendisliği Yüksek Lisans Projesi



ENES GADİŞ
250708011

ORCID: 0009-0008-8547-8906

Samsun Üniversitesi, Mühendislik ve Doğa Bilimleri Fakültesi, Yazılım Mühendisliği Bölümü, Samsun, Türkiye







ÖZET
Bu çalışmada, modern bilgisayarlı görü (Computer Vision) ve derin öğrenme tekniklerini kullanarak geliştirilmiş web tabanlı bir yapay zeka uygulaması sunulmaktadır. Uygulama, MediaPipe ve OpenCV kütüphanelerinin sağladığı gelişmiş algoritmalar ile görüntü ve video analizi yetenekleri sunmaktadır. Sistem, yüz tespiti, yüz mesh analizi, el takibi, vücut poz kestirimi, jest tanıma ve arka plan segmentasyonu gibi çeşitli bilgisayarlı görü modüllerini içermektedir.
Proje, FastAPI tabanlı RESTful API mimarisi ile React frontend arayüzünün entegrasyonu üzerine kurulmuştur. Kullanıcılar, web arayüzü üzerinden görüntü ve video dosyalarını yükleyerek gerçek zamanlı analiz sonuçları elde edebilmektedir. Sistemin modüler yapısı, farklı bilgisayarlı görü algoritmalarının kolayca entegre edilmesine ve genişletilmesine olanak tanımaktadır.
Anahtar Kelimeler: Bilgisayarlı Görü, Derin Öğrenme, MediaPipe, Yüz Tespiti, El Takibi, Poz Kestirimi, Web Uygulaması

1. GİRİŞ
1.1. Çalışmanın Amacı
Bilgisayarlı görü, bilgisayarların görsel dünyayı anlamasını ve yorumlamasını sağlayan yapay zekanın bir alt dalıdır. Son yıllarda derin öğrenme algoritmalarındaki gelişmeler, bilgisayarlı görü uygulamalarının doğruluğunu ve kullanılabilirliğini önemli ölçüde artırmıştır. Bu çalışmanın temel amacı, modern bilgisayarlı görü tekniklerini kullanarak kullanıcı dostu, web tabanlı bir analiz platformu geliştirmektir.
Proje kapsamında geliştirilen sistem, aşağıdaki temel hedeflere odaklanmaktadır:
•	Yüksek doğruluklu yüz tespiti ve analizi
•	Gerçek zamanlı el ve parmak takibi
•	Vücut poz kestirimi ve hareket analizi
•	Jest ve aksiyon tanıma yetenekleri
•	Görüntü segmentasyonu ve arka plan ayrıştırma
•	Kullanıcı dostu web arayüzü ile kolay erişim
1.2. Çalışmanın Kapsamı
Bu çalışma, bilgisayarlı görü alanındaki çeşitli tekniklerin pratik uygulamalarını içermektedir. Sistem, statik görüntüler ve dinamik video içerikleri üzerinde çalışabilme yeteneğine sahiptir. Uygulama, eğitim, araştırma ve geliştirme amaçlı kullanılabilecek şekilde tasarlanmıştır.


Proje kapsamı şu bileşenleri içermektedir:
1.	Backend Servisi: Python tabanlı FastAPI framework kullanılarak geliştirilmiş RESTful API
2.	Frontend Arayüzü: React kütüphanesi ile oluşturulmuş modern web arayüzü
3.	Bilgisayarlı Görü Modülleri: MediaPipe ve OpenCV entegrasyonu
4.	Video İşleme: Gerçek zamanlı video analiz yetenekleri
1.3. Çalışmanın Önemi
Bilgisayarlı görü teknolojileri, güvenlik sistemlerinden sağlık uygulamalarına, eğlence sektöründen otonom araçlara kadar geniş bir yelpazede kullanılmaktadır. Bu çalışma, bu teknolojilerin erişilebilir ve kullanımı kolay bir platform üzerinden sunulmasını sağlamaktadır.
Projenin akademik ve pratik önemi şu noktalarda özetlenebilir:
•	Modern bilgisayarlı görü tekniklerinin entegre bir platformda sunulması
•	Açık kaynak teknolojilerin etkin kullanımı
•	Modüler ve genişletilebilir mimari tasarımı
•	Eğitim ve araştırma amaçlı kullanıma uygunluk

2. LİTERATÜR TARAMASI
2.1. Bilgisayarlı Görü ve Derin Öğrenme
Bilgisayarlı görü, 1960'lı yıllardan bu yana aktif bir araştırma alanı olmuştur. Geleneksel yöntemler, özellik çıkarımı ve makine öğrenmesi algoritmalarına dayanırken, 2012 yılında AlexNet'in ImageNet yarışmasında gösterdiği başarı ile derin öğrenme tabanlı yaklaşımlar ön plana çıkmıştır.
Convolutional Neural Networks (CNN), görüntü işleme görevlerinde devrim yaratmış ve nesne tespiti, yüz tanıma, segmentasyon gibi alanlarda insan seviyesine yakın veya üstünde performans göstermiştir.
2.2. Yüz Tespiti ve Analizi
Yüz tespiti, bilgisayarlı görünün en çok çalışılan alanlarından biridir. Viola-Jones algoritması (2001), gerçek zamanlı yüz tespitinde önemli bir dönüm noktası olmuştur. Modern yaklaşımlar, derin öğrenme tabanlı modeller kullanmaktadır:
•	MTCNN (Multi-task Cascaded Convolutional Networks): Çok aşamalı yüz tespiti
•	BlazeFace: Google tarafından geliştirilen, mobil cihazlar için optimize edilmiş hafif model
•	RetinaFace: Yüksek doğruluklu yüz tespiti ve landmark çıkarımı
MediaPipe Face Detection, BlazeFace modelini kullanarak gerçek zamanlı performans sunmaktadır.
2.3. El ve Parmak Takibi
El takibi, insan-bilgisayar etkileşimi, işaret dili tanıma ve sanal gerçeklik uygulamaları için kritik öneme sahiptir. MediaPipe Hands, 21 anahtar nokta ile el iskeletini tespit edebilen ve gerçek zamanlı çalışabilen bir çözümdür.
Geleneksel yöntemler, renk tabanlı segmentasyon ve kontur analizi kullanırken, modern yaklaşımlar derin öğrenme ile daha robust sonuçlar elde etmektedir.
2.4. Poz Kestirimi
İnsan vücudu poz kestirimi, spor analitiği, sağlık izleme ve animasyon gibi alanlarda kullanılmaktadır. OpenPose (2017), çok kişili poz kestirimi için önemli bir çalışma olmuştur. MediaPipe Pose, 33 vücut noktası ile detaylı poz analizi sunmaktadır.
2.5. Görüntü Segmentasyonu
Semantik segmentasyon, görüntüdeki her pikselin bir sınıfa atanması işlemidir. Instance segmentation ise aynı sınıftaki farklı nesneleri ayırt edebilmektedir. MediaPipe Selfie Segmentation, portre modunda arka plan ayrıştırma için optimize edilmiş bir çözümdür.
2.6. Web Tabanlı Bilgisayarlı Görü Uygulamaları
Geleneksel olarak bilgisayarlı görü uygulamaları masaüstü yazılımları olarak geliştirilmiştir. Ancak web teknolojilerindeki gelişmeler (WebGL, WebAssembly, TensorFlow.js) sayesinde tarayıcı tabanlı uygulamalar da yaygınlaşmıştır.
Bu çalışmada, backend-frontend ayrımı ile güçlü işlem gücü gerektiren görevler sunucu tarafında, kullanıcı arayüzü ise istemci tarafında çalıştırılmaktadır.

3. METODOLOJİ
3.1. Sistem Mimarisi
Proje, modern web uygulama mimarisine uygun olarak üç katmanlı bir yapıda tasarlanmıştır:
1. Sunum Katmanı (Frontend)
•	React 18 framework
•	Vite build tool
•	Responsive tasarım
2. İş Mantığı Katmanı (Backend)
•	FastAPI framework
•	RESTful API tasarımı
•	Asenkron işlem desteği


3. Veri İşleme Katmanı
•	MediaPipe modülleri
•	OpenCV işlemleri
•	NumPy hesaplamaları
3.2. Kullanılan Teknolojiler ve Kütüphaneler
3.2.1. Backend Teknolojileri
Python 3.9+ Projenin ana programlama dili olarak seçilmiştir. Python, bilimsel hesaplama ve yapay zeka kütüphanelerinin zenginliği nedeniyle tercih edilmiştir.
FastAPI Modern, yüksek performanslı web framework. Otomatik API dokümantasyonu (Swagger/OpenAPI), tip kontrolü ve asenkron işlem desteği sunmaktadır.
OpenCV (Open Source Computer Vision Library) Bilgisayarlı görü işlemleri için en yaygın kullanılan açık kaynak kütüphanedir. Görüntü okuma/yazma, filtreleme, dönüşüm ve analiz fonksiyonları içermektedir.
MediaPipe Google tarafından geliştirilen, gerçek zamanlı makine öğrenmesi çözümleri sunan framework. Önceden eğitilmiş modeller ile yüz, el, poz tespiti gibi görevleri kolayca gerçekleştirmektedir.
NumPy Çok boyutlu diziler ve matris işlemleri için kullanılan temel kütüphane. Görüntü verilerinin matematiksel manipülasyonunda kritik rol oynamaktadır.
Uvicorn ASGI (Asynchronous Server Gateway Interface) sunucusu. FastAPI uygulamasını çalıştırmak için kullanılmaktadır.
3.2.2. Frontend Teknolojileri
React 18 Kullanıcı arayüzü geliştirme için kullanılan popüler JavaScript kütüphanesi. Component-based mimari, virtual DOM ve hooks özellikleri ile modern web uygulamaları geliştirmeyi kolaylaştırmaktadır.
Vite Hızlı geliştirme deneyimi sunan modern build tool. Hot Module Replacement (HMR) ile anlık kod değişikliklerini yansıtmaktadır.
Framer Motion Animasyon ve geçiş efektleri için kullanılan kütüphane. Kullanıcı deneyimini iyileştirmek amacıyla entegre edilmiştir.
React Dropzone Drag-and-drop dosya yükleme işlevselliği sağlamaktadır.
3.3. Bilgisayarlı Görü Algoritmaları
3.3.1. Yüz Tespiti (Face Detection)




Sistemde iki farklı yüz tespiti yöntemi kullanılmaktadır:
MediaPipe Face Detection (Birincil Yöntem)
•	BlazeFace modeline dayanmaktadır
•	Gerçek zamanlı performans için optimize edilmiştir
•	Her tespit edilen yüz için güven skoru (confidence score) döndürür
•	Minimum tespit güveni: 0.5
OpenCV Haar Cascade (Yedek Yöntem)
•	MediaPipe kullanılamadığında devreye girer
•	Viola-Jones algoritmasına dayanır
•	Frontal yüz tespiti için haarcascade_frontalface_default.xml kullanılır
Algoritma Akışı:
1.	Görüntü BGR'den RGB'ye dönüştürülür
2.	MediaPipe Face Detection modeli uygulanır
3.	Tespit edilen yüzler için bounding box çizilir
4.	Güven skorları görüntü üzerine yazılır
3.3.2. Yüz Mesh (Face Mesh)
MediaPipe Face Mesh, yüz geometrisini 468 3D landmark ile modellemektedir.
Özellikler:
•	Yüz konturları (FACEMESH_CONTOURS)
•	Yüz tessellation (FACEMESH_TESSELATION)
•	İris takibi (refine_landmarks=True ile)
Parametreler:
•	static_image_mode: True (statik görüntüler için)
•	max_num_faces: 5 (maksimum tespit edilecek yüz sayısı)
•	min_detection_confidence: 0.5
3.3.3. El Tespiti ve Takibi (Hand Detection)
MediaPipe Hands, her el için 21 anahtar nokta tespit etmektedir:



Landmark Noktaları:
•	0: Bilek (Wrist)
•	1-4: Başparmak eklemleri
•	5-8: İşaret parmağı eklemleri
•	9-12: Orta parmak eklemleri
•	13-16: Yüzük parmağı eklemleri
•	17-20: Serçe parmak eklemleri
El Yönü Tespiti:
•	Handedness classification ile sağ/sol el ayrımı yapılır
•	Her el için iskelet bağlantıları (HAND_CONNECTIONS) çizilir
3.3.4. Jest Tanıma (Gesture Recognition)
El landmark'ları analiz edilerek parmak pozisyonları belirlenmekte ve jestler tanınmaktadır.
Parmak Durumu Tespiti:
•	Başparmak: X koordinatı karşılaştırması (el yönüne göre)
•	Diğer parmaklar: Y koordinatı karşılaştırması (uç vs. eklem)
Tanınan Jestler:
•	Yumruk: Tüm parmaklar kapalı
•	İşaret: Sadece işaret parmağı açık
•	Barış/Victory: İşaret ve orta parmak açık
•	Rock: Başparmak, işaret ve serçe parmak açık
•	Başparmak: Sadece başparmak açık
•	Beş: Tüm parmaklar açık
•	Diğer kombinasyonlar
3.3.5. Poz Kestirimi (Pose Estimation)
MediaPipe Pose, 33 vücut landmark'ı tespit etmektedir:
Landmark Grupları:
•	Yüz: Burun, gözler, kulaklar, ağız
•	Üst vücut: Omuzlar, dirsekler, bilekler
•	Alt vücut: Kalçalar, dizler, ayak bilekleri, ayaklar

Parametreler:
•	model_complexity: 1 (0: Lite, 1: Full, 2: Heavy)
•	enable_segmentation: False (arka plan segmentasyonu kapalı)
3.3.6. Aksiyon Tanıma (Action Recognition)
Poz landmark'ları analiz edilerek vücut hareketleri tanınmaktadır.
Tanınan Aksiyonlar:
•	Eller Yukarı: Her iki el omuzlardan yukarıda
•	Sol/Sağ El Yukarı: Tek el yukarıda
•	Eğilme: Omuz-kalça mesafesi azalmış
•	Çömelme: Dizler kalçalara yakın
•	Ayakta Durma: Varsayılan duruş
Analiz Yöntemi:
•	Landmark'ların Y koordinatları karşılaştırılır
•	Vücut segmentleri arası mesafeler hesaplanır
•	Eşik değerlere göre aksiyon sınıflandırması yapılır
3.3.7. Nesne Kontur Tespiti (Contour Detection)
OpenCV kullanılarak nesne sınırları tespit edilmektedir.
İşlem Adımları:
1.	Görüntü gri tonlamaya dönüştürülür
2.	Gaussian blur ile gürültü azaltılır
3.	Adaptive thresholding uygulanır
4.	Konturlar bulunur (findContours)
5.	Alan filtresi uygulanır (min: 500 piksel)
6.	Bounding box'lar çizilir
3.3.8. Metin Bölgesi Tespiti (Text Detection)
MSER (Maximally Stable Extremal Regions) algoritması kullanılmaktadır.
Filtreleme Kriterleri:
•	Aspect ratio: 0.1 - 10 arası
•	Minimum boyut: 10x10 piksel
•	Maksimum genişlik: Görüntü genişliğinin %80'i
3.3.9. Arka Plan Segmentasyonu
İki farklı yöntem sunulmaktadır:
1. Selfie Segmentation (MediaPipe)
•	Portre modu için optimize edilmiş
•	Segmentasyon maskesi oluşturulur
•	Arka plan bulanıklaştırılır (Gaussian blur, kernel: 55x55)
2. Background Removal (GrabCut)
•	Görüntünün %10-90 bölgesi ön plan olarak işaretlenir
•	İteratif optimizasyon (5 iterasyon)
•	Ön plan/arka plan modelleri oluşturulur
3.4. API Tasarımı
3.4.1. Endpoint Yapısı
GET /
•	API durum kontrolü
•	Versiyon bilgisi
•	Endpoint listesi
GET /modes
•	Desteklenen işleme modları
•	Kategori bazlı gruplama (yüz, vücut, nesne, segmentasyon)
POST /process-image/
•	Parametreler: file (UploadFile), mode (str)
•	Dönüş: İşlenmiş görüntü (JPEG)
•	Desteklenen formatlar: JPG, PNG
POST /analyze-image/
•	Parametreler: file (UploadFile)
•	Dönüş: JSON (boyut, renk istatistikleri, parlaklık)
POST /process-video/
•	Parametreler: file (UploadFile), mode (str)
•	Dönüş: İşlenmiş video (MP4)
•	Desteklenen modlar: detection, face_mesh, hands, pose, gesture, contours, selfie
3.4.2. Hata Yönetimi
•	HTTP 400: Geçersiz dosya veya mod
•	HTTP 500: İşleme hatası
•	Detaylı hata mesajları JSON formatında döndürülür
3.4.3. CORS Yapılandırması
•	Tüm origin'lere izin verilmektedir (geliştirme amaçlı)
•	Üretim ortamında spesifik domain'ler belirtilmelidir
3.5. Video İşleme
Video işleme, VideoProcessor sınıfı tarafından yönetilmektedir.
İşlem Akışı:
1.	Video dosyası geçici dizine yazılır
2.	OpenCV VideoCapture ile video açılır
3.	Her frame için seçilen mod uygulanır
4.	İşlenmiş frame'ler VideoWriter ile yazılır
5.	İşlem tamamlandığında dosya döndürülür
6.	Geçici dosyalar temizlenir
Performans Optimizasyonu:
•	Frame atlama seçeneği
•	Çözünürlük ayarlama
•	Codec seçimi (mp4v)

4. UYGULAMA DETAYLARI
4.1. Proje Yapısı
goruntuisleme/
├── backend/
│   ├── main.py                 # FastAPI ana uygulama
│   ├── ai_core.py              # Bilgisayarlı görü fonksiyonları
│   ├── video_processor.py      # Video işleme modülü
│   ├── init_models.py          # Model başlatma
│   ├── requirements.txt        # Python bağımlılıkları
│   └── venv2/                  # Python sanal ortamı
│
├── frontend/
│   ├── src/
│   │   ├── components/         # React bileşenleri
│   │   ├── App.jsx             # Ana uygulama
│   │   └── index.css           # Stil dosyaları
│   ├── package.json            # Node bağımlılıkları
│   └── vite.config.js          # Vite yapılandırması
│
├── README.md                   # Proje dokümantasyonu
└── BASLAT.md                   # Başlatma kılavuzu
4.2. Backend Implementasyonu
4.2.1. main.py
Ana FastAPI uygulaması, endpoint'leri ve middleware yapılandırmasını içermektedir.
Önemli Özellikler:
•	CORS middleware: Cross-origin isteklere izin verir
•	Otomatik API dokümantasyonu: /docs ve /redoc endpoint'leri
•	Mod yönetimi: COMPUTER_VISION_MODES dictionary ile
•	Geçici dosya yönetimi: tempfile modülü ile
4.2.2. ai_core.py
Tüm bilgisayarlı görü fonksiyonlarını içeren modül.
Modül Yapısı:
•	MediaPipe güvenli yükleme mekanizması
•	Yardımcı fonksiyonlar (_add_error_text, _add_info_overlay)
•	Bilgisayarlı görü fonksiyonları (process_*)
•	Görüntü analiz fonksiyonları
Hata Toleransı:
•	MediaPipe yüklenemezse fallback mekanizmaları
•	Try-except blokları ile hata yakalama
•	Kullanıcı dostu hata mesajları
4.2.3. video_processor.py
Video işleme sınıfı, frame-by-frame işlem yapısını yönetmektedir.
Sınıf Yapısı:
class VideoProcessor:
    def __init__(self):
        # MediaPipe modelleri başlatma
        
    def process_video_file(self, input_path, output_path, mode):
        # Video işleme ana fonksiyonu
        
    def _process_frame(self, frame, mode):
        # Tek frame işleme
4.3. Frontend Implementasyonu
4.3.1. Kullanıcı Arayüzü
React component-based mimarisi kullanılmaktadır.
Ana Bileşenler:
•	ImageProcessor: Görüntü yükleme ve işleme
•	VideoProcessor: Video yükleme ve işleme
•	ResultDisplay: Sonuç görüntüleme
•	ModeSelector: İşleme modu seçimi
4.3.2. API İletişimi
Fetch API kullanılarak backend ile iletişim kurulmaktadır.
İstek Yapısı:
const formData = new FormData();
formData.append('file', file);
formData.append('mode', selectedMode);
const response = await fetch('http://localhost:8000/process-image/', {
    method: 'POST',
    body: formData
});
4.4. Kurulum ve Çalıştırma
4.4.1. Backend Kurulumu
cd backend
python -m venv venv2
venv2\Scripts\activate
pip install -r requirements.txt
python main.py
4.4.2. Frontend Kurulumu
cd frontend
npm install
npm run dev
4.4.3. Sistem Gereksinimleri
Minimum Gereksinimler:
•	Python 3.9+
•	Node.js 18+
•	4 GB RAM
•	2 GB disk alanı
Önerilen Gereksinimler:
•	Python 3.11+
•	Node.js 20+
•	8 GB RAM
•	GPU desteği (CUDA)
________________________________________
5. TEST VE SONUÇLAR
5.1. Test Metodolojisi
Sistem, farklı senaryolar altında test edilmiştir:
1.	Fonksiyonel Testler: Her modülün doğru çalışması
2.	Performans Testler: İşlem süreleri ve kaynak kullanımı
3.	Kullanılabilirlik Testleri: Kullanıcı deneyimi değerlendirmesi
5.2. Performans Metrikleri
Görüntü İşleme Süreleri (Ortalama):
•	Yüz Tespiti: ~50-100ms
•	Face Mesh: ~150-200ms
•	El Tespiti: ~100-150ms
•	Poz Kestirimi: ~150-250ms
•	Jest Tanıma: ~120-180ms
Video İşleme:
•	30 FPS video için yaklaşık gerçek zamanlı işlem
•	Çözünürlük: 1280x720 optimal
5.3. Doğruluk Değerlendirmesi
Yüz Tespiti:
•	İyi aydınlatma koşullarında %95+ doğruluk
•	Çoklu yüz tespitinde robust performans
El Tespiti:
•	Net görüntülerde %90+ doğruluk
•	Arka plan karmaşıklığından etkilenebilir
Jest Tanıma:
•	Temel jestlerde %85+ doğruluk
•	Karmaşık el pozisyonlarında zorluk
5.4. Karşılaşılan Zorluklar ve Çözümler
Zorluk 1: MediaPipe Kurulum Sorunları
•	Çözüm: Fallback mekanizmaları ve detaylı hata mesajları
Zorluk 2: Video İşleme Performansı
•	Çözüm: Frame atlama ve çözünürlük optimizasyonu
Zorluk 3: CORS Hataları
•	Çözüm: Middleware yapılandırması



6. SONUÇ VE ÖNERİLER
6.1. Sonuçlar
Bu çalışmada, modern bilgisayarlı görü tekniklerini kullanarak web tabanlı bir yapay zeka uygulaması geliştirilmiştir. Sistem, MediaPipe ve OpenCV kütüphanelerinin sağladığı güçlü algoritmaları kullanıcı dostu bir arayüz ile sunmaktadır.
Başarılan Hedefler:
•	Çoklu bilgisayarlı görü modülünün entegrasyonu
•	Gerçek zamanlı işlem yetenekleri
•	Modüler ve genişletilebilir mimari
•	Kullanıcı dostu web arayüzü
Katkılar:
•	Açık kaynak teknolojilerin etkin kullanımı
•	Eğitim ve araştırma amaçlı platform
•	Modern web teknolojileri ile bilgisayarlı görü entegrasyonu
6.2. Gelecek Çalışmalar
Sistemin geliştirilmesi için önerilen iyileştirmeler:
1. Yeni Modüller:
•	Nesne tespiti (YOLO, SSD)
•	Yüz tanıma (face recognition)
•	Optik karakter tanıma (OCR)
•	Görüntü sınıflandırma
2. Performans İyileştirmeleri:
•	GPU hızlandırma (CUDA)
•	Model optimizasyonu (quantization)
•	Önbellekleme mekanizmaları
•	Asenkron işlem genişletmesi
3. Kullanıcı Deneyimi:
•	Gerçek zamanlı webcam desteği
•	Batch işleme yetenekleri
•	Sonuç karşılaştırma araçları
•	Dışa aktarma seçenekleri (JSON, CSV)
4. Güvenlik ve Ölçeklenebilirlik:
•	Kullanıcı kimlik doğrulama
•	Rate limiting
•	Dosya boyutu kısıtlamaları
•	Bulut deployment (Docker, Kubernetes)
5. Mobil Uygulama:
•	React Native ile mobil port
•	TensorFlow Lite entegrasyonu
•	Offline çalışma modu
6.3. Değerlendirme
Proje, bilgisayarlı görü teknolojilerinin pratik uygulamalarını göstermekte ve modern web teknolojileri ile entegrasyonunu başarıyla gerçekleştirmektedir. Modüler yapısı sayesinde kolayca genişletilebilir ve farklı kullanım senaryolarına adapte edilebilir.
Sistem, eğitim amaçlı kullanımın yanı sıra, gerçek dünya uygulamaları için de temel oluşturabilecek niteliktedir. Açık kaynak teknolojilerin kullanımı, projenin sürdürülebilirliğini ve topluluk katkılarına açıklığını sağlamaktadır.

KAYNAKLAR
1.	Viola, P., & Jones, M. (2001). Rapid object detection using a boosted cascade of simple features. Proceedings of the 2001 IEEE Computer Society Conference on Computer Vision and Pattern Recognition.
2.	Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). ImageNet classification with deep convolutional neural networks. Advances in Neural Information Processing Systems, 25.
3.	Zhang, K., Zhang, Z., Li, Z., & Qiao, Y. (2016). Joint face detection and alignment using multitask cascaded convolutional networks. IEEE Signal Processing Letters, 23(10), 1499-1503.
4.	Bazarevsky, V., Kartynnik, Y., Vakunov, A., Raveendran, K., & Grundmann, M. (2019). BlazeFace: Sub-millisecond neural face detection on mobile GPUs. arXiv preprint arXiv:1907.05047.
5.	Cao, Z., Simon, T., Wei, S. E., & Sheikh, Y. (2017). Realtime multi-person 2D pose estimation using part affinity fields. Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition.
6.	Lugaresi, C., Tang, J., Nash, H., McClanahan, C., Uboweja, E., Hays, M., ... & Grundmann, M. (2019). MediaPipe: A framework for building perception pipelines. arXiv preprint arXiv:1906.08172.
7.	Bradski, G. (2000). The OpenCV Library. Dr. Dobb's Journal of Software Tools.
8.	Rother, C., Kolmogorov, V., & Blake, A. (2004). "GrabCut" interactive foreground extraction using iterated graph cuts. ACM Transactions on Graphics (TOG), 23(3), 309-314.
9.	Matas, J., Chum, O., Urban, M., & Pajdla, T. (2004). Robust wide-baseline stereo from maximally stable extremal regions. Image and Vision Computing, 22(10), 761-767.
10.	Ramírez, S. (2018). FastAPI framework, high performance, easy to learn, fast to code, ready for production. https://fastapi.tiangolo.com

EKLER

Çıktılar için: https://drive.google.com/drive/folders/15N9snpz3GYKRWSH8hj4zXBdiFpLWnaET?usp=sharing 
EK A: Desteklenen İşleme Modları
Yüz Analizi:
•	detection: Yüz tespiti
•	face_mesh: Yüz mesh (468 landmark)
•	face_landmarks: Yüz landmark tespiti
Vücut Analizi:
•	pose: Vücut poz kestirimi (33 landmark)
•	hands: El tespiti (21 landmark)
•	gesture: Jest tanıma
•	action: Aksiyon tanıma
Nesne Analizi:
•	contours: Nesne kontur tespiti
•	text_detection: Metin bölgesi tespiti
Segmentasyon:
•	selfie: Selfie segmentasyonu (portre modu)
•	background: Arka plan çıkarma (GrabCut)
EK B: API Endpoint Detayları
Temel URL: http://localhost:8000
Swagger Dokümantasyonu: http://localhost:8000/docs
ReDoc Dokümantasyonu: http://localhost:8000/redoc
EK C: Bağımlılıklar
Backend (requirements.txt):
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
opencv-python>=4.8.0
mediapipe>=0.10.0
numpy>=1.24.0
python-multipart>=0.0.6
Frontend (package.json):
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "react-dropzone": "^14.2.0"
  }
}


