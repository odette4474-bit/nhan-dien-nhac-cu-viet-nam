import React from 'react';
import { 
  Heart, Sparkles, ShieldCheck, Users, Target, BookOpen, 
  Compass, ArrowRight, Award, GraduationCap, Laptop, Smartphone
} from 'lucide-react';

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#2A2421]">
          Sứ Mệnh Bảo Tồn & Quảng Bá Âm Nhạc Dân Tộc
        </h1>
        <p className="text-xs sm:text-sm text-[#6C5B50] leading-relaxed">
          Dự án Nhạc Cụ Việt ra đời nhằm mục đích kết nối thế hệ trẻ với kho tàng văn hóa âm nhạc cổ truyền của 54 dân tộc Việt Nam thông qua công nghệ hiện đại.
        </p>
      </div>

      {/* Ràng Buộc Bắt Buộc: Thông Tin Thực Tập Sinh & Đơn Vị Đào Tạo */}
      <div className="bg-gradient-to-br from-[#FFF9F2] via-white to-[#FBF3E8] border-2 border-[#D9C4AC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEDBCC] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#8B1E1E] text-white flex items-center justify-center shadow-xs">
              <Award className="w-6 h-6 text-[#FBEED7]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#8B1E1E]">
                Thông Tin Chứng Nhận & Bản Quyền Đồ Án
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2A2421]">
                Báo Cáo Dự Án Thực Tập Tốt Nghiệp
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBDBC2] text-[#7A4B1A] border border-[#D5C09F]">
              Đợt 15
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-[#8B1E1E] border border-red-200">
              Nhóm 1
            </span>
          </div>
        </div>

        {/* Cụm câu bắt buộc theo yêu cầu */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DEC8] shadow-2xs space-y-3">
          <p className="text-xs sm:text-base font-semibold text-[#8B1E1E] leading-relaxed">
            Trang Giới thiệu ghi rõ: <span className="font-bold underline decoration-[#8B1E1E]/40 underline-offset-4">sản phẩm thực tập của Nguyễn Văn An, mã sinh viên PH70154, Nhóm 1, thuộc Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH.</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs text-[#52443A]">
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Sinh viên thực hiện</span>
              <strong className="text-sm font-bold text-[#2A2421]">Nguyễn Văn An</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Mã sinh viên</span>
              <strong className="text-sm font-bold text-[#8B1E1E]">PH70154</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Nhóm & Đợt thực tập</span>
              <strong className="text-sm font-bold text-[#2A2421]">Nhóm 1 — Đợt 15</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Cơ sở & Doanh nghiệp</span>
              <strong className="text-sm font-bold text-[#2A2421]">FPT Polytechnic & IMTA TECH</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-[#E5DACD] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#8B1E1E] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#8B1E1E]">
            Mục Tiêu Của Dự Án
          </h2>
          <p className="text-xs sm:text-sm text-[#52443A] leading-relaxed">
            Số hóa tư liệu và phát triển công cụ nhận diện thông minh bằng hình ảnh cho các nhạc cụ truyền thống Việt Nam. Dự án giúp bất kỳ ai, dù chưa từng học nhạc lý, cũng có thể nhận biết chính xác tên gọi, chất liệu chế tác, nguồn gốc lịch sử và cách diễn tấu của từng loại đàn, sáo, cồng chiêng chỉ qua một bức ảnh chụp.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E5DACD] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#8B1E1E]">
            Ý Nghĩa Văn Hóa & Xã Hội
          </h2>
          <p className="text-xs sm:text-sm text-[#52443A] leading-relaxed">
            Nhạc cụ dân tộc là kết tinh hồn cốt và tâm tư của cha ông qua hàng nghìn năm dựng nước và giữ nước. Dự án góp phần bảo vệ các di sản phi vật thể quý báu trước nguy cơ mai một trong thời đại số, đồng thời giới thiệu niềm tự hào văn hóa Việt Nam đến bạn bè quốc tế.
          </p>
        </div>
      </div>

      {/* Target Audiences Section */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E5DACD] p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E1E]">
            Ai Có Thể Sử Dụng?
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#2A2421]">
            Đối Tượng Hướng Đến Của Ứng Dụng
          </h3>
          <p className="text-xs text-[#7A695E]">
            Hệ thống được thiết kế hoàn toàn bằng tiếng Việt với ngôn ngữ bình dị, không rào cản kỹ thuật.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-2 shadow-2xs">
            <GraduationCap className="w-7 h-7 text-[#8B1E1E]" />
            <h4 className="font-serif text-base font-bold text-[#2A2421]">
              Học Sinh & Sinh Viên
            </h4>
            <p className="text-xs text-[#52443A] leading-relaxed">
              Làm bài tập môn Âm nhạc, Lịch sử, Giáo dục Địa phương (GDĐP) và chuẩn bị bài thuyết trình nhóm nhanh chóng.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-2 shadow-2xs">
            <Users className="w-7 h-7 text-amber-700" />
            <h4 className="font-serif text-base font-bold text-[#2A2421]">
              Giáo Viên & Giảng Viên
            </h4>
            <p className="text-xs text-[#52443A] leading-relaxed">
              Sử dụng làm giáo cụ trực quan sinh động trên lớp, minh họa âm thanh ngũ cung và kế hoạch bài dạy theo CT GDPT 2018.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-2 shadow-2xs">
            <Heart className="w-7 h-7 text-rose-700" />
            <h4 className="font-serif text-base font-bold text-[#2A2421]">
              Người Yêu Âm Nhạc
            </h4>
            <p className="text-xs text-[#52443A] leading-relaxed">
              Khám phá chiều sâu thẩm mỹ, nghe âm sắc nguyên bản của Đàn Bầu, Đàn Đáy, K'lông Pút, Cồng Chiêng.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-2 shadow-2xs">
            <Compass className="w-7 h-7 text-teal-700" />
            <h4 className="font-serif text-base font-bold text-[#2A2421]">
              Khách Tham Quan & Đại Chúng
            </h4>
            <p className="text-xs text-[#52443A] leading-relaxed">
              Đi bảo tàng hoặc lễ hội làng, chỉ cần chụp ảnh cây đàn là biết ngay xuất xứ và câu chuyện thú vị liên quan.
            </p>
          </div>
        </div>
      </div>

      {/* Technology & Accessibility Highlights */}
      <div className="bg-white rounded-3xl border border-[#E5DACD] p-6 sm:p-8 space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#8B1E1E]">
          Đặc Điểm Kỹ Thuật Nổi Bật
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#52443A] leading-relaxed">
          <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
            <strong className="block text-sm font-bold text-[#2A2421] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8B1E1E]" />
              Trí Tuệ Nhân Tạo (Gemini Flash)
            </strong>
            <p>
              Mô hình đa phương thức hiện đại nhận diện chính xác các đặc trưng vật lý của nhạc cụ từ ảnh chụp thực tế.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
            <strong className="block text-sm font-bold text-[#2A2421] flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-[#8B1E1E]" />
              Âm Học Mô Phỏng Web Audio
            </strong>
            <p>
              Tái tạo thanh âm ngũ cung thuần Việt (Hò - Xự - Xang - Xê - Cống) ngay trong trình duyệt mà không cần tải file âm thanh nặng.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE]">
            <strong className="block text-sm font-bold text-[#2A2421] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#8B1E1E]" />
              Đa Thiết Bị & Hỗ Trợ Đọc Giọng Nói
            </strong>
            <p>
              Tối ưu cho cả màn hình điện thoại cảm ứng (rung haptic phản hồi) và máy tính, tích hợp nút đọc to tóm tắt tiếng Việt.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('identify')}
          className="px-6 py-3.5 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <span>Trải Nghiệm Nhận Diện Nhạc Cụ Ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
