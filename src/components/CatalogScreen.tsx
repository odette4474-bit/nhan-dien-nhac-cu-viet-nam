import React, { useState } from 'react';
import { 
  Search, Filter, ShieldCheck, Volume2, ArrowRight, X, 
  BookOpen, Layers, MapPin, Music
} from 'lucide-react';
import { VIETNAMESE_INSTRUMENTS } from '../data/instrumentsData';
import { InstrumentData } from '../types/instruments';
import { audioSynth } from '../utils/audioSynthesizer';

interface CatalogScreenProps {
  onSelectInstrumentDetail: (instrumentId: string) => void;
  onSelectInstrumentStudio: (instrumentId: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  onSelectInstrumentDetail,
  onSelectInstrumentStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [onlyUnesco, setOnlyUnesco] = useState<boolean>(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const families = [
    { label: 'Tất Cả Họ', value: 'all' },
    { label: 'Họ Dây (Dây gảy)', value: 'Họ Dây (Dây gảy)' },
    { label: 'Họ Dây (Dây kéo)', value: 'Họ Dây (Dây kéo)' },
    { label: 'Họ Hơi', value: 'Họ Hơi' },
    { label: 'Họ Gõ (Tự thân vang)', value: 'Họ Gõ (Tự thân vang)' },
    { label: 'Họ Màng rung', value: 'Họ Màng rung' },
  ];

  const regions = [
    { label: 'Tất Cả Vùng Miền', value: 'all' },
    { label: 'Đồng bằng Bắc Bộ', value: 'Đồng bằng Bắc Bộ' },
    { label: 'Cố đô Huế & Miền Trung', value: 'Cố đô Huế & Miền Trung' },
    { label: 'Tây Nguyên đại ngàn', value: 'Tây Nguyên đại ngàn' },
    { label: 'Nam Bộ & Đờn Ca Tài Tử', value: 'Nam Bộ & Đờn Ca Tài Tử' },
    { label: 'Vùng cao Tây Bắc & Đông Bắc', value: 'Vùng cao Tây Bắc & Đông Bắc' },
    { label: 'Văn hóa Chăm Duyên hải', value: 'Văn hóa Chăm Duyên hải' },
  ];

  const filtered = VIETNAMESE_INSTRUMENTS.filter((inst) => {
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

  const handleQuickPlaySound = (inst: InstrumentData, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingId(inst.id);
    audioSynth.playNote(inst.soundPreset, 392, 1.2);
    setTimeout(() => setPlayingId(null), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2A2421]">
            Kho Bách Khoa Nhạc Cụ Dân Tộc
          </h1>
          <p className="text-xs sm:text-sm text-[#6C5B50] mt-1">
            Tra cứu theo danh mục họ nhạc cụ, vùng miền văn hóa và di sản UNESCO. Bấm vào bất kỳ nhạc cụ nào để mở trang chi tiết đầy đủ.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              import('../data/instrumentsData.ts').then(mod => mod.downloadInstrumentsJsonFile());
            }}
            title="Tải tệp cơ sở dữ liệu vietnamese_instruments.json"
            className="text-xs px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#FFF9F3] border border-[#D5C6B5] hover:border-[#8B1E1E] text-[#69574A] hover:text-[#8B1E1E] font-bold flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span>Tải Tệp Dữ Liệu (.JSON)</span>
          </button>

          <div className="text-xs text-[#7B6A5E] bg-white border border-[#E3D6C5] rounded-xl px-4 py-2 flex items-center gap-2 shadow-2xs">
            <span>Tìm thấy: <strong className="text-[#8B1E1E] text-sm">{filtered.length}</strong> / {VIETNAMESE_INSTRUMENTS.length} nhạc cụ</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white rounded-2xl border border-[#E5DACD] p-5 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#9C897C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên nhạc cụ (Đàn Bầu, Đàn Tranh, T'rưng), dân tộc, thể loại (Ca Trù, Chầu Văn, Hát Then)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D9CABB] text-xs sm:text-sm focus:outline-none focus:border-[#8B1E1E] bg-[#FAF7F2]"
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
          <div className="flex flex-wrap items-center gap-3">
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

          {/* UNESCO Filter */}
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

      {/* Catalog Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5DACD] p-8 space-y-3">
          <BookOpen className="w-12 h-12 text-[#B3A090] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#2A2421]">
            Không tìm thấy nhạc cụ phù hợp
          </h3>
          <p className="text-xs text-[#7A6A5E] max-w-sm mx-auto">
            Vui lòng thử tìm với từ khóa khác hoặc đặt lại bộ lọc.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFamily('all');
              setSelectedRegion('all');
              setOnlyUnesco(false);
            }}
            className="px-4 py-2 rounded-xl bg-[#8B1E1E] text-white text-xs font-semibold"
          >
            Xem lại tất cả nhạc cụ
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inst) => (
            <div
              key={inst.id}
              onClick={() => onSelectInstrumentDetail(inst.id)}
              className="group bg-white rounded-2xl border border-[#E5DACD] hover:border-[#8B1E1E] shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={inst.imageUrl}
                  alt={inst.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#8B1E1E] text-white shadow-xs">
                    {inst.family.split(' ')[0]} {inst.family.split(' ')[1]}
                  </span>
                  {inst.unescoHeritage && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400 text-stone-900 flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3 h-3" /> UNESCO
                    </span>
                  )}
                </div>

                {/* Quick Listen Button */}
                <button
                  onClick={(e) => handleQuickPlaySound(inst, e)}
                  title="Nghe thử âm sắc"
                  className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-[#8B1E1E] shadow-md transition-transform hover:scale-110 active:scale-90"
                >
                  <Volume2 className={`w-4 h-4 ${playingId === inst.id ? 'animate-bounce text-[#C2821A]' : ''}`} />
                </button>

                <div className="absolute bottom-2.5 left-2.5 right-12 text-white">
                  <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-[#FDE3B2] transition-colors">
                    {inst.name}
                  </h3>
                  <p className="text-[11px] text-stone-200 truncate mt-0.5">
                    {inst.ethnicGroup} • {inst.culturalRegion}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#524339] line-clamp-3 leading-relaxed">
                  {inst.summary}
                </p>

                {/* Genres */}
                <div className="flex flex-wrap gap-1">
                  {inst.associatedGenres.slice(0, 2).map((genre, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF0E2] text-[#803F17] border border-[#ECD9C3] font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                  {inst.associatedGenres.length > 2 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-[#8A796D]">
                      +{inst.associatedGenres.length - 2}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-[#F0E5D8] flex items-center justify-between text-xs font-semibold text-[#8B1E1E]">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Xem chi tiết đầy đủ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectInstrumentStudio(inst.id);
                    }}
                    title="Gảy nốt ngũ cung"
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
    </div>
  );
};
