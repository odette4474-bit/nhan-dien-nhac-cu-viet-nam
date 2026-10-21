import React from 'react';
import { Camera, BookOpen, Music2, Scale, MapPin, Award, Volume2, VolumeX, Sparkles, Compass, Info, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMuted: boolean;
  toggleMute: () => void;
  isLargeFont: boolean;
  toggleFontSize: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  toggleMute,
  isLargeFont,
  toggleFontSize,
}) => {
  const navItems = [
    { id: 'home', label: 'Trang Chủ', icon: Compass },
    { id: 'identify', label: 'Nhận Diện Ảnh', icon: Camera, badge: 'AI' },
    { id: 'catalog', label: 'Danh Sách Nhạc Cụ', icon: BookOpen },
    { id: 'education', label: 'Góc Học & Dạy', icon: Award, badge: 'GD 2018' },
    { id: 'studio', label: 'Thử Âm Ngũ Cung', icon: Music2 },
    { id: 'about', label: 'Giới Thiệu', icon: Info },
    { id: 'references', label: 'Nguồn Tham Khảo', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E3D8C8] shadow-xs">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-[#8B1E1E] via-[#A82B1B] to-[#741515] text-[#FBEED7] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#691212]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F] animate-ping" />
        <span>Gìn giữ & Tôn vinh Hồn thiêng Di sản Nhạc cụ Truyền thống Dân tộc Việt Nam</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F] animate-ping" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('identify')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Dong Son Drum Sun Emblem */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#B83826] to-[#7B1910] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full border border-[#FBEED7]/40 flex items-center justify-center bg-radial from-[#9C2315] to-[#60120B]">
                <svg className="w-8 h-8 text-[#F4D189] animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  {/* Dong son stylized sun rays */}
                  <circle cx="50" cy="50" r="14" fill="#F4D189" fillOpacity="0.2" strokeWidth="2.5" />
                  <circle cx="50" cy="50" r="28" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="42" strokeWidth="1.2" />
                  {/* Rays */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <line
                      key={deg}
                      x1="50"
                      y1="50"
                      x2={50 + 38 * Math.cos((deg * Math.PI) / 180)}
                      y2={50 + 38 * Math.sin((deg * Math.PI) / 180)}
                      strokeWidth="1.8"
                    />
                  ))}
                  <polygon points="50,42 55,50 50,58 45,50" fill="#F4D189" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-black tracking-tight text-[#8B1E1E]">
                  NHẠC CỤ VIỆT
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EBDBC2] text-[#7A4B1A] border border-[#D5C09F]">
                  Di Sản Cổ Truyền
                </span>
              </div>
              <p className="text-xs text-[#705E52] font-medium hidden sm:block">
                Nhận diện thông minh & Bách khoa âm thanh cổ truyền
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#8B1E1E] text-white shadow-sm font-semibold'
                      : 'text-[#5E4D42] hover:text-[#8B1E1E] hover:bg-[#F0E6D8]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FDE3B2]' : 'text-[#8C7665]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold uppercase tracking-wider ${
                        isActive
                          ? 'bg-[#FDE3B2] text-[#8B1E1E]'
                          : 'bg-[#8B1E1E]/10 text-[#8B1E1E]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Font Size & Audio Mute */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFontSize}
              title={isLargeFont ? 'Chuyển cỡ chữ tiêu chuẩn' : 'Tăng cỡ chữ to dễ đọc cho học sinh / người lớn tuổi'}
              className={`px-2.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                isLargeFont
                  ? 'bg-[#8B1E1E] text-white border-[#8B1E1E]'
                  : 'bg-white border-[#D9C8B5] text-[#55463D] hover:bg-stone-50'
              }`}
            >
              <span className="font-serif tracking-tight">{isLargeFont ? 'Cỡ chữ: To' : 'Cỡ chữ: Chuẩn'}</span>
            </button>

            <button
              onClick={toggleMute}
              title={isMuted ? 'Bật âm thanh mô phỏng' : 'Tắt âm thanh'}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isMuted
                  ? 'border-[#D9C8B5] bg-white/70 text-[#9C897C] hover:bg-white'
                  : 'border-[#E5B54F] bg-[#FFF8EB] text-[#A66F17] hover:bg-[#FDEFD2]'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400" />
                  <span className="hidden lg:inline">Âm thanh: Tắt</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#C2821A] animate-pulse" />
                  <span className="hidden lg:inline">Âm thanh: Bật</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="md:hidden flex overflow-x-auto py-2.5 gap-2 border-t border-[#E8DEC8] no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0 ${
                  isActive
                    ? 'bg-[#8B1E1E] text-white font-semibold shadow-xs'
                    : 'bg-[#F2E8DC] text-[#5A4A3E]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
