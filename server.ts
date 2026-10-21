import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Shared Gemini client utility
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

import fs from 'fs';

// Load standardized instruments database for cross-referencing
let standardInstrumentsDb: any[] = [];
try {
  const dbPath = path.resolve(__dirname, 'src', 'data', 'vietnamese_instruments.json');
  if (fs.existsSync(dbPath)) {
    standardInstrumentsDb = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  }
} catch (e) {
  console.warn('Could not pre-load vietnamese_instruments.json:', e);
}

// Identification Endpoint with Gemini AI & Database Cross-referencing
app.post('/api/identify', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Hình ảnh không hợp lệ hoặc bị thiếu.' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const promptText = `
Bạn là một nhà nghiên cứu âm nhạc dân tộc học hàng đầu Việt Nam (Ethnomusicologist). Hãy phân tích thật cẩn trọng hình ảnh này.

NGUYÊN TẮC QUAN TRỌNG NHẤT:
1. ĐÁNH GIÁ TÍNH RÕ RÀNG VÀ CĂN CỨ XÁC ĐỊNH:
   - Nếu hình ảnh KHÔNG RÕ RÀNG (quá mờ, quá tối, bị chói sáng, góc chụp bị che khuất các bộ phận quyết định như cần đàn/dây/phím/lỗ thổi),
   - Hoặc hình ảnh KHÔNG PHẢI là một nhạc cụ (đồ ăn, xe cộ, phong cảnh, đồ vật thường ngày, thiết bị hội nghị, micro, đồ bầu cử),
   - Hoặc KHÔNG ĐỦ CĂN CỨ ĐỂ XÁC ĐỊNH CHẮC CHẮN:
   => BẠN BẮT BUỘC PHẢI ĐẶT "canIdentify": false.
   => KHÔNG ĐƯỢC TỰ KHẲNG ĐỊNH KẾT QUẢ. Phải nêu rõ lý do tại sao chưa thể nhận diện và hướng dẫn người dùng chụp lại.

2. NẾU CÓ ĐỦ CĂN CỨ VÀ NHẬN DIỆN ĐƯỢC:
   - Đặt "canIdentify": true.
   - Xác định chính xác tên nhạc cụ truyền thống Việt Nam (ví dụ: Đàn Bầu, Đàn Tranh, Đàn Nguyệt, Đàn Đáy, Đàn Nhị, Sáo Trúc, Đàn T'rưng, K'lông Pút, Cồng Chiêng, Đàn Tính, Khèn Mông, Trống Đồng Đông Sơn, Trống Cơm, Kèn Saranai...).
   - LƯU Ý VỀ TỪ NGỮ VĂN HÓA: "Đàn Bầu" (Độc Huyền Cầm) là cây đàn 1 dây thuần Việt với cần rung sừng trâu và quả bầu hồ lô (bầu cộng hưởng). Từ "Bầu" là quả bầu hồ lô, hoàn toàn KHÔNG PHẢI là "bầu cử" (voting/election). Tuyệt đối không liên hệ với bầu cử chính trị hay hòm phiếu.
   - Đưa ra độ tin cậy dự đoán (confidence từ 50 đến 100).
   - Bóc tách đầy đủ cấu tạo, chất liệu, nguồn gốc lịch sử, cách chơi và di sản UNESCO liên quan.

Hãy trả về kết quả định dạng JSON thuần túy theo đúng cấu trúc sau:
{
  "canIdentify": true hoặc false,
  "statusMessage": "Thông báo trạng thái (ví dụ: 'Đã nhận diện thành công nhạc cụ' hoặc 'Chưa thể nhận diện chính xác nhạc cụ do hình ảnh không đủ căn cứ')",
  "unclearReason": "Nêu rõ nguyên nhân nếu canIdentify là false (ví dụ: 'Ảnh bị mờ/chói/che khuất chi tiết quan trọng')",
  "suggestions": "Lời khuyên giúp chụp lại ảnh chuẩn xác hơn",
  "possibleCandidates": [
    {
      "name": "Tên nhạc cụ nghi vấn (nếu có)",
      "likelihood": "Có thể / Khả năng thấp",
      "reason": "Lý do nghi vấn dựa trên chi tiết mờ nhạt nào"
    }
  ],
  "isVietnameseInstrument": true hoặc false,
  "instrumentName": "Tên tiếng Việt chính thức của nhạc cụ",
  "otherNames": "Các tên gọi dân gian hoặc tên Hán Việt khác",
  "ethnicGroup": "Dân tộc truyền thống gắn liền (Kinh, Mông, Ba Na, Gia Rai, Chăm, Tày, Nùng...)",
  "family": "Nhóm họ nhạc cụ (Họ Dây - Chi gảy/kéo, Họ Hơi, Họ Gõ tự thân vang, Họ Màng rung)",
  "confidence": 95,
  "summary": "Mô tả súc tích 2-3 câu về tinh hoa và giá trị văn hóa của nhạc cụ này.",
  "features": [
    "Đặc điểm nhận dạng 1",
    "Đặc điểm nhận dạng 2",
    "Đặc điểm nhận dạng 3"
  ],
  "structure": "Mô tả chi tiết cấu tạo các bộ phận (bầu đàn, thân đàn, cần đàn, dây, trục lên dây, phím...)",
  "materials": "Chất liệu chế tác truyền thống (gỗ ngô đồng, tre nứa lồ ô, sừng trâu, đồng thau...)",
  "originHistory": "Nguồn gốc xuất xứ và chiều dài lịch sử văn hóa dân tộc",
  "culturalRegion": "Vùng miền văn hóa chính",
  "playingTechnique": "Kỹ thuật diễn tấu đặc thù (rung, nhấn, vỗ, bồi âm, vuốt, gảy, thổi tuần hoàn...)",
  "associatedGenres": ["Thể loại 1", "Thể loại 2"],
  "famousPieces": ["Tác phẩm 1", "Tác phẩm 2"],
  "unescoHeritage": "Thông tin di sản UNESCO liên quan nếu có",
  "culturalSignificance": "Ý nghĩa tâm linh hoặc phong tục đời sống gắn liền",
  "funFact": "Một sự thật thú vị hoặc huyền thoại độc đáo về nhạc cụ này",
  "references": [
    "Viện Âm Nhạc Quốc Gia Việt Nam — Hồ sơ Nhạc khí Cổ truyền",
    "Giáo trình Nhạc khí Dân tộc — Học viện Âm nhạc Quốc gia Việt Nam",
    "GS.TS. Trần Văn Khê — Khảo luận Âm nhạc Dân gian Việt Nam"
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          { text: promptText },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedData: any;
    try {
      parsedData = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/{[\s\S]*}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        throw new Error('Không thể phân tích dữ liệu phản hồi từ AI.');
      }
    }

    // Server-side Cross-referencing against our standardized database
    let isMatchedWithDatabase = false;
    let matchedRecord = null;

    if (parsedData.canIdentify && parsedData.instrumentName) {
      const searchName = parsedData.instrumentName.toLowerCase().trim();
      const matched = standardInstrumentsDb.find((item: any) => {
        const itemName = (item.ten_nhac_cu || '').toLowerCase().trim();
        const otherNames = (item.ten_goi_khac || []).map((n: string) => n.toLowerCase().trim());
        return (
          itemName.includes(searchName) ||
          searchName.includes(itemName) ||
          otherNames.some((n: string) => searchName.includes(n) || n.includes(searchName))
        );
      });

      if (matched) {
        isMatchedWithDatabase = true;
        matchedRecord = matched;
        // Enrich features if AI returned minimal
        if (!parsedData.otherNames && matched.ten_goi_khac?.length) {
          parsedData.otherNames = matched.ten_goi_khac.join(', ');
        }
      }

      // Ensure references list is always populated with authoritative sources
      if (!parsedData.references || !Array.isArray(parsedData.references) || parsedData.references.length === 0) {
        parsedData.references = [
          'Viện Âm Nhạc Quốc Gia Việt Nam — Hồ sơ Nhạc khí Cổ truyền Việt Nam',
          'Giáo trình "Nhạc Khí Cổ Truyền Việt Nam" — Học viện Âm nhạc Quốc gia',
          'GS.TS. Trần Văn Khê — "Âm Nhạc Truyền Thống Việt Nam"',
        ];
      }
      if (isMatchedWithDatabase && matchedRecord) {
        parsedData.references.unshift(`Tệp dữ liệu chuẩn: vietnamese_instruments.json (Bản ghi: ${matchedRecord.ma_nhac_cu})`);
      }
    }

    parsedData.isMatchedWithDatabase = isMatchedWithDatabase;
    parsedData.matchedRecord = matchedRecord;

    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error in /api/identify:', error);
    return res.status(500).json({
      error: error?.message || 'Có lỗi xảy ra khi nhận diện nhạc cụ.',
      details: String(error),
    });
  }
});

