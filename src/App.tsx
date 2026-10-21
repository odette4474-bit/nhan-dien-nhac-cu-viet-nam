import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { IdentifyScreen } from './components/IdentifyScreen';
import { ResultScreen } from './components/ResultScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { DetailScreen } from './components/DetailScreen';
import { AboutScreen } from './components/AboutScreen';
import { ReferencesScreen } from './components/ReferencesScreen';

// Supplementary Interactive Modules
import { EducationHub } from './components/EducationHub';
import { SoundExplorer } from './components/SoundExplorer';
import { InstrumentComparison } from './components/InstrumentComparison';
import { CulturalMap } from './components/CulturalMap';
import { QuizGame } from './components/QuizGame';
import { AskExpertModal } from './components/AskExpertModal';

import { IdentificationResult } from './types/instruments';
import { audioSynth } from './utils/audioSynthesizer';
import { 
  Sparkles, Compass, Camera, BookOpen, Music2, Info, FileText, 
  ShieldCheck, Heart, GraduationCap, Award, Scale, MapPin 
} from 'lucide-react';

export default function App() {
  // Navigation Screens:
  // 'home' | 'identify' | 'result' | 'catalog' | 'detail' | 'about' | 'references' | 'education' | 'studio' | 'compare' | 'map' | 'quiz'
  const [activeScreen, setActiveScreen] = useState<string>('home');

  // Accessibility & Audio
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLargeFont, setIsLargeFont] = useState<boolean>(false);

  // Detail & Studio states
  const [selectedDetailId, setSelectedDetailId] = useState<string>('dan-bau');
  const [selectedStudioId, setSelectedStudioId] = useState<string>('dan-bau');
  const [compareLeftId, setCompareLeftId] = useState<string>('dan-bau');
  const [compareRightId, setCompareRightId] = useState<string>('dan-tranh');

  // AI Identification result for Screen 3
  const [identificationResult, setIdentificationResult] = useState<IdentificationResult | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // AI Expert Chat Modal
  const [isExpertModalOpen, setIsExpertModalOpen] = useState<boolean>(false);
  const [expertContext, setExpertContext] = useState<any>(null);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioSynth.setMute(nextMuted);
  };

  const toggleFontSize = () => {
    setIsLargeFont((prev) => !prev);
  };

  const navigateTo = (screen: string) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when AI finishes analyzing in Screen 2 -> moves to Screen 3
  const handleAnalysisComplete = (result: IdentificationResult, uploadedImage: string) => {
    setIdentificationResult(result);
    setUploadedImagePreview(uploadedImage);
    navigateTo('result');
  };

  // Called when user clicks an instrument to see Màn hình 5 (Chi tiết)
  const handleSelectInstrumentDetail = (instrumentId: string) => {
    setSelectedDetailId(instrumentId);
    navigateTo('detail');
  };

  // Called when user wants to play instrument on virtual studio
  const handleSelectInstrumentStudio = (instrumentId: string) => {
    setSelectedStudioId(instrumentId);
    navigateTo('studio');
  };

  const handleCompareInstrument = (instrumentId: string) => {
    setCompareLeftId(instrumentId);
    navigateTo('compare');
  };

  const handleOpenExpertChat = (context?: any) => {
    setExpertContext(context);
    setIsExpertModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A2421] font-sans ${isLargeFont ? 'text-[1.08rem] leading-relaxed' : 'text-sm'}`}>
      {/* Sticky App Header */}
      <Header
        activeTab={activeScreen}
        setActiveTab={navigateTo}
        isMuted={isMuted}
        toggleMute={toggleMute}
        isLargeFont={isLargeFont}
        toggleFontSize={toggleFontSize}
      />

      {/* Main View Router Handling the 7 Screens */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* Màn hình 1 – Trang chủ */}
        {activeScreen === 'home' && (
          <HomeScreen
            onNavigate={navigateTo}
            onSelectInstrumentDetail={handleSelectInstrumentDetail}
            onSelectInstrumentStudio={handleSelectInstrumentStudio}
          />
        )}

        {/* Màn hình 2 – Nhận diện nhạc cụ */}
        {activeScreen === 'identify' && (
          <IdentifyScreen
            onAnalysisComplete={handleAnalysisComplete}
            onNavigate={navigateTo}
          />
        )}

        {/* Màn hình 3 – Kết quả nhận diện */}
        {activeScreen === 'result' && (
          identificationResult ? (
            <ResultScreen
              result={identificationResult}
              uploadedImage={uploadedImagePreview}
              onNavigate={navigateTo}
              onSelectInstrumentDetail={handleSelectInstrumentDetail}
              onSelectInstrumentStudio={handleSelectInstrumentStudio}
              onOpenExpertChat={handleOpenExpertChat}
            />
          ) : (
            <IdentifyScreen
              onAnalysisComplete={handleAnalysisComplete}
              onNavigate={navigateTo}
            />
          )
        )}

        {/* Màn hình 4 – Danh sách nhạc cụ */}
        {activeScreen === 'catalog' && (
          <CatalogScreen
            onSelectInstrumentDetail={handleSelectInstrumentDetail}
            onSelectInstrumentStudio={handleSelectInstrumentStudio}
          />
        )}

        {/* Màn hình 5 – Chi tiết nhạc cụ */}
        {activeScreen === 'detail' && (
          <DetailScreen
            instrumentId={selectedDetailId}
            onNavigate={navigateTo}
            onSelectInstrumentStudio={handleSelectInstrumentStudio}
            onCompareInstrument={handleCompareInstrument}
            onOpenExpertChat={handleOpenExpertChat}
          />
        )}

        {/* Màn hình 6 – Giới thiệu */}
        {activeScreen === 'about' && (
          <AboutScreen onNavigate={navigateTo} />
        )}

        {/* Màn hình 7 – Nguồn tham khảo */}
        {activeScreen === 'references' && (
          <ReferencesScreen onNavigate={navigateTo} />
        )}

        {/* Supplementary Modules */}
        {activeScreen === 'education' && (
          <EducationHub
            onSelectInstrument={handleSelectInstrumentDetail}
            onOpenExpertChat={handleOpenExpertChat}
          />
        )}

        {activeScreen === 'studio' && (
          <SoundExplorer initialInstrumentId={selectedStudioId} />
        )}

        {activeScreen === 'compare' && (
          <InstrumentComparison
            initialLeftId={compareLeftId}
            initialRightId={compareRightId}
            onSelectForStudio={handleSelectInstrumentStudio}
          />
        )}

        {activeScreen === 'map' && (
          <CulturalMap
            onSelectInstrument={handleSelectInstrumentDetail}
            onOpenStudio={handleSelectInstrumentStudio}
          />
        )}

        {activeScreen === 'quiz' && <QuizGame />}
      </main>

      {/* Floating Ask AI Button for Instant Support */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => handleOpenExpertChat()}
          className="group px-4 py-3 rounded-full bg-gradient-to-r from-[#8B1E1E] to-[#B83826] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-[#FCEBD3]/40"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE3B2]" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">
            Hỏi Nghệ Nhân AI
          </span>
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar (Optimized for Smartphones) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E5DACD] z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: 'home', label: 'Trang chủ', icon: Compass },
          { id: 'identify', label: 'Nhận diện', icon: Camera },
          { id: 'catalog', label: 'Danh sách', icon: BookOpen },
          { id: 'education', label: 'Học tập', icon: GraduationCap },
          { id: 'about', label: 'Giới thiệu', icon: Info },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
                isActive ? 'text-[#8B1E1E] font-bold' : 'text-[#7A6A5E] hover:text-[#8B1E1E]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-[#8B1E1E]' : ''}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Deep Culture AI Chat Dialog */}
      <AskExpertModal
        isOpen={isExpertModalOpen}
        onClose={() => setIsExpertModalOpen(false)}
        instrumentContext={expertContext}
      />

      {/* Footer */}
      <footer className="bg-[#241C1A] text-[#E8DFD8] border-t border-[#3C302B] mt-16 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1 */}
            <div className="space-y-3 md:col-span-1">
              <div 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="font-serif text-xl font-black text-[#F4D189] tracking-tight">
                  NHẠC CỤ VIỆT
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3D2D27] text-[#D8B46C]">
                  Di Sản
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Ứng dụng số hóa, bảo tồn và quảng bá văn hóa nhạc cụ cổ truyền của 54 dân tộc Việt Nam qua thị giác máy tính và âm học tương tác.
              </p>
              <div className="p-2.5 rounded-xl bg-[#2E2422] border border-[#443631] text-[11px] text-amber-200/90 leading-snug">
                <strong>Đồ án thực tập:</strong> Nguyễn Văn An (PH70154), Nhóm 1 • Đợt 15 FPT Polytechnic & IMTA TECH.
              </div>
            </div>

            {/* Col 2: Danh Sách Màn Hình */}
            <div className="space-y-2">
              <h4 className="font-serif text-xs font-bold text-[#F4D189] uppercase tracking-wider mb-2">
                Hệ Thống Màn Hình
              </h4>
              <ul className="text-xs text-stone-400 space-y-1.5">
                <li>
                  <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                    Màn hình 1 – Trang chủ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('identify')} className="hover:text-white transition-colors">
                    Màn hình 2 – Nhận diện nhạc cụ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">
                    Màn hình 4 – Danh sách nhạc cụ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                    Màn hình 6 – Giới thiệu dự án
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('references')} className="hover:text-white transition-colors">
                    Màn hình 7 – Nguồn tham khảo
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Interactive Modules */}
            <div className="space-y-2">
              <h4 className="font-serif text-xs font-bold text-[#F4D189] uppercase tracking-wider mb-2">
                Không Gian Tương Tác
              </h4>
              <ul className="text-xs text-stone-400 space-y-1.5">
                <li>
                  <button onClick={() => navigateTo('education')} className="hover:text-white transition-colors">
                    Góc Học Tập & Giảng Dạy (GDPT 2018)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('studio')} className="hover:text-white transition-colors">
                    Phòng Thu Âm Ngũ Cung (Web Audio)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('compare')} className="hover:text-white transition-colors">
                    So Sánh & Đối Chiếu Nhạc Cụ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('map')} className="hover:text-white transition-colors">
                    Bản Đồ Văn Hóa 6 Vùng Miền
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('quiz')} className="hover:text-white transition-colors">
                    Đố Vui Di Sản Có Manh Mối Âm Thanh
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Cultural quote & UNESCO */}
            <div className="space-y-3 bg-[#2D2321] p-4 rounded-2xl border border-[#42342F]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Bảo Tồn Di Sản Dân Tộc</span>
              </div>
              <p className="text-xs text-stone-300 italic leading-relaxed">
                "Thanh âm dân tộc là gốc rễ của hồn non nước, gìn giữ nhạc khí là gìn giữ linh hồn ngàn năm của tiên tổ."
              </p>
              <div className="pt-2 border-t border-[#443631] text-[11px] text-stone-400">
                Đồng hành cùng Chương trình Chuyển đổi số Di sản Văn hóa Việt Nam.
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3A2E2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>© 2026 Nhạc Cụ Việt — Di Sản Âm Thanh Dân Tộc Việt Nam. Sản phẩm thực tập của Nguyễn Văn An, mã sinh viên PH70154, Nhóm 1, thuộc Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH.</p>
            <div className="flex items-center gap-4 shrink-0 text-stone-500">
              <span>Mô hình Gemini 3.8 Flash</span>
              <span>•</span>
              <span>Web Audio Ngũ Cung</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
