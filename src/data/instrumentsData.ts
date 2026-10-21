import { InstrumentData, QuizQuestion } from '../types/instruments';
import vietnameseInstrumentsJson from './vietnamese_instruments.json';
import { VietnameseInstrumentRecord } from '../types/instrumentDataModel';

export const STANDARDIZED_INSTRUMENTS_DATA: VietnameseInstrumentRecord[] = vietnameseInstrumentsJson as VietnameseInstrumentRecord[];

/**
 * Hàm hỗ trợ tải xuống tệp dữ liệu mẫu vietnamese_instruments.json
 */
export function downloadInstrumentsJsonFile() {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(vietnameseInstrumentsJson, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', 'vietnamese_instruments.json');
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export const PENTATONIC_BASE_SCALE = [
  { name: 'Hò', westernNote: 'C4', frequency: 261.63, vietnameseSolfege: 'Hò' },
  { name: 'Xự', westernNote: 'D4', frequency: 293.66, vietnameseSolfege: 'Xự' },
  { name: 'Xang', westernNote: 'F4', frequency: 349.23, vietnameseSolfege: 'Xang' },
  { name: 'Xê', westernNote: 'G4', frequency: 392.00, vietnameseSolfege: 'Xê' },
  { name: 'Cống', westernNote: 'A4', frequency: 440.00, vietnameseSolfege: 'Cống' },
  { name: 'Phan', westernNote: 'C5', frequency: 523.25, vietnameseSolfege: 'Phan' },
  { name: 'Líu', westernNote: 'D5', frequency: 587.33, vietnameseSolfege: 'Líu' },
];

export const VIETNAMESE_INSTRUMENTS: InstrumentData[] = [
  {
    id: 'dan-bau',
    name: 'Đàn Bầu',
    otherNames: ['Độc Huyền Cầm'],
    ethnicGroup: 'Kinh (Việt)',
    family: 'Họ Dây (Dây gảy)',
    culturalRegion: 'Đồng bằng Bắc Bộ',
    summary: 'Biểu tượng linh hồn âm nhạc dân tộc Việt Nam với duy nhất một dây đàn, phát ra thanh âm từ các điểm bồi âm kết hợp cần rung uốn lượn như giọng nói ru hời.',
    imageUrl: '/assets/images/dan_bau.jpg',
    imageAlt: 'Đàn Bầu truyền thống Việt Nam',
    soundPreset: 'dan_bau',
    structure: [
      'Thân đàn hình hộp dài khoảng 105 - 120cm, mặt đàn vồng lên làm bằng gỗ ngô đồng nhẹ xốp.',
      'Cần đàn (vòi đàn) làm bằng sừng trâu hoặc thân tre già dẻo dai, cắm ở đầu đàn để uốn luyến cao độ.',
      'Bầu đàn: Quả bầu khô hoặc tiện gỗ hình quả bầu hồ lô bao bọc chân cần đàn, vừa trang trí vừa tăng độ cộng hưởng.',
      'Duy nhất 1 dây đàn kim loại căng từ đầu cần đàn đến trục lên dây phía đuôi.'
    ],
    materials: [
      'Gỗ ngô đồng xốp nhẹ làm mặt đàn',
      'Gỗ gụ, mun, trắc làm thành và đáy đàn',
      'Sừng trâu dẻo làm vòi đàn',
      'Vỏ bầu khô / gỗ tiện hình hồ lô'
    ],
    originHistory: 'Đàn Bầu xuất hiện từ thế kỷ 18 hoặc sớm hơn trong các tích chèo cổ và hát xẩm dân gian. Nhạc cụ này hoàn toàn thuần Việt, độc nhất vô nhị trên thế giới khi chỉ gảy bồi âm chứ không bấm phím.',
    playingTechnique: [
      'Gảy bằng que gảy ngắn cầm tay phải, cạnh bàn tay chạm nhẹ vào các điểm nút bồi âm (1/2, 1/3, 1/4 dây).',
      'Tay trái cầm cần đàn uốn tới (trầm xuống) hoặc kéo lui (cao lên), rung, nhấn, vuốt, chẹt tạo thanh âm uyển chuyển như tiếng khóc, tiếng cười.'
    ],
    associatedGenres: ['Hát Xẩm', 'Chèo cổ', 'Hát Chầu Văn', 'Dàn nhạc Dân tộc Đương đại', 'Độc tấu Cổ truyền'],
    famousPieces: ['Ru Con Nam Bộ', 'Lòng Mẹ', 'Cung Đàn Đất Nước', 'Qua Cầu Gió Bay', 'Vọng Cổ'],
    unescoHeritage: 'Là nhạc cụ tiêu biểu trong nhiều hồ sơ Di sản Văn hóa Phi vật thể của Việt Nam.',
    culturalSignificance: 'Câu ca dao lưu truyền: "Đàn Bầu ai gảy nấy nghe / Làm thân con gái chớ nghe đàn bầu" nói lên sức lay động, nỉ non đến thắt ruột của tiếng đàn.',
    funFact: 'Dù chỉ có 1 dây duy nhất, Đàn Bầu có thể diễn tấu trọn vẹn mọi cao độ vô cấp nhờ kỹ thuật uốn cần sừng linh hoạt.',
    pentatonicScale: PENTATONIC_BASE_SCALE,
    recommendedMelodies: [
      {
        id: 'ru-con',
        title: 'Làn điệu Ru Con',
        region: 'Đồng bằng Bắc Bộ',
        description: 'Giai điệu da diết, nồng nàn tình mẫu tử với kỹ thuật rung cần đàn sâu lắng.',
        notes: [
          { noteIndex: 0, duration: 0.8 },
          { noteIndex: 2, duration: 0.6 },
          { noteIndex: 3, duration: 0.9 },
          { noteIndex: 4, duration: 0.7 },
          { noteIndex: 3, duration: 0.9 },
          { noteIndex: 2, duration: 0.8 },
          { noteIndex: 0, duration: 1.4 },
        ]
      }
    ],
    keyDifferences: {
      'dan-day': 'Đàn Bầu chỉ có 1 dây và gảy bồi âm uốn cần; Đàn Đáy có 3 dây, cần rất dài và phím bấm cao.'
    }
  },
  {
    id: 'dan-tranh',
    name: 'Đàn Tranh',
    otherNames: ['Thập Lục Cầm'],
    ethnicGroup: 'Kinh (Việt)',
    family: 'Họ Dây (Dây gảy)',
    culturalRegion: 'Cố đô Huế & Miền Trung',
    summary: 'Nhạc cụ dây gảy với 16 đến 19 dây kim loại qua các con nhạn chữ V, âm sắc trong trẻo, lấp lánh như giọt sương rơi trên mặt hồ.',
    imageUrl: '/assets/images/dan_tranh.jpg',
    imageAlt: 'Đàn Tranh Thập Lục Cầm',
    soundPreset: 'dan_tranh',
    structure: [
      'Thân đàn hình hộp dài thuôn nhọn (khoảng 110 - 120cm), mặt cong vồng nhẹ.',
      'Hàng ngựa đàn hình chữ V (con nhạn) bằng gỗ nâng đỡ từng dây và có thể dịch chuyển để chỉnh cao độ.',
      'Cầu đàn và trục lên dây ở đầu hẹp, mộng cắm dây ở đầu rộng.',
      'Có từ 16 đến 19 dây (hiện đại có thể đến 21, 22 dây).'
    ],
    materials: [
      'Mặt đàn gỗ ngô đồng phơi khô tự nhiên',
      'Thành đàn gỗ gụ hoặc cẩm lai khảm xà cừ',
      'Con nhạn bằng gỗ trắc, mun hoặc xương',
      'Dây đàn bằng thép không gỉ mạ đồng hoặc tơ tằm cổ xưa'
    ],
    originHistory: 'Đàn Tranh có mặt trong dàn nhạc cung đình và dân gian từ thời nhà Trần. Ban đầu có 16 dây nên gọi là Thập Lục Cầm, sau này phát triển thêm số dây đáp ứng âm vực phong phú.',
    playingTechnique: [
      'Tay phải đeo móng gảy (đồi mồi hoặc kim loại) để gảy, móc, vỗ, rải ngón (arpeggio).',
      'Tay trái dùng các đầu ngón nhấn, rung, nhún, vò trên dây phía bên kia con nhạn để tạo luyến láy vi tế.'
    ],
    associatedGenres: ['Nhã Nhạc Cung Đình Huế', 'Đờn Ca Tài Tử Nam Bộ', 'Ca Huế', 'Dàn nhạc Dân tộc tổng hợp'],
    famousPieces: ['Lưu Thủy Kim Tiền', 'Xuân Phong Long Hổ', 'Tứ Đại Oán', 'Dạ Cổ Hoài Lang'],
    unescoHeritage: 'Tham gia trong Nhã Nhạc Cung Đình Huế và Nghệ thuật Đờn Ca Tài Tử (UNESCO công nhận di sản thế giới).',
    culturalSignificance: 'Gắn liền với hình ảnh tao nhã của giai nhân và văn nhân cổ kim, biểu trưng cho sự thanh cao, tinh tế.',
    funFact: 'Con nhạn đỡ dây đàn có thể trượt tự do trên mặt đàn để điều chỉnh âm điệu Bắc (vui tươi) hoặc điệu Nam (buồn, sâu lắng).',
    pentatonicScale: PENTATONIC_BASE_SCALE,
    recommendedMelodies: [
      {
        id: 'luu-thuy',
        title: 'Lưu Thủy Kim Tiền',
        region: 'Cung đình Huế',
        description: 'Bản nhạc cung đình rộn rã, uyển chuyển như dòng nước trôi êm đềm.',
        notes: [
          { noteIndex: 0, duration: 0.4 },
          { noteIndex: 1, duration: 0.4 },
          { noteIndex: 2, duration: 0.4 },
          { noteIndex: 3, duration: 0.4 },
          { noteIndex: 4, duration: 0.4 },
          { noteIndex: 3, duration: 0.4 },
          { noteIndex: 2, duration: 0.4 },
          { noteIndex: 1, duration: 0.4 },
          { noteIndex: 0, duration: 0.8 },
        ]
      }
    ],
    keyDifferences: {
      'dan-nguyet': 'Đàn Tranh có nhiều dây (16-19 dây) và hàng con nhạn trượt; Đàn Nguyệt chỉ có 2 dây và cần tròn.'
    }
  },
  {
    id: 'dan-nguyet',
    name: 'Đàn Nguyệt',
    otherNames: ['Đàn Kìm', 'Quân Tử Cầm'],
    ethnicGroup: 'Kinh (Việt)',
    family: 'Họ Dây (Dây gảy)',
    culturalRegion: 'Nam Bộ & Đờn Ca Tài Tử',
    summary: 'Vua của các nhạc cụ gảy trong đờn ca tài tử và chầu văn, thùng đàn tròn tựa vầng trăng rằm, âm thanh vang lảnh, dứt khoát và biến hóa vô cùng.',
    imageUrl: '/assets/images/dan_nguyet.jpg',
    imageAlt: 'Đàn Nguyệt Đàn Kìm Việt Nam',
    soundPreset: 'dan_nguyet',
    structure: [
      'Thùng đàn hình tròn dẹt như mặt trăng tròn đường kính khoảng 36 - 40cm.',
      'Cần đàn dài thanh mảnh (khoảng 80 - 100cm) gắn từ 8 đến 10 phím bấm rất cao.',
      'Đầu đàn uốn cong gắn 4 trục lên dây (nhưng mắc 2 dây tơ hoặc nilon).',
      'Dây đàn mắc khá chùng để ngón tay có thể nhấn sâu giữa các phím tạo âm ngân.'
    ],
    materials: [
      'Mặt và đáy đàn bằng gỗ ngô đồng xốp nhẹ',
      'Thành đàn tròn bằng gỗ trắc, cẩm lai, hương',
      'Cần đàn gỗ mun hoặc gỗ cẩm bền chắc',
      'Phím đàn bằng tre già hoặc xương gắn xi'
    ],
    originHistory: 'Đàn Nguyệt du nhập và Việt hóa sâu sắc từ nhiều thế kỷ trước, trở thành thủ lĩnh trong dàn nhạc Đờn Ca Tài Tử Nam Bộ và linh hồn trong Hát Văn Bắc Bộ.',
    playingTechnique: [
      'Tay phải gảy bằng móng gảy nhựa/sừng với kĩ thuật vê ngón, gảy ngắt, đánh chập.',
      'Tay trái bấm phím kết hợp nhấn sâu, vuốt, rung, tạo các vi âm nồng nàn cảm xúc.'
    ],
    associatedGenres: ['Đờn Ca Tài Tử Nam Bộ', 'Hát Chầu Văn', 'Hát Chèo', 'Cải Lương', 'Hát Bội'],
    famousPieces: ['Dạ Cổ Hoài Lang', 'Bình Bán Vắn', 'Phú Lục', 'Văn Cô Bơ', 'Kim Tiền'],
    unescoHeritage: 'Nhạc cụ trung tâm trong Di sản Văn hóa Phi vật thể UNESCO Đờn Ca Tài Tử Nam Bộ.',
    culturalSignificance: 'Ở Nam Bộ gọi là "Đàn Kìm" vì có khả năng "kìm giữ", dẫn dắt toàn bộ dàn nhạc giữ đúng nhịp và tinh thần bài bản.',
    funFact: 'Phím đàn Nguyệt được gắn cao vượt trội so với cần đàn, cho phép người chơi ấn ngón tay lún xuống sâu để bẻ nốt lên cao cả quãng ba.',
    pentatonicScale: PENTATONIC_BASE_SCALE,
    recommendedMelodies: [
      {
        id: 'da-co-hoai-lang',
        title: 'Dạ Cổ Hoài Lang',
        region: 'Nam Bộ',
        description: 'Khúc ca vọng cổ bất hủ của cố nhạc sĩ Cao Văn Lầu, đậm chất oán thương hoài niệm.',
        notes: [
          { noteIndex: 4, duration: 0.5 },
          { noteIndex: 3, duration: 0.5 },
          { noteIndex: 2, duration: 0.7 },
          { noteIndex: 1, duration: 0.5 },
          { noteIndex: 0, duration: 0.9 },
          { noteIndex: 1, duration: 0.5 },
          { noteIndex: 2, duration: 1.1 },
        ]
      }
    ]
  },
  {
    id: 'dan-day',
    name: 'Đàn Đáy',
    otherNames: ['Vô Đề Cầm'],
    ethnicGroup: 'Kinh (Việt)',
    family: 'Họ Dây (Dây gảy)',
    culturalRegion: 'Đồng bằng Bắc Bộ',
    summary: 'Nhạc cụ độc nhất vô nhị chỉ tồn tại ở Việt Nam, cây đàn linh hồn của nghệ thuật Ca Trù với cần đàn dài kỷ lục và âm sắc trầm đục, kín đáo.',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Đàn Đáy Ca Trù',
    soundPreset: 'dan_day',
    structure: [
      'Thân đàn hình thang đáy lớn ở dưới, đáy nhỏ ở trên, đặc biệt thành đàn hở một khoảng ở đáy.',
      'Cần đàn cực kỳ dài (khoảng 110 - 130cm), thẳng tắp với 10-12 phím tre cao.',
      'Có 3 dây đàn bằng tơ tằm hoặc cước, mắc từ trục đàn xuống ngựa đàn.',
      'Mặt đàn gỗ ngô đồng, không có lỗ thoát âm ở mặt trước.'
    ],
    materials: [
      'Gỗ ngô đồng làm mặt đàn',
      'Gỗ dổi, trắc, mun làm cần đàn và thành đàn',
      'Tre già làm phím đàn cao vút',
      'Dây tơ tằm truyền thống'
    ],
    originHistory: 'Đàn Đáy xuất hiện từ thời nhà Lê (thế kỷ 15) và được người Việt sáng tạo độc lập, không hề có nguyên mẫu ở bất kỳ quốc gia nào trên thế giới.',
    playingTechnique: [
      'Kép đàn (người nam đánh đàn đáy) ngồi xếp bằng, gảy bằng móng gảy tre hoặc nhựa.',
      'Kỹ thuật ngón gảy: vê, mổ, vỗ, bấm chẹt cần đàn tạo tiếng "tinh, tang, tình" hòa quyện nhịp phách của đào nương.'
    ],
    associatedGenres: ['Nghệ thuật Ca Trù', 'Hát Ả Đào', 'Hát Cửa Đình'],
    famousPieces: ['Gửi Thư', 'Hát Nói', 'Thét Nhạc', 'Tỳ Bà Hành'],
    unescoHeritage: 'Di sản Văn hóa Phi vật thể cần được bảo vệ khẩn cấp của UNESCO (Nghệ thuật Ca Trù).',
    culturalSignificance: 'Biểu tượng của tầng lớp văn nhân trí thức Thăng Long xưa; âm thanh của sự tĩnh tại, sâu thẳm nội tâm.',
    funFact: 'Thành đàn phía dưới để hở một khoảng trống đáy thùng, vì thế mới có tên gọi là "Đàn Đáy" (hoặc do không có đáy kín).',
    pentatonicScale: PENTATONIC_BASE_SCALE
  },
  {
    id: 'dan-nhi',
    name: 'Đàn Nhị',
    otherNames: ['Đàn Cò'],
    ethnicGroup: 'Kinh và nhiều dân tộc anh em',
    family: 'Họ Dây (Dây kéo)',
    culturalRegion: 'Đồng bằng Bắc Bộ',
    summary: 'Cây đàn 2 dây dùng vĩ kéo, bầu đàn bịt da trăn, có khả năng diễn cảm phong phú từ ai oán nức nở đến hân hoan rộn rã.',
    imageUrl: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Đàn Nhị Đàn Cò Việt Nam',
    soundPreset: 'dan_nhi',
    structure: [
      'Ống nhị (bát nhị): Thùng cộng hưởng hình ống tròn hoặc bát giác bịt da trăn hoặc da rắn.',
      'Cần nhị: Cột gỗ thẳng đứng cắm xuyên qua ống nhị, phía trên có 2 trục vặn dây.',
      'Hai dây đàn (dây kim loại hoặc tơ), dây lớn trầm hơn dây nhỏ một quãng năm.',
      'Cung vĩ luồn cố định giữa hai dây đàn, làm bằng lông đuôi ngựa hoặc sợi cước.'
    ],
    materials: [
      'Da trăn hoặc da kỳ đà bịt mặt loa kèn',
      'Gỗ mun, trắc, cẩm lai làm cần và ống đàn',
      'Lông đuôi ngựa thật làm cung vĩ',
      'Cục nhựa thông (colophane) xoa vĩ tạo ma sát'
    ],
    originHistory: 'Đàn Nhị có lịch sử lâu đời gắn bó mật thiết trong âm nhạc dân gian từ chèo, tuồng, cải lương đến nhạc tang lễ và hòa tấu.',
    playingTechnique: [
      'Cầm dọc cần đàn tựa trên đùi, tay phải kéo đẩy cung vĩ cọ xát vào dây.',
      'Tay trái bấm dây bằng thịt đầu ngón (không có phím), vuốt, rung, miết tạo luyến láy như tiếng người than thở.'
    ],
    associatedGenres: ['Hát Chèo', 'Hát Tuồng', 'Cải Lương', 'Nhạc Đám Ma', 'Nhã Nhạc Cung Đình'],
    famousPieces: ['Lưu Thủy Đoản', 'Dạ Bán Kê Minh', 'Kể Chuyện Ngày Mùa', 'Xuân Quê Hương'],
    unescoHeritage: 'Góp mặt trong Nhã Nhạc Cung Đình Huế và Đờn Ca Tài Tử Nam Bộ.',
    culturalSignificance: 'Tiếng đàn nỉ non như tâm sự con người, là linh hồn trong dàn nhạc sân khấu kịch hát truyền thống Việt Nam.',
    funFact: 'Cung vĩ được luồn vĩnh viễn nằm kẹp giữa 2 dây đàn, người chơi không thể tháo rời vĩ ra ngoài như đàn Violin phương Tây.',
    pentatonicScale: PENTATONIC_BASE_SCALE
  },
  {
    id: 'sao-truc',
    name: 'Sáo Trúc & Tiêu',
    otherNames: ['Địch', 'Sáo ngang', 'Động tiêu'],
    ethnicGroup: 'Kinh và 53 dân tộc anh em',
    family: 'Họ Hơi',
    culturalRegion: 'Đồng bằng Bắc Bộ',
    summary: 'Nhạc cụ hơi bằng ống tre nứa thanh tao, mang trọn âm hưởng thanh bình của đồng quê sông nước Việt Nam.',
    imageUrl: '/assets/images/sao_truc.jpg',
    imageAlt: 'Sáo Trúc Việt Nam',
    soundPreset: 'sao_truc',
    structure: [
      'Ống trúc hoặc nứa thẳng, nhẵn lòng trong dài khoảng 40 - 55cm.',
      'Lỗ thổi (lỗ oval) khoét ở một đầu bịt màng chặn.',
      '6 lỗ bấm chính thẳng hàng (loại cải tiến có 10 lỗ bấm).',
      'Lỗ định âm và lỗ treo dây trang trí ở đuôi sáo.'
    ],
    materials: [
      'Trúc hun khói vùng Gia Bình (Bắc Ninh) hoặc nứa già Tây Bắc',
      'Màng chặn bằng màng lòng vỏ nứa hoặc nút bấc bọc nhung'
    ],
    originHistory: 'Gắn liền với nền văn minh lúa nước từ hàng ngàn năm trước; hình ảnh chú bé chăn trâu thổi sáo đã trở thành biểu tượng thi ca Việt Nam.',
    playingTechnique: [
      'Mím môi thổi luồng hơi sắc bén cắt qua mép lỗ thổi (embouchure).',
      'Kỹ thuật ngón: vuốt, rung hơi (vibrato bụng), đánh lưỡi đơn/kép (staccato), rung ngón, lướt nốt nhanh.'
    ],
    associatedGenres: ['Dân ca Quan họ Bắc Ninh', 'Hát Chèo', 'Độc tấu Ca cảnh Dân gian', 'Nhạc thính phòng dân tộc'],
    famousPieces: ['Tiếng Gọi Mùa Xuân', 'Trên Đường Quê', 'Anh Vẫn Hành Quân', 'Cánh Chim Tự Do'],
    culturalSignificance: 'Biểu trưng cho tâm hồn thanh thoát, mộc mạc, gần gũi với thiên nhiên sông núi của người Việt.',
    funFact: 'Người nghệ nhân làm sáo phải tìm những ống nứa dày dặn, phơi sương phơi nắng hàng năm trời để đạt âm sắc ấm và chuẩn cao độ.',
    pentatonicScale: PENTATONIC_BASE_SCALE,
    recommendedMelodies: [
      {
        id: 'di-cay',
        title: 'Đi Cấy (Dân ca Thanh Hóa)',
        region: 'Đồng bằng Bắc Bộ',
        description: 'Làn điệu dân ca tươi vui rộn ràng của người nông dân ra đồng ngày mùa.',
        notes: [
          { noteIndex: 0, duration: 0.35 },
          { noteIndex: 1, duration: 0.35 },
          { noteIndex: 2, duration: 0.35 },
          { noteIndex: 3, duration: 0.5 },
          { noteIndex: 2, duration: 0.35 },
          { noteIndex: 1, duration: 0.35 },
          { noteIndex: 0, duration: 0.7 },
        ]
      }
    ]
  },
  {
    id: 'dan-trung',
    name: "Đàn T'rưng",
    otherNames: ['Tơ-rưng'],
    ethnicGroup: 'Ba Na, Gia Rai, Xơ Đăng, Giẻ Triêng',
    family: 'Họ Gõ (Tự thân vang)',
    culturalRegion: 'Tây Nguyên đại ngàn',
    summary: 'Dàn ống nứa kỳ diệu của núi rừng Tây Nguyên, phát ra chuỗi âm thanh lách cách rộn ràng như dòng suối reo, thác đổ hay tiếng chim hót giữa đại ngàn.',
    imageUrl: '/assets/images/dan_trung.jpg',
    imageAlt: "Đàn T'rưng Tây Nguyên",
    soundPreset: 'trung',
    structure: [
      'Gồm 12 đến 16 ống nứa dài ngắn khác nhau vạt xéo một đầu, xếp theo thứ tự cao độ.',
      'Các ống được xâu lại với nhau bằng dây gai hoặc dây dù thành một chuỗi thang âm.',
      'Giá đỡ làm bằng cọc tre dựng trên sàn nhà rông hoặc có chân chống di động.',
      'Dùi gõ bằng que tre bọc đầu cao su hoặc bọc vải êm.'
    ],
    materials: [
      'Ống nứa già lồ ô Tây Nguyên phơi khô',
      'Dây thừng gai bền dẻo',
      'Gỗ tre rừng làm khung đỡ'
    ],
    originHistory: 'Tồn tại từ thời tiền sử Tây Nguyên. Xưa kia đàn được treo trên nương rẫy mượn sức nước suối gõ để xua đuổi muông thú phá hoại mùa màng.',
    playingTechnique: [
      'Dùng hai dùi gõ vào giữa thân hoặc đầu vạt của từng ống nứa.',
      'Kỹ thuật gõ liên hồi (tremolo), gõ chập hai tay, gõ rải âm điệu rộn ràng ngập tràn sức sống.'
    ],
    associatedGenres: ['Lễ hội Đâm trâu', 'Lễ Mừng Lúa Mới', 'Hòa tấu Dân tộc Tây Nguyên', 'Độc tấu Sân khấu'],
    famousPieces: ['Đi Săn', 'Mùa Hái Quả', 'Tiếng Đàn T\'rưng', 'Tây Nguyên Vào Hội'],
    culturalSignificance: 'Trước đây theo tập tục, T\'rưng chỉ được đánh trên nương rẫy, phụ nữ không được đánh trong nhà rông; nay đã trở thành sứ giả văn hóa Tây Nguyên vang danh quốc tế.',
    funFact: 'Khi gõ, luồng không khí bên trong ống rỗng dao động cộng hưởng tạo ra âm sắc vang giòn ròn rã không loại đàn gõ phương Tây nào có được.',
    pentatonicScale: PENTATONIC_BASE_SCALE,
    recommendedMelodies: [
      {
        id: 'tay-nguyen',
        title: 'Vui Mùa Tây Nguyên',
        region: 'Tây Nguyên',
        description: 'Tiếng suối reo và bước chân trẩy hội mừng mùa màng no ấm của đồng bào Ba Na, Gia Rai.',
        notes: [
          { noteIndex: 0, duration: 0.25 },
          { noteIndex: 2, duration: 0.25 },
          { noteIndex: 4, duration: 0.35 },
          { noteIndex: 3, duration: 0.25 },
          { noteIndex: 1, duration: 0.25 },
          { noteIndex: 2, duration: 0.5 },
        ]
      }
    ]
  },
  {
    id: 'klong-put',
    name: "K'lông Pút",
    otherNames: ['K\'long Pút', 'Đinh Pút'],
    ethnicGroup: 'Xơ Đăng, Ba Na, Gia Rai',
    family: 'Họ Hơi',
    culturalRegion: 'Tây Nguyên đại ngàn',
    summary: 'Nhạc cụ vô cùng độc đáo của phụ nữ Tây Nguyên: người biểu diễn không hề chạm tay vào nhạc cụ mà vỗ hai bàn tay tạo luồng khí ép vào miệng ống nứa để phát ra âm thanh trầm bổng.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    imageAlt: "Nhạc cụ K'lông Pút Tây Nguyên",
    soundPreset: 'klong_put',
    structure: [
      'Bộ gồm 7 đến 12 ống tre nứa rỗng ruột có kích thước khác nhau từ lớn đến nhỏ.',
      'Các ống được đặt nằm ngang trên giá tre hoặc trên mỏm đá thiên nhiên.',
      'Đầu ống để hở hướng về phía người diễn tấu.'
    ],
    materials: ['Tre nứa già rừng nguyên sinh, được vạt đầu phẳng nhẵn.'],
    originHistory: 'Gắn liền với tín ngưỡng Nữ thần Lúa (Mẹ Lúa). Phụ nữ Tây Nguyên tin rằng tiếng vỗ K\'lông Pút đánh thức hạt lúa nảy mầm và nuôi dưỡng mùa màng xanh tốt.',
    playingTechnique: [
      'Người chơi khum hai lòng bàn tay lại và vỗ mạnh cách miệng ống tre chừng 10cm.',
      'Luồng khí nén bất ngờ thổi vào ống làm cột không khí bên trong dao động phát ra âm thanh như tiếng thở dài của đất trời.'
    ],
    associatedGenres: ['Lễ Mừng Lúa Mới', 'Lễ Đâm Trâu', 'Dân ca Tây Nguyên'],
    famousPieces: ['Tiếng Vỗ Mừng Lúa', 'Hát Ru Mẹ Lúa', 'Hương Rừng'],
    culturalSignificance: 'Chỉ riêng phụ nữ mới được chơi K\'lông Pút trong các nghi lễ nông nghiệp thiêng liêng, biểu trưng cho sự sinh sôi nảy nở.',
    funFact: 'Đây là một trong những nhạc cụ hiếm hoi nhất hành tinh phát ra âm thanh hoàn toàn bằng sức ép không khí gián tiếp từ bàn tay mà không chạm vào vật thể.',
    pentatonicScale: PENTATONIC_BASE_SCALE
  },
  {
    id: 'cong-chieng',
    name: 'Cồng Chiêng Tây Nguyên',
    otherNames: ['Chiêng tha', 'Chiêng knah'],
    ethnicGroup: 'Gia Rai, Ba Na, Ê Đê, M’Nông, K’Ho, Xơ Đăng',
    family: 'Họ Gõ (Tự thân vang)',
    culturalRegion: 'Tây Nguyên đại ngàn',
    summary: 'Kiệt tác Di sản Văn hóa Phi vật thể Thế giới của nhân loại do UNESCO vinh danh; âm thanh của cồng chiêng là sợi dây kết nối thần linh, cộng đồng và vũ trụ.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Gong_from_northern_Vietnam_%28500_BCE_-_300_CE%29.jpg/960px-Gong_from_northern_Vietnam_%28500_BCE_-_300_CE%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
    imageAlt: 'Cồng Chiêng Tây Nguyên di sản UNESCO',
    soundPreset: 'cong_chieng',
    structure: [
      'Cồng: Loại có núm lồi tròn ở giữa, âm trầm sâu, ấm và có tính định âm rõ rệt.',
      'Chiêng: Loại bằng phẳng không có núm, âm thanh ngân vang bổng, âm sắc sắc bén lấp lánh.',
      'Một bộ cồng chiêng đầy đủ có từ 2-3 chiếc (bộ sơ khai) đến 12-24 chiếc xếp thành dàn thang âm phong phú.'
    ],
    materials: [
      'Đồng thau pha thiếc và vàng/bạc non theo bí quyết đúc cổ truyền.',
      'Dùi gõ bằng gỗ mềm hoặc dùi bọc da/vải.'
    ],
    originHistory: 'Có lịch sử hàng ngàn năm bắt nguồn từ thời đồ đồng Đông Sơn - Sa Huỳnh, cồng chiêng là tài sản quý giá nhất trong gia đình mẫu hệ Tây Nguyên (tương đương nhiều con trâu, voi).',
    playingTechnique: [
      'Đánh bằng dùi hoặc dùng nắm tay đánh thẳng vào núm/mặt chiêng.',
      'Tay trái áp vào mặt trong chiêng để ngắt tiếng hoặc điều chỉnh âm sắc vang vọng.'
    ],
    associatedGenres: ['Lễ Bỏ Mả (Pơthi)', 'Lễ Mừng Nhà Rông Mới', 'Hội Đua Voi', 'Không gian Văn hóa Cồng Chiêng'],
    famousPieces: ['Đón Khách', 'Mừng Chiến Thắng', 'Tiễn Đưa Người Quá Cố'],
    unescoHeritage: 'Được UNESCO công nhận là Kiệt tác Truyền khẩu và Di sản Phi vật thể Nhân loại năm 2005.',
    culturalSignificance: 'Mỗi chiếc cồng chiêng đều có một vị thần (Yàng) ngự trị; tiếng chiêng vang lên là tiếng lòng của con người gửi tới tổ tiên và thần thánh.',
    funFact: 'Người thợ chỉnh chiêng (Po Kơ Kông) phải có đôi tai siêu phàm, dùng búa gõ nhẹ vào từng thớ kim loại để tinh chỉnh cao độ chuẩn xác mà không cần bất kỳ máy đo nào.',
    pentatonicScale: PENTATONIC_BASE_SCALE,
    recommendedMelodies: [
      {
        id: 'cong-chieng-hoi',
        title: 'Nhịp Điệu Lễ Hội Tây Nguyên',
        region: 'Tây Nguyên',
        description: 'Âm vang đồng đanh rền rĩ, kết nối đất trời hùng vĩ.',
        notes: [
          { noteIndex: 0, duration: 0.9 },
          { noteIndex: 3, duration: 0.9 },
          { noteIndex: 0, duration: 0.6 },
          { noteIndex: 4, duration: 1.2 },
        ]
      }
    ]
  },
  {
    id: 'dan-tinh',
    name: 'Đàn Tính',
    otherNames: ['Tính Tẩu'],
    ethnicGroup: 'Tày, Nùng, Thái',
    family: 'Họ Dây (Dây gảy)',
    culturalRegion: 'Vùng cao Tây Bắc & Đông Bắc',
    summary: 'Linh hồn của nghệ thuật Hát Then, bầu đàn làm bằng quả bầu già, cần đàn bằng gỗ dâu thanh mảnh, tiếng đàn như nước suối reo ru lòng người vùng cao.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Đàn Tính Tính Tẩu Hát Then',
    soundPreset: 'dan_tinh',
    structure: [
      'Bầu đàn làm bằng nửa quả bầu già phơi khô, đường kính chừng 20-25cm, mặt bịt gỗ thông hoặc ngô đồng.',
      'Cần đàn dài khoảng 90cm bằng gỗ dâu rừng, vót tròn thanh thoát.',
      'Có từ 2 đến 3 dây đàn bằng tơ tằm vuốt sáp ong hoặc dây cước.',
      'Đầu cần đàn chạm khắc hình búp sen hoặc cánh chim phượng uyển chuyển.'
    ],
    materials: [
      'Quả bầu già tròn đều phơi khô',
      'Gỗ dâu rừng làm cần đàn',
      'Gỗ thông nhẹ xốp làm mặt đàn',
      'Tơ tằm vuốt sáp làm dây đàn'
    ],
    originHistory: 'Đàn Tính gắn liền với truyền thuyết thần Then ban cho con người cây đàn để giải tỏa ưu phiền và cầu mong mùa màng tốt tươi.',
    playingTechnique: [
      'Gảy bằng ngón trỏ tay phải (có móng gảy ngắn), tay trái bấm dây tự do trên cần đàn không có phím.',
      'Vừa đàn vừa hát Then và lắc chùm chuông chùm (xóc nhạc) nơi chân.'
    ],
    associatedGenres: ['Nghi lễ Hát Then', 'Lễ Cầu An', 'Lễ Kỳ Yên', 'Lễ Lẩu Then'],
    famousPieces: ['Đường Đi Lên Trời', 'Khúc Hát Hoa Rừng', 'Mùa Then'],
    unescoHeritage: 'Thực hành Then của người Tày, Nùng, Thái được UNESCO công nhận là Di sản Văn hóa Phi vật thể Thế giới năm 2019.',
    culturalSignificance: 'Cây đàn Tính là phương tiện giúp Thầy Then dẫn dắt các đoàn quân Then chu du lên cõi trời tấu thỉnh Phật và Ngọc Hoàng cầu phúc cho buôn bản.',
    funFact: '"Tính Tẩu" theo tiếng Thái: "Tính" là đàn, "Tẩu" là quả bầu. Người làm đàn phải chọn quả bầu già gõ kêu như đanh thì đàn mới ấm tiếng.',
    pentatonicScale: PENTATONIC_BASE_SCALE
  },
  {
    id: 'khen-mong',
    name: 'Khèn Mông',
    otherNames: ['Kềnh', 'Qeej'],
    ethnicGroup: 'H’Mông (Mông)',
    family: 'Họ Hơi',
    culturalRegion: 'Vùng cao Tây Bắc & Đông Bắc',
    summary: 'Nhạc cụ hơi đa âm độc đáo của chàng trai Mông; vừa thổi khèn vừa nhào lộn, múa khèn điêu luyện giữa non cao đá tai mèo trùng điệp.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Khèn Mông vùng cao Tây Bắc',
    soundPreset: 'khen_mong',
    structure: [
      'Gồm 6 ống trúc/nứa dài ngắn khác nhau cắm xuyên qua một bầu gỗ khoét rỗng.',
      'Mỗi ống trúc đều gắn một lam đồng (lưỡi gà mỏng) siêu nhạy bên trong bầu khèn.',
      'Bầu khèn bằng gỗ thông hoặc pơ mu có khoét lỗ thổi ở đầu nhỏ.',
      'Các đai niềng bằng vỏ cây hoặc kim loại giữ chặt chùm ống khèn.'
    ],
    materials: [
      'Gỗ pơ mu, thông đá làm bầu khèn',
      'Trúc đực già mọc trên vách đá',
      'Đồng thau dát mỏng tinh xảo làm lưỡi gà'
    ],
    originHistory: 'Khèn Mông gắn liền với đời sống tâm linh và tình duyên của người Mông. Tiếng khèn thay lời tự tình tỏ tình với bạn tình và dẫn lối người quá cố về với tổ tiên.',
    playingTechnique: [
      'Thổi và hít hơi liên tục (tuần hoàn hơi), âm thanh không bị gián đoạn.',
      'Người nghệ nhân vừa thổi vừa thực hiện các động tác vũ đạo phức tạp: xoay tròn, nhảy bật, lộn santo, quỳ gối.'
    ],
    associatedGenres: ['Lễ hội Gầu Tào', 'Tang ma người Mông', 'Tỏ tình mùa xuân (Chợ tình)'],
    famousPieces: ['Tiếng Khèn Gọi Bạn', 'Xuống Chợ Mùa Xuân', 'Bài Khèn Tiễn Mẹ'],
    culturalSignificance: 'Một chàng trai Mông chỉ thực sự trưởng thành và được các cô gái ngưỡng mộ khi biết thổi khèn và múa khèn giỏi.',
    funFact: 'Khèn Mông là nhạc cụ phát ra đa thanh (vừa có nốt trầm làm nền trì tục drone, vừa có giai điệu du dương réo rắt) bằng kỹ thuật thổi cả khi thở ra lẫn hít vào.',
    pentatonicScale: PENTATONIC_BASE_SCALE
  },
  {
    id: 'trong-dong',
    name: 'Trống Đồng Đông Sơn',
    otherNames: ['Trống Đồng Ngọc Lũ', 'Trống Đồng Sông Đà'],
    ethnicGroup: 'Tổ tiên Lạc Việt (Kinh)',
    family: 'Họ Gõ (Tự thân vang)',
    culturalRegion: 'Đồng bằng Bắc Bộ',
    summary: 'Đỉnh cao chói lọi của nền văn minh thời kỳ dựng nước Văn Lang - Âu Lạc, biểu tượng thiêng liêng quyền lực của thủ lĩnh và nghi lễ thờ cúng thần linh.',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Dong_Son_Bronze_Drum_04.jpg/960px-Dong_Son_Bronze_Drum_04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
    imageAlt: 'Trống Đồng Đông Sơn Ngọc Lũ',
    soundPreset: 'trong_dong',
    structure: [
      'Mặt trống tròn bằng phẳng, chính giữa đúc hình ngôi sao nhiều cánh (mặt trời) tỏa hào quang.',
      'Các vòng hoa văn đồng tâm trang trí chim Lạc, hươu sao, cảnh giã gạo, múa cờ, đua thuyền.',
      'Thân trống nở rộng ở phần tang, thon lại ở lưng và xòe ra ở chân.',
      'Quai trống đúc kép hình bện thừng chắc chắn.'
    ],
    materials: ['Hợp kim đồng thau pha chì và thiếc với tỷ lệ luyện kim đỉnh cao thời đại kim khí.'],
    originHistory: 'Có niên đại từ thế kỷ thứ 7 trước Công nguyên đến thế kỷ thứ 1 sau Công nguyên. Trống Ngọc Lũ và Hoàng Hạ là những báu vật khảo cổ học hàng đầu Đông Nam Á.',
    playingTechnique: [
      'Treo lên giá gỗ hoặc đặt vững trên bệ, dùng chày gỗ lớn bọc vải gõ vào tâm mặt trời hoặc các điểm xung quanh.',
      'Phát ra âm vang rền vang trầm hùng vang xa hàng chục dặm.'
    ],
    associatedGenres: ['Lễ Hội Đền Hùng', 'Nghi lễ Xuất quân', 'Lễ Cầu Mưa', 'Đại Lễ Quốc Gia'],
    famousPieces: ['Hùng Thiêng Sông Núi', 'Tiếng Trống Mê Linh', 'Hào Khí Đông A'],
    culturalSignificance: 'Biểu trưng cao nhất cho cội nguồn dựng nước của các Vua Hùng và khí phách bất khuất của dân tộc Việt Nam.',
    funFact: 'Hình ngôi sao ở tâm trống đồng phản ánh trình độ thiên văn học và tín ngưỡng sùng bái thần Mặt Trời của cư dân nông nghiệp lúa nước thuở sơ khai.',
    pentatonicScale: PENTATONIC_BASE_SCALE
  },
  {
    id: 'trong-com',
    name: 'Trống Cơm',
    otherNames: ['Phạn Cổ'],
    ethnicGroup: 'Kinh (Việt)',
    family: 'Họ Màng rung',
    culturalRegion: 'Đồng bằng Bắc Bộ',
    summary: 'Nhạc cụ màng gõ đặc biệt gắn cơm nếp chín vào tâm mặt da để hạ cao độ tạo âm thanh trầm ấm, ngọt ngào, gắn liền với bài dân ca quen thuộc.',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Trống Cơm Bắc Bộ',
    soundPreset: 'trong_com',
    structure: [
      'Thân trống bằng gỗ hình ống dài, phình ở giữa và thót lại ở hai đầu.',
      'Hai mặt trống bịt da trâu hoặc da bò, viền mép xỏ dây da kéo căng hai đầu.',
      'Dây đeo quàng qua vai để trống nằm ngang trước bụng.'
    ],
    materials: [
      'Gỗ mít hoặc gỗ dổi tiện tròn rỗng',
      'Da trâu nạo mỏng',
      'Cơm nếp nóng giã dẻo để gắn vào tâm mặt trống khi diễn tấu'
    ],
    originHistory: 'Xuất hiện từ thế kỷ 10 thời nhà Lý, ban đầu dùng trong cung đình và kịch hát truyền thống, sau đó lan tỏa mạnh mẽ vào dân ca Bắc Bộ.',
    playingTechnique: [
      'Đeo trước bụng, tay phải vỗ vào mặt gắn cơm (âm trầm "Tùm"), tay trái vỗ vào mặt không gắn cơm (âm cao "Tịch").'
    ],
    associatedGenres: ['Dân ca Đồng bằng Bắc Bộ', 'Hát Chèo', 'Tuồng Cổ', 'Hòa tấu Dân tộc'],
    famousPieces: ['Trống Cơm (Tình bằng có cái trống cơm)', 'Múa Trống Cơm'],
    culturalSignificance: 'Âm thanh "Tùm, Tịch" biểu trưng cho âm dương hài hòa, sự sum vầy no ấm của làng quê Việt Nam.',
    funFact: 'Nếu không gắn một nắm cơm nếp nhuyễn vào tâm mặt trống, âm thanh phát ra sẽ đanh chát; cơm nếp giúp hấp thu rung động bậc cao biến tiếng trống trở nên trầm ấm ngọt ngào lạ kỳ.',
    pentatonicScale: PENTATONIC_BASE_SCALE
  },
  {
    id: 'ken-saranai',
    name: 'Kèn Saranai & Trống Paranưng',
    otherNames: ['Kèn Saranai Chăm'],
    ethnicGroup: 'Chăm',
    family: 'Họ Hơi',
    culturalRegion: 'Văn hóa Chăm Duyên hải',
    summary: 'Bộ đôi nhạc cụ thiêng liêng huyền bí không thể thiếu trong lễ hội Katê của đồng bào Chăm, âm thanh réo rắt ma mị gợi nhớ các tòa tháp cổ rêu phong.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Kèn Saranai và Trống Paranưng Chăm',
    soundPreset: 'sao_truc',
    structure: [
      'Thân kèn bằng gỗ quý tiện hình thon tròn khoét 7 lỗ bấm.',
      'Loa kèn bằng gỗ hoặc đồng loe rộng.',
      'Đầu thổi gắn 4 dăm kèn làm bằng lá buông hoặc lá thốt nốt.',
      'Trống Paranưng: Trống một mặt bịt da dê, có đai căng dây mây.'
    ],
    materials: [
      'Gỗ mun, gỗ trắc lâu năm',
      'Đồng thau làm loa kèn',
      'Lá thốt nốt khô làm lưỡi gà'
    ],
    originHistory: 'Tồn tại qua hàng nghìn năm văn hóa Chămpa cổ kính, tượng trưng cho con người hoàn thiện (đầu, thân, chân) trong triết lý tâm linh Chăm.',
    playingTechnique: [
      'Thổi bằng kỹ thuật ém hơi tuần hoàn, hai má phồng to như quả bóng để âm thanh tuôn trào bất tận.'
    ],
    associatedGenres: ['Lễ Hội Katê', 'Lễ Rija Nưgar', 'Múa Chăm dưới chân tháp Po Klong Garai'],
    famousPieces: ['Âm Vang Tiếng Trống Ginăng', 'Múa Quạt Tháp Cổ', 'Vũ Khúc Siva'],
    culturalSignificance: 'Kèn Saranai tượng trưng cho phần đầu của thần linh, mang thông điệp từ trời giáng xuống cõi nhân gian.',
    funFact: 'Để thổi kèn Saranai, người nghệ nhân Chăm phải mất 3-5 năm rèn luyện kỹ thuật "thở vòng tròn" (vừa thổi hơi ra bằng miệng vừa hít oxy vào bằng mũi).',
    pentatonicScale: PENTATONIC_BASE_SCALE
  }
];

export const SAMPLE_TEST_PHOTOS = [
  {
    id: 'sample-dan-bau',
    title: 'Đàn Bầu (Cần uốn & Bầu hồ lô)',
    instrumentName: 'Đàn Bầu',
    category: 'Họ Dây gảy',
    thumbnail: '/assets/images/dan_bau.jpg',
    description: 'Ảnh chụp cận cảnh thân đàn bầu gỗ mun, vòi đàn sừng trâu và quả bầu hồ lô tự nhiên đặc trưng.'
  },
  {
    id: 'sample-dan-tranh',
    title: 'Đàn Tranh (16 nhạn chữ V)',
    instrumentName: 'Đàn Tranh',
    category: 'Họ Dây gảy',
    thumbnail: '/assets/images/dan_tranh.jpg',
    description: 'Ảnh dàn dây đàn tranh với các con nhạn chữ V rải đều trên mặt gỗ ngô đồng khảm xà cừ tinh xảo.'
  },
  {
    id: 'sample-dan-nguyet',
    title: 'Đàn Nguyệt (Thùng tròn trăng rằm)',
    instrumentName: 'Đàn Nguyệt',
    category: 'Họ Dây gảy',
    thumbnail: '/assets/images/dan_nguyet.jpg',
    description: 'Thùng đàn tròn như vầng trăng rằm, cần đàn cao và 2 dây tơ đặc trưng của nghệ nhân tài tử.'
  },
  {
    id: 'sample-trung',
    title: "Đàn T'rưng (Ống nứa Tây Nguyên)",
    instrumentName: "Đàn T'rưng",
    category: 'Họ Gõ tự thân vang',
    thumbnail: '/assets/images/dan_trung.jpg',
    description: 'Dàn ống nứa vạt xéo xếp so le trên khung tre bên không gian văn hóa cồng chiêng Tây Nguyên.'
  },
  {
    id: 'sample-sao-truc',
    title: 'Sáo Trúc (Thanh âm đồng quê)',
    instrumentName: 'Sáo Trúc & Tiêu',
    category: 'Họ Hơi',
    thumbnail: '/assets/images/sao_truc.jpg',
    description: 'Ống nứa vàng óng khoét các lỗ bấm cao độ tinh xảo cùng dây tua lụa truyền thống.'
  },
  {
    id: 'sample-trong-dong',
    title: 'Trống Đồng Đông Sơn (Mặt trời 14 tia)',
    instrumentName: 'Trống Đồng Đông Sơn',
    category: 'Họ Gõ tự thân vang',
    thumbnail: '/assets/images/trong_dong.jpg',
    description: 'Hoa văn chim Lạc, mặt trời tỏa ánh sáng và đoàn chiến binh trẩy hội văn hóa Đông Sơn thời đại Hùng Vương.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Nhạc cụ nào sau đây chỉ có duy nhất MỘT dây nhưng có thể diễn tấu trọn vẹn mọi cao độ nhờ kỹ thuật uốn cần đàn?',
    clueType: 'riddle',
    options: ['Đàn Đáy', 'Đàn Bầu (Độc Huyền Cầm)', 'Đàn Nguyệt', 'Đàn Nhị'],
    correctIndex: 1,
    explanation: 'Đàn Bầu chỉ có 1 dây kim loại duy nhất, phát ra âm thanh từ các điểm bồi âm kết hợp cần đàn bằng sừng dẻo dai uốn lượn biến đổi cao độ vi tế.',
    instrumentId: 'dan-bau'
  },
  {
    id: 2,
    question: 'Nhạc cụ nào của đồng bào Tây Nguyên mà người chơi KHÔNG hề chạm tay vào nhạc cụ mà vỗ hai bàn tay tạo luồng khí nén vào miệng ống?',
    clueType: 'text',
    options: ["K'lông Pút", "Đàn T'rưng", 'Đinh Năm', 'Cồng Chiêng'],
    correctIndex: 0,
    explanation: "K'lông Pút là nhạc cụ hơi độc nhất vô nhị: phụ nữ Tây Nguyên khum hai bàn tay vỗ cách miệng ống nứa khoảng 10cm để luồng khí nén làm cột không khí rung động.",
    instrumentId: 'klong-put'
  },
  {
    id: 3,
    question: 'Nghe âm thanh trong trẻo, réo rắt với hàng ngựa đàn chữ V (con nhạn) trượt trên mặt gỗ ngô đồng. Đây là nhạc cụ nào?',
    clueType: 'sound',
    soundPreset: 'dan_tranh',
    options: ['Đàn Tranh (Thập Lục Cầm)', 'Đàn Bầu', 'Đàn Tam Thập Lục', 'Đàn Tứ'],
    correctIndex: 0,
    explanation: 'Đàn Tranh có từ 16 đến 19 dây kim loại gác qua các con nhạn chữ V, âm thanh trong trẻo lấp lánh như giọt sương rơi.',
    instrumentId: 'dan-tranh'
  },
  {
    id: 4,
    question: 'Cây đàn nào được mệnh danh là "Vua của dàn nhạc Đờn Ca Tài Tử Nam Bộ" và linh hồn trong Hát Chầu Văn?',
    clueType: 'text',
    options: ['Đàn Gáo', 'Đàn Đáy', 'Đàn Nguyệt (Đàn Kìm)', 'Đàn Tính'],
    correctIndex: 2,
    explanation: 'Đàn Nguyệt (Đàn Kìm) có thùng tròn như trăng rằm, phím bấm rất cao, giữ vai trò chủ trì kìm nhịp điệu trong đờn ca tài tử và chầu văn.',
    instrumentId: 'dan-nguyet'
  },
  {
    id: 5,
    question: 'Tại sao khi chơi Trống Cơm, người nghệ nhân lại phải gắn một nắm cơm nếp chín nhuyễn vào giữa tâm mặt trống?',
    clueType: 'riddle',
    options: [
      'Để trang trí tạo màu trắng nổi bật',
      'Để dìm bớt âm thanh đanh chát và hạ thấp cao độ cho âm trầm ấm ngọt ngào',
      'Để cúng thần linh trước giờ biểu diễn',
      'Để giữ cho màng da trâu không bị rách'
    ],
    correctIndex: 1,
    explanation: 'Cơm nếp nóng giã dẻo làm tăng khối lượng rung động của tâm màng trống, hấp thụ dao động cao tần và hạ cao độ, tạo nên tiếng "Tùm, Tịch" trầm ấm ngọt ngào đặc trưng.',
    instrumentId: 'trong-com'
  },
  {
    id: 6,
    question: 'Nghệ thuật trình diễn nào sử dụng Đàn Đáy với cần đàn dài kỷ lục cùng nhịp phách của đào nương đã được UNESCO công nhận là Di sản Thế giới?',
    clueType: 'text',
    options: ['Dân ca Quan họ Bắc Ninh', 'Nghệ thuật Ca Trù', 'Nhã Nhạc Cung Đình Huế', 'Hát Xoan Phú Thọ'],
    correctIndex: 1,
    explanation: 'Đàn Đáy là nhạc cụ duy nhất của người nam kép đàn trong nghệ thuật Ca Trù, hòa quyện cùng tiếng phách của đào nương và tiếng trống chầu của quan viên.',
    instrumentId: 'dan-day'
  },
  {
    id: 7,
    question: 'Âm vang trầm hùng, rền vang của nhạc cụ bằng đồng này gắn liền với đỉnh cao văn hóa thời các Vua Hùng dựng nước Văn Lang:',
    clueType: 'sound',
    soundPreset: 'trong_dong',
    options: ['Trống Đồng Đông Sơn', 'Chuông Chùa Một Cột', 'Cồng Chiêng Tây Nguyên', 'Thanh La'],
    correctIndex: 0,
    explanation: 'Trống Đồng Đông Sơn (như trống Ngọc Lũ) là báu vật quốc gia biểu trưng cho sức mạnh, quyền uy và nền văn minh đúc đồng rực rỡ thời Hùng Vương.',
    instrumentId: 'trong-dong'
  },
  {
    id: 8,
    question: 'Cây đàn Tính (Tính Tẩu) với bầu đàn làm bằng quả bầu già khô gắn liền với nghi lễ tâm linh nào của đồng bào Tày, Nùng, Thái?',
    clueType: 'text',
    options: ['Lễ Bỏ Mả (Pơthi)', 'Nghi lễ Hát Then', 'Hội Đâm Trâu', 'Lễ Cấp Sắc'],
    correctIndex: 1,
    explanation: 'Thực hành Hát Then cùng cây Đàn Tính của người Tày, Nùng, Thái đã được UNESCO công nhận là Di sản Văn hóa Phi vật thể đại diện của nhân loại vào năm 2019.',
    instrumentId: 'dan-tinh'
  }
];

export const GLOSSARY_TERMS = [
  {
    term: 'Thang Âm Ngũ Cung',
    simpleExplanation: 'Hệ thống 5 nốt nhạc cổ truyền Việt Nam (Hò, Xự, Xang, Xê, Cống), không dùng các nốt nửa cung phức tạp, tạo cảm giác êm dịu, mộc mạc và chân quê.',
    analogy: 'Tương tự 5 ngón tay trên một bàn tay, hay 5 yếu tố Kim - Mộc - Thủy - Hỏa - Thổ hài hòa thuận tự nhiên.',
    exampleInstrument: 'Đàn Tranh, Đàn Nguyệt, Đàn Bầu, Sáo Trúc'
  },
  {
    term: 'Con Nhạn (Ngựa Đàn Chữ V)',
    simpleExplanation: 'Những mẩu gỗ nhỏ hình chữ V úp ngược đặt dưới từng sợi dây đàn Tranh để nâng dây lên khỏi mặt đàn và truyền độ rung xuống thùng gỗ.',
    analogy: 'Như những mố cầu nâng đỡ dây đàn; dời con nhạn sang trái nốt sẽ trầm hơn, dời sang phải nốt sẽ cao hơn.',
    exampleInstrument: 'Đàn Tranh (16 - 19 con nhạn)'
  },
  {
    term: 'Bồi Âm (Âm Hài)',
    simpleExplanation: 'Kỹ thuật gảy đàn Bầu: cạnh bàn tay chạm hờ vào điểm nút trên dây rồi gảy bằng que, phát ra âm thanh trong vắt thanh thoát như pha lê.',
    analogy: 'Như tiếng chuông gió ngân nhẹ dịu dàng thay vì tiếng gõ mạnh trực tiếp.',
    exampleInstrument: 'Đàn Bầu (Độc Huyền Cầm)'
  },
  {
    term: 'Vòi Đàn (Cần Uốn Rung)',
    simpleExplanation: 'Chiếc cần dẻo bằng sừng trâu uốn cong ở đầu đàn Bầu. Khi kéo hoặc đẩy cần, cao độ nốt nhạc biến đổi mượt mà không bậc.',
    analogy: 'Như giọng nói của người mẹ khi ru con, lúc bổng lúc trầm uốn lượn cảm xúc.',
    exampleInstrument: 'Đàn Bầu'
  },
  {
    term: 'Nhạc Cụ Tự Thân Vang',
    simpleExplanation: 'Nhóm nhạc cụ mà chính chất liệu thân đàn (gỗ, nứa, đồng thau, đá) tự dao động phát ra âm thanh khi gõ, lắc mà không cần căng dây hay bịt màng da.',
    analogy: 'Như tiếng thanh củi gõ vào nhau, tiếng chuông đồng hay tiếng suối reo.',
    exampleInstrument: "Đàn T'rưng, Cồng Chiêng, Trống Đồng Đông Sơn"
  },
  {
    term: 'Dăm Kèn & Lưỡi Gà',
    simpleExplanation: 'Miếng lá nhỏ (hoặc lá đồng dát mỏng) đặt bên trong ống thổi, khi có luồng hơi thổi qua sẽ rung lên bần bật tạo âm thanh réo rắt.',
    analogy: 'Như việc ngậm chiếc lá thổi còi để tạo âm vang rền rĩ.',
    exampleInstrument: 'Khèn Mông, Kèn Saranai Chăm'
  },
  {
    term: 'Điệu Bắc & Điệu Nam (Đờn Ca Tài Tử)',
    simpleExplanation: 'Hai sắc thái cảm xúc lớn: Điệu Bắc mang không khí vui tươi, đĩnh đạc, trang nghiêm; Điệu Nam mang tính trầm buồn, tha thiết, hoài niệm.',
    analogy: 'Như ánh nắng sớm mai rực rỡ (Bắc) đối lập với buổi chiều tà nhớ quê hương (Nam).',
    exampleInstrument: 'Đàn Nguyệt, Đàn Tranh, Đàn Kìm'
  },
  {
    term: 'Kỹ Thuật Thở Tuần Hoàn',
    simpleExplanation: 'Kỹ thuật thổi hơi liên tục: vừa thổi khí ra ngoài bằng miệng vừa hít oxy vào bằng mũi, giúp tiếng kèn không bị ngắt quãng.',
    analogy: 'Như quả bóng hơi vừa xả khí vừa được bơm liên tục không ngừng.',
    exampleInstrument: 'Kèn Saranai, Sáo Tiêu, Khèn Mông'
  }
];

export const STUDENT_QUICK_TIPS = [
  {
    id: 'tip-1',
    instrumentName: 'Đàn Bầu',
    mnemonic: 'Chỉ 1 dây duy nhất + cần uốn bằng sừng cong + quả bầu hồ lô',
    examNote: 'Nhớ từ khóa: "Độc Huyền Cầm", "Gảy bồi âm", "Uốn cần rung vô cấp".',
    quickFact: 'Không bấm phím trên cần đàn như guitar, chỉ uốn cần để đổi cao độ.'
  },
  {
    id: 'tip-2',
    instrumentName: 'Đàn Tranh',
    mnemonic: '16 đến 19 dây + hàng con nhạn chữ V di động xếp chéo',
    examNote: 'Nhớ từ khóa: "Thập Lục Cầm", "Móng gảy tay phải, tay trái nhấn rung nhún".',
    quickFact: 'Gắn liền Nhã Nhạc Cung Đình Huế và Đờn Ca Tài Tử Nam Bộ.'
  },
  {
    id: 'tip-3',
    instrumentName: 'Đàn Nguyệt',
    mnemonic: 'Thùng đàn tròn như mặt trăng + 2 dây + phím gắn rất cao',
    examNote: 'Nhớ từ khóa: "Đàn Kìm", "Vua của Đờn Ca Tài Tử", "Linh hồn Hát Chầu Văn".',
    quickFact: 'Phím cao giúp ngón tay bấm lún sâu tạo nốt luyến láy vi âm.'
  },
  {
    id: 'tip-4',
    instrumentName: 'Đàn Đáy',
    mnemonic: 'Cần dài kỷ lục (trên 1m) + thân hình thang hở đáy + 3 dây tơ',
    examNote: 'Nhớ từ khóa: "Vô Đề Cầm", "Nhạc cụ độc quyền của Kép đàn Ca Trù UNESCO".',
    quickFact: 'Là nhạc cụ do người Việt tự sáng tạo hoàn toàn, không du nhập từ nước ngoài.'
  },
  {
    id: 'tip-5',
    instrumentName: "Đàn T'rưng & K'lông Pút",
    mnemonic: "T'rưng: Dùng dùi gõ vào ống nứa vạt xéo. K'lông Pút: Không chạm tay, chỉ vỗ nén khí.",
    examNote: 'Nhớ từ khóa: "Không gian Tây Nguyên", "Tre nứa lồ ô", "Tín ngưỡng Mẹ Lúa".',
    quickFact: "K'lông Pút truyền thống chỉ do phụ nữ biểu diễn trong lễ hội nông nghiệp."
  },
  {
    id: 'tip-6',
    instrumentName: 'Cồng Chiêng Tây Nguyên',
    mnemonic: 'Cồng có núm tròn lồi ở tâm; Chiêng phẳng không có núm.',
    examNote: 'Nhớ từ khóa: "Kiệt tác Di sản Văn hóa Phi vật thể Nhân loại UNESCO 2005".',
    quickFact: 'Âm thanh là phương tiện giao tiếp giữa con người và thần linh (Yàng).'
  }
];

export const TEACHER_LESSON_GUIDE = {
  subject: 'Âm nhạc & Giáo dục Địa phương (CT GDPT 2018)',
  gradeLevels: 'Cấp Tiểu học (Lớp 4-5), THCS (Lớp 6-7-8) và THPT (Lớp 10-11)',
  lessonTitle: 'Khám Phá & Bảo Tồn Nhạc Cụ Dân Tộc Cổ Truyền Việt Nam',
  duration: '1 - 2 tiết học (45 - 90 phút)',
  objectives: [
    'Phẩm chất: Bồi dưỡng tình yêu quê hương, niềm tự hào về di sản âm nhạc của 54 dân tộc.',
    'Năng lực nhận thức: Nhận diện đúng tên gọi, họ nhạc cụ và đặc điểm cấu tạo của các nhạc cụ tiêu biểu (Đàn Bầu, Đàn Tranh, Đàn Nguyệt, T\'rưng, Cồng Chiêng...).',
    'Năng lực cảm thụ: Phân biệt được âm sắc đặc trưng thông qua trải nghiệm nghe mô phỏng Web Audio.',
    'Năng lực sáng tạo & ứng dụng: Tự phân tích hình ảnh nhạc cụ bằng AI và trình bày bài thuyết trình ngắn.'
  ],
  classroomActivities: [
    {
      step: 'Bước 1: Khởi Động & Kích Thích Tò Mò (5 phút)',
      content: 'Giáo viên bật chức năng Đố Vui hoặc phát âm thanh giấu mặt của Đàn Bầu/Cồng Chiêng trên ứng dụng để học sinh đoán tên nhạc cụ.'
    },
    {
      step: 'Bước 2: Khám Phá & Nhận Diện Đa Phương Thức (15 phút)',
      content: 'Học sinh dùng camera điện thoại hoặc tải ảnh các nhạc cụ vào hệ thống AI để tra cứu cấu tạo, chất liệu tre nứa/gỗ ngô đồng và nguồn gốc lịch sử.'
    },
    {
      step: 'Bước 3: Thực Hành Cảm Thụ Âm Thanh Ngũ Cung (15 phút)',
      content: 'Học sinh mở tab "Phòng Thử Âm", trực tiếp chạm phím Hò - Xự - Xang - Xê - Cống và nghe đàn diễn tấu bài "Lý Cây Đa" hoặc "Dạ Cổ Hoài Lang".'
    },
    {
      step: 'Bước 4: Củng Cố & Đánh Giá Nhanh (10 phút)',
      content: 'Cả lớp cùng làm bộ câu hỏi trắc nghiệm 8 câu trên ứng dụng, nhận chứng nhận văn hóa và rút ra thông điệp bảo tồn di sản.'
    }
  ],
  discussionQuestions: [
    '1. Tại sao cây Đàn Bầu chỉ có 1 dây duy nhất mà lại có thể phát ra âm thanh nỉ non như tiếng người nói?',
    '2. Điểm khác biệt cơ bản giữa cách phát ra âm thanh của Đàn T\'rưng và K\'lông Pút là gì?',
    '3. Vì sao cồng chiêng lại được UNESCO vinh danh là Di sản Văn hóa Thế giới?',
    '4. Em có thể làm gì để giúp các bạn trẻ cùng trang lứa biết và yêu thích nhạc cụ dân tộc nhiều hơn?'
  ]
};

