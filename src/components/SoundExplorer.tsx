import React, { useState, useEffect } from 'react';
import { 
  Music2, Play, Square, Sparkles, Volume2, Info, RefreshCw, 
  ChevronRight, Radio, Sliders, Disc
} from 'lucide-react';
import { VIETNAMESE_INSTRUMENTS, PENTATONIC_BASE_SCALE } from '../data/instrumentsData';
import { InstrumentData } from '../types/instruments';
import { audioSynth } from '../utils/audioSynthesizer';

interface SoundExplorerProps {
  initialInstrumentId?: string;
}

export const SoundExplorer: React.FC<SoundExplorerProps> = ({
  initialInstrumentId = 'dan-bau',
}) => {
  const [selectedInstId, setSelectedInstId] = useState<string>(initialInstrumentId);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState<boolean>(false);
  const [playingMelodyTitle, setPlayingMelodyTitle] = useState<string | null>(null);
  const [vibratoMode, setVibratoMode] = useState<boolean>(true);

  // Synchronize when initialInstrumentId changes externally
  useEffect(() => {
    if (initialInstrumentId) {
      setSelectedInstId(initialInstrumentId);
      audioSynth.stopMelody();
      setIsPlayingMelody(false);
      setPlayingMelodyTitle(null);
    }
  }, [initialInstrumentId]);

  const currentInstrument =
    VIETNAMESE_INSTRUMENTS.find((i) => i.id === selectedInstId) ||
    VIETNAMESE_INSTRUMENTS[0];

  const handlePlayKey = (index: number) => {
    setActiveNoteIndex(index);
    // Haptic touch feedback for mobile phone users
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {}
    }
    const note = PENTATONIC_BASE_SCALE[index];
    if (note) {
      audioSynth.playNote(currentInstrument.soundPreset, note.frequency, 1.2);
    }
    setTimeout(() => {
      setActiveNoteIndex(null);
    }, 400);
  };

  const handlePlayTraditionalMelody = (melody: {
    title: string;
    notes: { noteIndex: number; duration: number }[];
  }) => {
    if (isPlayingMelody) {
      audioSynth.stopMelody();
      setIsPlayingMelody(false);
      setPlayingMelodyTitle(null);
      return;
    }

    setIsPlayingMelody(true);
    setPlayingMelodyTitle(melody.title);

    const formattedNotes = melody.notes.map((item) => ({
      freq: PENTATONIC_BASE_SCALE[item.noteIndex]?.frequency || 392,
      duration: item.duration,
    }));

    audioSynth.playMelody(
      currentInstrument.soundPreset,
      formattedNotes,
      (noteIdx) => {
        const step = melody.notes[noteIdx]?.noteIndex;
        if (step !== undefined) {
          setActiveNoteIndex(step);
          setTimeout(() => setActiveNoteIndex(null), 250);
        }
      },
      () => {
        setIsPlayingMelody(false);
        setPlayingMelodyTitle(null);
      }
    );
  };

  const prebuiltMelodies = [
    {
      title: 'Lý Cây Đa (Dân ca Quan họ Bắc Ninh)',
      description: 'Làn điệu rộn ràng, vui tươi gắn liền với hội Lim mùa xuân.',
      notes: [
        { noteIndex: 0, duration: 0.35 },
        { noteIndex: 1, duration: 0.35 },
        { noteIndex: 2, duration: 0.35 },
        { noteIndex: 3, duration: 0.45 },
        { noteIndex: 4, duration: 0.45 },
        { noteIndex: 3, duration: 0.35 },
        { noteIndex: 2, duration: 0.35 },
        { noteIndex: 1, duration: 0.35 },
        { noteIndex: 0, duration: 0.7 },
      ],
    },
    {
      title: 'Dạ Cổ Hoài Lang (Vọng cổ Nam Bộ)',
      description: 'Khúc ca thắm đượm tình hoài niệm của cố nhạc sĩ Cao Văn Lầu.',
      notes: [
        { noteIndex: 4, duration: 0.5 },
        { noteIndex: 3, duration: 0.5 },
        { noteIndex: 2, duration: 0.7 },
        { noteIndex: 1, duration: 0.5 },
        { noteIndex: 0, duration: 0.9 },
        { noteIndex: 1, duration: 0.5 },
        { noteIndex: 2, duration: 1.1 },
      ],
    },
    {
      title: 'Lưu Thủy Kim Tiền (Nhã Nhạc Cung Đình)',
      description: 'Giai điệu cung đình Huế rộn rã, uyển chuyển như dòng nước êm đềm.',
      notes: [
        { noteIndex: 0, duration: 0.3 },
        { noteIndex: 1, duration: 0.3 },
        { noteIndex: 2, duration: 0.3 },
        { noteIndex: 3, duration: 0.3 },
        { noteIndex: 4, duration: 0.4 },
        { noteIndex: 5, duration: 0.4 },
        { noteIndex: 4, duration: 0.3 },
        { noteIndex: 2, duration: 0.3 },
        { noteIndex: 0, duration: 0.8 },
      ],
    },
    {
      title: 'Tiếng Suối Reo Đại Ngàn (Tây Nguyên)',
      description: 'Nhịp điệu rộn rã của dàn ống nứa T\'rưng giữa bạt ngàn nương rẫy.',
      notes: [
        { noteIndex: 0, duration: 0.22 },
        { noteIndex: 2, duration: 0.22 },
        { noteIndex: 4, duration: 0.3 },
        { noteIndex: 3, duration: 0.22 },
        { noteIndex: 1, duration: 0.22 },
        { noteIndex: 2, duration: 0.4 },
        { noteIndex: 4, duration: 0.5 },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] text-xs font-semibold mb-2">
          <Music2 className="w-3.5 h-3.5" />
          <span>Phòng Thu Âm Cổ Truyền Ngũ Cung</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#2A2421]">
          Trải Nghiệm Thanh Âm Dân Tộc
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6C5B50]">
          Khám phá hệ thang âm ngũ cung thuần Việt (Hò - Xự - Xang - Xê - Cống - Phan - Líu) và lắng nghe âm sắc đặc trưng được mô phỏng chân thực bằng vật lý âm thanh Web Audio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Instrument Selector & Visualizer (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl border border-[#E5DACD] shadow-xs p-5">
            <h3 className="font-serif text-sm font-bold text-[#8B1E1E] uppercase tracking-wider mb-3">
              Chọn Nhạc Cụ Trình Tấu:
            </h3>

            <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
              {VIETNAMESE_INSTRUMENTS.map((inst) => {
                const isSelected = inst.id === selectedInstId;
                return (
                  <button
                    key={inst.id}
                    onClick={() => {
                      audioSynth.stopMelody();
                      setIsPlayingMelody(false);
                      setPlayingMelodyTitle(null);
                      setSelectedInstId(inst.id);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#8B1E1E] bg-[#FFF8EB] shadow-xs'
                        : 'border-[#EAE0D4] bg-[#FAF7F2] hover:bg-white text-[#52443A]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#8B1E1E] text-white' : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        <Disc className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <strong className={`block text-xs truncate ${isSelected ? 'text-[#8B1E1E]' : 'text-[#2A2421]'}`}>
                          {inst.name}
                        </strong>
                        <span className="text-[10px] text-[#807064] block truncate">
                          {inst.family}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#8B1E1E] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Virtual Instrument Playing Stage (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stage Hero Card */}
          <div className="bg-gradient-to-br from-[#2E2421] via-[#3A2D29] to-[#1F1715] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#4F3E37] relative overflow-hidden">
            {/* Dong son circle background watermark */}
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full border border-white/5 -mr-20 -mt-20 pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {currentInstrument.family} • {currentInstrument.culturalRegion}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#FBEED7] mt-1">
                  {currentInstrument.name}
                </h2>
                <p className="text-xs text-stone-300 max-w-md mt-0.5">
                  {currentInstrument.summary}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                {isPlayingMelody ? (
                  <button
                    onClick={() => {
                      audioSynth.stopMelody();
                      setIsPlayingMelody(false);
                      setPlayingMelodyTitle(null);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                  >
                    <Square className="w-3.5 h-3.5" />
                    <span>Dừng Độc Tấu</span>
                  </button>
                ) : (
                  <span className="text-xs text-amber-300/80 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Sẵn sàng gảy đàn
                  </span>
                )}
              </div>
            </div>

            {/* Virtual Vietnamese Pentatonic Keyboard */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-semibold text-amber-200">
                  Thang Âm Ngũ Cung Việt Nam (Nhấp chuột hoặc chạm để gảy nốt)
                </span>
                <span className="text-[11px] italic">Cao độ: C4 - D5</span>
              </div>

              {/* Keys Layout */}
              <div className="grid grid-cols-7 gap-2 sm:gap-3 py-2">
                {PENTATONIC_BASE_SCALE.map((note, idx) => {
                  const isActive = activeNoteIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePlayKey(idx)}
                      className={`relative group h-32 sm:h-40 rounded-2xl flex flex-col justify-between p-2.5 sm:p-3 text-center transition-all select-none ${
                        isActive
                          ? 'bg-gradient-to-t from-[#B83826] to-[#E5533D] scale-96 shadow-lg shadow-red-900/40 border-2 border-[#FCECD0]'
                          : 'bg-gradient-to-t from-[#40332D] to-[#54433B] hover:from-[#4D3D37] hover:to-[#655147] border border-[#6A554A] hover:border-amber-400/50 shadow-md'
                      }`}
                    >
                      {/* Note Solfege Top */}
                      <span className="text-[10px] font-mono text-stone-400 group-hover:text-amber-200">
                        {note.westernNote}
                      </span>

                      {/* Sound Vibration Indicator */}
                      <div className="my-auto flex flex-col items-center justify-center">
                        <span
                          className={`font-serif text-lg sm:text-2xl font-black ${
                            isActive ? 'text-white scale-110' : 'text-[#F4D189]'
                          } transition-transform`}
                        >
                          {note.name}
                        </span>
                        <span className="text-[9px] text-stone-400 uppercase tracking-wider mt-0.5">
                          {note.vietnameseSolfege}
                        </span>
                      </div>

                      {/* Frequency Bottom Tag */}
                      <span className="text-[9px] font-mono text-stone-400">
                        {Math.round(note.frequency)} Hz
                      </span>

                      {/* Ripple light glow */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl ring-4 ring-amber-400/30 pointer-events-none animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Key explanation */}
              <p className="text-[11px] text-stone-400 text-center pt-2">
                Mỗi cung bậc ứng với triết lý Ngũ Hành (Kim - Mộc - Thủy - Hỏa - Thổ) trong nền âm nhạc cổ truyền Á Đông.
              </p>
            </div>
          </div>

          {/* Traditional Melodies Jukebox (Bài Bản Mẫu) */}
          <div className="bg-white rounded-2xl border border-[#E5DACD] shadow-xs p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#8B1E1E]">
                  Thử Nghe Giai Điệu Bài Bản Cổ Truyền
                </h3>
                <p className="text-xs text-[#705E52]">
                  Lắng nghe cây {currentInstrument.name} diễn tấu các trích đoạn dân ca nổi tiếng
                </p>
              </div>

              {isPlayingMelody && (
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold animate-pulse">
                  Đang diễn tấu: {playingMelodyTitle}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prebuiltMelodies.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#EAE0D4] bg-[#FAF7F2] hover:bg-[#FFF9F3] transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <strong className="block text-xs font-bold text-[#2A2421]">
                      {m.title}
                    </strong>
                    <p className="text-[11px] text-[#786659]">
                      {m.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlayTraditionalMelody(m)}
                    className="w-8 h-8 rounded-full bg-[#8B1E1E] hover:bg-[#741515] text-white flex items-center justify-center shrink-0 shadow-xs hover:scale-105 transition-transform"
                  >
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
