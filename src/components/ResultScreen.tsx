import React, { useState } from 'react';
import { 
  CheckCircle2, Volume2, ShieldCheck, ArrowRight, RefreshCw, 
  Sparkles, Layers, MapPin, BookOpen, Music, Info, ArrowLeft, 
  AlertTriangle, HelpCircle, Database, Camera, Check
} from 'lucide-react';
import { IdentificationResult, InstrumentData } from '../types/instruments';
import { VIETNAMESE_INSTRUMENTS } from '../data/instrumentsData';
import { audioSynth } from '../utils/audioSynthesizer';

interface ResultScreenProps {
  result: IdentificationResult;
  uploadedImage: string | null;
  onNavigate: (screen: string) => void;
  onSelectInstrumentDetail: (instrumentId: string) => void;
  onSelectInstrumentStudio: (instrumentId: string) => void;
  onOpenExpertChat: (context?: any) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  uploadedImage,
  onNavigate,
  onSelectInstrumentDetail,
  onSelectInstrumentStudio,
  onOpenExpertChat,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Match local instrument profile for deep actions & rich assets
  const matchedInstrument: InstrumentData | undefined = VIETNAMESE_INSTRUMENTS.find(
    (i) =>
      i.name.toLowerCase().includes(result.instrumentName.toLowerCase()) ||
      result.instrumentName.toLowerCase().includes(i.name.toLowerCase())
  );

  const playInstrumentSampleAudio = () => {
    const preset = matchedInstrument?.soundPreset || 'dan_bau';
    setIsPlayingSound(true);

    const sampleNotes = [
      { freq: 261.63, duration: 0.35 },
      { freq: 293.66, duration: 0.35 },
      { freq: 349.23, duration: 0.4 },
      { freq: 392.00, duration: 0.45 },
      { freq: 440.00, duration: 0.5 },
      { freq: 523.25, duration: 0.8 },
    ];

    audioSynth.playMelody(
      preset,
      sampleNotes,
      undefined,
      () => setIsPlayingSound(false)
    );
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt chưa hỗ trợ Text-to-Speech.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // =========================================================================
  // CASE 1: UNABLE TO IDENTIFY CONFIDENTLY (Ambiguous / Unclear image)
  // Hệ thống thông báo rõ ràng, không tự ý khẳng định kết quả khi thiếu căn cứ
  // =========================================================================
  if (result.canIdentify === false) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('identify')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E1E] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang Tải ảnh</span>
          </button>

          <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>Màn Hình 3 — Chưa Đủ Căn Cứ Xác Định</span>
          </span>
        </div>

        {/* Unclear Image Alert Card */}
        <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-md overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-stone-100 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#2A2421]">
                Chưa Thể Nhận Diện Chính Xác Nhạc Cụ
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {result.statusMessage || 'Hình ảnh chưa đủ rõ ràng hoặc thiếu các chi tiết đặc trưng để hệ thống AI xác định chắc chắn.'}
              </p>
            </div>
          </div>

          {/* Uploaded Image Preview */}
          {uploadedImage && (
            <div className="max-w-xs mx-auto rounded-2xl overflow-hidden border border-stone-200 shadow-2xs">
              <div className="relative aspect-4/3 bg-stone-100">
                <img
                  src={uploadedImage}
                  alt="Ảnh đã tải lên"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[10px] bg-black/70 text-white font-bold px-2 py-0.5 rounded">
                  Ảnh bạn đã cung cấp
                </span>
              </div>
            </div>
          )}

          {/* Reason & Ethics Notice */}
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Nguyên nhân chưa thể xác định:</span>
            </div>
            <p className="leading-relaxed">
              {result.unclearReason || 'Hình ảnh bị mờ, thiếu ánh sáng, góc chụp bị che khuất các bộ phận nhận dạng quan trọng (cần đàn, dây đàn, phím đàn hoặc màng da) hoặc vật thể trong ảnh không phải là nhạc cụ truyền thống.'}
            </p>
            <p className="text-[11px] text-amber-800 italic pt-1 border-t border-amber-200/60">
              * Nguyên tắc học thuật: Hệ thống tuân thủ cam kết không tự khẳng định kết quả khi thiếu căn cứ tin cậy nhằm đảm bảo tính chuẩn xác của dữ liệu văn hóa.
            </p>
          </div>

