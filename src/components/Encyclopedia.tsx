import React, { useState } from 'react';
import { 
  Search, Filter, ShieldCheck, Volume2, Sparkles, X, ChevronRight, 
  MapPin, Layers, Music, BookOpen, ExternalLink, Play, Check 
} from 'lucide-react';
import { VIETNAMESE_INSTRUMENTS } from '../data/instrumentsData';
import { InstrumentData, InstrumentFamily, CulturalRegion } from '../types/instruments';
import { audioSynth } from '../utils/audioSynthesizer';

interface EncyclopediaProps {
  onSelectInstrumentForStudio: (instrumentId: string) => void;
  onOpenExpertChat: (context?: any) => void;
  onCompareInstrument: (instrumentId: string) => void;
}

export const Encyclopedia: React.FC<EncyclopediaProps> = ({
  onSelectInstrumentForStudio,
  onOpenExpertChat,
  onCompareInstrument,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [onlyUnesco, setOnlyUnesco] = useState<boolean>(false);
  const [detailModalInstrument, setDetailModalInstrument] = useState<InstrumentData | null>(null);
  const [playingInstrumentId, setPlayingInstrumentId] = useState<string | null>(null);

  // Filter instruments
  const filteredInstruments = VIETNAMESE_INSTRUMENTS.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.otherNames?.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inst.ethnicGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.associatedGenres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFamily =
      selectedFamily === 'all' || inst.family === selectedFamily;

    const matchesRegion =
      selectedRegion === 'all' || inst.culturalRegion === selectedRegion;

    const matchesUnesco = !onlyUnesco || Boolean(inst.unescoHeritage);

    return matchesSearch && matchesFamily && matchesRegion && matchesUnesco;
  });

  const families: { label: string; value: string }[] = [
    { label: 'Tất Cả Họ', value: 'all' },
    { label: 'Họ Dây (Dây gảy)', value: 'Họ Dây (Dây gảy)' },
    { label: 'Họ Dây (Dây kéo)', value: 'Họ Dây (Dây kéo)' },
    { label: 'Họ Hơi', value: 'Họ Hơi' },
    { label: 'Họ Gõ (Tự thân vang)', value: 'Họ Gõ (Tự thân vang)' },
    { label: 'Họ Màng rung', value: 'Họ Màng rung' },
  ];

  const regions: { label: string; value: string }[] = [
    { label: 'Tất Cả Miền', value: 'all' },
    { label: 'Đồng bằng Bắc Bộ', value: 'Đồng bằng Bắc Bộ' },
    { label: 'Cố đô Huế & Miền Trung', value: 'Cố đô Huế & Miền Trung' },
    { label: 'Tây Nguyên đại ngàn', value: 'Tây Nguyên đại ngàn' },
    { label: 'Nam Bộ & Đờn Ca Tài Tử', value: 'Nam Bộ & Đờn Ca Tài Tử' },
    { label: 'Vùng cao Tây Bắc & Đông Bắc', value: 'Vùng cao Tây Bắc & Đông Bắc' },
    { label: 'Văn hóa Chăm Duyên hải', value: 'Văn hóa Chăm Duyên hải' },
  ];

  const handlePlayQuickSound = (inst: InstrumentData, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingInstrumentId(inst.id);

    // Play representative pentatonic tone
    audioSynth.playNote(inst.soundPreset, 392, 1.2);
    setTimeout(() => {
      setPlayingInstrumentId(null);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Stats Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kho Tàng Văn Vật Âm Nhạc</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2A2421]">
            Bách Khoa Nhạc Cụ Cổ Truyền
          </h1>
          <p className="text-xs sm:text-sm text-[#6C5B50] mt-1">
            Tra cứu toàn diện về cấu tạo, xuất xứ, kỹ thuật diễn tấu và thanh âm của các loại nhạc cụ 54 dân tộc anh em.
          </p>
        </div>

        <div className="text-xs text-[#7B6A5E] bg-white border border-[#E3D6C5] rounded-xl px-4 py-2.5 flex items-center gap-3 shrink-0 shadow-2xs">
          <span>Đang hiển thị: <strong className="text-[#8B1E1E] text-sm">{filteredInstruments.length}</strong> / {VIETNAMESE_INSTRUMENTS.length} nhạc cụ</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-[#E5DACD] p-5 shadow-xs mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#9C897C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên (Đàn Bầu, T'rưng, Cồng Chiêng), dân tộc (Kinh, Mông, Chăm), thể loại (Ca Trù, Chầu Văn)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D9CABB] text-xs sm:text-sm focus:outline-none focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E] bg-[#FAF7F2]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F0E6D8]">
          <div className="flex flex-wrap items-center gap-2">
            {/* Family Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#6E5B4F]">Họ nhạc cụ:</span>
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="text-xs rounded-lg border border-[#D5C6B5] bg-[#FAF7F2] px-2.5 py-1.5 text-[#3A2E26] focus:outline-none focus:border-[#8B1E1E]"
              >
                {families.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#6E5B4F]">Vùng miền:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="text-xs rounded-lg border border-[#D5C6B5] bg-[#FAF7F2] px-2.5 py-1.5 text-[#3A2E26] focus:outline-none focus:border-[#8B1E1E]"
              >
                {regions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* UNESCO Toggle Button */}
          <button
            onClick={() => setOnlyUnesco(!onlyUnesco)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              onlyUnesco
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-2xs'
                : 'bg-[#FAF7F2] border-[#D5C6B5] text-[#69574A] hover:border-amber-400'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${onlyUnesco ? 'text-amber-700' : 'text-stone-400'}`} />
            <span>Chỉ xem Di sản UNESCO</span>
          </button>
        </div>
      </div>

      {/* Instruments Catalog Grid */}
      {filteredInstruments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5DACD] p-8">
          <BookOpen className="w-12 h-12 text-[#B3A090] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#2A2421]">
            Không tìm thấy nhạc cụ phù hợp
          </h3>
          <p className="text-xs text-[#7A6A5E] mt-1 max-w-sm mx-auto">
            Hãy thử tìm bằng từ khóa khác hoặc xóa bớt các bộ lọc để xem toàn bộ danh mục.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFamily('all');
              setSelectedRegion('all');
              setOnlyUnesco(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#8B1E1E] text-white text-xs font-semibold"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => (
            <div
              key={instrument.id}
              onClick={() => setDetailModalInstrument(instrument)}
              className="group bg-white rounded-2xl border border-[#E5DACD] hover:border-[#8B1E1E] shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Card Thumbnail Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={instrument.imageUrl}
                  alt={instrument.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {/* Badges on Top */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#8B1E1E] text-white shadow-xs">
                    {instrument.family.split(' ')[0]} {instrument.family.split(' ')[1]}
                  </span>
                  {instrument.unescoHeritage && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400 text-stone-900 flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3 h-3" /> UNESCO
                    </span>
                  )}
                </div>

                {/* Quick Listen Button on Card Image */}
                <button
                  onClick={(e) => handlePlayQuickSound(instrument, e)}
                  title="Nghe thử âm sắc"
                  className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-[#8B1E1E] shadow-md transition-transform hover:scale-110 active:scale-90"
                >
                  <Volume2 className={`w-4 h-4 ${playingInstrumentId === instrument.id ? 'animate-bounce text-[#C2821A]' : ''}`} />
                </button>

                {/* Title and Ethnic Label at bottom of image */}
                <div className="absolute bottom-2.5 left-2.5 right-12 text-white">
                  <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-[#FDE3B2] transition-colors">
                    {instrument.name}
                  </h3>
                  <p className="text-[11px] text-stone-200 truncate mt-0.5">
                    {instrument.ethnicGroup} • {instrument.culturalRegion}
                  </p>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#524339] line-clamp-3 leading-relaxed">
                  {instrument.summary}
                </p>

                {/* Genres Tags */}
                <div className="flex flex-wrap gap-1">
                  {instrument.associatedGenres.slice(0, 2).map((genre, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF0E2] text-[#803F17] border border-[#ECD9C3] font-medium truncate max-w-[140px]"
                    >
                      {genre}
                    </span>
                  ))}
                  {instrument.associatedGenres.length > 2 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-[#8A796D]">
                      +{instrument.associatedGenres.length - 2}
                    </span>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-[#F0E5D8] flex items-center justify-between text-xs font-semibold text-[#8B1E1E]">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Xem chi tiết bách khoa</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectInstrumentForStudio(instrument.id);
                    }}
                    title="Mở phòng thu thử âm"
                    className="p-1.5 rounded-lg hover:bg-[#FAF0E2] text-[#7A4016] transition-colors"
                  >
                    <Music className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deep-Dive Instrument Modal Drawer */}
      {detailModalInstrument && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full border border-[#D9C4AC] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#8B1E1E] to-[#6C120B] text-white p-6 shrink-0">
              <button
                onClick={() => setDetailModalInstrument(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                  {detailModalInstrument.family}
                </span>
                {detailModalInstrument.unescoHeritage && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-900 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Di sản UNESCO
                  </span>
                )}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#FFF8EC]">
                {detailModalInstrument.name}
              </h2>

              {detailModalInstrument.otherNames && (
                <p className="text-xs text-[#F8E3C0] mt-0.5">
                  Tên gọi khác: {detailModalInstrument.otherNames.join(', ')}
                </p>
              )}
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Image & Quick Audio Bar */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-stone-900 border border-[#E5DACD]">
                <img
                  src={detailModalInstrument.imageUrl}
                  alt={detailModalInstrument.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs text-[#F8E3C0] block">Dân tộc & Địa bàn:</span>
                    <strong className="text-sm">{detailModalInstrument.ethnicGroup} • {detailModalInstrument.culturalRegion}</strong>
                  </div>
                  <button
                    onClick={() => {
                      audioSynth.playMelody(
                        detailModalInstrument.soundPreset,
                        [
                          { freq: 261.63, duration: 0.35 },
                          { freq: 329.63, duration: 0.35 },
                          { freq: 392.00, duration: 0.4 },
                          { freq: 440.00, duration: 0.45 },
                          { freq: 523.25, duration: 0.7 },
                        ]
                      );
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#F5D48E] text-[#691818] font-bold text-xs shadow-md flex items-center gap-2 hover:bg-[#F3C76F]"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Âm Ngũ Cung</span>
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white p-4 rounded-xl border border-[#E5DACD]">
                <h4 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider mb-1">
                  Giá Trị Tinh Hoa
                </h4>
                <p className="text-xs sm:text-sm text-[#483B32] leading-relaxed">
                  {detailModalInstrument.summary}
                </p>
              </div>

              {/* Anatomy & Materials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#E5DACD] space-y-2">
                  <h4 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                    Cấu Tạo Vật Lý
                  </h4>
                  <ul className="text-xs text-[#52443A] space-y-1.5 list-disc pl-4">
                    {detailModalInstrument.structure.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E5DACD] space-y-2">
                  <h4 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                    Chất Liệu Truyền Thống
                  </h4>
                  <ul className="text-xs text-[#52443A] space-y-1.5 list-disc pl-4">
                    {detailModalInstrument.materials.map((mat, idx) => (
                      <li key={idx}>{mat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Playing Technique & History */}
              <div className="bg-white p-4 rounded-xl border border-[#E5DACD] space-y-2">
                <h4 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                  Nguồn Gốc Lịch Sử & Huyền Thoại
                </h4>
                <p className="text-xs text-[#52443A] leading-relaxed">
                  {detailModalInstrument.originHistory}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E5DACD] space-y-2">
                <h4 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                  Kỹ Thuật Diễn Tấu & Ngón Đàn
                </h4>
                <ul className="text-xs text-[#52443A] space-y-1.5 list-disc pl-4">
                  {detailModalInstrument.playingTechnique.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ul>
              </div>

              {/* Cultural Significance & UNESCO */}
              {detailModalInstrument.unescoHeritage && (
                <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl text-xs text-amber-950">
                  <strong className="block text-amber-900 font-bold mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Hồ Sơ Di Sản Văn Hóa Thế Giới (UNESCO)</span>
                  </strong>
                  <p>{detailModalInstrument.unescoHeritage}</p>
                </div>
              )}

              {/* Fun Fact */}
              <div className="p-4 rounded-xl bg-orange-50/80 border border-orange-200 text-xs text-orange-950">
                <span className="font-bold text-orange-900 block mb-1">
                  💡 Bạn có biết?
                </span>
                <p>{detailModalInstrument.funFact}</p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-white border-t border-[#E8DEC8] p-4 px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  const id = detailModalInstrument.id;
                  setDetailModalInstrument(null);
                  onSelectInstrumentForStudio(id);
                }}
                className="px-4 py-2 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                <Music className="w-4 h-4 text-[#FDE3B2]" />
                <span>Thử Đánh Trên Phòng Thu Ngũ Cung</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const id = detailModalInstrument.id;
                    setDetailModalInstrument(null);
                    onCompareInstrument(id);
                  }}
                  className="px-3.5 py-2 rounded-xl border border-[#D5C6B5] bg-[#FAF7F2] hover:bg-white text-[#52443A] text-xs font-semibold"
                >
                  So sánh với đàn khác
                </button>
                <button
                  onClick={() => {
                    const inst = detailModalInstrument;
                    setDetailModalInstrument(null);
                    onOpenExpertChat(inst);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#FFF8EB] border border-[#E5B54F] text-[#A66F17] text-xs font-bold hover:bg-[#FDEFD2]"
                >
                  Hỏi Nghệ Nhân AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
