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
    "id": "hsk3-work-office",
    "title": "Làm việc tại văn phòng",
    "level": 3,
    "sentences": [
      "小王每天早上八点到公司。",
      "他先打开电脑，然后查看电子邮件。",
      "上午十点有个会议，大家讨论新项目。",
      "中午和同事一起去食堂吃饭。",
      "下午他写报告，直到五点下班。"
    ],
    "wordCount": 78,
    "topic": "Công việc",
    "check": {
      "prompt": "Tiểu王 thường đến công ty mấy giờ sáng?",
      "options": ["Bảy giờ", "Tám giờ", "Chín giờ"],
      "answer": "Tám giờ",
      "explanation": "小王每天早上八点到公司 khẳng định tám giờ sáng."
    },
  },
  {
    "id": "hsk3-family-dinner",
    "title": "Bữa tối gia đình",
    "level": 3,
    "sentences": [
      "周末全家人一起吃晚饭。",
      "爸爸做了很多菜，妈妈摆好碗筷。",
      "弟弟倒水，姐姐端菜。",
      "大家聊天，气氛很温暖。",
      "饭后一起看电视，很开心。"
    ],
    "wordCount": 82,
    "topic": "Gia đình",
    "check": {
      "prompt": "Ai là người nấu ăn trong đoạn văn?",
      "options": ["Em trai", "Cha", "Chị gái"],
      "answer": "Cha",
      "explanation": "爸爸做了很多菜 xác định cha là người nấu ăn."
    },
  },
  {
    "id": "hsk3-travel-shanghai",
    "title": "Du lịch Thượng Hải",
    "level": 3,
    "sentences": [
      "上个月我去了上海旅行。",
      "外滩的夜景很美，很多游客拍照。",
      "我坐地铁去南京路步行街买东西。",
      "那里的小笼包很好吃，我买了很多。",
      "上海很现代，我也很喜欢。"
    ],
    "wordCount": 85,
    "topic": "Du lịch",
    "check": {
      "prompt": "Tác giả đi du lịch thành phố nào?",
      "options": ["Bắc Kinh", "Thượng Hải", "Thiên Chinh"],
      "answer": "Thượng Hải",
      "explanation": "上个月我去了上海旅行 xác định thành phố là Thượng Hải."
    },
  },
  {
    "id": "hsk3-technology-life",
    "title": "Công nghệ và cuộc sống",
    "level": 3,
    "sentences": [
      "现在很多人都用手机支付。",
      "坐出租车、买咖啡、订机票都可以用手机。",
      "但是，老年人不会用手机，生活不方便。",
      "我们应该教他们用，让生活更轻松。",
      "科技改变生活，也需要关心每一个人。"
    ],
    "wordCount": 80,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, ai cần được hướng dẫn dùng điện thoại?",
      "options": ["Người trẻ", "Người già", "Khách du lịch"],
      "answer": "Người già",
      "explanation": "但是，老年人不会用手机 xác định người già cần được hướng dẫn."
    },
  },
  {
    "id": "hsk3-learning-chinese",
    "title": "Học tiếng Trung",
    "level": 3,
    "sentences": [
      "学习中文不容易，但很有趣。",
      "汉字很多，拼音也要花时间记。",
      "每天练习听说读写，进步很快。",
      "看中国电影，听中文歌曲，可以学得更好。",
      "坚持下去，一定能说好中文。"
    ],
    "wordCount": 76,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Theo đoạn văn, cách nào giúp học tiếng Trung tốt hơn?",
      "options": ["Chỉ học từ vựng", "Xem phim Trung và nghe nhạc Trung", "Học một mình mà không luyện"],
      "answer": "Xem phim Trung và nghe nhạc Trung",
      "explanation": "看中国电影，听中文歌曲，可以学得更好 nêu phương pháp học hiệu quả."
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
  {
    "id": "hsk4-business-email",
    "title": "Email kinh doanh",
    "level": 4,
    "sentences": [
      "尊敬的经理，",
      "我写这封信是为了提出一个建议。",
      "我们公司的办公时间可以更灵活一些。",
      "这样员工可以更好地平衡工作和生活。",
      "希望您能考虑这个建议。",
      "祝工作顺利。"
    ],
    "wordCount": 90,
    "topic": "Công việc",
    "check": {
      "prompt": "Tác giả viết email này để làm gì?",
      "options": ["Xin nghỉ việc", "Đề xuất giờ làm linh hoạt", "Yêu cầu tăng lương"],
      "answer": "Đề xuất giờ làm linh hoạt",
      "explanation": "我写这封信是为了提出一个建议 + 我们公司的办公时间可以更灵活一些 xác định mục đích là đề xuất giờ làm linh hoạt."
    },
  },
  {
    "id": "hsk4-city-comparison",
    "title": "So sánh thành phố",
    "level": 4,
    "sentences": [
      "北京和上海都是中国的大城市。",
      "北京有很多历史景点，比如故宫和长城。",
      "上海更现代，有很多高楼大厦。",
      "两个城市的人口都很多，交通也很发达。",
      "但北京的冬天比上海冷。"
    ],
    "wordCount": 88,
    "topic": "Du lịch",
    "check": {
      "prompt": "Theo đoạn văn, thành phố nào đông cao hơn?",
      "options": ["Bắc Kinh", "Thượng Hải", "Hai thành phố bằng nhau"],
      "answer": "Thượng Hải",
      "explanation": "上海更现代，有很多高楼大厦 xác định Thượng Hải hiện đại/cao hơn."
    },
  },
  {
    "id": "hsk4-health-exercise",
    "title": "Sức khỏe và thể dục",
    "level": 4,
    "sentences": [
      "健康是我们最重要的财富。",
      "每天运动半小时，可以增强体质。",
      "多吃蔬菜水果，少吃油腻食物。",
      "保证充足的睡眠，不要熬夜。",
      "良好的生活习惯能让我们更有精力。"
    ],
    "wordCount": 82,
    "topic": "Sức khỏe",
    "check": {
      "prompt": "Theo đoạn văn, điều gì không nên làm để giữ sức khỏe?",
      "options": ["Uống nhiều nước", "Thức quá muộn", "Ăn nhiều rau quả"],
      "answer": "Thức quá muộn",
      "explanation": "不要熬夜 khẳng định không nên thức quá muộn."
    },
  },
  {
    "id": "hsk4-online-shopping",
    "title": "Mua sắm trực tuyến",
    "level": 4,
    "sentences": [
      "现在很多人喜欢在网上购物。",
      "网上购物方便，价格也便宜。",
      "但是，有时候网上的东西和照片不一样。",
      "买东西前要看评价，选信誉好的卖家。",
      "网购要理性，不要买不需要的东西。"
    ],
    "wordCount": 86,
    "topic": "Mua sắm",
    "check": {
      "prompt": "Theo đoạn văn, trước khi mua sắm trực tuyến nên làm gì?",
      "options": ["Mua ngay sản phẩm rẻ nhất", "Xem đánh giá và chọn người bán uy tín", "Không cần tìm hiểu"],
      "answer": "Xem đánh giá và chọn người bán uy tín",
      "explanation": "买东西前要看评价，选信誉好的卖家 xác định nên xem đánh giá và chọn người bán uy tín."
    },
  },
  {
    "id": "hsk4-education-online",
    "title": "Giáo dục trực tuyến",
    "level": 4,
    "sentences": [
      "随着互联网的发展，网上教育越来越普及。",
      "学生可以在家里上课，不需要去学校。",
      "这样节省了时间，也更方便。",
      "但是，网上学习缺乏面对面的交流。",
      "老师和学生要更努力地沟通。"
    ],
    "wordCount": 84,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Theo đoạn văn, nhược điểm của giáo dục trực tuyến là gì?",
      "options": ["Học phí đắt", "Thiếu giao tiếp trực tiếp", "Không có giáo viên"],
      "answer": "Thiếu giao tiếp trực tiếp",
      "explanation": "但是，网上学习缺乏面对面的交流 xác định nhược điểm là thiếu giao tiếp mặt đối mặt."
    },
  },
  ...GRADED_READING,
  {
    "id": "hsk5-work-life-balance-reading",
    "title": "Cân bằng công việc và cuộc sống",
    "level": 5,
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
    }
  },
  {
    "id": "hsk5-environment-reading",
    "title": "Bảo vệ môi trường",
    "level": 5,
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
      "options": ["Dùng túi nhựa dùng một lần", "Sử dụng túi môi trường", "Thải rác vào biển"],
      "answer": "Sử dụng túi môi trường",
      "explanation": "越来越多的人开始使用环保袋 cho thấy việc dùng túi bảo vệ môi trường."
    }
  },
  {
    "id": "hsk5-education-reading",
    "title": "Giáo dục và học tập",
    "level": 5,
    "sentences": [
      "教育是个人发展的基础，也是社会进步的动力。",
      "随着科技的发展，在线教育越来越受欢迎。",
      "学生可以随时随地通过网络学习新知识。",
      "但是，传统课堂教学仍然有其不可替代的作用。",
      "如何结合线上和线下教育，是未来教育发展的方向。"
    ],
    "wordCount": 78,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Theo đoạn văn, giáo dục truyền thống có thể bị thay thế hoàn toàn bởi giáo dục trực tuyến không?",
      "options": ["Có, hoàn toàn có thể", "Không, vẫn có giá trị không thể thay thế", "Chỉ trong một số trường hợp"],
      "answer": "Không, vẫn có giá trị không thể thay thế",
      "explanation": "传统课堂教学仍然有其不可替代的作用 affirms traditional teaching still has irreplaceable role."
    }
  },
  {
    "id": "hsk5-health-reading",
    "title": "Sức khỏe và thể dục",
    "level": 5,
    "sentences": [
      "健康的生活习惯对每个人都很重要。",
      "每天早起，吃一顿好的早餐，有助于全天精力充沛。",
      "每周坚持运动三次，可以增强体质。",
      "晚上不要熬夜，保证充足的睡眠。",
      "多喝水，少吃油腻食物，身体会更好。"
    ],
    "wordCount": 78,
    "topic": "Sức khỏe",
    "check": {
      "prompt": "Theo đoạn văn, điều gì không nên làm vào buổi tối?",
      "options": ["Ngủ đủ giấc", "Đêm thức quá muộn", "Uống nhiều nước"],
      "answer": "Đêm thức quá muộn",
      "explanation": "晚上不要熬夜 nghĩa là buổi tối không nên thức quá muộn."
    }
  },
  {
    "id": "hsk5-travel-reading",
    "title": "Du lịch và khám phá",
    "level": 5,
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
      "options": ["Để gặp bạn", "Có nhiều di tích lịch sử", "Vé máy bay rẻ"],
      "answer": "Có nhiều di tích lịch sử",
      "explanation": "因为那里有很多历史景点 xác định lý do là di tích lịch sử."
    }
  },
  {
    "id": "hsk6-academic-reading",
    "title": "Nghiên cứu học thuật",
    "level": 6,
    "sentences": [
      "为了了解学生的课外阅读习惯，研究组在图书馆门口发放了问卷。",
      "结果显示，大部分受访者每周至少借一次书。",
      "然而，这一比例并不能代表全校学生，因为几乎不去图书馆的人本来就不容易被抽到。",
      "研究组随后改用随机抽取的学号邀请学生填写，并比较两次调查的结果。"
    ],
    "wordCount": 92,
    "topic": "Học thuật",
    "check": {
      "prompt": "Hạn chế chính của khảo sát lần đầu là gì?",
      "options": ["Địa điểm lấy mẫu thiên về người thường đến thư viện", "Câu hỏi chỉ cho một lựa chọn", "Nhóm nghiên cứu dùng sai mã sinh viên"],
      "answer": "Địa điểm lấy mẫu thiên về người thường đến thư viện",
      "explanation": "Người hiếm khi đến thư viện ít có cơ hội được khảo sát, làm mẫu không đại diện."
    }
  },
  {
    "id": "hsk6-society-reading",
    "title": "Xã hội và phát triển",
    "level": 6,
    "sentences": [
      "随着经济的发展，城乡差距仍然是一个重要问题。",
      "大城市的生活机会多，但生活成本也高。",
      "农村地区虽然生活节奏慢，但就业机会较少。",
      "政府正在努力缩小城乡差距，促进区域协调发展。"
    ],
    "wordCount": 76,
    "topic": "Xã hội",
    "check": {
      "prompt": "Theo đoạn văn, vấn đề gì vẫn là một thách thức quan trọng?",
      "options": ["Không có việc làm", "Khoảng cách thành thị-nông thôn", "Số lượng người dân quá多"],
      "answer": "Khoảng cách thành thị-nông thôn",
      "explanation": "城乡差距仍然是一个重要问题 xác định khoảng cách thành thị-nông thôn là vấn đề quan trọng."
    }
  },
  {
    "id": "hsk6-culture-reading",
    "title": "Văn hóa truyền thống",
    "level": 6,
    "sentences": [
      "中国的传统节日有春节、中秋节、端午节等。",
      "春节是中国人最重要的节日，全家人会团聚在一起。",
      "中秋节人们吃月饼，赏月，象征团圆。",
      "这些传统节日承载着丰富的文化内涵。"
    ],
    "wordCount": 68,
    "topic": "Văn hóa",
    "check": {
      "prompt": "Lễ hội nào quan trọng nhất đối với người Trung Quốc?",
      "options": ["Trung Thu", "Xuân (Tết Nguyên Đán)", "Đoan Ngọ"],
      "answer": "Xuân (Tết Nguyên Đán)",
      "explanation": "春节是中国人最重要的节日 xác định Xuân là quan trọng nhất."
    }
  },
  {
    "id": "hsk7-academic-reading",
    "title": "Luận văn và nghiên cứu",
    "level": 7,
    "sentences": [
      "学术写作要求严谨的逻辑和准确的引用。",
      "每个观点都需要有充分的证据支持。",
      "抄袭是学术不端行为，必须严格避免。",
      "良好的学术规范是科研诚信的基础。"
    ],
    "wordCount": 58,
    "topic": "Học thuật",
    "check": {
      "prompt": "Theo đoạn văn, cái gì là hành vi vi phạm đạo đức học thuật?",
      "options": ["Trích dẫn nguồn", "Làm giả/trộm bài", "Viết đoạn kết"],
      "answer": "Làm giả/trộm bài",
      "explanation": "抄袭是学术不端行为 khẳng định làm giả/trộm bài là vi phạm đạo đức."
    }
  },
  {
    "id": "hsk7-society-reading",
    "title": "Công bằng xã hội",
    "level": 7,
    "sentences": [
      "社会公平正义是每个人都追求的目标。",
      "教育资源的分配应该更加公平。",
      "城乡差距、收入差距等问题需要逐步解决。",
      "只有每个人都有平等的机会，社会才能和谐发展。"
    ],
    "wordCount": 64,
    "topic": "Xã hội",
    "check": {
      "prompt": "Theo đoạn văn, điều gì cần được phân phối công bằng hơn?",
      "options": ["Tài sản cá nhân", "Tài nguyên giáo dục", "Công việc"],
      "answer": "Tài nguyên giáo dục",
      "explanation": "教育资源的分配应该更加公平 chỉ rõ tài nguyên giáo dục."
    }
  },
  {
    "id": "hsk8-policy-reading",
    "title": "Chính sách và quản lý",
    "level": 8,
    "sentences": [
      "政府应该加强对环境污染的监管。",
      "企业在发展经济的同时，也要承担社会责任。",
      "可持续发展是未来的重要方向。",
      "公众参与是环境治理的重要组成部分。"
    ],
    "wordCount": 62,
    "topic": "Chính sách",
    "check": {
      "prompt": "Theo đoạn văn, ai cần tham gia vào việc quản lý môi trường?",
      "options": ["Chỉ chính phủ", "Chỉ doanh nghiệp", "Công cộng cũng cần tham gia"],
      "answer": "Công cộng cũng cần tham gia",
      "explanation": "公众参与是环境治理的重要组成部分 khẳng định công cộng là thành phần quan trọng."
    }
  },
  {
    "id": "hsk8-tech-reading",
    "title": "Công nghệ và cuộc sống",
    "level": 8,
    "sentences": [
      "人工智能正在深刻改变我们的生活方式。",
      "从智能家居到自动驾驶，技术无处不在。",
      "但是，技术发展也带来了一些伦理问题。",
      "我们需要在享受便利的同时，警惕潜在风险。"
    ],
    "wordCount": 60,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, cái gì đi kèm với sự phát triển của công nghệ?",
      "options": ["Chỉ có lợi ích", "Một số vấn đề đạo đức", "Không có thay đổi nào"],
      "answer": "Một số vấn đề đạo đức",
      "explanation": "技术发展也带来了一些伦理问题 nêu ra vấn đề đạo đức."
    }
  },
  {
    "id": "hsk9-academic-reading",
    "title": "Nghiên cứu cao cấp",
    "level": 9,
    "sentences": [
      "跨学科研究正在成为学术发展的重要趋势。",
      "单一学科的方法往往难以解决复杂的现实问题。",
      "整合不同领域的知识和方法，可以产生新的洞察。",
      "未来的学术研究需要更加开放和合作。"
    ],
    "wordCount": 62,
    "topic": "Học thuật",
    "check": {
      "prompt": "Theo đoạn văn, phương pháp học thuật nào khó giải quyết vấn đề phức tạp?",
      "options": ["Nghiên cứu đa ngành", "Một ngành học đơn lẻ", "Nghiên cứu hợp tác"],
      "answer": "Một ngành học đơn lẻ",
      "explanation": "单一学科的方法往往难以解决复杂的现实问题 khẳng định phương pháp đơn ngành khó giải quyết."
    }
  },
  {
    "id": "hsk9-society-reading",
    "title": "Toàn cầu hóa và văn hóa",
    "level": 9,
    "sentences": [
      "全球化对地方文化产生了深远的影响。",
      "一方面，文化交流促进了相互理解。",
      "另一方面，一些地方传统文化面临消失的风险。",
      "如何在全球化中保护文化多样性，是一个重要课题。"
    ],
    "wordCount": 62,
    "topic": "Xã hội",
    "check": {
      "prompt": "Theo đoạn văn, điều gì đang đối mặt nguy cơ mất tích?",
      "options": ["Văn hóa thế giới", "Một số văn hóa truyền thống địa phương", "Ngôn ngữ quốc tế"],
      "answer": "Một số văn hóa truyền thống địa phương",
      "explanation": "一些地方传统文化面临消失的风险 xác định văn hóa truyền thống địa phương."
    }
  },
  {
    "id": "hsk9-philosophy-reading",
    "title": "Triết học và sự sống",
    "level": 9,
    "sentences": [
      "幸福的定义因人而异。",
      "有人认为幸福是物质富足，有人则认为是精神满足。",
      "哲学思考帮助我们理解生活的意义。",
      "找到属于自己的幸福之路，才是人生的目标。"
    ],
    "wordCount": 58,
    "topic": "Triết học",
    "check": {
      "prompt": "Theo đoạn văn, định nghĩa hạnh phúc như thế nào?",
      "options": ["Cùng nhau cho tất cả", "Phụ thuộc vào mỗi người", "Chỉ là sławny matériel"],
      "answer": "Phụ thuộc vào mỗi người",
      "explanation": "幸福的定义因人而异 khẳng định định nghĩa khác tùy theo mỗi người."
    }
  }
];
