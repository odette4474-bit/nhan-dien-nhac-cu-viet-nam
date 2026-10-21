
interface Env {
  APPS_SCRIPT_URL: string;
  WEBHOOK_SECRET: string;
}

interface IdentifyRequest {
  imageBase64?: string;
  mimeType?: string;
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
      console.error("Missing Apps Script configuration");
      return respond({
        success: false,
        error: "Máy chủ chưa được cấu hình đầy đủ."
      }, 500);
    }

    const input = await context.request.json() as IdentifyRequest;

    if (!input.imageBase64 || typeof input.imageBase64 !== "string") {
      return respond({
        success: false,
        error: "Bạn chưa chọn hình ảnh."
      }, 400);
    }

    const mimeType = input.mimeType || "image/jpeg";

    if (!["image/jpeg", "image/png", "image/webp"].includes(mimeType)) {
      return respond({
        success: false,
        error: "Định dạng ảnh không được hỗ trợ."
      }, 400);
    }

    if (input.imageBase64.length > 6000000) {
      return respond({
        success: false,
        error: "Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn."
      }, 413);
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        secret: WEBHOOK_SECRET,
        imageBase64: input.imageBase64,
        mimeType
      }),
      redirect: "follow"
    });

    const raw = await response.text();

    if (!response.ok) {
      console.error("Apps Script HTTP error:", response.status);
      return respond({
        success: false,
        error: "Không thể kết nối đến dịch vụ nhận diện."
      }, 502);
    }

    let result: any;

    try {
      result = JSON.parse(raw);
    } catch {
      console.error(
        "Apps Script returned non-JSON:",
        response.status,
        raw.substring(0, 150)
      );

      return respond({
        success: false,
        error: "Apps Script trả về dữ liệu không hợp lệ."
      }, 502);
    }

    if (!result.success) {
      console.error("Apps Script error:", result.error);
      return respond({
        success: false,
        error: result.error || "Không thể nhận diện ảnh."
      }, 502);
    }

    if (!result.data || typeof result.data.canIdentify !== "boolean") {
      return respond({
        success: false,
        error: "Kết quả nhận diện không hợp lệ."
      }, 502);
    }

    return respond({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error("Identify proxy error:", String(error));

    return respond({
      success: false,
      error: "Có lỗi khi kết nối dịch vụ nhận diện."
    }, 500);
  }
};
