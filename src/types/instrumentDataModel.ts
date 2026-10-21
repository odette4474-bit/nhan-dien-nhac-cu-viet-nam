/**
 * Định nghĩa cấu trúc dữ liệu chuẩn cho Nhạc cụ Dân tộc Việt Nam
 * Được tổ chức độc lập để thuận tiện cho việc cập nhật, nhập xuất và mở rộng cơ sở dữ liệu.
 */

export interface VietnameseInstrumentRecord {
  /** Mã định danh duy nhất của nhạc cụ (ví dụ: NC_DAN_BAU) */
  ma_nhac_cu: string;

  /** Tên tiếng Việt chính thức của nhạc cụ */
  ten_nhac_cu: string;

  /** Các tên gọi dân gian hoặc tên Hán Việt khác (nếu có) */
  ten_goi_khac: string[];

  /** Đường dẫn hình ảnh minh họa (URL tuyệt đối hoặc đường dẫn nội bộ /assets/...) */
  hinh_anh: string;

  /** Nhóm phân loại nhạc cụ: Dây gảy, Dây kéo, Nhạc cụ Hơi, Nhạc cụ Gõ (tự thân vang), Nhạc cụ Màng rung */
  nhom_nhac_cu: string;

  /** Vật liệu và chất liệu chế tác cổ truyền */
  chat_lieu: string;

  /** Nguồn gốc xuất xứ, thời kỳ lịch sử và dân tộc sáng tạo */
  nguon_goc: string;

  /** Các dấu hiệu và đặc điểm nhận dạng trực quan cốt lõi */
  dac_diem_nhan_dang: string[];

  /** Cách sử dụng, tư thế cầm và kỹ thuật diễn tấu đặc trưng */
  cach_su_dung: string;

  /** Tóm tắt mô tả tổng quan về nhạc cụ và giá trị văn hóa nghệ thuật */
  mo_ta: string;

  // Các trường mở rộng hữu ích cho hệ thống
  dan_toc?: string;
  vung_mien?: string;
  di_san_unesco?: string;
  the_loai_am_nhac?: string[];
  bai_ban_tieu_bieu?: string[];
  am_thanh_preset?: string;
}
