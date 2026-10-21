
interface Env {
  GEMINI_API_KEY: string;
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };

  const respond = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers });

  try {
    const { imageBase64, mimeType } =
      await context.request.json() as {
        imageBase64?: string;
        mimeType?: string;
      };

    if (!imageBase64) {
      return respond({
        success: false,
        error: "Bạn chưa chọn hình ảnh."
      }, 400);
    }

    if (!context.env.GEMINI_API_KEY) {
      return respond({
        success: false,
        error: "Chưa cấu hình Gemini API key."
      }, 500);
    }

    const cleanBase64 = imageBase64.replace(
      /^data:[^;]+;base64,/,
      ""
    );

    const prompt = `
Bạn là chuyên gia nhận diện nhạc cụ truyền thống Việt Nam.
Hãy phân tích hình ảnh được cung cấp.

Yêu cầu:
- Nhận diện đúng nhạc cụ dựa trên đặc điểm nhìn thấy.
- Không mặc định kết quả là Đàn Bầu.
- Nếu không phải nhạc cụ hoặc không đủ căn cứ,
  đặt canIdentify thành false.
- Không bịa độ chính xác hoặc thông tin lịch sử.
- Trả về duy nhất một đối tượng JSON hợp lệ.

Các trường JSON:
canIdentify: boolean
isVietnameseInstrument: boolean
instrumentName: string
otherNames: string
ethnicGroup: string
family: string
confidence: number
summary: string
features: string[]
structure: string
materials: string
originHistory: string
culturalRegion: string
playingTechnique: string
associatedGenres: string[]
famousPieces: string[]
unescoHeritage: string
culturalSignificance: string
funFact: string
statusMessage: string
unclearReason: string
suggestions: string

Nếu không nhận diện được, giải thích lý do trong
unclearReason và để instrumentName là chuỗi rỗng.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": context.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType || "image/jpeg",
                  data: cleanBase64,
                },
              },
            ],
          }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const apiResult: any = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", response.status);
      return respond({
        success: false,
        error: "Gemini không xử lý được ảnh. Vui lòng thử lại."
      }, 502);
    }

    const text =
      apiResult.candidates?.[0]?.content?.parts
        ?.map((part: any) => part.text || "")
        .join("") || "";

    if (!text) {
      throw new Error("Gemini không trả về nội dung.");
    }

    const result = JSON.parse(text);

    if (typeof result.canIdentify !== "boolean") {
      throw new Error("Kết quả nhận diện không hợp lệ.");
    }

    return respond({
      success: true,
      data: {
        ...result,
        isMatchedWithDatabase: false,
      },
    });

  } catch (error) {
    console.error("Identification error:", error);

    return respond({
      success: false,
      error: "Có lỗi khi nhận diện hình ảnh. Vui lòng thử lại."
    }, 500);
  }
};

