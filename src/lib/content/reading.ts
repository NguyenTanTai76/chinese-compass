export type ReadingPassage = {
  id: string;
  title: string;
  level: number;
  sentences: string[];
  wordCount: number;
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
];
