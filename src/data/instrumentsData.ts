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
    imageUrl: 'https://tongkhonhaccu.com/Data/upload/images/Product/nh%E1%BA%A1c%20c%E1%BB%A5%20d%C3%A2n%20t%E1%BB%99c/%C4%90%C3%A0n%20%C4%90%C3%A1y%20G%E1%BB%97%20H%C6%B0%C6%A1ng/dan-day-go-huong-4.jpg',
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
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSiZnIKqUizvDz-E-LIhhbTA9IRFeZ67G-NOILgIjls5Ke1YKbrBqZ8jo&s=10',
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
    imageUrl: 'data:image/jpeg;base64,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',
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
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaltYcFXMJPkGvfTxyRviAU6jqgkF9p9NwmFe1of0cTQ&s=10',
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
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJUgbouyJS9Wt3Pb6PRF63xJ9IBhMqB-eNv_bFqmWcw&s=10',
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
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpKDOZ3fPME6BEo0SOK4avi67A2MyUlknoVpTBc1g1WA&s=10',
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
    imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMWFhUXGB0aGRgYGB0dHRobGBsYGxsbHhsdICkgGxolGxoYITEhJSkrLi4uGh8zODMvNygtLi0BCgoKDg0OGxAQGi0lICUtLS0tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAQMAwgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABBEAABAgMFBAgEBAUDBQEBAAABAhEAAyEEEjFBUQVhcYEGEyIykaGx8ELB0eEUUmLxByNygpIzQ9IkY6KywkQV/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QALREAAgICAQMCBgEEAwAAAAAAAAECEQMhMRJBUQSREyIyYXHRsTOh4fAjgcH/2gAMAwEAAhEDEQA/AONXY6d0C2kmbK6tbEgdWoHT4FeQrqkxzEFoedFNodVaEvRK+wrmeyeSm5ExnmrRsGnTywmXPTMII65AJ3TEsmYOL3Vf3xWiqOn9PJQn2S83blfzAdyWRMH+JSv+3dHKyRrCx4GLp/B/bn4faAlq7loFw/1CqD4uP7oB6TbONntc+S3+4Sn+hXaT/wCJHhFbsk8omJmJLFCgp9CkgvHZ9tdFTtKfZ56CEomSx1yn7oSXYakkqHKDJbFurKn/AA8nTpQXO6kmQJqHm4BJDoJ3hlEE4Vi57C2FenzrUpQCQtSnIcXBgAcuzdPMRNtIpWU2GzpazyrvWKY3VHAIBHeDh1bqZw72gEqkfh5YUlJSEqUWCmz8S8Sm90GPFnP55WtcyYU9hSip2emQ5BnIdoO2fIQRQhIwCTW95ULxYhISlCUKAUlNALoODEOWxoK7oKsqQHCQz64ejQl+DrE0jZiGFAjd3gohsD7bWJLPs9AUEXVIbG4lSkl9VANXMA8TDuWC+R9DG/XEE0pwH1g7F6hemzJYhaC6HqhJcthXurLUzzZ4klEsDVYdrqklN3kQ/PPdB4m0YCAztSXKWlRWlLKCi5HdQbyz/gFGDTO6jyz21DkSzMSpy9+Wtjj3VKDHdiI8TtWzlF7rEykuzk3QSXZwah8MiTDTa9rkrSmZJUFpWCezUaAwNZZbghgRoQ/rBpp0Dq1ZshTgLIExL9m5U+OILeAgmQCKpU6n7qjQD09vC2bsuQ4UE9WoGikOg64pIidUuYy2XevVdQFDxDEji8OC0w5FDdDy1A1OTFn9cqCJFEsbyXQkveSceYFeYyhajaBSEpWiihUVUAd9HAOoFKuBBcu0oJoooal3GuIwq7VD8YKZxOZpqQrCqUq/Yj05R5NQ7pu1LKdJw4M4+kQiYqiilC1EM4IYDkQWB3VJgZSwKXVgJJJNfmHPPMQQBgmk9ppgSaNqdcP2aJ7GVD4ipZLFJxapZ8C1dOWYdnUkuoKUkF7uGP8Aa1eMFKWoFlh5imYg03CmRY1y8oKAzYol5lT59sDycNHsQ/ijmWOYY45/DHkE7Z8tKTGlyD9rS0oUFJ7kwXkbtRyNPCNLLs+dN7kpR3kMPE0jlY7aOk9ENoptMgIm1NULribpSf8AJCjTU7o5ttDZypUxUpVVJUU0+JiwI44xeuhfRi0SyZhWmoHYSCaggglVA4rQPjF1Rs2UD1olI6xQqvMsAM3OWAYRPqUWFPRzDYHQidOrMHVpOR7xHAVEdV2bJMlHVJKilmYMOVAKOMHiSyySK3WprprB6pD+FDTCJym2dQKELNboToNInvZ/FTl7MS9U4AesZNAApl6/SFOB5gXiG+sZKWpNM9PbxDNtBo+OQ3Zg6DhpEVnQtRIKyzd0FvFu9xhkgByZpcjA6Cp/xxHFo0/ELJYI3VPCrB/WNJUu6KAARPLQ+J3/ALRxxHNRMq60jQXT/wA4pHSOyKROQtJ7QOmL0YgmoLsRm5i7qrmw9/OKhttQVapSA9ZifAF/lFI8gLiiUgIF1LA9qmd7tE+cMbNgD79tAKlEJDCjD0wiWxziSfoOUDuB8BtokpYPES5ZbHdj4+VYInpF18hrlwiBCnzw3YfeLJEiJbnQj38oiMoFQUAyhnm3HFomUFPecMPH3uiOaxFTX35QaR1kVKspQUfiDGvMOM2Yx6EKvsmakjMXlJJOObg/vjEaRdqcY0KwoECgpUHHxhGvA6l5GUhRLGaOyKJLMeIUlwThSkEkhg7Mzyy/Ku84FsMeCuTabtCOy4vJOBoXf4SMKitBTOD5AYXlJBQ9HNQcAdysGOmmBIQs2Gea/T/jHsCiWrKakDIXcN1CB5R7HWds47OtEspSqWlJUo4JS5vGtAMjj46RZtkdHlLuqtFMP5YODfmIz3DfHnRnonKsiQu685u0oh2diw0HDHN4f2OaVEk4ElsTQ7x5aZZxkc74ZSiaUJd1XVMSks2AcAU5OPOBAqZfLFB4ivMvDGYhSkUISczuGOcRJABAyFHNaezjvgo4wKmYMOA4RtKBoT74xp+KwpjnuweNptpQhN9aroFSSaQaORLfADCvEVgebaLoKioJAzODZYxXrd0mXNV1dmQSTUKIqd6UZDerwgCTsuYtRXaJpoSB2nLjvVNEJFQWGILb7LDW5Ov5LfD6frdfz7fuhrtLpJKSXDrIGSW/8jlwgKXt20LLybO+hLnTBXZHnGqrAhHZQFXiCQ6S7UDPdvDvXXcMSCRBVmtoUQ5dJAudWkE11FWDEYaF2h6iuFf5F+JjXEb/AD/iiBU63TCylpQqrpLJLPiBdLjeIklWK1K//Q2feV9hBdtVRWBUkKUG/NLLUGV4ULb4PCdKb9MKwvxGuEvY74r8L2X/AKJJ2zLSmv4mrar+sIdhypptl6Yq8EOXfNi2NTlFo2xtZCEl1JpoQT4CKDsXaC1zZq+sCE1XUdmjteIwoBiYpDqnolkyvvXsi62na1pStSjLeW9KOQkUS5QTk2MM9mbbSaKQUmmFWfixgEWl7q6hgHBHaqzXRQnPOoNHhhspF4BKkgu5AOABLgAOCB2hrjlDJR7oDyRemvYsBtqZiDdUDuH/ABNRESCW1MCTdlpIvSyzZHtBnZWNUkHeREU2ZMlFlBw+ZPkrLnD/AA0/pYlRf0sZo1YndpEUxzgOXvCNbPb0zHT3aVcN+/KJJDkGhETca5E4AbRjl64+ERySoPqILmJrXA54xAtIyNBicflAo6zYseywFcvPlBMicpNGBFGppg74htfKB7NLOJepdi2AwypSGCLOwq/CHpMCdEhnyzUyw5rnnGRF1a8iWyx+sZA6WN1imbMSGdwS3LxiWWVUGLiIykGtDuGPtoOlSUpelFNT9uUefRoZIbPeTnT20eTbOwCUs+jl/vBEsth747orO3ukfUld0C+R2RoPzmvIDM7nikIuTpAjFydI82xtRNnN5RdZBaXmXzOQTyrCT8Iq0rTNXP8A5dCBcWkp/SE3SMfjF56cs2FYOtJtE5Klg1D3QFfqN8h06MGNNwh4i3utJUCmWzBRUCCVHB0EpDYdrc0aNY9R2/P6LOax6g9+f1+zyzypcsESgQjBwKk5lRXdYvAyxddCkOFFRBUtr3WKJUkMGCnwBUHB4s4VISkM7JJDA68DhwiJ0scDRmBd/lEuog98ia22gI7c4hKQyXCV4EgdpN4Yk1LEcBBi7aBJmTgu8hKCrsXWISHpR/AxBbNhSp6SlcsgZJQtSQa4sDdfe0V6d0VnyxMlWJapvWJIXIIdrwxvDspO9V35RSKUu4jbQd0e2kq0pvXZiUpICj1imUrMABgQ5JJpkGxh5+HSQ9xJOpDnxME9Huh8+XZ5co3Jd1PaclRvGpLJDY/qhqvo0QKz8vhlt6qMdKDb0KppI5p0strAhor/AEY2eJkubNKlJCKMCwVeADEZsCTyixfxD2aJMtREwqIGaRwxeFvQ6zz1yUyEyxcnlRC7zG+kkXSDldLvujRgjRPI7Rcdm2sKkS5hUEgID1o47JxycQXs6ehTLl7+1XWvZFK76ZwhsvRuclKJdpKkJT3UZEkkntd1RxwJixbM2fJl0SjEYlzxNYDUUFNsbyV3k3QAXDFsACXIfMk5+yUpjlxGXnziFDtiPplGSSRm++Amc0RT9mA1l4irfQ0YxpZ7YQ6V46/IiCjP08TQOMnz5Bo0tNmKmN1N7crEcCkRdO9SD1p6kaVJNPrX7Rksbve+IZc672VFk4VxTuO70gyzS6XlYmvvk0TlBxYGqN5GB94xNhvjwHw/aJkoyPvOOQpDf4xkEONB5xkccVSwpJUAxcA4nk7eNILnT5iSkBsXUdAMcc/qY9TVxmafTnGSx3nu6APQneI86jXYBtfbfUpUQCSWCat2jXTDH/ExUbFZzPWJs1Q6vrAFqV8RYsP6XCEt+oDWCtuWg2i0JkoIIfq0n4SX7aj4N/SktjDebsZKEJloCVEhTFV092hUVMWdSgQEjPcTGpL4cfu/4Ky/44fd/wBl/k9kW0FZEy8LqalALveWClwKJAADAgVzgqxWgKQmYUXese7eAc4slYSLpvJqDlhWjptmWdC5jMRdJE1Dm4Fdlks7EUWaUIUHGEPtp2YKllMwhKSGBe6RoQTmKHc1Ik6TozgVjmiaTJQbyZS2zokhK0gt+Ukpb9MNFhKXJNRTB6mgADVc4AZ8YoHRi0/grYuTMmJVLmsOsSoEOHuk17OJBBweOudHtmEtaFjtGstKgxSD8ZGUxQPIUxJijx/N9heukRWDYhWxnuAWaUksT/WoGn9KTxNWgLb/AE3sdhT1MtlrT/tymASd6sAeAJ3RVv4jdPVXlWWyKYDszJwxUc0o0SMznwx5ctenjGmGLRBybLxtf+KFtWWlFEkfpSFKb+pb+giv2jpZblOVWueeExQHgGEJb+g8Y8mzGo1YpSQDNpbTmzLwmTVrDDvKJzBzO4x0XZW0PwVmsayi+UoKyl2cqupxY5KJ5RykgrUEj4lADnT5x0S0bMMubMlLmLWAygFGiL1bqdE4R0e48YObUVydI2H0rs1q7AJQs06uYAynyBqFcD4QfP2JnKoR8BwP9JPd4GnCOVSbEhhRuZi+9FOkJS0meu8nBEw95P6VHMaK8YnLH4Kz9Pkx7f8AYJWWBGYywIOYMQWy1XGvG6FKCXOTmpfhnwiw7Z2ff/mJDrSMBioZjiMR4Z0oVvtItEwICkplpwUSznMjP9t8dCFsg56LVJnlThLMNDnkl8snbMjSPUTaAtdGJc6ZOcwW30jNmTZVxKEqTTABQPjm5x4mPbZZXUCkE5PQs+BO7I40OkFcnEVsSlZeijQEYXgnvU8Bzgiw2h+yWJFUnFx78jENjQQohXaLOcmANXGFXod0R2uWELZOTKH09RwIikfmVFI/Mun2GiFB/eUGSSDXSApKgoAg46+kGplszERIQm6o+zGRqEnU+MZBBso8rIlios/LiWaB9rW/q5K5iXdQuJzdRo+gbGGtnkgAKLvvrxfWvziudNZjFCRvWQN1BTLvK8IwYo9U0jfih1zUf9+4J0S2SqZ1k5JF5BSmUTg6GKidQ1KfmMPLWc1oKFJcsq9dBOaJqWdJ0xL1AJgjoygybJKASVEi8wZ+32ncsMxyENVzK3Xo+PmaQ2TJcmxcj65NiCy2dBLpKlOK3VzFOdTdup8SM4V7V6HotU1MxZ6lAABCAlzXM90GrfEdTFtNruvmS7Bq8PDyELetJVS6UnSu4j1gKbW0I4pgnR/oNZBPQnqnu9tV5ZULqDQHAOpRTRmYKh3/ABM6RKstluILTJ7pBzSgd9XGoA/qfKDuisj/AF5jkOtKBvCEX8N/WHwEc3/i/bSu3XH7MqWkNvX2jzII8I1Yt1ZmnzooylE10iEk7vP7RvNVEalZExoYEaHERrNJL5mJg2XhAk+YRjlWAHQTsJCTbJIUQECakqUSwCUEKUScgySYvM+1pnWm0zkqvJMxISQQxSlIAIOYo/OKx/D6xJnW1AWAUXZhUDgxQoF91Ya7GumUSgAJUpRA3YAVgx4NfpVee12Q1s00KAIbHWGFmORqDRtX+xhXYLMmWmgxL8+fCD5Sq4b/AEhkeok2to6N0S2gZsq6suuX2VVqQ3YVxKcd6TANv2RK61aTLSQrtpLMe0TeDjRQJ3XhAfQOd/PmDJSPOWUj1UqLHt1DGUrO8pHJSb3qgRKVpujwssFDI4iCTslEtQUg1wZQvCumYO+ucHpUw/08c0gEaYJY+URgF390iRahh797oTrb5B01waom5ISwGdEjc+Jx3ZwJbJiko1VeeqcXYMK0p/6iD7oFfBta4xBabJfBckEgjPNh75wyluzlp2EbJm0KSKCtBkdQXzq++GqFC6GYjj9Iq+zphC0YuaHOpD1NHwEWJRpgQdw9XoftDZFUh8sak6PVTBv8D9IyNxMUKOjmFfKkexOyZU+uoQkvgdxOj84qPTCa8xRGUtCfEkn1i2GUkmlS9Bv0xqXDvvim9Mpn82deFRccaAJQYz+l+v8A6PR9O6k39pfwzoaZqESx8ISkCtAwDekK7btIEvL7TsyghSk41IKUnLTFsYiQsLQJs3IXgCLwQ5ISLrduaTR8jQZXvV9Z1iEkAKW7Bc9SVG72iGlpKQW0LRJRM1nsielRWxCq4AChpwL51rjEylhKSrT4mfQMNT73Qo2zZ7QqWookKKgDcKFhV0li4UpSVguK0PmYr1k29bUDq59kXNAT+UgtqaEHjTOHWPqVoDlR1LodOvIn7p7toFSZX38I5Z/FWzFO0JpPxplqH+AT/wDJi4fw46Ry506bLSlab8tJZQHfllQNQWJKCKaS4h/i5sZUxEu1JD3AUTGySTeQf8nH9wjTj06ZCRyOYnP2I0cNVvDf5RNOGOmcQtnF2BM8Jwowf9oEt2MEqrj+8D9WVEPrCsKVjvojtBFn6+YtTFUoykY99Y3AtRzWkNNjMmTLS4e7Wta1+cDbLlhOy7XMKQSuZKQlxgbyqjQgPWDZUoXQCMAA3KGXY3eiXzyYaFgMXAbUwbZVks1BqaeG/f6wrlM4YAeEHWfB9PfhDI9NNl26DD+eWwTKVX+paGHkfCH/AEhmUlD/ALnkJcyviRAPQaxFEgzlUVNYh/yBwjx7Sv7hCnpp0jTJnpQUqVcSRQgC8u6oh9QkIP8AdEpbbo8LPNTyuXYNURU4Rp+NQ7KUxxAq/gKxT7Rti2zewiQtH9inrvIYQ62aJnVhJk3VYd8AGmJugqvRJxa5AnY+lrqSQptQCXiahIusoa6N74wpslpXeKU3HSzpvKGIcVI0hhLmhbKHZXvo92hSoYO+By4QAC6UCFijfzPQkU8YstnnuN15vnzw84qdnF9QUk96YDjqtw9dPSLOimLj2PbRbL2KZVtfhEpG4+cZHj7/ACjIkTK3ZV3JQXMSSSHIq74MRUD3wimdKZRMyY7vMlJNdWUkeg0i5T5BXdTRj3ncFi1HGW6EnTGysqUsb0FuSkiu4K8Yz4JVM3+m/qJPvr3VBuzbdJnWZDLCF9WgkLUxCkdpKgVUIB5ENAyZqVrTMUsqN69fSnsy7qhfBYUIoHDveqWS0LOjovyzKIfqDQKqDfJKFEaIGAwd9BD8WdBMwLn9WUMlKSUdlKgCVOoOxP5SAGYMRTmlFtGWUWtMeTFgAN3QHL4M1C/nHNuk20J1qnps0kKShZZyCOs1J/7Y0HGLnIkkyUS1EqlijlJSZxySBimWKO+PDHaRZUqmdYXN0qAVh2lMFENkAAgcFQINQdnSVgWz9nizoQmTjJ/mBeSlihwckKDpLYBTRfLJNl2mS4DomAhSDiCzLlq0Iw9iKzNSCyQKCpbUcI9s1pXJmGdK7Tt1sp6LADBQJ7swDM0IociGhk8izh3RTOl/Q4SV/FdV3ZgwV+lWQmCuj4jMCsTNhk/HQbvrHfpM2TapRa7MQaKB1xZQxSseIxEVLbPQdQJVZlBQ/ItXaHBRorLvNxMao5PJowTwS1lW/P7OW/8A8xCamp3/AGhZNqvcAT4V+UWTbtjmSXExCpZw7QI8CaHkTFaJZExWV1uZUkD1MM2X9QsUYVjGs2cBs6RJzmWi+eCUlI870NGYZwptOykS12MgMtckLXWgCVEDxAx3cYsmztnTZ3+lKWsagMnms9keMNfkT0coxhKTYHZ5cWzonsD8Qb6w0lJbD/UI+EfpwBOGIGbH7F6EAdq0qCv+2gm6f6lUJ4BhvMW20W1ElIKqDuoQkVUckpHDkM6CEeTshM/q+pdMPc22pbUyJRUQ5NEp/Mo4J4U5AE5RT7dYkTZapUztFTqK/wBRL3hpXAaBoYTlKmEzpo7TEJSO6hJyGqjR1ZtoIyX3eIzyxiDmZIx8lL6P7VXJmKsk89lJYL0bX9Jo2jjLC2XQASSABnuGJfKNDJCVmYAHWADhUpeh4gkchEdqsn8sywpkFSSFgPdAUCUkYswLHLPCOk1J2MrSAr5cteSpyULukPeL3Sk5FX5gzNgYNVakJSZgIXdClAA3qmpUpQDJHvQRibGm8kCZeBxSAiqTV+yAcQKknTOBdvqZDCnXUIydJBJGl5Lvyhl8zoCi26Qv2IohcoJUTdqQcwEkn/yi3SrbQlQNTmT9ddIQdGLM6lzD8ICeaqnyaLOiWCKiDml8xbM7m140aG1I/V5/WMiBSA+I8ftGRLrZLpRvJSC5NfnSlNSXgLb9jM6QpCQ5AvJ/qTUAbjhzhmCAKY6+sB2i0iW5Ids+MZE2nZZOto57si3dVPSpipKwJa0uM+4S5Y1LVPxRdja0lSXE1xgDIUSkjRVxnZ6uYqXSLZoRMUPgmgrDaqqpIOTEuOO6HnRfbJmyyhZJmy2CzmpJPZWANcDoQd0a8yTSyI0+pj1Vljw+fsxqL6j8SAcVqLrI3NRA347gaxshd0Mlm+ENhhGxtNWY9nOjHD6+sbAAjX5xnsy0QBd0e8cI8mJvdkhwcRuzB9I8tS0pISXKjgkByWZ2Gm80gW1zZxBEsISo07QMwhsixCU/5GOSYWHLQUnrkLMtYAF5JFQMlg9lScaHB6NjEGzv4hSlTeoWL5AJMySCUU/Qa/4lUUSVY7bblETZh6oKIcUSWLG4kUVhiXiGcpFl2lLShIShAQk7wpNSTmXU7xqhGtN2QlvdHR9r7ZkLSUy50tROKCQFc0KqPCOR9JFArWEgC9MQlh+lJUf/AGTFp6SkKBcBsciPbRUbHLC51nBwUsq5FQSOV1MNi2wNUXbZEsHbNnlk0k2dIrkRLKvVUdEtPSCzJLGchSh8KCZin/pQ5EcssKETtq2pSgFJAIAIcdkpT9YtJWhABICUJcmjACrx2WXzMEYWkE2rp4hU42aUBKUCxXOFa5JQCzt+YjKhgiyoN68pRWs4qUXUd2gG5LAaCOZ7G2cLcbQVUUVBSTmHvUOoZg26D9iqt1mnIkFZSlRYFQC0Z0SS1aYOIEo3pMMddjpE001P7xpZlvu9PGBjaFkVCVnO6Lqv8FZY5xsmfeFGoKjMHEuMogyoWqzumopn++X7QKFqR+oajvDcQaK9d0YicSGy9+Ubyhv3wLOqyNU8NhMcnKWQTxLN5xV9sW4zJj3WSh0pD8HJIpiAKP3RFg29tES5dxP+ovBvhGat2g38Ir/R+xdZMB+BBBIbH8qeOBjVi0utl8MOlPI+3H5LJsazmVJAL3jVQ3nJsmDCGEtZzyGIL1+UQXqHL7RKa3Xo58afvGZyt2Z35N+q4+EZEjfqPgPpGQ1gN56WYYaH5wFaQCOD5tpXxy0iS2T8DhhTnAyHJN5s/DHn5YRmKkG3NmCdKKCWPeQQMFNj5lxoY59fXKmXx2Z0skMcC+KTqhQ+RGEdPKSUilMBXPjnCHpBsNM4XkkJmpoND+k7nwORMaMGVR+WXDL4cqjcZ7i+f2EbJt6LTKvo7wotGaDRwW8XzEFTp9xF7EhgA+KiQEjiSQI5/Z50yTNKkHq5g7KkkGo/KpOhyI1pFjVt1KxIyImpKx+U1biCu6xGmWEGeHpdrgXNhePfKfDGiE9W5JdVL6gKqUcEJ0D4Dfq5iFVolGYZcyahww6oFgCcEkUvHjTdE8xVAoC9cWSpIxN68yg9Cz+oxEKbXaAqbMmLlXUhKQb5QHQFKvEgnRTVzYnAQlWQHeABpQ+2il9Jth9daDMKriRLBUWc0UQWHCvKHItM5KAFKN8AC7dSQSA4BNVKozr7Kd8C260nsXwEnq13gCCGJQ2BgwuDsEqaK1taasBMpRcg3SfzDItwPrDjYFiSbd1d1JSk3WYEdkVx3gxXrZMvTUAVNDxasWToFNVNtUyclitIXMulw5L/ABB2Yl+UPGMnVCvS2bbOWhNum3EAX7wO4Cr+XnDXaMhMxJlEkJKbywOLJQNCo+QMV3oxOEy0KIqySWfVh84swT2ln/uAOcQAlJHmfOFtp7GoF2BslMhc0JwJTjrdBYczFiRZkLDKF4HIh/L5wlSqaA0pF8laiSSKOScMTo27kZvxky6HIUlxfF1roJus41ULpSUvjljzt7O0tE5tCbxShfWpQAVJclSAS15KxiP0uTjwiaaoHtpLqCXBH+4hnb6HVsiRA9mmqC5joKgAkEoIU5ALpJLNUvxJwgiwSTLCEkgEBTgYJvk3UvhQU5QGzkEygmhpXA7j784E2tbhJTfNb3dSMyMxoNTl6hK24iVJQAm8u6GTuLXSo/CG5nIRXytc1Yd1zFYJGQ0/SBj7q+PE27fBoxYXNdT0vJs8ybMFb0xfgAM9yR733bZ9mTKQmWk0FSW7xOJ0fJuEBbG2YJKTnMPeUMGGCU6AedTB8yVo/vGm547LlUtLg7Lk6tLhcE5IL19+x5xJMYV4fP5PWBkudW9Y2m4pAIpX2NaxFMgwszzv8T8oyITagKHHhGQbBRDPS4ocBwMSymOAr7xgYJ7Ll2LZaY88co3SHALlm7tRp9qREcJAOCgzaViBQbDxqafvGvW1d6uBg7/L3yiVCmoACDV8/SkE4S7c2Ki0doqCZgcBQGA0UMxu9IpdusK5agmcGNLqg7FmYpOubFjHRZi0pOG+mJ8cPtAVrlJWCFBKk5uxBDe+DRXH6hw09o0Ys0oLp5T7MrUvbig3WIvgfEggKrqHrkez4Q0M/rerWSgSUzElQSbxN6gK1UbtEU8TSBLZ0ZXjKWG/IvLDur4nAxXrZKXKJSpC5ajQk0cHK8CyhzMaFHHNXB0x/gYsv9OVPw/2XifLCFu6b4CkkTFHtIUoKDKL4bnz4xWtqzCq8SoKcMojugByw1zr9hAcvpDOlouOmYkYXx2hhgofMQstu2+se+kjRKWuvvq58AN0TeKa5IZPT5IcoEsy3mzV/lSfFqfKHHRBVxM5YLHq1B/6sR4PCKzFpU1X5qef2hzsOYUyJ28AHHURpgqMzJugKf8Aql7knyu/OLlPbrClqTWY/rSKjiwSR/SYpPQm1olz5i5igkXCATreTFrt+2rJMFx1KBfBCxUYMWDF6gvQtGaUW5aRVRb4DTOKFFSSipqlRIYgM4U1Ryiax2YG+tSiQp1LUlSkpJIA1YgJGNXPgKlZtvTEG63WIDgGayFZ4lLhXFkxJa9szpvfWEpd2QLo1YqNS25oeOGbKx9LlnxH30PLROFnSBNCVskAXVFMwjQpHe/qBGdIXW7bS5guIQJMshiBVRGYpRILnU8IXWazKmqdCComhUXbms4+u6H1k6Nj/dN9vgRRL7ziryhmscPqdsoseLF9b6n4XHuI9n2Fc1TSk0+JZHZGtfiO4RbdnbLlyEsO8oC8s4k1OVBXKCusSkBIDBLMBlXBuMTzq9lg2e/dEMmZz12Ey5pT0+PHYwKZgTd9aNhnG5nKwKOZUzngBSnpAwSzUavNqnWtBE61donAedflEGyJqCUkOMMWL82xamkeqKCy0lRyZsG84gTMJILuxpTnxyiW1ynUkp7KiB2m1dnGB0hkAgM1Wi/8DGRsbUr9P+J+kZBOJ5uAd9Kb8T6RpZ1UwcZeGegghUoqRiM8TUn9mrAxlto2YfzAiYSVSAajHFgM8mEeTLRcQMSQM/Nt0bS2dnqc645446fSNZ0ijcuQFfTGAcDyFOpimpYaV+X3jdUsJJSGplyiZBul2PryjAsE6k0YDyb3jHBIxLACQ2WDYacoFtaUqF1V0gioofF8t0ETaHEcHzzxMDTbz1NNab4FhKttTYkmrJusMUKYf4mnlFQ2rY+rqFFVWZmPiPpF+2mAQ5H3ijbfmMw1jTinK6s5zklVgKllMtKWoSTUKc5YsxwhzZLUhNnUkEuogs4yeoHeep3V8BNrgJEmXmmWCeKiS3gRDy2N+BlXQHKluWyASw8XjbHuZmroVbD2eqYSJbKIxDtnviwSOjM5ZNZaSA/eJ8m4Rp/D2SCZisKAciT9IushQuzFVxCeGJofKM0s8o6Rth6nLCPTF6KvZujAJdc0jgkD1fflFgsHR+zS8JYUqjFbq8HoD4RIoJvVDn5/bCC6AMT73b4m8s33JzySl9TZ7aVMKJZsqQGKJBBb5s3njE86WHqaYjJwMuJjLPLTQCgxiVgMs4KjgHfDHL3UCCp0pqMGy+sQ2eSxcviB75wZOOoZsBAAQpYvTDCmeD8GeNJgJchq0+/vfEiUpSNA1OEedcAxqa6HGor4+ccAzqmFXq2WIABywjTq3UQMAQXJq9QAOZ843QokgK4gcd/OMVM7oDUpuY5faHADTJYc/wAsY6x7HgWvK82WEewbRxstYwcn6mPCQA2owww5fXGJWBSGx/bxiCaajh40L+URHPZQLXQaAO7ucNeETpSliSOL15RAJoDJGe6g5+8onllxU8Qd3swGEGtCWLF7uIxy3eMRS5yw4SQQ+dD9zxgmem9hk+OBMDzMGu9p9aeP2hQnku0BIdQAoS7g88sniBVsSpJuqBSagjPRqt4ax4VkOFZjTDH1wgeaVd6gGgZjixch/TCHQrFe2Fgff5xR7WgzLSiX+oDzaLVtScpionI0FctaRULCtZm30B1iuAy3FTRpwrYjZLtRd+es5O3IUEWW1S7til6kqbT28VaxoJXVINcHI/8AVJh/tm3NLRJuFIS5xzUz0LHIZZRqXDYNWkH9BCwmZUT/APUXNE83LhoHrvZ4pnQn/cYn4cjh2ot4LpZz79fuYxSWx3yZY2JJAYh+cGBDFh66e/URHIlhLHX9/pBgVWuf773zhWKAzUlnZ3p992YjWXNVeJuEaPo9fnBcwC6Q7nIinB97xDNYJD6avgMDCWOe2WcVKarM5prR/AQXNNK5DRoG2ak1U4bJhgzj3+0bh1K/MM9eW4VDwGAhK2S5xJIpiXAoH+0TS7OyQHPZS7l8Kj3xjWXZnorJXzLUrlr9YN6ipcliBm9Wxr7xh0AgRKIq4O9qevpXlGBIDDPXf6a+HjHaJtSkVIA4sXd+UQoBWpDDA3g+RS1S1MCfGCAYmUMmbnGRAQNSd92MgHCTY+2UzEFKgUzA15CsQavTSGUtT4VyHJt0Umy29NqDhYl2lHcmGjqGKFjNKmx/aHuz9rrSRJnpuTDUP3Vh8UZZ1EIUofS0sci55D3SJLSbuFTr4YaVeIFLILDva8hyjRKiSBrg+J3QtnUaTZmGT8sH8YxSMCfhoAeVXz0jS3oLBSki9UAD1MBXsy53e8o4IStSnA73D3uhdaVA1Bo2pNeGEFGaXvD196eUI9s2ojMBRwBrlo+6GihWJekU9pajFf2PaOrRMWO8QAOBd/Tzg7pFNVcOhNISylEIZqPGvFpWKlYRY7SUKvVix9INuCehBAN64Apy4dNKccYqssUwgu/iNBFYS00HJGqaLd0DWlphNO6+/vRbyWGgeg/eKz/D6QDLUogVW3gPvFt2hMTQAUqNzUw/eMk38zAiayF0inzNYJWkO9Gbz+kA7ONcKPz8IJW/ao273yhWcaqUAccXdveP0ge1pUSGIDJJJPg5G6JywTTdhiBX5g+3jVMtRVRwBU4MaFvkX3QEg2ZYbOEpBBB14vl5eEFyiGPhyd/N4XTZykqlpDs7EAUGBd8qlwGz4tBa5jCYtV40AoHd3DAZ4QKOHlmQAXJFHx18dH841tc4AuPdYgkKLcx4H9/bxus0DnBnBGodjTI1pugpgo1EkE10Z97fb0gRKLrpBcBOJd2Jd1HLD0ie2WoB1KLJGtBlpuhFMtRmOoq/lgOUBryw5uu/dBJzx3QbOSCDtP8AWvkgkeOcZAQtc7IJAyDAtucrBPMCPIG/A9I5ym+kk90hwB9W5V4NFp2ftmXNkGz2kkoJcLPfkzMlA6buIOJhBJsl5BWsspQoRk3v56Ar1FLNkDjqcm1rhvrDOKYEzoabRaLPLCph6+SMZiMUjJRGJS2eWbMWebP2jLmXVpUFZsOXh5mKT0d6SKklKbhqC4BdJBxcFxd3hmYmoxaSbJZphK7LM/DrNbh7oPD8u56ZbptVyN+C4rWgteAFDhlxPD5wDMklyQH0NcAdIQSNrzZSym1S1S7hYqAvSy9QoHMEYHjpDRG0wsdlQOb0byPGBTAaTFM3shh5wm2tOSGvNeOG9s294w0tNqJ7KWCg98jAZBnzarQgtATgH4mpMMgMrvSNfZFYSp7vjDLb4q3PzgAS2Aq9NI1QXygXJNZBBaVlica+kD2NBeCxLYNx847gryi99FZZRZEdkuokvz+whiJ1S7g/T1DxFZHRKlodmQmg4AvBN28Q+Jx4b9T9YzvmyYXZVsHD+EZMtZcjfU/fxiS7R2pw8oHUQ9AScX4wtgJ/xRYkjnuOozFRWN5s1SFBIDg51oGJOVC9HwgMJIJJIYCgd8Mqe6wQm1i8SXLMCkUagID6j0gWGiMyjfrjQnfz4AVgmZZqMqhd2BxYEio3tGirQCh+6Gwdmyrnh6Qtn7aRL7KlkC4ySk9p1E0D50BgW+xw26xKQyK5HHNm+fjCzae1AgAVWsiiEC8o+HzhQbTOdKUESZaj311URkyRQKJz1bkXLR1aXliYCaFSgAuYSUpdI0c/TAwUmGgS2GYovONU9oykC/1aQXJLOCpgcRjwcSzUXUlCQReLrU7kJIN/iyXSM8TpBmyrSZRF0BSalRHedwARmp1XqGouZs0byJBnhc2UBevME4IXcxoMHWWvaJTlUWjHQGw/8DI0QOavkW8IyF6dhIYdZLmlfxEJoVZnxePIfXgSvucxILEPU96umulG4Cm+CpypfVpCQ+aci+u6nkzZNlps8sS09rBiSK3ny1Pa8TjmAMq0lKwQmuQOmpPHPMtpCDHtpvBYSaEVcU8NN+mEFbKtCkzCoLKSBQAteGe4/Km+IUvNW1QlOPvQe6Cg65RSoucO7wHuvhAo4tti6VzBMuqmJujJSaMcUvg2bFhhUUhgrZtnnETZEwWddXShSSg1d2GrnjpFGsxQEqScfifMGp+44bmgUpSReFASwGu4+Z+4orx+BlLyWm29dZ03L0uek4qlEu5PxA574BmbQSCynSXwUGPnjAth25NHYLENQ0B4YF28nDQRP2mVNfYqwBU1TlTXn8o6n3BoRWm0Oo3mqcTxjJtsUohJIWlNBgKPuJhvbJUpTFYSFEM6cDy+cAHYctVUrSK1Cg1N2FfGLRzJLYjgy17ElSjIWoWWWVNRcyazP+lSAPOESpJBClGWlJwAUDUcIyy2KdLZMi0qSDRr5A5VIPKHa+ilrWkXZ6JhFQgzSknnd9TBlnvmqGUa4ssaZ4UkKo5ALU3eTmC5U4LUAAKDEUpkfesKJGxrbddXUSyaMpSg+69dOO541suxbffIUZKBqFXweADHxAjOpLyGi0GaQhnBplllAE1VTfPnvhPNsE9Jb8fJSAe0LpSoci7RBNkWU0mzrQpq3kLRdpvAw84RtWMosdzLXKSAFrAYYuPesL5VsvlX4ZKphL9pPZGjuaZCBZNtsgBTKlypgFCZkt1bxW8ddIitfSWYj+UiUlCSKNLSLw3EOBnTHhVik+yBryHGwWkEKtE2VJQAXZTqLnBwkgDDxiGdarLJSZglS1KA7KlArU53qolyw+UJ7LaeuWUTbgUXoMClg7Vdw+bGlMHTFZSgKUEAqlyxmxYPQGlRmScM8IdY3ywdSH67JPnpCwSpSmvijpTncDMaUbGpqWLEWZTqQt/5aMEDKjJIc4JST2d/IL9m7ZUJSlXSQruAAuwBBIzZRSWGVfhBENrPsgzZKVBYTMJKlnJRJN5O4t2XyqNSmij4BfkK2hJlqCVSmvTCDuWTRN4GoIBJdgWBfEtlmtCkTCEm6pAdSSlwsF0y/ElSnFSCdWK2VWZfUQlSVVzTVIxbFIRRwXA30Du12tM1EtLFK1sEgs6SokAhQ+Ei+QcKYBwAy3sH2FC9rWhz/wBEVfqYm9vdqvi8ZDiZs1bntS8c0TH53VgPwAEZAqXgPVE5IEC9LTlWn9wT6Ugi1oHearCvh9TwjIyEAC2ZZC0NRwX3sUt6mNU1M1RxSC266Et6mMjI5cIYgCewo6M3kfUvDTaSQmWwyH/L6CMjIYV8ia8SEF6kj0f1gmzG9NF6rIB5kGMjIITaZLCVqAoLx+f0g/ZksElJAIYUbUH6RkZAXIHwRInkAtdH9qfyvpDlKyEpbjWtdz4RkZEpFEMtiTlLvha1KFQxUW8HaFNvta0lkqugPRNBRshjHkZCpLqCuCC0W2YuYhKlkpc9nKiXFBSJtsWZKUJWAyibvIbsOeMZGRaKVE5PYJZzdVLKaEqSDvCih38TwifavatV01ACmGl0U8MoyMh19IvcAsHavk1JN3k15vGsWPoMn+Qg5qU6jqbyQ/Gp8Y9jI6PJ0+Am2ykonoCAEgovECge7JNBgKqNBu0DH2OaoKmJBLG6CMmMpSjTVwK45YRkZA7sK+kkmSQrZ5UrvFN93IN5S5QUXGoJcYRtJDuTigOk4FJuoqCKjvHy0DZGQH2D5LNItsy6ntHAYUy0jIyMjSuDM+T/2Q==',
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

