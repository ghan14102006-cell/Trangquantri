import { Product, Order, Conversation, Voucher, ReturnRequest, Review, AdCampaign, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Bó Hoa Hồng Eos Hàn Quốc',
    price: 480000,
    category: 'Hoa tươi',
    image: 'https://media.istockphoto.com/id/1242962658/vi/anh/hoa-h%E1%BB%93ng-hoa-m%E1%BA%ABu-%C4%91%C6%A1n-m%C3%A0u-h%E1%BB%93ng-hoa-%C4%91%E1%BA%B9p.jpg?s=1024x1024&w=is&k=20&c=PHrJ_c0n43uiKeQ-f3tPAxoeMBGYK-QyYklpqDPkaJM=',
    stock: 25,
    isAvailable: true,
    description: 'Hoa hồng tone pastel nhẹ nhàng kết hợp hoa mẫu đơn, bọc giấy bóng mờ phong cách Hàn Quốc.'
  },
  {
    id: 'prod-2',
    name: 'Bó Tulip Lụa Pink Charm',
    price: 350000,
    category: 'Hoa lụa',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2FZRJXfS51gx7HvYcDxn7PTuyC_8uh0J5crKxyZGiCg&s',
    stock: 18,
    isAvailable: true,
    description: 'Hoa tulip lụa cao cấp 10 bông màu hồng phấn, lưu giữ kỷ niệm bền đẹp không tàn.'
  },
  {
    id: 'prod-3',
    name: 'Lẵng Hoa Khai Trương Rực Rỡ',
    price: 1250000,
    category: 'Sự kiện',
    image: 'https://hoahanoi.com.vn/wp-content/uploads/2022/05/gio-hoa-mung-khai-truong-1.jpg',
    stock: 8,
    isAvailable: true,
    description: 'Lẵng hoa tone cam đỏ may mắn, kết hợp hoa hồng, đồng tiền, lan hồ điệp chúc hồng phát.'
  },
  {
    id: 'prod-4',
    name: 'Bó Hướng Dương Nắng Ấm',
    price: 520000,
    category: 'Hoa tươi',
    image: 'https://hoatuoi360.vn/upload/hinhanh/thumb/bo-hoa-huong-duong-dep-nhat714.jpg',
    stock: 14,
    isAvailable: true,
    description: '5 cành hướng dương Đà Lạt loại 1 phối cùng baby trắng và lá bạc thơm sang trọng.'
  },
  {
    id: 'prod-5',
    name: 'Hộp Hoa Lụa Vintage Pastel',
    price: 680000,
    category: 'Hoa lụa',
    image: 'https://www.hoathangba.com/wp-content/uploads/2026/08/1785489919074_4249342021217922167_4249342021217922167_5be61551f76a89b74962f032fead3deb-600x800.jpg',
    stock: 12,
    isAvailable: true,
    description: 'Hộp quà hoa lụa tròn nắp mica thắt nơ lụa sang trọng, thích hợp tặng sinh nhật, kỷ niệm.'
  },
  {
    id: 'prod-6',
    name: 'Bó Cẩm Tú Cầu Xanh Mộng Mơ',
    price: 420000,
    category: 'Hoa tươi',
    image: 'https://hoatuoihoamy.com/wp-content/uploads/2022/10/Hinh-3-600x600.jpg.webp',
    stock: 10,
    isAvailable: true,
    description: 'Bó hoa cẩm tú cầu Đà Lạt tone xanh ngọc thanh khiết, phối cùng lá khuynh diệp.'
  },
  {
    id: 'prod-7',
    name: 'Bó Hoa Baby Tròn Cầu Vồng',
    price: 390000,
    category: 'Hoa tươi',
    image: 'https://hoasapbinhduong.vn/wp-content/uploads/2021/07/z2560758668858_dbaded8c533bfdad69d3b40635a728fc.jpg',
    stock: 15,
    isAvailable: true,
    description: 'Bó hoa baby phun màu gradient pastel dễ thương, độ bền tươi lâu 7-10 ngày.'
  },
  {
    id: 'prod-8',
    name: 'Giỏ Hoa Hồng Đỏ Ecuador Tình Yêu',
    price: 1450000,
    category: 'Hoa tươi',
    image: 'https://hoatuoi360.vn/upload/hinhanh/thumb/bo-hoa-hong-ecuador-noi-nay-co-anh134.jpg',
    stock: 6,
    isAvailable: true,
    description: 'Hồng đỏ Ecuador bông lớn nhập khẩu cắm giỏ mây cao cấp kèm thiệp viết tay cá nhân hóa.'
  },
  {
    id: 'prod-9',
    name: 'Bó hoa hồng đỏ lụa',
    price: 450000,
    category: 'Hoa lụa',
    image: 'https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mfz9vqs66y2y79',
    stock: 20,
    isAvailable: true,
    description: 'Hoa hồng lụa phủ phấn nhung đỏ thẫm 19 bông sang trọng biểu trưng tình yêu vĩnh cửu.'
  },
  {
    id: 'prod-10',
    name: 'Kệ Hoa Chúc Mừng Thành Công Bình Thạnh',
    price: 1600000,
    category: 'Sự kiện',
    image: 'https://hoatuoidatviet.vn/thumb/600x667/1/upload/sanpham/ke-hoa-khai-truong-dai-phu-quy-8156.jpg',
    stock: 5,
    isAvailable: true,
    description: 'Kệ 2 tầng hoa tươi hoành tráng mừng khai trương doanh nghiệp, văn phòng tại Bình Thạnh.'
  },
  {
    id: 'prod-11',
    name: 'Phụ kiện quà tặng, kèm hoa',
    price: 280000,
    category: 'Phụ kiện',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY0CS3KLJHY9zzqeM3gvp6f4pDjxS-qU1Gbhg6SUFZtKCmmKncJiJoe8A&s=10',
    stock: 45,
    isAvailable: true,
    description: 'Combo thiệp gỗ khắc laser, gấu bông tốt nghiệp mini và túi đựng hoa trong suốt quai da.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'BLS-8921',
    customerName: 'Trần Thị Mai',
    customerPhone: '0908123456',
    recipientName: 'Chị Lan',
    recipientAddress: '152/12 Điện Biên Phủ, P.25, Bình Thạnh',
    productName: 'Bó Hoa Hồng Eos Hàn Quốc',
    productDetails: 'Giấy: Hồng HQ | Chúc: Mừng sinh nhật | Hỏa tốc trước 12h',
    totalAmount: 680000,
    status: 'Chờ xác nhận',
    createdAt: 'Hôm nay, 10:15',
    paymentMethod: 'Chuyển khoản',
    note: 'Khách nhắn giao hỏa tốc đến Điện Biên Phủ, chụp hình bó hoa trước khi đi giao.'
  },
  {
    id: 'BLS-8920',
    customerName: 'Công ty TechVina',
    customerPhone: '0938765432',
    recipientName: 'Lễ Tân Landmark 81',
    recipientAddress: 'Tầng 12, Landmark 81, Vinhomes Central Park, Bình Thạnh',
    productName: 'Lẵng Hoa Khai Trương Rực Rỡ',
    productDetails: 'Banner: Chúc mừng khai trương hồng phát | Nơ vàng đồng',
    totalAmount: 1500000,
    status: 'Đang giao',
    createdAt: 'Hôm nay, 09:30',
    paymentMethod: 'Chuyển khoản',
    note: 'Shipper đã lấy hoa lúc 10:05, đang trên đường đến sảnh Landmark.'
  },
  {
    id: 'BLS-8919',
    customerName: 'Nguyễn Hải Nam',
    customerPhone: '0912345678',
    recipientName: 'Bạn Thu Thảo',
    recipientAddress: 'HUTECH Khu E, Điện Biên Phủ, Bình Thạnh',
    productName: 'Bó Hướng Dương Nắng Ấm',
    productDetails: 'Giấy đen phong cách cá tính | Thiệp tốt nghiệp',
    totalAmount: 610000,
    status: 'Hoàn thành',
    createdAt: 'Hôm nay, 08:20',
    paymentMethod: 'Tiền mặt khi nhận (COD)',
    note: 'Đã giao thành công lúc 09:15, khách hàng rất ưng ý.'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    customerName: 'Trần Thị Mai',
    customerPhone: '0908123456',
    avatarText: 'TT',
    avatarBg: 'bg-pink-200 text-brand-darkpink',
    lastMessage: 'Shop ơi bó hồng Eos có giao hỏa tốc đến Điện Biên Phủ kịp trước 12h không ạ?',
    time: '10:15',
    unreadCount: 1,
    relatedOrder: 'BLS-8921',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Chào shop Blossom Garden, mình vừa đặt đơn hàng hoa trên website ạ.',
        time: '10:12'
      },
      {
        id: 'm2',
        sender: 'customer',
        text: 'Shop ơi bó hồng Eos có giao hỏa tốc đến Điện Biên Phủ kịp trước 12h không ạ?',
        time: '10:15'
      },
      {
        id: 'm3',
        sender: 'admin',
        text: 'Dạ chào chị Mai, chi nhánh Bình Thạnh của bên em ở ngay Điện Biên Phủ luôn ạ! Em chuẩn bị giao hỏa tốc qua liền trong 30 phút nhé ạ.',
        time: '10:18'
      }
    ]
  },
  {
    id: 'conv-2',
    customerName: 'Hoàng Quân',
    customerPhone: '0988776655',
    avatarText: 'HQ',
    avatarBg: 'bg-purple-200 text-purple-600',
    lastMessage: 'Cảm ơn shop, hoa lụa nhận đẹp lắm ạ.',
    time: 'Hôm qua',
    unreadCount: 0,
    relatedOrder: 'BLS-8890',
    messages: [
      {
        id: 'mq1',
        sender: 'customer',
        text: 'Shop kiểm tra giúp mình đơn hàng hộp hoa lụa nhé.',
        time: 'Hôm qua, 14:00'
      },
      {
        id: 'mq2',
        sender: 'admin',
        text: 'Dạ đơn của anh đã giao cho shipper hỏa tốc Grab rồi ạ, khoảng 15 phút nữa sẽ tới nơi.',
        time: 'Hôm qua, 14:05'
      },
      {
        id: 'mq3',
        sender: 'customer',
        text: 'Cảm ơn shop, hoa lụa nhận đẹp lắm ạ.',
        time: 'Hôm qua, 15:20'
      }
    ]
  },
  {
    id: 'conv-3',
    customerName: 'Chị Lan Bình Thạnh',
    customerPhone: '0971239876',
    avatarText: 'CL',
    avatarBg: 'bg-emerald-200 text-emerald-700',
    lastMessage: 'Shop có nhận cắm hoa theo mẫu gửi trên Zalo không?',
    time: 'Hôm qua',
    unreadCount: 1,
    messages: [
      {
        id: 'ml1',
        sender: 'customer',
        text: 'Shop có nhận cắm hoa theo mẫu gửi trên Zalo không?',
        time: 'Hôm qua, 18:30'
      }
    ]
  }
];

