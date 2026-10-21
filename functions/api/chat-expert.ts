
interface Env {
  APPS_SCRIPT_URL: string;
  WEBHOOK_SECRET: string;
}

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface ChatRequest {
  question?: string;
  instrumentContext?: unknown;
  chatHistory?: ChatMessage[];
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };

  const respond = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers });

  try {
    const { APPS_SCRIPT_URL, WEBHOOK_SECRET } = context.env;

    if (!APPS_SCRIPT_URL || !WEBHOOK_SECRET) {
      return respond({
        success: false,
        error: "Chưa cấu hình dịch vụ chatbot."
      }, 500);
    }

    let input: ChatRequest;

    try {
      input = await context.request.json() as ChatRequest;
    } catch {
      return respond({
        success: false,
        error: "Dữ liệu gửi lên không hợp lệ."
      }, 400);
    }

    const question = input.question;

    if (
      typeof question !== "string" ||
      !question.trim() ||
      question.length > 2000
    ) {
      return respond({
        success: false,
        error: "Câu hỏi không hợp lệ hoặc quá dài."
      }, 400);
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "chat",
        secret: WEBHOOK_SECRET,
        question: question.trim(),
        instrumentContext: input.instrumentContext ?? null,
        chatHistory: Array.isArray(input.chatHistory)
          ? input.chatHistory.slice(-6)
          : []
      }),
      redirect: "follow"
    });

    if (!response.ok) {
      console.error("Chat Apps Script HTTP:", response.status);

      return respond({
        success: false,
        error: "Không thể kết nối dịch vụ AI."
      }, 502);
    }

    let result: {
      success?: boolean;
      reply?: string;
      error?: string;
    };

    try {
      result = await response.json();
    } catch {
      return respond({
        success: false,
        error: "Dịch vụ AI trả về dữ liệu không hợp lệ."
      }, 502);
    }

    if (!result.success || typeof result.reply !== "string") {
      return respond({
        success: false,
        error: result.error || "AI chưa thể trả lời lúc này."
      }, 502);
    }

    return respond({
      success: true,
      reply: result.reply
    });

  } catch (error) {
    console.error("Chat proxy error:", String(error));

    return respond({
      success: false,
      error: "Có lỗi khi kết nối chatbot. Vui lòng thử lại."
    }, 500);
  }
};
