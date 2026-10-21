import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, RefreshCw, BookOpen } from 'lucide-react';

interface AskExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  instrumentContext?: any;
}

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export const AskExpertModal: React.FC<AskExpertModalProps> = ({
  isOpen,
  onClose,
  instrumentContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: instrumentContext
        ? `Kính chào bạn! Tôi là Nghệ Nhân Ảo & Chuyên Gia Âm Nhạc Dân Tộc. Bạn đang quan tâm đến "${instrumentContext.instrumentName || instrumentContext.name}". Hãy đặt bất kỳ câu hỏi nào về nguồn gốc, kỹ thuật bấm phím, cách lên dây, hoặc câu chuyện văn hóa gắn liền với cây đàn này!`
        : `Kính chào bạn! Tôi là Nghệ Nhân Ảo & Chuyên Gia Âm Nhạc Cổ Truyền Việt Nam. Bạn có điều gì muốn tìm hiểu về các loại đàn, sáo, cồng chiêng, hoặc điệu thức ngũ cung của 54 dân tộc anh em?`,
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Tại sao Đàn Bầu chỉ 1 dây mà diễn tấu được mọi cao độ?',
    'Sự khác biệt giữa Đàn Đáy và Đàn Nguyệt là gì?',
    'Kỹ thuật thở tuần hoàn của Kèn Saranai và Sáo Trúc?',
    'Điệu Bắc, Điệu Nam và Điệu Oán trong Đờn ca tài tử?',
  ];

  const handleSend = async (questionToSend?: string) => {
    const q = questionToSend || inputQuestion;
    if (!q.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: q };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat-expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          instrumentContext,
          chatHistory: newHistory.slice(-6),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi kết nối.');

      setMessages((prev) => [
        ...prev,
        { role: 'model', content: data.reply || 'Cảm ơn câu hỏi sâu sắc của bạn.' },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'Thưa bạn, hệ thống đang bận một chút hoặc có lỗi kết nối. Vui lòng thử hỏi lại câu hỏi nhé!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#D9C4AC] shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1E1E] to-[#6C120B] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-[#FCEBD3]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FFF8EC]">
                Hỏi Chuyên Gia & Nghệ Nhân Âm Nhạc
              </h3>
              <p className="text-xs text-amber-200">
                AI Am Hiểu Sâu Sắc Văn Vật Nhạc Cụ Việt Nam
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.role === 'user'
                    ? 'bg-[#8B1E1E] text-white'
                    : 'bg-[#FFF8EB] border border-[#F4D189] text-[#8B1E1E]'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#8B1E1E] text-white rounded-tr-none'
                    : 'bg-white border border-[#E5DACD] text-[#342721] rounded-tl-none shadow-2xs'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-[#7A6A5E] bg-white p-3 rounded-2xl border border-[#E5DACD] w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-[#8B1E1E]" />
              <span>Nghệ nhân đang suy ngẫm câu trả lời...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#FAF3E8] border-t border-[#E8DEC8] flex overflow-x-auto gap-2 no-scrollbar">
          {quickPrompts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#D5C6B5] text-[#5A493D] whitespace-nowrap shrink-0 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#E8DEC8] flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hỏi về kỹ thuật chơi, lịch sử, chất liệu, so sánh..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#D5C6B5] bg-[#FAF7F2] text-xs sm:text-sm focus:outline-none focus:border-[#8B1E1E]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuestion.trim() || isLoading}
            className="p-2.5 rounded-xl bg-[#8B1E1E] hover:bg-[#741515] text-white disabled:opacity-50 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