export const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'vouch-1',
    code: 'BTFLOWER50K',
    title: 'Giảm trực tiếp 50K cho đơn hoa tươi Bình Thạnh',
    discountDisplay: '-50.000 đ',
    discountValue: 50000,
    discountType: 'fixed',
    expiryDate: '30/11/2026',
    status: 'Đang hoạt động',
    usedCount: 42
  },
  {
    id: 'vouch-2',
    code: 'VALENTINE20%',
    title: 'Ưu đãi 20% các mẫu hộp hoa lụa',
    discountDisplay: '-20% (Tối đa 200K)',
    discountValue: 20,
    discountType: 'percent',
    expiryDate: '15/02/2027',
    status: 'Sắp diễn ra',
    usedCount: 0
  },
  {
    id: 'vouch-3',
    code: 'FREESHIPBT',
    title: 'Freeship hỏa tốc trong bán kính 3km Bình Thạnh',
    discountDisplay: 'Free Ship',
    discountValue: 30000,
    discountType: 'fixed',
    expiryDate: '31/12/2026',
    status: 'Đang hoạt động',
    usedCount: 88
  }
];

export const INITIAL_RETURNS: ReturnRequest[] = [
  {
    id: 'ret-1',
    orderId: 'BLS-8890',
    customerName: 'Hoàng Minh Quân',
    customerPhone: '0988776655',
    reason: 'Hoa bị dập một vài cánh do vận chuyển nhanh khi trời mưa',
    refundAmount: 150000,
    refundDisplay: '150.000 đ (Bồi hoàn)',
    status: 'Chờ xử lý',
    createdAt: '26/10/2026'
  },
  {
    id: 'ret-2',
    orderId: 'BLS-8742',
    customerName: 'Lê Ngọc Ánh',
    customerPhone: '0933221100',
    reason: 'Shipper hẹn trễ giờ khai trương 30 phút, muốn bồi hoàn voucher',
    refundAmount: 100000,
    refundDisplay: 'Voucher 100.000 đ',
    status: 'Đã hoàn tiền',
    createdAt: '24/10/2026'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Nguyễn Thu Hà',
    rating: 5,
    comment: 'Shop giao hoa nhanh ghê, đặt ở Điện Biên Phủ mà 30 phút sau đã nhận được bó hồng tươi rói. Rất ưng ý!',
    productName: 'Bó Hoa Hồng Eos Hàn Quốc',
    createdAt: '25/10/2026',
    reply: 'Blossom Garden cảm ơn chị Hà nhiều ạ! Chúc chị luôn xinh đẹp và ngập tràn niềm vui!',
    replyDate: '25/10/2026'
  },
  {
    id: 'rev-2',
    customerName: 'Trần Văn Đức (TechVina)',
    rating: 5,
    comment: 'Kệ hoa khai trương cắm rất đầy đặn, hoa tươi và tông màu cam sang trọng, sếp mình khen nức nở.',
    productName: 'Lẵng Hoa Khai Trương Rực Rỡ',
    createdAt: '24/10/2026'
  },
  {
    id: 'rev-3',
    customerName: 'Minh Thy',
    rating: 5,
    comment: 'Bó hoa tulip lụa màu hồng pastel cưng xỉu, để bàn làm việc nhìn tươi tắn cả ngày.',
    productName: 'Bó Tulip Lụa Pink Charm',
    createdAt: '22/10/2026'
  }
];

