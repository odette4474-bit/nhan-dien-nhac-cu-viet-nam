import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, GraduationCap, Building2, FileCheck, CheckCircle2 } from 'lucide-react';

interface ReferencesScreenProps {
  onNavigate: (screen: string) => void;
}

export const ReferencesScreen: React.FC<ReferencesScreenProps> = ({ onNavigate }) => {
  const referencesList = [
    {
      category: '1. Nguồn Cơ Sở Dữ Liệu & Tổ Chức Nghiên Cứu',
      icon: Building2,
      items: [
        {
          title: 'Tệp Dữ Liệu Mẫu vietnamese_instruments.json (10 trường chuẩn hóa)',
          desc: 'Tập dữ liệu độc lập lưu trữ mã nhạc cụ, tên gọi khác, chất liệu, nguồn gốc, đặc điểm nhận dạng, kỹ thuật chơi và mô tả âm học.',
          badge: 'CSDL Độc Lập Nội Bộ',
        },
        {
          title: 'Viện Âm Nhạc Quốc Gia Việt Nam (Học viện Âm nhạc Quốc gia Việt Nam)',
          desc: 'Kho tư liệu âm thanh, hình ảnh và hệ thống phân loại nhạc cụ dân tộc học chuẩn mực của Việt Nam.',
          badge: 'Viện Nghiên Cứu Đầu Ngành',
        },
        {
          title: 'Cục Di Sản Văn Hóa — Bộ Văn Hóa, Thể Thao Và Du Lịch',
          desc: 'Hồ sơ khoa học và cơ sở dữ liệu các di sản văn hóa phi vật thể quốc gia.',
          badge: 'Cơ Quan Quản Lý Nhà Nước',
        },
        {
          title: 'Bảo Tàng Dân Tộc Học Việt Nam (VME)',
          desc: 'Tư liệu hiện vật, kích thước, chất liệu chế tác nhạc cụ tre nứa Tây Nguyên, khèn Mông, đàn Tính Tày-Nùng.',
          badge: 'Tư Liệu Hiện Vật',
        },
      ],
    },
    {
      category: '2. Nguồn Hình Ảnh Minh Họa & Tư Liệu Số Hóa',
      icon: BookOpen,
      items: [
        {
          title: 'Kho Ảnh Tư Liệu Bảo Tàng & Di Sản Văn Hóa Việt Nam',
          desc: 'Các bức ảnh chụp cận cảnh thân đàn bầu, cần sừng trâu, con nhạn đàn tranh, cần đàn nguyệt, ống nứa đàn T\'rưng và mặt trống đồng Đông Sơn.',
          badge: 'Tư Liệu Nhiếp Ảnh Văn Hóa',
        },
        {
          title: 'Bộ Ảnh Nhiếp Ảnh Số Hóa Nhạc Cụ Truyền Thống Việt (Local Assets)',
          desc: 'Hình ảnh phân giải cao được lưu trữ an toàn trong thư mục public/assets/images/ (dan_bau.jpg, dan_tranh.jpg, dan_nguyet.jpg, trong_dong.jpg, dan_trung.jpg, sao_truc.jpg) phục vụ nhận diện AI và hiển thị trực quan.',
          badge: 'Tài Nguyên Ảnh Chuẩn Hóa',
        },
        {
          title: 'Kho Lưu Trữ Hình Ảnh Văn Hóa & Nghệ Nhân Dân Gian (Creative Commons & Unsplash Heritage)',
          desc: 'Hình ảnh trình diễn thực tế của các nghệ nhân Ca trù, Đờn ca tài tử, Nhã nhạc Cung đình Huế và Cồng chiêng Tây Nguyên.',
          badge: 'Tư Liệu Trực Quan Mở',
        },
        {
          title: 'Bộ Mẫu Thử Nghiệm Nhận Diện (Sample Test Photos)',
          desc: 'Bộ ảnh chụp thực tế đa góc độ dành cho người dùng thử nghiệm tính năng nhận diện ảnh AI không cần chụp trước.',
          badge: 'Bộ Mẫu Kiểm Thử AI',
        },
      ],
    },
    {
      category: '3. Hồ Sơ Di Sản Văn Hóa Thế Giới (UNESCO)',
      icon: ShieldCheck,
      items: [
        {
          title: 'Nhã Nhạc — Âm Nhạc Cung Đình Việt Nam (UNESCO 2003)',
          desc: 'Tư liệu về dàn Đại nhạc, Tiểu nhạc, Đàn Tranh, Đàn Nguyệt, Đàn Nhị, Đàn Tỳ Bà và Tam Thập Lục.',
          badge: 'UNESCO 2003',
        },
        {
          title: 'Không Gian Văn Hóa Cồng Chiêng Tây Nguyên (UNESCO 2005)',
          desc: 'Nghiên cứu về dàn cồng, chiêng, kỹ thuật chỉnh âm của đồng bào Ba Na, Gia Rai, Ê Đê, M\'Nông.',
          badge: 'UNESCO 2005',
        },
        {
          title: 'Nghệ Thuật Ca Trù (UNESCO 2009)',
          desc: 'Tư liệu chuyên sâu về Đàn Đáy (Vô Đề Cầm) — cây đàn thuần Việt độc nhất vô nhị chỉ có trong Ca Trù.',
          badge: 'UNESCO 2009',
        },
        {
          title: 'Nghệ Thuật Đờn Ca Tài Tử Nam Bộ (UNESCO 2013)',
          desc: 'Tư liệu về Đàn Kìm (Đàn Nguyệt), Đàn Tranh, Đàn Cò (Đàn Nhị), hệ thống chữ đờn Hò Xự Xang Xê Cống.',
          badge: 'UNESCO 2013',
        },
        {
          title: 'Thực Hành Then Của Người Tày, Nùng, Thái Tại Việt Nam (UNESCO 2019)',
          desc: 'Nghiên cứu về cây Đàn Tính (Tính Tẩu) làm từ quả bầu già khô và nghệ thuật hát Then thiêng liêng.',
          badge: 'UNESCO 2019',
        },
      ],
    },
    {
      category: '4. Tài Liệu Học Thuật & Giáo Trình Chính Quy',
      icon: GraduationCap,
      items: [
        {
          title: 'GS.TS. Trần Văn Khê — "Âm Nhạc Truyền Thống Việt Nam"',
          desc: 'Công trình nghiên cứu nền tảng về tính cách, điệu thức ngũ cung, kỹ thuật nhấn rung và giá trị thẩm mỹ của nhạc khí Việt Nam trên trường quốc tế.',
          badge: 'Công Trình Kinh Điển',
        },
        {
          title: 'GS.TS. Tô Ngọc Thanh — "Âm Nhạc Dân Gian Các Dân Tộc Thiểu Số Việt Nam"',
          desc: 'Khảo cứu công phu về nhạc cụ Tây Nguyên (Cồng chiêng, T\'rưng, K\'lông Pút) và vùng cao Tây Bắc (Khèn Mông, Đàn Tính).',
          badge: 'Nghiên Cứu Dân Tộc Học',
        },
        {
          title: 'Giáo Trình "Nhạc Khí Cổ Truyền Việt Nam" — Học Viện Âm Nhạc Quốc Gia',
          desc: 'Tài liệu giảng dạy chính quy về cấu tạo, âm vực, kỹ thuật diễn tấu ngón đàn và thế bấm chuẩn mực.',
          badge: 'Giáo Trình Chính Quy',
        },
        {
          title: 'Tư liệu từ các Nghệ nhân Dân gian & Nghệ sĩ Nhân dân:',
          desc: 'Kinh nghiệm truyền khẩu từ NSND Kim Sinh (Đàn Bầu), NSND Thao Giang (Đàn Đáy, Đàn Nhị), NSƯT Đức Dậu (Nhạc cụ Tây Nguyên).',
          badge: 'Kinh Nghiệm Nghệ Nhân',
        },
      ],
    },
    {
      category: '5. Chuẩn Âm Học & Bảo Mật Khóa AI Server-Side',
      icon: FileCheck,
      items: [
        {
          title: 'Quy Chuẩn Thang Âm Ngũ Cung Dân Gian (Hò, Xự, Xang, Xê, Cống)',
          desc: 'Hệ thống tương quan tần số nốt cơ bản dựa trên cao độ tự nhiên (C4, D4, F4, G4, A4, C5) được lập trình qua Web Audio API.',
          badge: 'Âm Học Vật Lý',
        },
        {
          title: 'Bảo Mật Khóa Gemini API Phía Máy Chủ (Server-Side Proxy)',
          desc: 'Khóa API Gemini được lưu trữ tuyệt đối trên môi trường máy chủ (server.ts), không bao giờ phơi bày ra mã nguồn client-side của trình duyệt. Mọi yêu cầu nhận diện đều được định tuyến qua API proxy nội bộ /api/identify và /api/chat.',
          badge: 'Bảo Mật Máy Chủ An Toàn',
        },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#2A2421]">
          Nguồn Dữ Liệu, Hình Ảnh & Tài Liệu Tham Khảo
        </h1>
        <p className="text-xs sm:text-sm text-[#6C5B50] leading-relaxed">
          Trang Nguồn tham khảo liệt kê đầy đủ các nguồn dữ liệu, hình ảnh và tài liệu được sử dụng trong ứng dụng Nhạc Cụ Việt, bảo đảm tính học thuật và sự chuẩn xác văn hóa.
        </p>
      </div>

      {/* Ràng Buộc Bắt Buộc: Chứng Nhận Thực Tập Sinh */}
      <div className="bg-[#FFFDF9] border border-[#D9C4AC] rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E] block">
            Chứng Nhận Bản Quyền Đồ Án
          </span>
          <p className="text-xs sm:text-sm text-[#3E332B] font-medium">
            Dự án là <strong>sản phẩm thực tập của Nguyễn Văn An, mã sinh viên PH70154, Nhóm 1, thuộc Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH.</strong>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBDBC2] text-[#7A4B1A] border border-[#D5C09F]">
            FPT Poly & IMTA
          </span>
        </div>
      </div>

      {/* Categories of references */}
      <div className="space-y-8">
        {referencesList.map((group, gIdx) => {
          const GroupIcon = group.icon;
          return (
            <div
              key={gIdx}
              className="bg-white rounded-3xl border border-[#E5DACD] shadow-xs p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center gap-3 border-b border-[#F0E6D8] pb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E1E] flex items-center justify-center shrink-0">
                  <GroupIcon className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#8B1E1E]">
                  {group.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#8B1E1E] transition-all flex flex-col justify-between space-y-2"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <strong className="block text-xs sm:text-sm font-bold text-[#2A2421] leading-snug">
                          {item.title}
                        </strong>
                      </div>
                      <p className="text-xs text-[#52443A] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#7A3614] border border-[#ECD7BE] inline-block">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dedicated Dataset Showcase & Download Section */}
      <div className="bg-white rounded-3xl border-2 border-[#D9C4AC] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0E6D8] pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF0E2] text-[#803F17] border border-[#ECD9C3] inline-block">
              Quản Lý Cơ Sở Dữ Liệu Riêng Biệt
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#8B1E1E]">
              Tệp Dữ Liệu Mẫu Chuẩn: vietnamese_instruments.json
            </h2>
            <p className="text-xs text-[#6C5B50]">
              Dữ liệu được tổ chức độc lập dạng tệp JSON tiêu chuẩn gồm đầy đủ 10 trường theo quy cách, thuận tiện cho việc bổ sung, cập nhật và chia sẻ học tập.
            </p>
          </div>

          <button
            onClick={() => {
              import('../data/instrumentsData.ts').then(mod => mod.downloadInstrumentsJsonFile());
            }}
            className="px-5 py-3 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-[#FDE3B2]" />
            <span>Tải Tệp vietnamese_instruments.json</span>
          </button>
        </div>

        {/* 10 Fields Breakdown */}
        <div className="space-y-3">
          <h3 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
            Quy Chuẩn 10 Trường Dữ Liệu Trong Tệp:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">1. ma_nhac_cu</strong>
              <span className="text-[#52443A]">Mã định danh duy nhất (ví dụ: NC_DAN_BAU)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">2. ten_nhac_cu</strong>
              <span className="text-[#52443A]">Tên tiếng Việt chuẩn (ví dụ: Đàn Bầu)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">3. ten_goi_khac</strong>
              <span className="text-[#52443A]">Danh sách tên gọi khác (ví dụ: Độc Huyền Cầm)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">4. hinh_anh</strong>
              <span className="text-[#52443A]">Đường dẫn hình ảnh minh họa chất lượng cao</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">5. nhom_nhac_cu</strong>
              <span className="text-[#52443A]">Nhóm phân loại (Dây gảy, Dây kéo, Hơi, Gõ, Màng rung)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">6. chat_lieu</strong>
              <span className="text-[#52443A]">Chất liệu chế tác (gỗ ngô đồng, tre nứa, sừng trâu...)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">7. nguon_goc</strong>
              <span className="text-[#52443A]">Nguồn gốc xuất xứ và thời kỳ lịch sử</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">8. dac_diem_nhan_dang</strong>
              <span className="text-[#52443A]">Danh sách các đặc điểm hình thể nhận biết</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <strong className="text-[#8B1E1E] block font-mono">9. cach_su_dung</strong>
              <span className="text-[#52443A]">Tư thế cầm và kỹ thuật diễn tấu đặc thù</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] sm:col-span-2 lg:col-span-3">
              <strong className="text-[#8B1E1E] block font-mono">10. mo_ta</strong>
              <span className="text-[#52443A]">Mô tả tổng quan về âm sắc, ý nghĩa văn hóa và bài bản tiêu biểu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Citation Ethics Box */}
      <div className="bg-[#FFF8EB] border border-[#F4D189] rounded-3xl p-6 sm:p-8 space-y-3">
        <h3 className="font-serif text-base font-bold text-[#7A4B1A] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#C2821A]" />
          <span>Cam Kết Chuẩn Xác & Tôn Trọng Bản Quyền Văn Hóa</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#5E3B16] leading-relaxed">
          Ứng dụng Nhạc Cụ Việt là một sáng kiến phi thương mại phục vụ mục đích giáo dục cộng đồng, giảng dạy học đường và nghiên cứu văn hóa dân gian. Mọi đóng góp ý kiến về nội dung chuyên môn học thuật đều được tiếp thu trân trọng nhằm hoàn thiện kho tàng số hóa di sản âm nhạc của dân tộc Việt Nam.
        </p>
      </div>
    </div>
  );
};
