import { GRADED_READING } from "./graded-reading";

export type ReadingPassage = {
  id: string;
  title: string;
  level: number;
  sentences: string[];
  wordCount: number;
  topic?: string;
  check?: { prompt: string; options: string[]; answer: string; explanation: string };
};

export const READING_PASSAGES: ReadingPassage[] = [
  {
    "id": "good-morning",
    "title": "Chào buổi sáng",
    "level": 1,
    "sentences": [
      "早上好！",
      "我叫小明。",
      "我是中国人。",
      "我今年二十岁。",
      "我是学生。",
      "我喜欢学习中文。"
    ],
    "wordCount": 45
  },
  {
    "id": "my-family",
    "title": "Gia đình tôi",
    "level": 1,
    "sentences": [
      "我家有四口人。",
      "爸爸、妈妈、哥哥和我。",
      "爸爸是医生。",
      "妈妈是老师。",
      "哥哥是学生。",
      "我们都很忙。"
    ],
    "wordCount": 50
  },
  {
    "id": "day-off",
    "title": "Ngày nghỉ",
    "level": 1,
    "sentences": [
      "今天是星期天。",
      "我不上班。",
      "早上八点起床。",
      "吃早饭。",
      "然后去公园。",
      "公园很漂亮。",
      "有很多花。",
      "我拍了很多照片。",
      "中午吃面条。",
      "下午看书。",
      "晚上看电视。",
      "很开心。"
    ],
    "wordCount": 70
  },
  {
    "id": "shopping",
    "title": "Mua sắm",
    "level": 2,
    "sentences": [
      "我去超市买东西。",
      "买苹果、香蕉、面包、牛奶。",
      "苹果很甜。",
      "香蕉很便宜。",
      "面包很好吃。",
      "牛奶很新鲜。",
      "一共五十元。",
      "我用手机付钱。",
      "很方便。"
    ],
    "wordCount": 65
  },
  {
    "id": "hospital-visit",
    "title": "Đi bệnh viện",
    "level": 2,
    "sentences": [
      "昨天我生病了。",
      "头疼，嗓子疼。",
      "妈妈带我去医院。",
      "医生看了看。",
      "说是感冒。",
      "给我开药。",
      "让我多喝水。",
      "多休息。",
      "今天好多了。"
    ],
    "wordCount": 60
  },
  {
    "id": "beijing-trip",
    "title": "Du lịch Bắc Kinh",
    "level": 2,
    "sentences": [
      "上个月我去北京旅行。",
      "坐飞机去的。",
      "参观了故宫。",
      "爬了长城。",
      "吃了烤鸭。",
      "很有名。",
      "也去了天安门广场。",
      "拍了很多照片。",
      "北京很大。",
      "很漂亮。",
      "我想再去。"
    ],
    "wordCount": 75
  },
  {
    "id": "student",
    "title": "Tôi là học sinh",
    "level": 1,
    "sentences": [
      "我是学生。",
      "我在北京学习。",
      "我喜欢中文。",
      "中文很有趣。"
    ],
    "wordCount": 30
  },
  {
    "id": "my-book",
    "title": "Sách của tôi",
    "level": 1,
    "sentences": [
      "这是我的书。",
      "书很新。",
      "我每天看书。",
      "我很喜欢读书。"
    ],
    "wordCount": 28
  },
  {
    "id": "drinking-tea",
    "title": "Tôi uống trà",
    "level": 1,
    "sentences": [
      "我喜欢喝茶。",
      "茶很香。",
      "每天早上我喝一杯茶。",
      "我觉得很好。"
    ],
    "wordCount": 32
  },
  {
    "id": "today",
    "title": "Ngày hôm nay",
    "level": 1,
    "sentences": [
      "今天是星期一。",
      "天气很好。",
      "我不上班。",
      "我去公园。"
    ],
    "wordCount": 26
  },
  {
    "id": "my-friend",
    "title": "Bạn của tôi",
    "level": 1,
    "sentences": [
      "她是我的朋友。",
      "她是中国人。",
      "她在上海工作。",
      "我们很要好。"
    ],
    "wordCount": 30
  },
  {
    "id": "going-to-work",
    "title": "Tôi đi làm",
    "level": 1,
    "sentences": [
      "我每天去公司。",
      "坐地铁去公司。",
      "公司很远。",
      "我很忙。"
    ],
    "wordCount": 28
  },
  {
    "id": "small-family",
    "title": "Gia đình nhỏ",
    "level": 1,
    "sentences": [
      "我家有三口人。",
      "爸爸、妈妈和我。",
      "爸爸是医生。",
      "妈妈是老师。"
    ],
    "wordCount": 30
  },
  {
    "id": "buying-books",
    "title": "Mua sách",
    "level": 2,
    "sentences": [
      "我去书店买书。",
      "这本书很好。",
      "一共五十元。",
      "我用手机付钱。"
    ],
    "wordCount": 30
  },
  {
    "id": "hospital-appointment",
    "title": "Đi bệnh viện",
    "level": 2,
    "sentences": [
      "昨天我生病了。",
      "头疼，嗓子疼。",
      "医生给我开药。",
      "今天好多了。"
    ],
    "wordCount": 28
  },
  {
    "id": "beijing-travel",
    "title": "Du lịch Bắc Kinh",
    "level": 2,
    "sentences": [
      "上个月我去北京旅行。",
      "坐飞机去的。",
      "参观了故宫。",
      "爬了长城。",
      "吃了烤鸭。"
    ],
    "wordCount": 35
  },
  {
    "id": "business-in-china",
    "title": "Làm ăn ở Trung Quốc",
    "level": 2,
    "sentences": [
      "我在上海工作。",
      "公司很大。",
      "每天八点上班。",
      "同事很友好。"
    ],
    "wordCount": 30
  },
  {
    "id": "bookstore",
    "title": "Của hàng sách",
    "level": 2,
    "sentences": [
      "这家书店很大。",
      "书很多。",
      "我买了三本书。",
      "店员很热情。"
    ],
    "wordCount": 28
  },
  {
    "id": "last-week",
    "title": "Tuần cuối",
    "level": 2,
    "sentences": [
      "星期六我去公园。",
      "公园很漂亮。",
      "我看到了很多花。",
      "我很开心。"
    ],
    "wordCount": 32
  },
  {
    "id": "hometown",
    "title": "Tôi về quê",
    "level": 1,
    "sentences": [
      "周末我回老家。",
      "老家很安静。",
      "我见到爸爸妈妈。",
      "我们一起吃饭。"
    ],
    "wordCount": 26
  },
  {
    "id": "buying-a-shirt",
    "title": "Tôi mua áo",
    "level": 1,
    "sentences": [
      "我去商场买衣服。",
      "这件衣服很漂亮。",
      "多少钱？",
      "一百元。"
    ],
    "wordCount": 24
  },
  {
    "id": "learning-chinese",
    "title": "Tôi học tiếng Trung",
    "level": 1,
    "sentences": [
      "我学中文。",
      "中文很难。",
      "但我很喜欢。",
      "每天我练习说话。"
    ],
    "wordCount": 28
  },
  {
    "id": "arriving-in-hanoi",
    "title": "Tôi đến Hà Nội",
    "level": 1,
    "sentences": [
      "我是越南人。",
      "我住在河内。",
      "河内很大。",
      "我喜欢河内。"
    ],
    "wordCount": 26
  },
  {
    "id": "meeting-a-friend",
    "title": "Tôi gặp bạn",
    "level": 1,
    "sentences": [
      "昨天我见到朋友。",
      "我们一起喝茶。",
      "聊了很多。",
      "很开心。"
    ],
    "wordCount": 26
  },
  {
    "id": "supermarket",
    "title": "Tôi đi siêu thị",
    "level": 2,
    "sentences": [
      "我去超市买东西。",
      "买苹果、香蕉和牛奶。",
      "苹果很甜。",
      "一共三十元。"
    ],
    "wordCount": 28
  },
  {
    "id": "booking-a-room",
    "title": "Tôi đặt phòng",
    "level": 2,
    "sentences": [
      "我要订酒店。",
      "房间很干净。",
      "一晚两百元。",
      "我很满意。"
    ],
    "wordCount": 28
  },
  {
    "id": "airport",
    "title": "Tôi đến sân bay",
    "level": 2,
    "sentences": [
      "我坐飞机去北京。",
      "机场很大。",
      "飞机很快。",
      "我很兴奋。"
    ],
    "wordCount": 26
  },
  {
    "id": "watching-a-film",
    "title": "Tôi xem phim",
    "level": 2,
    "sentences": [
      "昨晚我看电影。",
      "电影很好看。",
      "我和朋友一起去。",
      "结束得很晚。"
    ],
    "wordCount": 28
  },
  {
    "id": "housework",
    "title": "Tôi làm nha",
    "level": 2,
    "sentences": [
      "每周日我做家务。",
      "打扫房间，洗衣服。",
      "虽然累，但很有意思。",
      "妈妈很高兴。"
    ],
    "wordCount": 30
  },
  {
    "id": "writing-a-letter",
    "title": "Tôi viết thư",
    "level": 2,
    "sentences": [
      "我给朋友写信。",
      "信里讲了我的生活。",
      "寄给她。",
      "希望她收到。"
    ],
    "wordCount": 28
  },
  {
    "id": "thanh-hoa-trip",
    "title": "Tôi du lịch Thanh Hóa",
    "level": 2,
    "sentences": [
      "上个月我去了清化。",
      "那里风景很美。",
      "我拍了很多照片。",
      "想再去一次。"
    ],
    "wordCount": 30
  },
  {
    "id": "hsk3-library-study",
    "title": "Học tập tại thư viện",
    "level": 3,
    "sentences": [
      "图书馆是学生学习的好地方。",
      "这里安静，书很多，还可以免费上网。",
      "小王每周六都来图书馆，通常待到下午四点。",
      "他说在这里学习效率更高，不容易分心。",
      "借书需要办证，每人最多可借五本书，借期一个月。"
    ],
    "wordCount": 85,
    "topic": "Học tập",
    "check": {
      "prompt": "Tiểu Vương thường ở thư viện đến mấy giờ?",
      "options": ["Buổi sáng", "Đến chiều bốn giờ", "Tối đến chín giờ"],
      "answer": "Đến chiều bốn giờ",
      "explanation": "通常待到下午四点 nghĩa là thường ở đến bốn giờ chiều."
    },
  },
  {
    "id": "hsk3-healthy-life",
    "title": "Sống khỏe mạnh",
    "level": 3,
    "sentences": [
      "健康的生活习惯很重要。",
      "每天早起，吃一顿好的早餐，有助于全天精力充沛。",
      "每周坚持运动三次，可以增强体质。",
      "晚上不要熬夜，保证充足的睡眠。",
      "多喝水，少吃油腻食物，身体会更好。"
    ],
    "wordCount": 78,
    "topic": "Sức khỏe",
    "check": {
      "prompt": "Theo đoạn văn, điều gì không nên làm vào buổi tối?",
      "options": ["Ngủ đủ giấc", "Đêm thức jusqu’à muộn", "Uống nhiều nước"],
      "answer": "Đêm thức jusqu’à muộn",
      "explanation": "晚上不要熬夜 nghĩa là buổi tối không nên thức quá muộn."
    },
  },
  {
    "id": "hsk3-city-life",
    "title": "Đô thị 생활",
    "level": 3,
    "sentences": [
      "大城市生活便利，交通发达，购物也方便。",
      "但是，生活压力大，房租贵，交通拥堵也是常见问题。",
      "很多人为了工作选择住在大城市，但也渴望安静的环境。",
      "周末，有些人会到公园散步，或者到郊外呼吸新鲜空气。",
      "如何在便利与安静之间找到平衡，是许多城市居民的思考。"
    ],
    "wordCount": 92,
    "topic": "Đời sống",
    "check": {
      "prompt": "Nhiều người chọn sống ở thành phố lớn vì lý do gì?",
      "options": ["Để về quê", "Vì công việc", "Để tránh ô nhiễm"],
      "answer": "Vì công việc",
      "explanation": "很多人为了工作选择住在大城市 cho biết lý do là công việc."
    },
  },
  {
    "id": "hsk4-travel-plan",
    "title": "Kế hoạch du lịch",
    "level": 4,
    "sentences": [
      "暑假快到了，小李开始计划暑假旅行。",
      "他想去西安，因为那里有很多历史景点，比如兵马俑和大雁塔。",
      "机票和酒店需要提前预订，否则价格会更高。",
      "小李还打算学一些当地方言，以便与当地人交流。",
      "他希望此行不仅能放松，还能了解更多中华文化。"
    ],
    "wordCount": 88,
    "topic": "Du lịch",
    "check": {
      "prompt": "Tiểu Lý muốn đi Tây An vì lý do gì?",
      "options": ["Đề cập bạn", "Có nhiều di tích lịch sử", "Vé máy bay rẻ"],
      "answer": "Có nhiều di tích lịch sử",
      "explanation": "因为那里有很多历史景点 xác định lý do là di tích lịch sử."
    },
  },
  {
    "id": "hsk4-environment",
    "title": "Bảo vệ môi trường",
    "level": 4,
    "sentences": [
      "随着城市化发展，环境污染问题日益严重。",
      "塑料废弃物难以降解，给海洋生态带来巨大威胁。",
      "越来越多的人开始使用环保袋，拒绝一次性塑料制品。",
      "政府也在推行垃圾分类，鼓励市民参与环保行动。",
      "保护环境需要每个人的参与，从一点一滴做起。"
    ],
    "wordCount": 84,
    "topic": "Môi trường",
    "check": {
      "prompt": "Theo đoạn văn, việc nào giúp bảo vệ môi trường?",
      "options": ["Dùng túi nhựa dùng một lần", "Sử dụng túi môi trường", "Thải rải vào biển"],
      "answer": "Sử dụng túi môi trường",
      "explanation": "越来越多的人开始使用环保袋 cho thấy việc dùng túi bảo vệ môi trường."
    },
  },
  {
    "id": "hsk4-work-life-balance",
    "title": "Cân bằng công việc - cuộc sống",
    "level": 4,
    "sentences": [
      "现代职场压力大，许多人加班已成为常态。",
      "长期加班不仅影响身体健康，也降低工作效率。",
      "有些公司开始倡导弹性工作制，让员工自主安排时间。",
      "下班后适当休息和运动，有助于恢复精力。",
      "工作与生活的平衡，对个人成长同样重要。"
    ],
    "wordCount": 80,
    "topic": "Công việc",
    "check": {
      "prompt": "Theo đoạn văn, làm sao để phục hồi năng lượng sau giờ làm?",
      "options": ["Làm thêm giờ", "Nghỉ ngơi và tập thể dục thích độ", "Làm việc suốt tuần"],
      "answer": "Nghỉ ngơi và tập thể dục thích độ",
      "explanation": "下班后适当休息和运动，有助于恢复精力 nêu cách thức phục hồi năng lượng."
    },
  },
  ...GRADED_READING,
];
