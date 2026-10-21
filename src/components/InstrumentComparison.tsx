import React, { useState } from 'react';
import { Scale, ArrowLeftRight, Check, Sparkles, Volume2, ShieldCheck, ChevronRight } from 'lucide-react';
import { VIETNAMESE_INSTRUMENTS } from '../data/instrumentsData';
import { InstrumentData } from '../types/instruments';
import { audioSynth } from '../utils/audioSynthesizer';

interface InstrumentComparisonProps {
  initialLeftId?: string;
  initialRightId?: string;
  onSelectForStudio: (id: string) => void;
}

export const InstrumentComparison: React.FC<InstrumentComparisonProps> = ({
  initialLeftId = 'dan-bau',
  initialRightId = 'dan-tranh',
  onSelectForStudio,
}) => {
  const [leftId, setLeftId] = useState<string>(initialLeftId);
  const [rightId, setRightId] = useState<string>(initialRightId);

  const leftInst =
    VIETNAMESE_INSTRUMENTS.find((i) => i.id === leftId) ||
    VIETNAMESE_INSTRUMENTS[0];
  const rightInst =
    VIETNAMESE_INSTRUMENTS.find((i) => i.id === rightId) ||
    VIETNAMESE_INSTRUMENTS[1];

  const playQuickSound = (inst: InstrumentData) => {
    audioSynth.playNote(inst.soundPreset, 392, 1.2);
  };

  const presetPairs = [
    { label: 'Đàn Đáy vs Đàn Nguyệt', left: 'dan-day', right: 'dan-nguyet' },
    { label: 'Đàn Bầu vs Đàn Tranh', left: 'dan-bau', right: 'dan-tranh' },
    { label: "T'rưng vs K'lông Pút", left: 'dan-trung', right: 'klong-put' },
    { label: 'Cồng Chiêng vs Trống Đồng', left: 'cong-chieng', right: 'trong-dong' },
    { label: 'Sáo Trúc vs Khèn Mông', left: 'sao-truc', right: 'khen-mong' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-xs font-semibold mb-2">
          <Scale className="w-3.5 h-3.5" />
          <span>Đối Chiếu Học Thuật & Nhận Diện Phân Biệt</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2A2421]">
          So Sánh Nhạc Cụ Cổ Truyền
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6C5B50]">
          Đặt hai loại nhạc cụ cạnh nhau để phân tích rõ sự khác biệt về cấu trúc hình thể, chất liệu, kỹ thuật diễn tấu và vị trí trong dàn nhạc truyền thống.
        </p>
      </div>

      {/* Quick Select Presets Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <span className="text-xs font-semibold text-[#7A695E] mr-1">
          Cặp so sánh tiêu biểu:
        </span>
        {presetPairs.map((pair, idx) => (
          <button
            key={idx}
            onClick={() => {
              setLeftId(pair.left);
              setRightId(pair.right);
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF2E6] border border-[#D9CABB] text-[#55463D] hover:text-[#8B1E1E] font-medium transition-all shadow-2xs"
          >
            {pair.label}
          </button>
        ))}
      </div>

      {/* Comparison Selector Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Instrument Selector */}
        <div className="bg-white rounded-2xl border-2 border-[#D9C4AC] p-5 shadow-xs">
          <label className="block text-xs font-bold text-[#8B1E1E] uppercase tracking-wider mb-2">
            Nhạc Cụ Thứ Nhất:
          </label>
          <select
            value={leftId}
            onChange={(e) => setLeftId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-[#D5C6B5] bg-[#FAF7F2] text-sm font-bold text-[#2A2421] focus:outline-none focus:border-[#8B1E1E]"
          >
            {VIETNAMESE_INSTRUMENTS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} ({i.family})
              </option>
            ))}
          </select>
        </div>

        {/* Right Instrument Selector */}
        <div className="bg-white rounded-2xl border-2 border-[#D9C4AC] p-5 shadow-xs">
          <label className="block text-xs font-bold text-[#8B1E1E] uppercase tracking-wider mb-2">
            Nhạc Cụ Thứ Hai:
          </label>
          <select
            value={rightId}
            onChange={(e) => setRightId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-[#D5C6B5] bg-[#FAF7F2] text-sm font-bold text-[#2A2421] focus:outline-none focus:border-[#8B1E1E]"
          >
            {VIETNAMESE_INSTRUMENTS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} ({i.family})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Card */}
        <div className="bg-white rounded-2xl border border-[#E5DACD] overflow-hidden shadow-xs">
          <div className="relative aspect-16/9 bg-stone-100">
            <img
              src={leftInst.imageUrl}
              alt={leftInst.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <h3 className="font-serif text-2xl font-bold">{leftInst.name}</h3>
                <span className="text-xs text-amber-200">{leftInst.family}</span>
              </div>
              <button
                onClick={() => playQuickSound(leftInst)}
                className="p-2 rounded-full bg-white/90 text-[#8B1E1E] hover:bg-white shadow-md hover:scale-110 transition-transform"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-5 space-y-2">
            <p className="text-xs text-[#52443A] leading-relaxed">
              {leftInst.summary}
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-2xl border border-[#E5DACD] overflow-hidden shadow-xs">
          <div className="relative aspect-16/9 bg-stone-100">
            <img
              src={rightInst.imageUrl}
              alt={rightInst.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <h3 className="font-serif text-2xl font-bold">{rightInst.name}</h3>
                <span className="text-xs text-amber-200">{rightInst.family}</span>
              </div>
              <button
                onClick={() => playQuickSound(rightInst)}
                className="p-2 rounded-full bg-white/90 text-[#8B1E1E] hover:bg-white shadow-md hover:scale-110 transition-transform"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-5 space-y-2">
            <p className="text-xs text-[#52443A] leading-relaxed">
              {rightInst.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-side Technical Metric Table */}
      <div className="bg-white rounded-2xl border border-[#E5DACD] shadow-sm overflow-hidden mb-8">
        <div className="p-4 bg-[#FAF7F2] border-b border-[#E8DEC8]">
          <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider">
            Bảng Đối Chiếu Thông Số & Đặc Trưng Nhận Dạng
          </h3>
        </div>

        <div className="divide-y divide-[#F0E6D8] text-xs">
          {/* Row: Dân tộc & Địa bàn */}
          <div className="grid grid-cols-12 p-4 items-center">
            <div className="col-span-12 sm:col-span-3 font-bold text-[#7A695E] uppercase mb-1 sm:mb-0">
              Dân Tộc & Địa Bàn
            </div>
            <div className="col-span-6 sm:col-span-4 text-[#2A2421] pr-2">
              <strong>{leftInst.ethnicGroup}</strong> ({leftInst.culturalRegion})
            </div>
            <div className="col-span-6 sm:col-span-5 text-[#2A2421] pl-2 border-l border-[#F0E6D8]">
              <strong>{rightInst.ethnicGroup}</strong> ({rightInst.culturalRegion})
            </div>
          </div>

          {/* Row: Cấu tạo cốt lõi */}
          <div className="grid grid-cols-12 p-4 items-start">
            <div className="col-span-12 sm:col-span-3 font-bold text-[#7A695E] uppercase mb-1 sm:mb-0">
              Cấu Tạo Cốt Lõi
            </div>
            <div className="col-span-6 sm:col-span-4 text-[#4A3B32] pr-2 space-y-1">
              {leftInst.structure.map((s, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[#8B1E1E]">•</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="col-span-6 sm:col-span-5 text-[#4A3B32] pl-2 border-l border-[#F0E6D8] space-y-1">
              {rightInst.structure.map((s, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[#8B1E1E]">•</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row: Chất liệu chế tác */}
          <div className="grid grid-cols-12 p-4 items-start">
            <div className="col-span-12 sm:col-span-3 font-bold text-[#7A695E] uppercase mb-1 sm:mb-0">
              Chất Liệu Truyền Thống
            </div>
            <div className="col-span-6 sm:col-span-4 text-[#4A3B32] pr-2">
              {leftInst.materials.join(', ')}
            </div>
            <div className="col-span-6 sm:col-span-5 text-[#4A3B32] pl-2 border-l border-[#F0E6D8]">
              {rightInst.materials.join(', ')}
            </div>
          </div>

          {/* Row: Kỹ thuật diễn tấu */}
          <div className="grid grid-cols-12 p-4 items-start">
            <div className="col-span-12 sm:col-span-3 font-bold text-[#7A695E] uppercase mb-1 sm:mb-0">
              Kỹ Thuật Diễn Tấu
            </div>
            <div className="col-span-6 sm:col-span-4 text-[#4A3B32] pr-2">
              {leftInst.playingTechnique.join('. ')}
            </div>
            <div className="col-span-6 sm:col-span-5 text-[#4A3B32] pl-2 border-l border-[#F0E6D8]">
              {rightInst.playingTechnique.join('. ')}
            </div>
          </div>

          {/* Row: Di sản UNESCO */}
          <div className="grid grid-cols-12 p-4 items-center">
            <div className="col-span-12 sm:col-span-3 font-bold text-[#7A695E] uppercase mb-1 sm:mb-0">
              Di Sản UNESCO
            </div>
            <div className="col-span-6 sm:col-span-4 text-[#2A2421] pr-2">
              {leftInst.unescoHeritage ? (
                <span className="text-amber-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Có ghi danh
                </span>
              ) : (
                <span className="text-stone-400">Di sản văn hóa dân gian</span>
              )}
            </div>
            <div className="col-span-6 sm:col-span-5 text-[#2A2421] pl-2 border-l border-[#F0E6D8]">
              {rightInst.unescoHeritage ? (
                <span className="text-amber-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Có ghi danh
                </span>
              ) : (
                <span className="text-stone-400">Di sản văn hóa dân gian</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
