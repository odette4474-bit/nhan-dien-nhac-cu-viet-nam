import React, { useState } from 'react';
import { MapPin, Sparkles, Volume2, Music, ChevronRight, ShieldCheck, Layers } from 'lucide-react';
import { VIETNAMESE_INSTRUMENTS } from '../data/instrumentsData';
import { InstrumentData } from '../types/instruments';
import { audioSynth } from '../utils/audioSynthesizer';

interface CulturalMapProps {
  onSelectInstrument: (instrumentId: string) => void;
  onOpenStudio: (instrumentId: string) => void;
}

export const CulturalMap: React.FC<CulturalMapProps> = ({
  onSelectInstrument,
  onOpenStudio,
}) => {
  const [selectedRegionKey, setSelectedRegionKey] = useState<string>('bac-bo');

  const regionsData = [
    {
      key: 'bac-bo',
      title: 'Đồng Bằng Bắc Bộ & Cái Nôi Dân Ca',
      sub: 'Ca Trù, Hát Chèo, Quan Họ Bắc Ninh, Hát Văn, Hát Xẩm',
      description:
        'Cái nôi văn minh sông Hồng ngàn năm văn hiến, nơi sinh ra những tuyệt tác nhạc cụ thuần Việt như Đàn Bầu, Đàn Đáy, Trống Cơm, Trống Đồng Đông Sơn.',
      color: 'from-red-800 to-amber-900',
      tagColor: 'bg-red-100 text-red-900 border-red-300',
      iconicInstrumentIds: ['dan-bau', 'dan-day', 'sao-truc', 'trong-dong', 'trong-com', 'dan-nhi'],
      soundPreset: 'dan_bau',
      coordinates: 'Bắc Ninh, Hà Nội, Phú Thọ, Ninh Bình, Hải Dương',
    },
    {
      key: 'hue-mientrung',
      title: 'Cung Đình Huế & Dải Đất Miền Trung',
      sub: 'Nhã Nhạc Cung Đình, Ca Huế Trên Sông Hương',
      description:
        'Nơi âm nhạc đạt tới đỉnh cao bác học và cung đình triều Nguyễn. Đàn Tranh, Đàn Tỳ Bà và dàn Đại nhạc, Tiểu nhạc đã được UNESCO ghi danh là Di sản Nhân loại.',
      color: 'from-amber-800 to-yellow-900',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      iconicInstrumentIds: ['dan-tranh', 'dan-nguyet', 'dan-nhi'],
      soundPreset: 'dan_tranh',
      coordinates: 'Thừa Thiên Huế, Quảng Nam, Đà Nẵng',
    },
    {
      key: 'tay-nguyen',
      title: 'Không Gian Văn Hóa Tây Nguyên',
      sub: 'Cồng Chiêng Đại Ngàn, Đàn T\'rưng, K\'lông Pút, Đinh Năm',
      description:
        'Vùng đất của sử thi Đam San và tiếng suối reo. Cồng chiêng kết nối con người với thần linh Yàng; giàn ống nứa T\'rưng rộn rã bước chân trẩy hội mừng mùa.',
      color: 'from-emerald-900 to-teal-950',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconicInstrumentIds: ['cong-chieng', 'dan-trung', 'klong-put'],
      soundPreset: 'trung',
      coordinates: 'Gia Lai, Kon Tum, Đắk Lắk, Đắk Nông, Lâm Đồng',
    },
    {
      key: 'nam-bo',
      title: 'Nam Bộ Sông Nước & Đờn Ca Tài Tử',
      sub: 'Nghệ Thuật Đờn Ca Tài Tử, Cải Lương, Vọng Cổ Nam Bộ',
      description:
        'Vùng đất hào sảng sông Tiền, sông Hậu với phong trào tài tử tao nhã. Cây Đàn Kìm (Đàn Nguyệt) giữ nhịp đờn réo rắt trong khúc Dạ Cổ Hoài Lang.',
      color: 'from-blue-900 to-indigo-950',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
      iconicInstrumentIds: ['dan-nguyet', 'dan-tranh', 'dan-nhi'],
      soundPreset: 'dan_nguyet',
      coordinates: 'Bạc Liêu, Cần Thơ, Bến Tre, TP. Hồ Chí Minh',
    },
    {
      key: 'tay-bac',
      title: 'Non Cao Tây Bắc & Đông Bắc',
      sub: 'Hát Then Đàn Tính, Khèn Mông, Múa Khèn Đá Nở Hoa',
      description:
        'Tiếng đàn Tính đưa linh hồn thầy Then lên chầu cõi trời; tiếng khèn Mông thổn thức gọi bạn tình nơi phiên chợ xuân giữa mây ngàn Hoàng Liên Sơn.',
      color: 'from-purple-900 to-slate-900',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
      iconicInstrumentIds: ['dan-tinh', 'khen-mong', 'sao-truc'],
      soundPreset: 'khen_mong',
      coordinates: 'Hà Giang, Cao Bằng, Lạng Sơn, Sa Pa, Lai Châu',
    },
    {
      key: 'cham',
      title: 'Văn Hóa Chămpa Duyên Hải',
      sub: 'Lễ Hội Katê, Tiếng Kèn Saranai, Trống Paranưng & Ginăng',
      description:
        'Âm hưởng huyền bí bên những ngọn tháp rêu phong. Tiếng kèn Saranai và nhịp trống Paranưng nâng bước vũ nữ Apsara hòa điệu cùng vũ trụ.',
      color: 'from-rose-900 to-amber-950',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-300',
      iconicInstrumentIds: ['ken-saranai'],
      soundPreset: 'sao_truc',
      coordinates: 'Ninh Thuận, Bình Thuận, An Giang',
    },
  ];

  const currentRegion =
    regionsData.find((r) => r.key === selectedRegionKey) || regionsData[0];

  const matchedInstruments = VIETNAMESE_INSTRUMENTS.filter((i) =>
    currentRegion.iconicInstrumentIds.includes(i.id)
  );

  const playRegionalMotif = () => {
    audioSynth.playMelody(currentRegion.soundPreset, [
      { freq: 293.66, duration: 0.35 },
      { freq: 349.23, duration: 0.35 },
      { freq: 392.00, duration: 0.4 },
      { freq: 440.00, duration: 0.45 },
      { freq: 523.25, duration: 0.8 },
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-xs font-semibold mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Địa Lý Âm Nhạc & Không Gian Di Sản</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2A2421]">
          Bản Đồ Văn Hóa Âm Nhạc Việt Nam
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6C5B50]">
          Hành trình du ngoạn qua 6 vùng văn hóa âm nhạc đặc sắc trải dài từ địa đầu Hà Giang đến đất mũi Cà Mau.
        </p>
      </div>

      {/* Horizontal Region Navigation Pills */}
      <div className="flex overflow-x-auto gap-2.5 pb-4 mb-8 no-scrollbar">
        {regionsData.map((reg) => {
          const isSelected = reg.key === selectedRegionKey;
          return (
            <button
              key={reg.key}
              onClick={() => setSelectedRegionKey(reg.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0 border ${
                isSelected
                  ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-sm'
                  : 'bg-white hover:bg-[#FAF2E6] border-[#D9CABB] text-[#55463D]'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FDE3B2]' : 'text-stone-400'}`} />
              <span>{reg.title.split('&')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Region Detailed Spotlight Card */}
      <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-sm overflow-hidden mb-8">
        {/* Region Banner */}
        <div className={`bg-gradient-to-r ${currentRegion.color} text-white p-6 sm:p-8 relative`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-white/20 text-white inline-block mb-2">
                Không Gian Âm Nhạc Đặc Thù
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#FFF8EC]">
                {currentRegion.title}
              </h2>
              <p className="text-xs text-amber-200 font-medium mt-1">
                Làn điệu: {currentRegion.sub}
              </p>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mt-3">
                {currentRegion.description}
              </p>
            </div>

            <button
              onClick={playRegionalMotif}
              className="px-4 py-2.5 rounded-xl bg-[#F5D48E] hover:bg-[#F2CA73] text-[#691818] font-bold text-xs shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Âm Hưởng Vùng Miền</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 text-xs text-stone-300">
            Trọng tâm địa bàn: <strong>{currentRegion.coordinates}</strong>
          </div>
        </div>

        {/* Instruments of this Region */}
        <div className="p-6 sm:p-8">
          <h3 className="font-serif text-base font-bold text-[#8B1E1E] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Nhạc Cụ Biểu Tượng Của Vùng Miền Này ({matchedInstruments.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchedInstruments.map((inst) => (
              <div
                key={inst.id}
                onClick={() => onSelectInstrument(inst.id)}
                className="group border border-[#EAE0D4] hover:border-[#8B1E1E] rounded-2xl overflow-hidden bg-[#FAF7F2] hover:bg-white transition-all p-4 cursor-pointer flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-200">
                    <img
                      src={inst.imageUrl}
                      alt={inst.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#8B1E1E] text-white">
                        {inst.family.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#2A2421] group-hover:text-[#8B1E1E] transition-colors">
                      {inst.name}
                    </h4>
                    <span className="text-[11px] text-[#786659]">
                      Dân tộc {inst.ethnicGroup}
                    </span>
                  </div>

                  <p className="text-xs text-[#524339] line-clamp-2">
                    {inst.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EDE3D6] flex items-center justify-between text-xs font-semibold text-[#8B1E1E]">
                  <span>Xem hồ sơ</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
