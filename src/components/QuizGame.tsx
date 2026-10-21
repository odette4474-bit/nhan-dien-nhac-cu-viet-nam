import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, Volume2, Sparkles, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/instrumentsData';
import { QuizQuestion } from '../types/instruments';
import { audioSynth } from '../utils/audioSynthesizer';

export const QuizGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [isPlayingClue, setIsPlayingClue] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizComplete(false);
  };

  const playAudioClue = () => {
    if (!currentQ.soundPreset) return;
    setIsPlayingClue(true);
    audioSynth.playMelody(
      currentQ.soundPreset,
      [
        { freq: 261.63, duration: 0.4 },
        { freq: 293.66, duration: 0.4 },
        { freq: 349.23, duration: 0.45 },
        { freq: 392.00, duration: 0.5 },
        { freq: 440.00, duration: 0.8 },
      ],
      undefined,
      () => setIsPlayingClue(false)
    );
  };

  const getBadgeTitle = () => {
    const total = QUIZ_QUESTIONS.length;
    const ratio = score / total;
    if (ratio === 1) return { title: 'Bậc Thầy Tinh Thông Âm Nhạc Cổ Truyền', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    if (ratio >= 0.75) return { title: 'Nghệ Nhân Yêu Di Sản Dân Tộc', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (ratio >= 0.5) return { title: 'Môn Sinh Cổ Nhạc Tiềm Năng', color: 'text-blue-700 bg-blue-100 border-blue-300' };
    return { title: 'Người Bạn Mới Khám Phá Âm Sắc Quê Hương', color: 'text-stone-700 bg-stone-100 border-stone-300' };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Thử Tài Văn Hóa</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2A2421]">
          Đố Vui Di Sản Nhạc Cụ
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6C5B50]">
          Khám phá những câu đố dân gian, nghe thanh âm nhận diện và kiểm tra kiến thức về các nhạc cụ truyền thống Việt Nam.
        </p>
      </div>

      {!isQuizComplete ? (
        <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#7A695E] border-b border-[#F0E6D8] pb-4">
            <span>
              Câu hỏi <strong className="text-[#8B1E1E] text-sm">{currentQuestionIndex + 1}</strong> / {QUIZ_QUESTIONS.length}
            </span>
            <span className="bg-[#FAF2E6] px-3 py-1 rounded-full text-[#8B1E1E]">
              Điểm số: {score}
            </span>
          </div>

          {/* Sound Clue Banner if question has sound */}
          {currentQ.soundPreset && (
            <div className="p-4 rounded-2xl bg-[#FFF8EB] border border-[#F4D189] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-5 h-5 text-[#C2821A] shrink-0" />
                <span className="text-xs font-bold text-[#7A4B1A]">
                  Câu hỏi có manh mối âm thanh! Bấm để nghe âm sắc bí mật:
                </span>
              </div>
              <button
                onClick={playAudioClue}
                disabled={isPlayingClue}
                className="px-4 py-2 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white text-xs font-bold shrink-0 transition-transform hover:scale-105 active:scale-95"
              >
                {isPlayingClue ? 'Đang phát âm...' : 'Phát Thanh Âm'}
              </button>
            </div>
          )}

          {/* Question Text */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A2421] leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'border-[#EAE0D4] bg-[#FAF7F2] hover:bg-[#FFF9F3] text-[#45372E]';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                } else if (isSelected) {
                  btnStyle = 'border-red-500 bg-red-50 text-red-950 font-bold ring-2 ring-red-500/30';
                } else {
                  btnStyle = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/80 border border-stone-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && (
                    <>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD] space-y-2 animate-in fade-in duration-300">
              <strong className="block text-xs font-bold text-[#8B1E1E] uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Giải Thích Văn Hóa Dân Tộc:</span>
              </strong>
              <p className="text-xs sm:text-sm text-[#4E4036] leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-transform hover:scale-105 active:scale-95"
              >
                <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả Chung Cuộc'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Score Card */
        <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-md p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-[#8B1E1E] text-white flex items-center justify-center mx-auto shadow-lg">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold border uppercase tracking-wider mb-3 ${getBadgeTitle().color}`}>
              {getBadgeTitle().title}
            </span>
            <h2 className="font-serif text-3xl font-black text-[#2A2421]">
              Chúc Mừng Bạn Đã Hoàn Thành!
            </h2>
            <p className="text-sm text-[#6C5B50] mt-1">
              Bạn đã trả lời đúng <strong className="text-[#8B1E1E] text-lg">{score}</strong> trên tổng số {QUIZ_QUESTIONS.length} câu đố nhạc cụ dân tộc.
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD] text-xs text-[#52443A] leading-relaxed">
            Mỗi thanh âm cổ truyền là một sợi dây thiêng liêng nối liền quá khứ và hiện tại. Tiếp tục tra cứu và trải nghiệm để cùng gìn giữ bản sắc văn hóa âm nhạc Việt Nam!
          </div>

          <div>
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Chơi Lại Từ Đầu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