// Culture Expert AI Chat Endpoint
app.post('/api/chat-expert', async (req, res) => {
  try {
    const { question, instrumentContext, chatHistory = [] } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Câu hỏi không được để trống.' });
    }

    const systemInstruction = `
Bạn là "Nghệ Nhân Ảo & Chuyên Gia Âm Nhạc Cổ Truyền Việt Nam" của ứng dụng V-Nhạc Cụ.
Phong cách trò chuyện: Nhã nhặn, am hiểu sâu sắc, đầy tự hào văn hóa, dùng từ ngữ âm nhạc truyền thống chính xác (ngũ cung, Hò Xự Xang Xê Cống, chữ đờn, điệu thức, luyến láy...).
Hãy trả lời cô đọng, dễ hiểu, truyền cảm hứng và giải thích rõ ràng các thắc mắc về nhạc cụ, âm thanh, lịch sử, kỹ thuật diễn tấu, cũng như so sánh giữa các loại đàn Việt Nam.
${instrumentContext ? `Ngữ cảnh nhạc cụ đang quan tâm: ${JSON.stringify(instrumentContext)}` : ''}
`;

    const contents = [
      ...chatHistory.map((item: any) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: item.content }],
      })),
      {
        role: 'user',
        parts: [{ text: question }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Xin lỗi, tôi chưa thể trả lời câu hỏi này lúc này.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat-expert:', error);
    return res.status(500).json({ error: error?.message || 'Lỗi khi trò chuyện với chuyên gia.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT) || 3000;

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
