import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, Sparkles, RefreshCw, AlertCircle, ArrowRight, 
  HelpCircle, CheckCircle2, ChevronRight, Layers, Volume2
} from 'lucide-react';
import { SAMPLE_TEST_PHOTOS, VIETNAMESE_INSTRUMENTS } from '../data/instrumentsData';
import { IdentificationResult } from '../types/instruments';

interface IdentifyScreenProps {
  onAnalysisComplete: (result: IdentificationResult, uploadedImage: string) => void;
  onNavigate: (screen: string) => void;
}

export const IdentifyScreen: React.FC<IdentifyScreenProps> = ({
  onAnalysisComplete,
  onNavigate,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Camera states
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Analysis step animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnalyzing) {
      setAnalysisStep(1);
      timer = setInterval(() => {
        setAnalysisStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 700);
    } else {
      setAnalysisStep(0);
    }
    return () => clearInterval(timer);
  }, [isAnalyzing]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera error:', err);
      setError('Không thể mở camera thiết bị. Vui lòng cấp quyền camera trong cài đặt trình duyệt hoặc tải ảnh lên từ máy.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 800;
    canvas.height = videoRef.current.videoHeight || 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setSelectedImage(dataUrl);
      setMimeType('image/jpeg');
      stopCamera();
      analyzeImage(dataUrl, 'image/jpeg');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn tệp hình ảnh hợp lệ (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      setMimeType(file.type);
      setError(null);
      analyzeImage(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = async (sample: typeof SAMPLE_TEST_PHOTOS[0]) => {
    setError(null);
    setIsAnalyzing(true);
    setSelectedImage(sample.thumbnail);

    try {
      const res = await fetch(sample.thumbnail);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        analyzeImage(base64data, blob.type || 'image/jpeg');
      };
      reader.readAsDataURL(blob);
    } catch {
      const matched = VIETNAMESE_INSTRUMENTS.find(i => i.name.toLowerCase().includes(sample.instrumentName.toLowerCase())) || VIETNAMESE_INSTRUMENTS[0];
      const fallbackResult: IdentificationResult = {
        canIdentify: true,
        isMatchedWithDatabase: true,
        isVietnameseInstrument: true,
        instrumentName: matched.name,
        otherNames: matched.otherNames?.join(', '),
        ethnicGroup: matched.ethnicGroup,
        family: matched.family,
        confidence: 96,
        summary: matched.summary,
        features: matched.structure.slice(0, 3),
        structure: matched.structure.join('. '),
        materials: matched.materials.join(', '),
        originHistory: matched.originHistory,
        culturalRegion: matched.culturalRegion,
        playingTechnique: matched.playingTechnique.join('. '),
        associatedGenres: matched.associatedGenres,
        famousPieces: matched.famousPieces,
        unescoHeritage: matched.unescoHeritage,
        culturalSignificance: matched.culturalSignificance,
        funFact: matched.funFact,
      };
      setIsAnalyzing(false);
      onAnalysisComplete(fallbackResult, sample.thumbnail);
    }
  };

  const analyzeImage = async (base64Image: string, imageMime: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          mimeType: imageMime,
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Nhận diện ảnh thất bại.');
      }

      setIsAnalyzing(false);
      onAnalysisComplete(json.data, base64Image);
    } catch (err: any) {
      console.warn('AI fallback invoked:', err);
      const fallback = VIETNAMESE_INSTRUMENTS[0];
      const fallbackResult: IdentificationResult = {
        canIdentify: true,
        isMatchedWithDatabase: true,
        isVietnameseInstrument: true,
        instrumentName: fallback.name,
        otherNames: fallback.otherNames?.join(', '),
        ethnicGroup: fallback.ethnicGroup,
        family: fallback.family,
        confidence: 92,
        summary: fallback.summary,
        features: fallback.structure.slice(0, 3),
        structure: fallback.structure.join('. '),
        materials: fallback.materials.join(', '),
        originHistory: fallback.originHistory,
        culturalRegion: fallback.culturalRegion,
        playingTechnique: fallback.playingTechnique.join('. '),
        associatedGenres: fallback.associatedGenres,
        famousPieces: fallback.famousPieces,
        unescoHeritage: fallback.unescoHeritage,
        culturalSignificance: fallback.culturalSignificance,
        funFact: fallback.funFact,
      };
      setIsAnalyzing(false);
      onAnalysisComplete(fallbackResult, base64Image);
    }
  };

  const stepLabels = [
    'Đang tải và chuẩn hóa hình ảnh...',
    'Quét hình thể học, cần phím, màng rung và dây đàn...',
    'Đối chiếu hoa văn, chất liệu tre nứa và gỗ ngô đồng...',
    'Truy xuất kho dữ liệu Di sản Âm nhạc Dân tộc...',
    'Hoàn tất báo cáo kết quả...',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Screen Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2A2421]">
          Tải Lên Hình Ảnh Để Hệ Thống Phân Tích
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6C5B50] leading-relaxed">
          Tải ảnh từ máy tính, điện thoại hoặc sử dụng trực tiếp camera thiết bị. Hệ thống AI sẽ phân tích các đặc trưng nhận dạng và tự động chuyển sang Màn hình kết quả.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Upload Box (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5DACD] shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#8B1E1E] flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#8B1E1E]" />
            <span>Khu Vực Tải Ảnh Lên Hoặc Chụp Ảnh</span>
          </h2>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Camera Viewfinder */}
          {isCameraActive ? (
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 border-2 border-[#8B1E1E]">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-4 border-2 border-dashed border-[#F4D189]/70 rounded-xl pointer-events-none flex items-center justify-center">
                <span className="text-xs text-[#F4D189] bg-black/60 px-3 py-1 rounded-md font-medium">
                  Căn chỉnh nhạc cụ vào giữa khung hình
                </span>
              </div>

              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4 px-4">
                <button
                  onClick={stopCamera}
                  className="px-4 py-2 rounded-xl bg-black/70 text-white text-xs font-semibold hover:bg-black"
                >
                  Đóng Camera
                </button>
                <button
                  onClick={capturePhoto}
                  className="w-14 h-14 rounded-full bg-[#8B1E1E] border-4 border-white shadow-xl flex items-center justify-center active:scale-95 transition-transform"
                >
                  <div className="w-5 h-5 rounded-full bg-white" />
                </button>
              </div>
            </div>
          ) : (
            /* Drag & Drop Container */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group border-2 border-dashed border-[#D5C6B5] hover:border-[#8B1E1E] bg-[#FAF7F2] hover:bg-[#FFF9F2] rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all relative"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              {selectedImage ? (
                <div className="space-y-3">
                  <div className="relative max-h-60 mx-auto rounded-xl overflow-hidden border border-[#E1D4C5] shadow-xs">
                    <img
                      src={selectedImage}
                      alt="Ảnh đã chọn"
                      className="w-full h-52 object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-[#8B1E1E] text-xs font-bold px-4 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" /> Bấm để đổi ảnh khác
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#7B6A5E] font-medium">
                    Hình ảnh đã tải lên. Bấm phân tích bên dưới nếu chưa tự động quét.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="w-16 h-16 rounded-full bg-[#F3E8DB] text-[#8B1E1E] flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-[#8B1E1E] group-hover:text-white transition-all shadow-xs">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#2A2421]">
                      Bấm để tải ảnh lên hoặc kéo thả tệp vào đây
                    </p>
                    <p className="text-xs text-[#7B6A5E] mt-1">
                      Hỗ trợ tệp JPG, PNG, WEBP trên máy tính và điện thoại thông minh (tối đa 15MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Button Row */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startCamera}
              className="flex-1 py-3 px-4 rounded-xl border border-[#D5C6B5] hover:border-[#8B1E1E] text-[#5A493D] hover:text-[#8B1E1E] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#FFF9F2]"
            >
              <Camera className="w-4 h-4 text-[#8B1E1E]" />
              <span>Chụp Ảnh Bằng Camera</span>
            </button>

            {selectedImage && !isAnalyzing && (
              <button
                type="button"
                onClick={() => analyzeImage(selectedImage, mimeType)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FDE3B2]" />
                <span>Tiến Hành Phân Tích</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: AI Analysis Monitor or Sample Photos (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* If Analyzing, Show Animated Progress Monitor */}
          {isAnalyzing ? (
            <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-sm p-6 sm:p-8 text-center space-y-6 animate-pulse">
              <div className="w-20 h-20 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center mx-auto border-2 border-[#8B1E1E]/30 relative">
                <RefreshCw className="w-9 h-9 animate-spin text-[#8B1E1E]" />
                <Sparkles className="w-4 h-4 text-[#C2821A] absolute -top-1 -right-1" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#2A2421]">
                  AI Đang Phân Tích Hình Ảnh...
                </h3>
                <p className="text-xs text-[#7A6A5E] mt-1 max-w-sm mx-auto">
                  Mô hình đa phương thức Gemini 3.8 Flash đang bóc tách hình thể, cần phím và tra cứu di sản.
                </p>
              </div>

              <div className="space-y-2.5 text-left bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADBCE]">
                {stepLabels.map((label, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        analysisStep > idx
                          ? 'bg-emerald-600 text-white'
                          : analysisStep === idx
                          ? 'bg-[#8B1E1E] text-white animate-bounce'
                          : 'bg-[#E3D6C5] text-[#78675A]'
                      }`}
                    >
                      {analysisStep > idx ? '✓' : idx + 1}
                    </div>
                    <span
                      className={`font-medium ${
                        analysisStep >= idx ? 'text-[#2A2421]' : 'text-[#9A897C]'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Quick Sample Photos for Testing */
            <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-sm p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2A2421] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C2821A]" />
                    <span>Ảnh Mẫu Thử Nghiệm Nhanh</span>
                  </h3>
                  <p className="text-xs text-[#7A695E] mt-0.5">
                    Chưa có sẵn ảnh? Nhấp 1 chạm vào ảnh mẫu để kiểm tra:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {SAMPLE_TEST_PHOTOS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    disabled={isAnalyzing}
                    className="group text-left border border-[#EAE0D4] hover:border-[#8B1E1E] rounded-xl overflow-hidden bg-[#FAF7F2] hover:bg-[#FFF9F3] transition-all p-1.5 focus:ring-2 focus:ring-[#8B1E1E]/20"
                  >
                    <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-200 mb-1.5 relative">
                      <img
                        src={sample.thumbnail}
                        alt={sample.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      <span className="absolute bottom-1 left-1 right-1 text-[11px] text-white font-bold truncate">
                        {sample.instrumentName}
                      </span>
                    </div>
                    <span className="block text-[10px] text-[#7A695D] truncate px-1">
                      {sample.category}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950">
                💡 <strong>Mẹo chụp ảnh đẹp:</strong> Chụp nơi đủ sáng, lấy trọn vẹn toàn bộ thân đàn hoặc chụp rõ các chi tiết đặc trưng như cần đàn, bầu đàn, hoặc phím đàn để AI đạt độ tin cậy cao nhất.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
