import React, { useState } from 'react';
import { 
  ArrowLeft, Volume2, ShieldCheck, Layers, MapPin, Music2, 
  Sparkles, BookOpen, Scale, Check, Play, Info
} from 'lucide-react';
import { VIETNAMESE_INSTRUMENTS, PENTATONIC_BASE_SCALE } from '../data/instrumentsData';
import { InstrumentData } from '../types/instruments';
import { audioSynth } from '../utils/audioSynthesizer';

interface DetailScreenProps {
  instrumentId: string;
  onNavigate: (screen: string) => void;
  onSelectInstrumentStudio: (instrumentId: string) => void;
  onCompareInstrument: (instrumentId: string) => void;
  onOpenExpertChat: (context?: any) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  instrumentId,
  onNavigate,
  onSelectInstrumentStudio,
  onCompareInstrument,
  onOpenExpertChat,
}) => {
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const instrument: InstrumentData =
    VIETNAMESE_INSTRUMENTS.find((i) => i.id === instrumentId) ||
    VIETNAMESE_INSTRUMENTS[0];

  const handlePlayNote = (index: number) => {
    setActiveNoteIdx(index);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(25); } catch {}
    }
    const note = PENTATONIC_BASE_SCALE[index];
    if (note) {
      audioSynth.playNote(instrument.soundPreset, note.frequency, 1.2);
    }
    setTimeout(() => setActiveNoteIdx(null), 350);
  };

  const speakSummary = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${instrument.name}. ${instrument.summary}. Chất liệu: ${instrument.materials.join(', ')}. Nguồn gốc: ${instrument.originHistory}`
    );
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('catalog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E1E] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Màn hình 4 (Danh Sách Nhạc Cụ)</span>
        </button>

        <span className="text-xs px-3 py-1 rounded-full bg-[#FAF0E2] text-[#803F17] border border-[#ECD9C3] font-semibold">
          Màn Hình 5 — Chi Tiết Nhạc Cụ: {instrument.name}
        </span>
      </div>

      {/* Main Detail Container */}
      <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-sm overflow-hidden">
        {/* Banner with Big Image */}
        <div className="relative aspect-21/9 min-h-[280px] bg-stone-900 overflow-hidden">
          <img
            src={instrument.imageUrl}
            alt={instrument.imageAlt}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Banner Details */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#8B1E1E] text-white">
                  {instrument.family}
                </span>

                {instrument.unescoHeritage && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-amber-400 text-stone-900 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Di sản UNESCO
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#FFF8EC]">
                {instrument.name}
              </h1>

              {instrument.otherNames && (
                <p className="text-xs sm:text-sm text-[#F8E3C0]">
                  Tên gọi khác: <span className="italic">{instrument.otherNames.join(', ')}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  Dân tộc: <strong>{instrument.ethnicGroup}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  Vùng miền: <strong>{instrument.culturalRegion}</strong>
                </span>
              </div>
            </div>

            {/* Audio Voice Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={speakSummary}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                  isSpeaking ? 'bg-red-500 text-white animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeaking ? 'Dừng đọc' : 'Nghe giọng đọc'}</span>
              </button>

              <button
                onClick={() => onSelectInstrumentStudio(instrument.id)}
                className="px-4 py-2 rounded-xl bg-[#F5D48E] hover:bg-[#F2CA73] text-[#691818] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Music2 className="w-4 h-4" />
                <span>Mở Phòng Thu Độc Tấu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Summary */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADBCE]">
            <h2 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider mb-2">
              Giá Trị Tinh Hoa
            </h2>
            <p className="text-sm sm:text-base text-[#3E332B] leading-relaxed">
              {instrument.summary}
            </p>
          </div>

          {/* Interactive Pentatonic Keyboard Embedded Right on Detail Page */}
          <div className="bg-gradient-to-br from-[#2E2421] to-[#1F1715] text-white p-6 sm:p-8 rounded-3xl border border-[#4F3E37] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                  Trải Nghiệm Trực Tiếp
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FBEED7]">
                  Thử Gảy Thang Âm Ngũ Cung Của {instrument.name}
                </h3>
              </div>
              <span className="text-xs text-stone-400 hidden sm:block">
                Nhấp chuột hoặc chạm phím
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3 py-2">
              {PENTATONIC_BASE_SCALE.map((note, idx) => {
                const isActive = activeNoteIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePlayNote(idx)}
                    className={`h-28 sm:h-36 rounded-2xl flex flex-col justify-between p-2 sm:p-3 text-center transition-all select-none ${
                      isActive
                        ? 'bg-gradient-to-t from-[#B83826] to-[#E5533D] scale-95 border-2 border-amber-300'
                        : 'bg-gradient-to-t from-[#40332D] to-[#54433B] hover:from-[#4D3D37] border border-[#6A554A]'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-stone-400">
                      {note.westernNote}
                    </span>
                    <span className="font-serif text-lg sm:text-2xl font-black text-[#F4D189]">
                      {note.name}
                    </span>
                    <span className="text-[9px] font-mono text-stone-400">
                      {Math.round(note.frequency)}Hz
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Anatomy and Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anatomy */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EADBCE] space-y-3">
              <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Đặc Điểm Cấu Tạo Chi Tiết</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4E4036] leading-relaxed list-disc pl-4">
                {instrument.structure.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Materials */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EADBCE] space-y-3">
              <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Chất Liệu Chế Tác Cổ Truyền</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4E4036] leading-relaxed list-disc pl-4">
                {instrument.materials.map((mat, idx) => (
                  <li key={idx}>{mat}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* History and Playing Techniques Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E5DACD] space-y-3 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider">
                Nguồn Gốc Xuất Xứ & Chiều Dài Lịch Sử
              </h3>
              <p className="text-xs sm:text-sm text-[#4E4036] leading-relaxed">
                {instrument.originHistory}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5DACD] space-y-3 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider">
                Cách Chơi & Kỹ Thuật Diễn Tấu
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4E4036] leading-relaxed list-disc pl-4">
                {instrument.playingTechnique.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Genres & Famous Pieces */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EADBCE] space-y-4">
            <div>
              <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider mb-2">
                Thể Loại Âm Nhạc Gắn Liền
              </h3>
              <div className="flex flex-wrap gap-2">
                {instrument.associatedGenres.map((g, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-[#803F17] border border-[#ECD9C3] text-xs font-semibold shadow-2xs"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {instrument.famousPieces && instrument.famousPieces.length > 0 && (
              <div>
                <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider mb-2">
                  Bài Bản & Tác Phẩm Kinh Điển
                </h3>
                <div className="flex flex-wrap gap-2">
                  {instrument.famousPieces.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-stone-100 text-stone-800 border border-stone-200 text-xs font-medium italic"
                    >
                      "{p}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cultural Significance & UNESCO */}
          {instrument.unescoHeritage && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-900 font-bold mb-1">
                  Di Sản Văn Hóa Thế Giới (UNESCO)
                </strong>
                <p className="leading-relaxed">{instrument.unescoHeritage}</p>
              </div>
            </div>
          )}

          {/* Fun Fact */}
          <div className="p-5 rounded-2xl bg-orange-50/80 border border-orange-200 text-xs sm:text-sm text-orange-950 flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-orange-900 font-bold mb-1">
                Bạn có biết? (Sự thật thú vị)
              </strong>
              <p className="leading-relaxed">{instrument.funFact}</p>
            </div>
          </div>

          {/* Academic References & Documentation Source */}
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD] text-xs text-[#52443A] space-y-2.5">
            <div className="flex items-center justify-between">
              <strong className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#8B1E1E]" />
                <span>Nguồn Tài Liệu & Tham Khảo Khoa Học:</span>
              </strong>
              <button
                onClick={() => onNavigate('references')}
                className="text-xs font-bold text-[#8B1E1E] hover:underline"
              >
                Màn hình 7 (Nguồn tham khảo) &rarr;
              </button>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Dữ liệu cấu tạo, chất liệu, nguồn gốc và bài bản mẫu của <strong>{instrument.name}</strong> được đối chiếu từ Viện Âm Nhạc Quốc Gia Việt Nam, Giáo trình "Nhạc Khí Cổ Truyền Việt Nam", và khảo cứu học thuật của GS.TS Trần Văn Khê / GS.TS Tô Ngọc Thanh.
            </p>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="bg-[#FAF7F2] border-t border-[#E8DEC8] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onCompareInstrument(instrument.id)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-[#D5C6B5] text-[#55463D] text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Scale className="w-4 h-4 text-[#8B1E1E]" />
              <span>So sánh với nhạc cụ khác</span>
            </button>

            <button
              onClick={() => onOpenExpertChat(instrument)}
              className="px-4 py-2.5 rounded-xl bg-[#FFF8EB] border border-[#E5B54F] text-[#A66F17] hover:bg-[#FDEFD2] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#C2821A]" />
              <span>Hỏi Nghệ Nhân AI Về Cây Đàn Này</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Xem các nhạc cụ khác</span>
          </button>
        </div>
      </div>
    </div>
  );
};
