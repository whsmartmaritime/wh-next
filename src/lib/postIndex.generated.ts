export type PostEntry = {
  route: string;
  locale: string;
  title?: string;
  featured?: boolean;
  publishedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  ogImage?: string;
};

export const featureEntry = {
  "en": {
    "route": "/solutions/navigation/ecdis-introduction",
    "locale": "en",
    "title": "ECDIS: Technical Analysis of Vector Charts, Redundancy, and System Integration",
    "featured": true,
    "publishedAt": "2025-10-10",
    "author": "Neo Nguyen",
    "category": "navigation",
    "tags": [
      "ECDIS",
      "ENC",
      "INS",
      "maritime",
      "safety",
      "proactive"
    ],
    "ogImage": "/images/blog/equipment/ecdis-navigation.jpg"
  },
  "vi": {
    "route": "/giai-phap/nghi-khi-hang-hai/gioi-thieu-ecdis",
    "locale": "vi",
    "title": "ECDIS: Phân Tích Kỹ Thuật về Hải Đồ Vector, Dự Phòng và Tích Hợp Hệ Thống",
    "featured": true,
    "publishedAt": "2025-10-10",
    "author": "Neo Nguyen",
    "category": "navigation",
    "tags": [
      "ECDIS",
      "ENC",
      "INS",
      "hàng hải",
      "an toàn",
      "chủ động"
    ],
    "ogImage": "/images/blog/equipment/ecdis-navigation.jpg"
  }
} as const;