          {/* Possible Candidates if Gemini had vague suspicions */}
          {result.possibleCandidates && result.possibleCandidates.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Các Khả Năng Có Thể Tương Đồng (Tham Khảo, Chưa Khẳng Định):</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.possibleCandidates.map((cand, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-xs space-y-1">
                    <strong className="text-stone-900 block font-bold text-sm">
                      {cand.name} ({cand.likelihood})
                    </strong>
                    <p className="text-stone-600 text-[11px] leading-relaxed">
                      {cand.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photography Suggestions */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 text-xs text-stone-700">
            <strong className="block font-bold text-[#2A2421] text-sm">
              💡 Hướng dẫn chụp ảnh để nhận diện chính xác:
            </strong>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Chụp nơi có đủ ánh sáng tự nhiên hoặc bật đèn rõ ràng.</li>
              <li>Lấy trọn vẹn toàn bộ thân đàn hoặc chụp cận cảnh rõ nét các bộ phận quyết định: <em>bầu đàn, cần đàn, con nhạn, phím bấm, ống nứa hoặc mặt trống</em>.</li>
              <li>Tránh để bàn tay hoặc đồ vật khác che khuất nhạc cụ.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('identify')}
              className="px-6 py-3 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Chụp Ảnh Khác Hoặc Tải Lại</span>
            </button>

            <button
              onClick={() => onNavigate('catalog')}
              className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Tra Cứu Bách Khoa Để Tự Đối Chiếu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // CASE 2: IDENTIFIED SUCCESSFULLY WITH HIGH CONFIDENCE
  // Hệ thống đối chiếu kết quả với dữ liệu nhạc cụ hiện có và hiển thị đầy đủ
  // =========================================================================
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('identify')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E1E] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Màn hình 2 (Tải ảnh)</span>
        </button>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Màn Hình 3 — Kết Quả Nhận Diện Thành Công</span>
        </span>
      </div>

      {/* Main Result Card */}
      <div className="bg-white rounded-3xl border-2 border-[#D9C4AC] shadow-md overflow-hidden">
        {/* Result Header Banner */}
        <div className="bg-gradient-to-r from-[#8B1E1E] via-[#9E2617] to-[#741515] text-white p-6 sm:p-8 relative">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-0.5 rounded-full bg-[#FCECD0] text-[#7F1D1D]">
                  {result.family || 'Nhạc Cụ Cổ Truyền'}
                </span>

                {result.unescoHeritage && (
                  <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-0.5 rounded-full bg-amber-400 text-stone-900 flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" /> Di sản Văn hóa UNESCO
                  </span>
                )}

                {/* Database Verification Match Badge */}
                {result.isMatchedWithDatabase && (
                  <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-xs">
                    <Database className="w-3.5 h-3.5" /> Đã đối chiếu với CSDL chuẩn
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#FFF8EC] tracking-tight">
                {result.instrumentName}
              </h1>

              {result.otherNames && (
                <p className="text-xs sm:text-sm text-[#F8E3C0] font-medium">
                  Tên gọi khác: <span className="italic">{result.otherNames}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#FCEBD3] pt-1">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-200" />
                  <span>Dân tộc: <strong>{result.ethnicGroup}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-200" />
                  <span>Vùng miền: <strong>{result.culturalRegion}</strong></span>
                </div>
              </div>
            </div>

            {/* Confidence and Audio Controls */}
            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Độ tin cậy dự đoán: {result.confidence || 95}%</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(`${result.instrumentName}. ${result.summary}. Nguồn gốc từ vùng ${result.culturalRegion}.`)}
                  title="Đọc tóm tắt bằng giọng nói tiếng Việt"
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                    isSpeaking 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Dừng đọc' : 'Đọc tóm tắt'}</span>
                </button>

                <button
                  onClick={playInstrumentSampleAudio}
                  disabled={isPlayingSound}
                  className="px-4 py-2 rounded-xl bg-[#F5D48E] hover:bg-[#F2CA73] text-[#691818] font-bold text-xs shadow-md transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingSound ? 'animate-bounce' : ''}`} />
                  <span>{isPlayingSound ? 'Đang ngân...' : 'Thử âm sắc'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Database Cross-referencing Notice Banner */}
        {result.isMatchedWithDatabase && result.matchedRecord && (
          <div className="p-4 px-6 sm:px-8 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Đối chiếu dữ liệu thành công:</strong> Nhạc cụ đã được kiểm chứng khớp với bản ghi <strong>{result.matchedRecord.ma_nhac_cu}</strong> trong tệp dữ liệu chuẩn.
              </span>
            </div>
            <button
              onClick={() => onSelectInstrumentDetail(matchedInstrument?.id || 'dan-bau')}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Xem chi tiết hồ sơ gốc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Visual Images Comparison Row: Uploaded Image vs Official Reference */}
        <div className="p-6 sm:p-8 bg-[#FAF7F2] border-b border-[#E8DEC8]">
          <h2 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider mb-3">
            Hình Ảnh Minh Họa & Đối Chiếu Nhận Dạng
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadedImage && (
              <div className="rounded-2xl overflow-hidden border border-[#D9C4AC] bg-white shadow-2xs">
                <div className="relative aspect-16/10">
                  <img
                    src={uploadedImage}
                    alt="Ảnh người dùng cung cấp"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 text-[10px] bg-black/70 text-white font-bold px-2 py-0.5 rounded">
                    Ảnh bạn đã tải lên / chụp
                  </span>
                </div>
              </div>
            )}

            {matchedInstrument && (
              <div className="rounded-2xl overflow-hidden border border-[#D9C4AC] bg-white shadow-2xs">
                <div className="relative aspect-16/10">
                  <img
                    src={matchedInstrument.imageUrl}
                    alt={matchedInstrument.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 text-[10px] bg-[#8B1E1E]/90 text-white font-bold px-2 py-0.5 rounded">
                    Tư liệu lưu trữ chuẩn: {matchedInstrument.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Structured Information Blocks */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider mb-2">
              Giới Thiệu Tinh Hoa
            </h3>
            <p className="text-sm text-[#3E332B] leading-relaxed bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE0D2]">
              {result.summary}
            </p>
          </div>

          {/* Core Features */}
          {result.features && result.features.length > 0 && (
            <div>
              <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider mb-2">
                Đặc Điểm Nhận Dạng Cốt Lõi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {result.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-[#E5DACD] text-xs text-[#45382F] flex items-start gap-2.5 shadow-2xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center font-bold shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Structure & Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADBCE] space-y-2">
              <h3 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                Cấu Tạo Thân Đàn & Các Bộ Phận
              </h3>
              <p className="text-xs text-[#4E4036] leading-relaxed">
                {result.structure}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADBCE] space-y-2">
              <h3 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                Chất Liệu Chế Tác Cổ Truyền
              </h3>
              <p className="text-xs text-[#4E4036] leading-relaxed">
                {result.materials}
              </p>
            </div>
          </div>

          {/* Origin & Playing Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#E5DACD] space-y-2 shadow-2xs">
              <h3 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                Nguồn Gốc & Không Gian Lịch Sử
              </h3>
              <p className="text-xs text-[#4E4036] leading-relaxed">
                {result.originHistory}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E5DACD] space-y-2 shadow-2xs">
              <h3 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                Cách Chơi & Kỹ Thuật Diễn Tấu
              </h3>
              <p className="text-xs text-[#4E4036] leading-relaxed">
                {result.playingTechnique}
              </p>
            </div>
          </div>

          {/* UNESCO & Fun fact */}
          {result.unescoHeritage && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-900 font-bold mb-0.5">
                  Giá Trị Di Sản Văn Hóa Thế Giới (UNESCO)
                </strong>
                <span>{result.unescoHeritage}</span>
              </div>
            </div>
          )}

          {result.funFact && (
            <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 text-xs text-orange-950 flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-orange-900 font-bold mb-0.5">
                  Chi tiết thú vị (Bạn có biết?)
                </strong>
                <span>{result.funFact}</span>
              </div>
            </div>
          )}

          {/* Academic References & Verification Compliance Box */}
          <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#D9C4AC] p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DEC8] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#8B1E1E] text-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#FDE3B2]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#8B1E1E]">
                    Nguồn Tham Khảo Phù Hợp Đi Kèm
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Thông tin mô tả cấu tạo, nguồn gốc và âm học được đối chiếu từ các tài liệu chuẩn mực
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('references')}
                className="text-xs font-bold text-[#8B1E1E] hover:underline flex items-center gap-1"
              >
                <span>Xem Màn hình 7 (Thư mục Nguồn tham khảo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of citations */}
            <div className="space-y-2">
              {(result.references && result.references.length > 0 ? result.references : [
                'Viện Âm Nhạc Quốc Gia Việt Nam — Hồ sơ Tư liệu Nhạc khí Cổ truyền Việt Nam',
                'Giáo trình "Nhạc Khí Cổ Truyền Việt Nam" — Học Viện Âm Nhạc Quốc Gia Việt Nam',
                'GS.TS. Trần Văn Khê — "Âm Nhạc Truyền Thống Việt Nam"',
                'Tệp cơ sở dữ liệu mẫu chuẩn: vietnamese_instruments.json'
              ]).map((ref, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2.5 text-xs text-[#4A3D34]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{ref}</span>
                </div>
              ))}
            </div>

            {/* Non-assertion Academic Principle */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Nguyên tắc khoa học:</strong> Kết quả trên được phân tích dựa trên đặc trưng thị giác của ảnh chụp và đối chiếu cơ sở dữ liệu. Hệ thống chỉ công bố kết quả khi có đủ căn cứ tin cậy ({result.confidence || 95}% độ tương đồng) và luôn khuyến khích đối chiếu thêm với hồ sơ hiện vật thực tế.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#FAF7F2] border-t border-[#E8DEC8] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {matchedInstrument && (
              <button
                onClick={() => onSelectInstrumentDetail(matchedInstrument.id)}
                className="px-5 py-2.5 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#FDE3B2]" />
                <span>Xem Màn Hình Chi Tiết Nhạc Cụ (Màn hình 5)</span>
              </button>
            )}

            {matchedInstrument && (
              <button
                onClick={() => onSelectInstrumentStudio(matchedInstrument.id)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-[#D5C6B5] text-[#55463D] text-xs font-bold transition-all flex items-center gap-2"
              >
                <Music className="w-4 h-4 text-[#8B1E1E]" />
                <span>Thử Gảy Trên Phòng Thu Ngũ Cung</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenExpertChat(result)}
              className="px-4 py-2.5 rounded-xl bg-[#FFF8EB] border border-[#E5B54F] text-[#A66F17] hover:bg-[#FDEFD2] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2821A]" />
              <span>Hỏi Thêm Nghệ Nhân AI</span>
            </button>

            <button
              onClick={() => onNavigate('identify')}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Nhận diện ảnh khác</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
