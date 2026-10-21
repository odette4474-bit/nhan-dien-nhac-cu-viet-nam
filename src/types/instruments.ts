export type AudienceMode = 'general' | 'student' | 'teacher';

export interface GlossaryTerm {
  term: string;
  simpleExplanation: string;
  analogy: string; // so sánh đời thường dễ hiểu
  exampleInstrument: string;
}

export type InstrumentFamily = 
  | 'Họ Dây (Dây gảy)' 
  | 'Họ Dây (Dây kéo)' 
  | 'Họ Hơi' 
  | 'Họ Gõ (Tự thân vang)' 
  | 'Họ Màng rung';

export type CulturalRegion = 
  | 'Đồng bằng Bắc Bộ' 
  | 'Cố đô Huế & Miền Trung' 
  | 'Tây Nguyên đại ngàn' 
  | 'Nam Bộ & Đờn Ca Tài Tử' 
  | 'Vùng cao Tây Bắc & Đông Bắc' 
  | 'Văn hóa Chăm Duyên hải';

export interface PentatonicNote {
  name: string;        // e.g., "Hò", "Xự", "Xang", "Xê", "Cống", "Phan", "Líu"
  westernNote: string; // e.g., "C4", "D4", "F4", "G4", "A4", "C5"
  frequency: number;   // Hz
  vietnameseSolfege: string;
}

export interface TraditionalMelody {
  id: string;
  title: string;
  region: string;
  description: string;
  notes: { noteIndex: number; duration: number }[]; // noteIndex in scale, duration in seconds
}

export interface InstrumentData {
  id: string;
  name: string;
  otherNames?: string[];
  ethnicGroup: string;
  family: InstrumentFamily;
  culturalRegion: CulturalRegion;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  soundPreset: 'dan_bau' | 'dan_tranh' | 'dan_nguyet' | 'dan_day' | 'dan_nhi' | 'sao_truc' | 'trung' | 'klong_put' | 'cong_chieng' | 'trong_dong' | 'trong_com' | 'dan_tinh' | 'khen_mong';
  structure: string[];
  materials: string[];
  originHistory: string;
  playingTechnique: string[];
  associatedGenres: string[];
  famousPieces: string[];
  unescoHeritage?: string;
  culturalSignificance: string;
  funFact: string;
  pentatonicScale: PentatonicNote[];
  recommendedMelodies?: TraditionalMelody[];
  keyDifferences?: { [comparedInstrumentId: string]: string };
}

export interface IdentificationResult {
  /** Cho biết hệ thống có đủ căn cứ tin cậy để nhận diện hay không */
  canIdentify: boolean;

  /** Thông báo trạng thái cho người dùng */
  statusMessage?: string;

  /** Lý do cụ thể nếu hình ảnh không rõ ràng hoặc không đủ căn cứ */
  unclearReason?: string;

  /** Hướng dẫn chụp lại ảnh để có kết quả chính xác hơn */
  suggestions?: string;

  /** Danh sách các nhạc cụ có khả năng tương đồng (khi nghi vấn) */
  possibleCandidates?: { name: string; likelihood: string; reason: string }[];

  /** Có khớp với cơ sở dữ liệu nhạc cụ chuẩn của hệ thống hay không */
  isMatchedWithDatabase?: boolean;

  /** Dữ liệu nhạc cụ chuẩn được đối chiếu từ kho lưu trữ */
  matchedRecord?: any;

  isVietnameseInstrument: boolean;
  instrumentName: string;
  otherNames?: string;
  ethnicGroup: string;
  family: string;
  confidence: number;
  summary: string;
  features: string[];
  structure: string;
  materials: string;
  originHistory: string;
  culturalRegion: string;
  playingTechnique: string;
  associatedGenres: string[];
  famousPieces: string[];
  unescoHeritage?: string;
  culturalSignificance?: string;
  funFact?: string;
  audioPreset?: string;
  references?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  clueType: 'text' | 'sound' | 'riddle';
  soundPreset?: 'dan_bau' | 'dan_tranh' | 'dan_nguyet' | 'sao_truc' | 'trung' | 'cong_chieng' | 'trong_dong';
  options: string[];
  correctIndex: number;
  explanation: string;
  instrumentId?: string;
}