export const entries = {
  "en": [
    {
      "route": "/solutions/navigation/speed-log-introduction",
      "locale": "en",
      "title": "Maritime Speed Log: Technical Analysis of DVL, Electromagnetic Log, and Energy Management",
      "featured": false,
      "publishedAt": "2025-08-25",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "Speed Log",
        "DVL",
        "STW",
        "SOG",
        "maritime",
        "fuel efficiency"
      ],
      "ogImage": "/images/blog/equipment/speed-log-dvl.jpg"
    },
    {
      "route": "/solutions/navigation/gnss-introduction",
      "locale": "en",
      "title": "GNSS Navigation Systems: Analyzing Accuracy, Multi-Constellation, and Availability",
      "featured": false,
      "publishedAt": "2025-08-10",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "GNSS",
        "GPS",
        "navigation",
        "maritime",
        "technology"
      ],
      "ogImage": "/images/blog/equipment/gnss-navigation.jpg"
    },
    {
      "route": "/solutions/navigation/echo-sounder-introduction",
      "locale": "en",
      "title": "Maritime Echosounder: Technical Analysis of Dual Frequency and UKC Control",
      "featured": false,
      "publishedAt": "2025-07-25",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "Echosounder",
        "UKC",
        "maritime",
        "hydroacoustics",
        "safety",
        "depth"
      ],
      "ogImage": "/images/blog/equipment/echosounder-tech.jpg"
    },
    {
      "route": "/solutions/navigation/radar-introduction",
      "locale": "en",
      "title": "Maritime RADAR: Pulse Technology, Clutter Suppression, and ARPA System Integration",
      "featured": true,
      "publishedAt": "2025-7-10",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "RADAR",
        "ARPA",
        "maritime",
        "safety",
        "technology"
      ],
      "ogImage": "/images/blog/equipment/maritime-radar.jpg"
    },
    {
      "route": "/solutions/navigation/anemometer-introduction",
      "locale": "en",
      "title": "Maritime Anemometer: Technical Analysis of True Wind, Relative Wind, and Ultrasonic Applications",
      "featured": false,
      "publishedAt": "2025-06-25",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "Anemometer",
        "True Wind",
        "Relative Wind",
        "ultrasonic",
        "maritime",
        "maneuvering"
      ],
      "ogImage": "/images/blog/equipment/ultrasonic-anemometer.jpg"
    },
    {
      "route": "/solutions/navigation/ais-introduction",
      "locale": "en",
      "title": "AIS: Technical Analysis of SOTDMA, Data Integrity, and Traffic Management",
      "featured": false,
      "publishedAt": "2025-06-10",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "AIS",
        "SOTDMA",
        "maritime",
        "safety",
        "VHF",
        "COLREGs"
      ],
      "ogImage": "/images/blog/equipment/maritime-ais.jpg"
    }
  ],
  "vi": [
    {
      "route": "/giai-phap/nghi-khi-hang-hai/gioi-thieu-may-do-toc-do",
      "locale": "vi",
      "title": "Máy Đo Tốc Độ Hàng Hải: Phân Tích Kỹ Thuật DVL, Log Điện Từ và Quản Lý Năng Lượng",
      "featured": false,
      "publishedAt": "2025-08-25",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "Speed Log",
        "DVL",
        "STW",
        "SOG",
        "hàng hải",
        "hiệu suất nhiên liệu"
      ],
      "ogImage": "/images/blog/equipment/speed-log-dvl.jpg"
    },
    {
      "route": "/giai-phap/nghi-khi-hang-hai/gioi-thieu-he-thong-dinh-vi",
      "locale": "vi",
      "title": "Hệ thống Định vị GNSS: Phân Tích Độ Chính Xác, Đa Hệ Thống và Tính Khả Dụng",
      "featured": false,
      "publishedAt": "2025-08-10",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "GNSS",
        "GPS",
        "định vị",
        "hàng hải",
        "công nghệ"
      ],
      "ogImage": "/images/blog/equipment/gnss-navigation.jpg"
    },
    {
      "route": "/giai-phap/nghi-khi-hang-hai/gioi-thieu-may-do-sau",
      "locale": "vi",
      "title": "Máy Đo Sâu Hàng Hải: Phân Tích Kỹ Thuật Tần Số Kép và Kiểm Soát UKC",
      "featured": false,
      "publishedAt": "2025-07-25",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "Echosounder",
        "UKC",
        "hàng hải",
        "thủy âm",
        "an toàn",
        "độ sâu"
      ],
      "ogImage": "/images/blog/equipment/echosounder-tech.jpg"
    },
    {
      "route": "/giai-phap/nghi-khi-hang-hai/gioi-thieu-radar",
      "locale": "vi",
      "title": "RADAR Hàng Hải: Công Nghệ Xung, Giảm Nhiễu và Tích Hợp Hệ Thống ARPA",
      "featured": true,
      "publishedAt": "2025-7-10",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "RADAR",
        "ARPA",
        "hàng hải",
        "an toàn",
        "công nghệ"
      ],
      "ogImage": "/images/blog/equipment/maritime-radar.jpg"
    },
    {
      "route": "/giai-phap/nghi-khi-hang-hai/gioi-thieu-anemometer",
      "locale": "vi",
      "title": "Máy Đo Gió Hàng Hải: Phân Tích Kỹ Thuật Gió Thực, Gió Tương Đối và Ứng Dụng Siêu Âm",
      "featured": false,
      "publishedAt": "2025-06-25",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "Anemometer",
        "Gió Thực",
        "Gió Tương Đối",
        "siêu âm",
        "hàng hải",
        "điều động"
      ],
      "ogImage": "/images/blog/equipment/ultrasonic-anemometer.jpg"
    },
    {
      "route": "/giai-phap/nghi-khi-hang-hai/gioi-thieu-ais",
      "locale": "vi",
      "title": "AIS: Phân Tích Kỹ Thuật về SOTDMA, Tính Toàn Vẹn Dữ Liệu và Quản Lý Giao Thông",
      "featured": false,
      "publishedAt": "2025-06-10",
      "author": "Neo Nguyen",
      "category": "navigation",
      "tags": [
        "AIS",
        "SOTDMA",
        "hàng hải",
        "an toàn",
        "VHF",
        "COLREGs"
      ],
      "ogImage": "/images/blog/equipment/maritime-ais.jpg"
    }
  ]
} as const;

export type Locales = keyof typeof entries;
