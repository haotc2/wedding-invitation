export const config = {
  heroImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1920", // Background for Hero section
  audioUrl: "/Beautiful In White.mp3", // Background music
  groom: {
    name: "Chí Hào",
    birthDate: "21/10/1995",
    phone: "0772004496",
    bio: "Chú rể là người cởi mở, thân thiện, giao tiếp tốt và thuộc tuýp người hướng ngoại.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
  },
  bride: {
    name: "Phương Nhi",
    birthDate: "31/08/1993",
    phone: "0976669860",
    bio: "Cô dâu thuộc tuýp người hướng nội. Sở thích nấu nướng và đi du lịch cùng gia đình.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
  },
  weddingDate: "2026-11-29T18:00:00", // Using 2026 to keep countdown active
  events: [
    {
      title: "THÀNH HÔN NHÀ GÁI",
      location: "DIAMON PLAZA",
      address: "171 Nguyễn Thái Sơn, Phường 7, Gò Vấp, TP.Hồ Chí Minh",
      time: "10:45",
      dayOfWeek: "Chủ Nhật",
      dayMonth: "29/11",
      year: "2026",
      lunarDate: "21 tháng 10 năm Bình Ngọ",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", // Arch image
    },
    {
      title: "THÀNH HÔN NHÀ TRAI",
      location: "Queen Plaza",
      address: "29B Trần Hưng Đạo, Phường 6, Quận 5, Hồ Chí Minh 70000, Việt Nam",
      time: "18:00",
      dayOfWeek: "Chủ Nhật",
      dayMonth: "29/11",
      year: "2026",
      lunarDate: "21 tháng 10 năm Bình Ngọ",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", // Arch image
    }
  ],
  timeline: [
    { time: "17:00", description: "Đón khách và chụp ảnh" },
    { time: "18:00", description: "Làm lễ" },
    { time: "18:30", description: "Khai tiệc" },
    { time: "19:00", description: "Âm nhạc, khiêu vũ" },
    { time: "21:00", description: "Tung hoa và kết tiệc" },
  ],
  loveStory: [
    {
      title: "Lần đầu gặp gỡ",
      content: "Ngày ấy vu vơ đăng một dòng status trên facebook than thở, vu vơ đùa giỡn nói chuyện với một người xa lạ chưa từng quen.",
    },
    {
      title: "Sự thấu hiểu",
      content: "Mỗi chiều cuối tuần thường chạy xe vòng quanh qua những con phố, len lỏi trong từng dòng người tấp nập. Chúng ta từ 2 con người xa lạ mà bước vào cuộc đời nhau.",
    },
    {
      title: "Chương mới",
      content: "Và giờ đây chúng ta tiếp tục cùng nhau sang trang mới. Em và anh không chỉ là người yêu mà chúng ta còn là tri kỷ. Ngày hôm nay, em sẽ là cô dâu của anh.",
    }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600",
    "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=600",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600",
    "https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=600"
  ],
  bankInfo: {
    groom: {
      bank: "TPBANK",
      accountNumber: "02030108701",
      accountName: "TA CHI HAO",
    },
    bride: {
      bank: "VIETCOMBANK",
      accountNumber: "0371000483268",
      accountName: "NGUYEN HUU PHUONG NHI",
    }
  },
  // Link Google Apps Script để nhận dữ liệu đổ về Google Sheets
  googleSheetUrl: "YOUR_GOOGLE_SHEET_URL"
};