export const INITIAL_ADS: AdCampaign[] = [
  {
    id: 'ad-1',
    name: 'Quảng Cáo Hoa Valentine Bình Thạnh',
    platform: 'Facebook',
    budget: 1500000,
    spent: 850000,
    clicks: 1420,
    orders: 38,
    status: 'Đang chạy'
  },
  {
    id: 'ad-2',
    name: 'Hoa Khai Trương Văn Phòng Bình Thạnh & Landmark 81',
    platform: 'Google',
    budget: 1200000,
    spent: 980000,
    clicks: 980,
    orders: 24,
    status: 'Đang chạy'
  },
  {
    id: 'ad-3',
    name: 'Flash Sale Hộp Hoa Lụa Pastel',
    platform: 'TikTok',
    budget: 500000,
    spent: 500000,
    clicks: 650,
    orders: 12,
    status: 'Tạm dừng'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Blossom Garden - Chi nhánh Bình Thạnh',
  workshopAddress: '142/5 Đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP.HCM',
  hotline: '0908.888.247',
  zalo: '0908.888.247',
  openingHours: '07:00 - 21:30 (Tất cả các ngày trong tuần)',
  bankName: 'MBBank (Ngân hàng Quân Đội)',
  bankAccount: '090888824799',
  bankOwner: 'TIEM HOA BLOSSOM GARDEN',
  autoReplyMsg: 'Dạ chào bạn, Blossom Garden Bình Thạnh đã nhận tin nhắn. Florist đang chuẩn bị hoa hỏa tốc và sẽ phản hồi trong ít phút ạ!'
};
