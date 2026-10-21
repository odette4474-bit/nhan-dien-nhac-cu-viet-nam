import React, { useState } from 'react';
import { 
  Search, Camera, BookOpen, Music2, ShieldCheck, Sparkles, 
  ArrowRight, Volume2, Info, Compass, Award, ExternalLink, Play
} from 'lucide-react';
import { VIETNAMESE_INSTRUMENTS } from '../data/instrumentsData';
import { InstrumentData } from '../types/instruments';
import { audioSynth } from '../utils/audioSynthesizer';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onSelectInstrumentDetail: (instrumentId: string) => void;
  onSelectInstrumentStudio: (instrumentId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectInstrumentDetail,
  onSelectInstrumentStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Popular instruments to showcase on Homepage
  const popularIds = ['dan-bau', 'dan-tranh', 'dan-nguyet', 'sao-truc', 'dan-trung', 'cong-chieng', 'trong-dong', 'dan-day'];
  const popularInstruments = VIETNAMESE_INSTRUMENTS.filter((i) => popularIds.includes(i.id));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('catalog');
    }
  };

  const handleQuickPlaySound = (inst: InstrumentData, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingId(inst.id);
    audioSynth.playNote(inst.soundPreset, 392, 1.2);
    setTimeout(() => setPlayingId(null), 1200);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#7B1910] via-[#8B1E1E] to-[#5A120B] text-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#C2821A]">
        {/* Dong Son Drum Sun Motif Background Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full border border-white/10 opacity-20 pointer-events-none -mr-24 sm:-mr-12">
          <div className="w-full h-full rounded-full border-4 border-dashed border-white/20 animate-spin-slow" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-[#F4D189]/40 text-[#FCEBD3] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#E5B54F] animate-ping" />
              <span>Dự Án Số Hóa & Bảo Tồn Âm Nhạc Dân Tộc Việt Nam</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#FFF8EC] tracking-tight leading-tight">
              Khám Phá & Nhận Diện <br className="hidden sm:inline" />
              <span className="text-[#F4D189]">Nhạc Cụ Cổ Truyền</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal max-w-2xl">
              Hệ thống tra cứu thông minh và nhận diện nhạc cụ qua hình ảnh bằng Trí tuệ Nhân tạo. Nơi hội tụ tinh hoa âm sắc của 54 dân tộc anh em từ tiếng đàn Bầu ngọt ngào, cồng chiêng đại ngàn đến thanh âm hào hùng của Trống Đồng Đông Sơn.
            </p>

            {/* Smart Search Bar on Hero */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="relative max-w-xl flex items-center shadow-lg rounded-2xl overflow-hidden bg-white p-1.5 border-2 border-[#E5DACD] focus-within:border-[#F4D189]">
                <Search className="w-5 h-5 text-[#8B1E1E] ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm nhanh tên nhạc cụ (Đàn Bầu, T'rưng, Cồng Chiêng...)"
                  className="w-full px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none bg-transparent placeholder:text-stone-400 font-medium"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2.5 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white text-xs sm:text-sm font-bold shrink-0 transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Tìm Kiếm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('identify')}
                className="px-5 py-3 rounded-xl bg-[#F5D48E] hover:bg-[#F2CA73] text-[#691818] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Camera className="w-4 h-4" />
                <span>Nhận Diện Bằng Ảnh Ngay</span>
              </button>

              <button
                onClick={() => onNavigate('catalog')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Xem Toàn Bộ Danh Sách ({VIETNAMESE_INSTRUMENTS.length})</span>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="px-4 py-3 rounded-xl hover:underline text-[#FCEBD3] text-xs font-semibold flex items-center gap-1"
              >
                <Info className="w-4 h-4" />
                <span>Về Dự Án</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Statistics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl border border-[#E5DACD] shadow-sm p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 border-r border-stone-100 last:border-none">
            <span className="font-serif text-2xl sm:text-3xl font-black text-[#8B1E1E]">18+</span>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Nhạc cụ tuyển chọn</p>
          </div>
          <div className="p-3 border-r border-stone-100 last:border-none">
            <span className="font-serif text-2xl sm:text-3xl font-black text-[#8B1E1E]">5 Họ</span>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Họ Dây, Hơi, Gõ, Màng</p>
          </div>
          <div className="p-3 border-r border-stone-100 last:border-none">
            <span className="font-serif text-2xl sm:text-3xl font-black text-[#8B1E1E]">6 Vùng</span>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Không gian văn hóa di sản</p>
          </div>
          <div className="p-3">
            <span className="font-serif text-2xl sm:text-3xl font-black text-[#8B1E1E]">UNESCO</span>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Di sản văn hóa thế giới</p>
          </div>
        </div>
      </section>

      {/* Featured Instruments Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nhạc Khí Tiêu Biểu</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2A2421]">
              Các Nhạc Cụ Dân Tộc Phổ Biến
            </h2>
            <p className="text-xs sm:text-sm text-[#6C5B50] mt-1">
              Những nhạc cụ mang đậm dấu ấn tâm hồn người Việt và được sử dụng rộng rãi trong đời sống cổ truyền.
            </p>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-bold text-[#8B1E1E] hover:text-[#741515] flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            <span>Khám phá tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Popular Instruments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularInstruments.map((inst) => (
            <div
              key={inst.id}
              onClick={() => onSelectInstrumentDetail(inst.id)}
              className="group bg-white rounded-2xl border border-[#E5DACD] hover:border-[#8B1E1E] shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={inst.imageUrl}
                  alt={inst.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#8B1E1E] text-white shadow-xs">
                    {inst.family.split(' ')[0]}
                  </span>
                </div>

                {inst.unescoHeritage && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400 text-stone-900 shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> UNESCO
                    </span>
                  </div>
                )}

                {/* Quick Listen Button on Card */}
                <button
                  onClick={(e) => handleQuickPlaySound(inst, e)}
                  title="Nghe thử âm sắc"
                  className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-[#8B1E1E] shadow-md transition-transform hover:scale-110 active:scale-90"
                >
                  <Volume2 className={`w-4 h-4 ${playingId === inst.id ? 'animate-bounce text-[#C2821A]' : ''}`} />
                </button>

                <div className="absolute bottom-2.5 left-2.5 right-12 text-white">
                  <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[#FDE3B2] transition-colors">
                    {inst.name}
                  </h3>
                  <p className="text-[11px] text-stone-200 truncate">
                    {inst.ethnicGroup} • {inst.culturalRegion}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-[#52443A] line-clamp-2 leading-relaxed">
                  {inst.summary}
                </p>

                <div className="pt-2 border-t border-[#F0E6D8] flex items-center justify-between text-xs font-semibold text-[#8B1E1E]">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <span className="text-[10px] text-stone-400">
                    {inst.soundPreset}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#E5DACD] rounded-3xl p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2A2421]">
              Trải Nghiệm Đa Chiều Cùng Nhạc Cụ Việt
            </h2>
            <p className="text-xs sm:text-sm text-[#6C5B50] mt-1">
              Ứng dụng công nghệ thị giác máy tính và âm học mô phỏng hiện đại để bảo tồn văn hóa cổ truyền.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div 
              onClick={() => onNavigate('identify')}
              className="bg-white rounded-2xl p-6 border border-[#E5DACD] hover:border-[#8B1E1E] transition-all cursor-pointer group shadow-2xs space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#8B1E1E] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2A2421] group-hover:text-[#8B1E1E] transition-colors">
                Nhận Diện Bằng Hình Ảnh (AI)
              </h3>
              <p className="text-xs text-[#52443A] leading-relaxed">
                Chụp ảnh qua camera hoặc tải ảnh từ thư viện để AI bóc tách cấu tạo, xác định tên gọi, chất liệu, và nguồn gốc trong vài giây.
              </p>
            </div>

            {/* Feature 2 */}
            <div 
              onClick={() => onNavigate('catalog')}
              className="bg-white rounded-2xl p-6 border border-[#E5DACD] hover:border-[#8B1E1E] transition-all cursor-pointer group shadow-2xs space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2A2421] group-hover:text-[#8B1E1E] transition-colors">
                Bách Khoa Cổ Truyền Đầy Đủ
              </h3>
              <p className="text-xs text-[#52443A] leading-relaxed">
                Tra cứu chi tiết từng nhạc cụ theo 5 họ nhạc cụ, 6 vùng văn hóa từ Ca Trù, Nhã Nhạc Huế đến Cồng Chiêng Tây Nguyên.
              </p>
            </div>

            {/* Feature 3 */}
            <div 
              onClick={() => onNavigate('education')}
              className="bg-white rounded-2xl p-6 border border-[#E5DACD] hover:border-[#8B1E1E] transition-all cursor-pointer group shadow-2xs space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2A2421] group-hover:text-[#8B1E1E] transition-colors">
                Dành Cho Học Sinh & Giáo Viên
              </h3>
              <p className="text-xs text-[#52443A] leading-relaxed">
                Thẻ mẹo nhớ nhanh cho bài tập âm nhạc, dàn ý thuyết trình mẫu, kế hoạch bài dạy tham khảo theo Chương trình GDPT 2018.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
