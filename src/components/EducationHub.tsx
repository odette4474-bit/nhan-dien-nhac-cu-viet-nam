import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, Users, Lightbulb, FileText, Printer, 
  HelpCircle, Sparkles, CheckCircle2, ChevronRight, Share2, Compass, Layers 
} from 'lucide-react';
import { GLOSSARY_TERMS, STUDENT_QUICK_TIPS, TEACHER_LESSON_GUIDE, VIETNAMESE_INSTRUMENTS } from '../data/instrumentsData';
import { AudienceMode } from '../types/instruments';

interface EducationHubProps {
  onSelectInstrument: (id: string) => void;
  onOpenExpertChat: (context?: any) => void;
}

export const EducationHub: React.FC<EducationHubProps> = ({
  onSelectInstrument,
  onOpenExpertChat,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'students' | 'teachers' | 'glossary'>('students');
  const [selectedTipId, setSelectedTipId] = useState<string>('tip-1');
  const [searchGlossary, setSearchGlossary] = useState<string>('');
  const [copiedPresentation, setCopiedPresentation] = useState<boolean>(false);

  const filteredGlossary = GLOSSARY_TERMS.filter(
    (g) =>
      g.term.toLowerCase().includes(searchGlossary.toLowerCase()) ||
      g.simpleExplanation.toLowerCase().includes(searchGlossary.toLowerCase()) ||
      g.exampleInstrument.toLowerCase().includes(searchGlossary.toLowerCase())
  );

  const handlePrintLessonPlan = () => {
    window.print();
  };

  const generatePresentationOutline = (instName: string) => {
    return `DÀN Ý THUYẾT TRÌNH BÀI TẬP ÂM NHẠC: ${instName.toUpperCase()}
1. Giới thiệu tên gọi và nguồn gốc dân tộc:
   - Tên nhạc cụ: ${instName}
   - Thuộc họ nhạc cụ: Theo truyền thống phân chia 4 họ.
   - Dân tộc và vùng miền văn hóa gắn bó mật thiết.
2. Cấu tạo và chất liệu đặc trưng:
   - Các bộ phận chính (Thân, cần, dây hoặc ống nứa).
   - Chất liệu thiên nhiên (gỗ ngô đồng, tre nứa, sừng trâu, vỏ bầu khô).
3. Cách diễn tấu & âm sắc độc đáo:
   - Kỹ thuật tay (gảy, uốn cần, vỗ hơi, bấm phím).
   - Thanh âm mang cảm xúc gì (trong trẻo, u uất hay trầm hùng).
4. Ý nghĩa bảo tồn di sản:
   - Giá trị văn hóa phi vật thể (UNESCO nếu có).
   - Trách nhiệm của thế hệ trẻ trong việc gìn giữ hồn thiêng dân tộc.`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-xs font-semibold mb-2">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Giáo Dục & Tiếp Cận Bình Dân</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2A2421]">
          Góc Học Tập & Giảng Dạy Di Sản
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6C5B50]">
          Được thiết kế riêng cho học sinh, sinh viên, giáo viên và những người bắt đầu tìm hiểu — giải thích bình dân không dùng thuật ngữ khó, hỗ trợ bài thuyết trình và giáo án học đường.
        </p>
      </div>

      {/* Target Audience Mode Switcher Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-2xl bg-[#EAE0D4] border border-[#D9CABB] gap-1">
          <button
            onClick={() => setActiveSubTab('students')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'students'
                ? 'bg-[#8B1E1E] text-white shadow-sm'
                : 'text-[#55463D] hover:text-[#8B1E1E] hover:bg-white/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Học Sinh & Sinh Viên</span>
          </button>

          <button
            onClick={() => setActiveSubTab('teachers')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'teachers'
                ? 'bg-[#8B1E1E] text-white shadow-sm'
                : 'text-[#55463D] hover:text-[#8B1E1E] hover:bg-white/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Giáo Viên & Bài Giảng</span>
          </button>

          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'glossary'
                ? 'bg-[#8B1E1E] text-white shadow-sm'
                : 'text-[#55463D] hover:text-[#8B1E1E] hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Từ Điển Dễ Hiểu A-Z</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: Students & Youth Hub */}
      {activeSubTab === 'students' && (
        <div className="space-y-8">
          {/* Quick Mnemonic Cards (Mẹo Nhớ Nhanh) */}
          <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-xs p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-bold text-[#8B1E1E] uppercase tracking-wider block">
                  Bí Kíp Ghi Nhớ Khi Làm Bài Tập
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#2A2421]">
                  Mẹo Nhận Biết Nhanh 6 Nhạc Cụ Tiêu Biểu
                </h2>
              </div>
              <span className="text-xs bg-[#FAF2E6] text-[#8B1E1E] font-semibold px-3 py-1 rounded-full border border-[#ECD9C3] hidden sm:block">
                Dành cho bài thi & thuyết trình
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {STUDENT_QUICK_TIPS.map((tip) => (
                <div
                  key={tip.id}
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#8B1E1E] hover:bg-[#FFF9F3] transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-[#8B1E1E]">
                        {tip.instrumentName}
                      </h3>
                      <span className="text-[10px] font-bold bg-[#E8DEC8] px-2 py-0.5 rounded text-[#5D4E43]">
                        Ghi nhớ 3s
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E5DACD] text-xs font-semibold text-[#2A2421]">
                      🔑 Mẹo nhìn hình: <span className="text-[#8B1E1E]">{tip.mnemonic}</span>
                    </div>

                    <p className="text-xs text-[#52443A] leading-relaxed">
                      💡 {tip.quickFact}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8DEC8] text-[11px] text-[#7A695E]">
                    <strong>Từ khóa ăn điểm:</strong> {tip.examNote}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Presentation Assistant Box */}
          <div className="bg-gradient-to-br from-[#8B1E1E] to-[#6C120B] text-white rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-[#FCEBD3]">
                  Hỗ Trợ Thuyết Trình Môn Âm Nhạc / Lịch Sử
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#FFF8EC]">
                  Cần Chuẩn Bị Bài Thuyết Trình Nhóm?
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  Bấm sao chép ngay dàn ý chuẩn mực 4 phần có sẵn để học sinh và sinh viên tự tin thuyết trình trước lớp về bất kỳ nhạc cụ truyền thống nào.
                </p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatePresentationOutline('Đàn Bầu Việt Nam'));
                    setCopiedPresentation(true);
                    setTimeout(() => setCopiedPresentation(false), 2500);
                  }}
                  className="px-5 py-3 rounded-xl bg-[#F5D48E] hover:bg-[#F2CA73] text-[#691818] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {copiedPresentation ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                      <span>Đã Sao Chép Dàn Ý!</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Sao Chép Dàn Ý Mẫu 4 Phần</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenExpertChat({ topic: 'Hỏi ý tưởng thuyết trình âm nhạc' })}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/20"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Nhờ AI Viết Dàn Ý Riêng</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Teachers & Lesson Plan Hub */}
      {activeSubTab === 'teachers' && (
        <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0E6D8] pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#8B1E1E] uppercase tracking-wider block">
                Tài Liệu Sư Phạm Tham Khảo (CT GDPT 2018)
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#2A2421]">
                Kế Hoạch Bài Dạy 1 Tiết: {TEACHER_LESSON_GUIDE.lessonTitle}
              </h2>
              <p className="text-xs text-[#7A6A5E] mt-0.5">
                Môn học: <strong>{TEACHER_LESSON_GUIDE.subject}</strong> • Đối tượng: <strong>{TEACHER_LESSON_GUIDE.gradeLevels}</strong>
              </p>
            </div>

            <button
              onClick={handlePrintLessonPlan}
              className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-stone-100 border border-[#D5C6B5] text-[#55463D] text-xs font-bold flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4 text-[#8B1E1E]" />
              <span>In / Lưu Bản PDF</span>
            </button>
          </div>

          {/* Objectives */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADBCE] space-y-2">
            <h3 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
              I. Mục Tiêu Bài Học (Phẩm Chất & Năng Lực)
            </h3>
            <ul className="text-xs text-[#4A3B32] space-y-1.5 list-disc pl-4 leading-relaxed">
              {TEACHER_LESSON_GUIDE.objectives.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Classroom Activities */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
              II. Tiến Trình 4 Hoạt Động Trên Lớp Tích Hợp Ứng Dụng
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEACHER_LESSON_GUIDE.classroomActivities.map((act, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-[#E5DACD] bg-white shadow-2xs space-y-1.5"
                >
                  <strong className="block text-xs font-bold text-[#8B1E1E]">
                    {act.step}
                  </strong>
                  <p className="text-xs text-[#52443A] leading-relaxed">
                    {act.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Questions */}
          <div className="bg-[#FFF8EB] border border-[#F4D189] p-5 rounded-2xl space-y-2">
            <h3 className="font-serif text-xs font-bold text-[#7A4B1A] uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-[#C2821A]" />
              <span>III. Gợi Ý Câu Hỏi Mở Khơi Gợi Thảo Luận Trên Lớp</span>
            </h3>
            <div className="space-y-1.5 text-xs text-[#5E3B16] font-medium">
              {TEACHER_LESSON_GUIDE.discussionQuestions.map((q, idx) => (
                <p key={idx}>{q}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Plain-Language Glossary (A-Z) */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-6">
          {/* Search bar inside glossary */}
          <div className="bg-white rounded-2xl border border-[#E5DACD] p-4 shadow-xs">
            <input
              type="text"
              value={searchGlossary}
              onChange={(e) => setSearchGlossary(e.target.value)}
              placeholder="Tìm thuật ngữ (ví dụ: Ngũ cung, Con nhạn, Bồi âm, Dăm kèn, Điệu Bắc...)"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D5C6B5] bg-[#FAF7F2] text-xs sm:text-sm focus:outline-none focus:border-[#8B1E1E]"
            />
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5DACD] p-5 shadow-2xs hover:border-[#8B1E1E] transition-all space-y-3"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8B1E1E] tracking-wider block">
                    Khái niệm âm nhạc
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#2A2421]">
                    {item.term}
                  </h3>
                </div>

                <div className="text-xs text-[#4E4036] leading-relaxed bg-[#FAF7F2] p-3 rounded-xl border border-[#EADBCE]">
                  <strong className="text-[#8B1E1E] block mb-0.5">Giải thích bình dân:</strong>
                  {item.simpleExplanation}
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-950">
                  <strong className="text-amber-900 block mb-0.5">So sánh đời thường dễ hiểu:</strong>
                  {item.analogy}
                </div>

                <div className="pt-2 text-[11px] text-[#7A695E] flex items-center justify-between border-t border-[#F0E6D8]">
                  <span>Nhạc cụ tiêu biểu: <strong>{item.exampleInstrument}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
