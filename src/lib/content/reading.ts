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
    "id": "hsk3-rent-apartment",
    "title": "Thuê căn hộ",
    "level": 3,
    "sentences": [
      "我想租一套公寓。",
      "公寓要靠近地铁站，方便上班。",
      "一个月租金三千元，不包括水电费。",
      "房东说可以签一年的合同。",
      "我下周六去看房子。"
    ],
    "wordCount": 68,
    "topic": "Sinh hoạt",
    "check": {
      "prompt": "Tác giả muốn thuê loại nhà ở nào?",
      "options": ["Biệt thự", "Căn hộ", "Nhà riêng"],
      "answer": "Căn hộ",
      "explanation": "我想租一套公寓 xác định muốn thuê căn hộ."
    },
  },
  {
    "id": "hsk3-see-doctor",
    "title": "Khám bệnh",
    "level": 3,
    "sentences": [
      "昨天我感冒了，头疼嗓子疼。",
      "妈妈带我去医院看医生。",
      "医生说我需要吃药，多喝水。",
      "我今天吃了药，感觉好多了。",
      "明天我就可以去上班了。"
    ],
    "wordCount": 72,
    "topic": "Sức khỏe",
    "check": {
      "prompt": "Ai đưa tác giả đến bệnh viện?",
      "options": ["Bạn", "Mẹ", "Bạn tình"],
      "answer": "Mẹ",
      "explanation": "妈妈带我去医院看医生 xác định mẹ là người đưa đi."
    },
  },
  {
    "id": "hsk3-job-interview",
    "title": "Phỏng vấn làm việc",
    "level": 3,
    "sentences": [
      "下周一我有面试。",
      "公司在市中心，我要坐地铁去。",
      "我准备好了简历，也穿了正式衣服。",
      "希望面试顺利，能找到好工作。",
      "如果录取，下个月就可以开始工作。"
    ],
    "wordCount": 74,
    "topic": "Công việc",
    "check": {
      "prompt": "Tác giả đi phỏng vấn khi nào?",
      "options": ["Thứ Hai tuần sau", "Thứ Ba tuần sau", "Thứ Tư tuần sau"],
      "answer": "Thứ Hai tuần sau",
      "explanation": "下周一我有面试 xác định là Thứ Hai tuần sau."
    },
  },
  {
    "id": "hsk3-library-card",
    "title": "Làm thẻ thư viện",
    "level": 3,
    "sentences": [
      "我想在图书馆借书。",
      "办借书证需要身份证和一张照片。",
      "每人最多可以借五本书，借期一个月。",
      "逾期归还需要交罚款。",
      "图书馆周一到周日开放。"
    ],
    "wordCount": 70,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Làm thẻ借书 cần giấy tờ gì?",
      "options": ["Chứng minh thư và ảnh", "Hộ khẩu và giấy sinh hoạt", "Bằng tốt nghiệp"],
      "answer": "Chứng minh thư và ảnh",
      "explanation": "办借书证需要身份证和一张照片 xác định cần CMND và ảnh."
    },
  },
  {
    "id": "hsk3-subway-trip",
    "title": "Đi tàu điện ngầm",
    "level": 3,
    "sentences": [
      "我每天坐地铁上班。",
      "地铁很快，也不堵车。",
      "一张票四元，乘坐一个小时以内。",
      "车厢里很安静，大家都在看手机。",
      "坐地铁比打车便宜很多。"
    ],
    "wordCount": 66,
    "topic": "Du lịch",
    "check": {
      "prompt": "Theo đoạn văn, giá một vé tàu điện ngầm là bao nhiêu?",
      "options": ["Hai元", "Bốn元", "Năm元"],
      "answer": "Bốn元",
      "explanation": "一张票四元 xác định giá một vé là bốn元."
    },
  },
  {
    "id": "hsk3-supermarket",
    "title": "Mua sắm siêu thị",
    "level": 3,
    "sentences": [
      "周末我去超市买东西。",
      "超市里有蔬菜、水果、肉类和饮料。",
      "苹果很甜，一斤五元。",
      "我买了两公斤苹果和一瓶牛奶。",
      "在收银台用手机付款，很快。"
    ],
    "wordCount": 68,
    "topic": "Mua sắm",
    "check": {
      "prompt": "Tác giả mua gì ở siêu thị?",
      "options": ["Táo và sữa", "Rau và thịt", "Nước ngọt và bánh"],
      "answer": "Táo và sữa",
      "explanation": "我买了两公斤苹果和一瓶牛奶 xác định mua táo và sữa."
    },
  },
  {
    "id": "hsk3-phone-call",
    "title": "Gọi điện thoại",
    "level": 3,
    "sentences": [
      "昨天下午我给朋友打电话。",
      "他问我周末有没有空。",
      "我说周六下午可以去公园。",
      "他同意了，我们两点钟见。",
      "挂断电话后我很开心。"
    ],
    "wordCount": 66,
    "topic": "Giao tiếp",
    "check": {
      "prompt": "Hai người hẹn gặp nhau khi nào?",
      "options": ["Thứ Bảy chiều", "Chủ Nhật sáng", "Thứ Bảy sáng"],
      "answer": "Thứ Bảy chiều",
      "explanation": "我说周六下午可以去公园 xác định Thứ Bảy chiều."
    },
  },
  {
    "id": "hsk3-weekend-plan",
    "title": "Kế hoạch cuối tuần",
    "level": 3,
    "sentences": [
      "这个周末我想回老家看看。",
      "坐火车去需要六个小时。",
      "爸爸妈妈很高兴，说会在车站接我。",
      "我打算带一些水果给他们。",
      "很久没有回家，想他们了。"
    ],
    "wordCount": 70,
    "topic": "Gia đình",
    "check": {
      "prompt": "Tác giả đi về quê bằng phương tiện gì?",
      "options": ["Máy bay", "Tàu hỏa", "Xe buýt"],
      "answer": "Tàu hỏa",
      "explanation": "坐火车去需要六个小时 xác định đi bằng tàu hỏa."
    },
  },
  {
    "id": "hsk3-chinese-food",
    "title": "Món ăn Trung Quốc",
    "level": 3,
    "sentences": [
      "中国菜很有名，种类很多。",
      "北京烤鸭和四川火锅很受欢迎。",
      "我喜欢吃饺子，尤其是冬天。",
      "做饺子不难，面粉、肉和菜就可以。",
      "全家一起包饺子，很热闹。"
    ],
    "wordCount": 72,
    "topic": "Ẩm thực",
    "check": {
      "prompt": "Theo đoạn văn, món ăn nào được nhắc đến là phổ biến?",
      "options": ["Bánh bao", "Bé京烤 vịt", "Mì Ý"],
      "answer": "Bé京烤 vịt",
      "explanation": "北京烤鸭和四川火锅很受欢迎 xác định Bắc Kinh cất vịt phổ biến."
    },
  },
  {
    "id": "hsk3-meet-friend",
    "title": "Gặp bạn",
    "level": 3,
    "sentences": [
      "昨天我在公园见到了老朋友。",
      "他现在在一家公司做经理。",
      "我们聊了很多，谈工作和生活。",
      "他请我喝咖啡，聊了两个小时。",
      "告别时我们约好下个月再见。"
    ],
    "wordCount": 68,
    "topic": "Bạn bè",
    "check": {
      "prompt": "Bạn của tác giả làm nghề gì hiện tại?",
      "options": ["Giảng viên", "Kinh doanh", "Quản lý"],
      "answer": "Quản lý",
      "explanation": "他现在在一家公司做经理 xác định bạn là quản lý."
    },
  },
  {
    "id": "hsk3-buy-clothes",
    "title": "Mua quần áo",
    "level": 3,
    "sentences": [
      "我去商场买一件外套。",
      "这件蓝色外套很合适，价格不贵。",
      "售货员说可以试穿一下。",
      "我试穿后觉得很舒服，就买了。",
      "付款时用了手机支付。"
    ],
    "wordCount": 66,
    "topic": "Mua sắm",
    "check": {
      "prompt": "Tác giả mua áo loại gì?",
      "options": ["Áo khoác màu xanh", "Áo thun màu đỏ", "Quần jeans"],
      "answer": "Áo khoác màu xanh",
      "explanation": "这件蓝色外套很合适 xác định mua áo khoác màu xanh."
    },
  },
  {
    "id": "hsk3-post-office",
    "title": "Đi bưu điện",
    "level": 3,
    "sentences": [
      "我想寄一个包裹给朋友。",
      "在填单时需要写清楚地址和电话。",
      "工作人员称重后说费用是二十元。",
      "我买了邮票，把包裹交给他。",
      "他说三天可以送到。"
    ],
    "wordCount": 68,
    "topic": "Sinh hoạt",
    "check": {
      "prompt": "Phí gửi bưu kiện là bao nhiêu?",
      "options": ["Mười元", "Hai mươi元", "Ba mươi元"],
      "answer": "Hai mươi元",
      "explanation": "工作人员称重后说费用是二十元 xác định phí hai mươi元."
    },
  },
  {
    "id": "hsk3-watch-movie",
    "title": "Xem phim",
    "level": 3,
    "sentences": [
      "周五晚上我和朋友去看电影。",
      "这部电影是爱情片，很感人。",
      "电影院里人很多，座位都坐满了。",
      "看完后我们讨论剧情，觉得很好看。",
      "出电影院时已经晚上十点了。"
    ],
    "wordCount": 72,
    "topic": "Giải trí",
    "check": {
      "prompt": "Tác giả xem thể loại phim gì?",
      "options": ["Hành động", "Tình cảm", "Kinh dị"],
      "answer": "Tình cảm",
      "explanation": "这部电影是爱情片 xác định là phim tình cảm."
    },
  },
  {
    "id": "hsk3-taxi",
    "title": "Đi taxi",
    "level": 3,
    "sentences": [
      "昨天下雨，我打了一辆车。",
      "司机开得很快，十分钟就到了。",
      "车费是二十五元，我给他三十元。",
      "他找给我五元钱。",
      "下次下雨我也想打车。"
    ],
    "wordCount": 64,
    "topic": "Du lịch",
    "check": {
      "prompt": "Tác giả trả tiền taxi bao nhiêu?",
      "options": ["Hai mươi元", "Ba mươi元", "Ba mươi lăm元"],
      "answer": "Ba mươi元",
      "explanation": "我给他三十元 xác định trả ba mươi元."
    },
  },
  {
    "id": "hsk3-birthday-party",
    "title": "Tiệc sinh nhật",
    "level": 3,
    "sentences": [
      "昨天是姐姐的生日，我们在家办了一个小派对。",
      "我买了一个蛋糕，妈妈做了好多菜。",
      "姐姐吹灯蜡烛，许了一个愿望。",
      "大家一起唱生日歌，气氛很热闹。",
      "姐姐很高兴，说这是最难忘的生日。"
    ],
    "wordCount": 74,
    "topic": "Gia đình",
    "check": {
      "prompt": "Ai là sinh nhật nhân của tiệc?",
      "options": ["Em gái", "Chị gái", "Bạn"],
      "answer": "Chị gái",
      "explanation": "昨天是姐姐的生日 xác định sinh nhật nhân là chị gái."
    },
  },
  {
    "id": "hsk3-learn-cook",
    "title": "Học nấu ăn",
    "level": 3,
    "sentences": [
      "我想学习做中国菜。",
      "老师先教怎么切菜，再教怎么炒菜。",
      "第一次做菜，我把盐放多了，菜太咸。",
      "老师说不要急，慢慢来就会好。",
      "现在我可以做两道菜了，很有成就感。"
    ],
    "wordCount": 70,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Lần đầu nấu ăn, tác giả đặt quá nhiều gì?",
      "options": ["Đường", "Muối", "Nước tương"],
      "answer": "Muối",
      "explanation": "我把盐放多了 xác định đặt quá nhiều muối."
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
  {
    "id": "hsk4-job-search",
    "title": "Tìm việc làm",
    "level": 4,
    "sentences": [
      "小王最近在找工作，他每天投递很多简历。",
      "上周末他参加了一家公司的面试，表现得很好。",
      "面试官询问他的工作经验和技能。",
      "小王自信地回答，最后拿到了录用通知。",
      "他很快就要开始新工作了。"
    ],
    "wordCount": 90,
    "topic": "Công việc",
    "check": {
      "prompt": "Kết quả phỏng vấn của小王 là gì?",
      "options": ["Bị từ chối", "Được nhận làm việc", "Chờ kết quả"],
      "answer": "Được nhận làm việc",
      "explanation": "最后拿到了录用通知 xác định đã được nhận công việc."
    },
  },
  {
    "id": "hsk4-healthy-living",
    "title": "Sống khỏe mạnh",
    "level": 4,
    "sentences": [
      "为了保持健康，很多人开始注重饮食和运动。",
      "每天吃蔬菜和水果，少吃油腻的食物，对身体有好处。",
      "坚持每天走一万步，可以增强体质。",
      "充足的睡眠也非常重要，建议每天睡七到八个小时。",
      "只有生活规律，才能精力充沛。"
    ],
    "wordCount": 92,
    "topic": "Sức khỏe",
    "check": {
      "prompt": "Theo đoạn văn, mỗi ngày nên ngủ bao nhiêu giờ?",
      "options": ["五到六 giờ", "七到八 giờ", "九到十 giờ"],
      "answer": "七到八 giờ",
      "explanation": "建议每天睡七到八个小时 xác định ngủ bảy đến tám giờ."
    },
  },
  {
    "id": "hsk4-city-life",
    "title": "Cuộc sống đô thị",
    "level": 4,
    "sentences": [
      "大城市生活节奏快，交通拥堵是常见现象。",
      "很多人选择乘坐地铁上班，可以避开堵车。",
      "城市里有很多购物中心和娱乐场所，生活很方便。",
      "但是，生活压力大，人与人之间的交流变少了。",
      "越来越多的人渴望回到安静的乡村生活。"
    ],
    "wordCount": 94,
    "topic": "Sinh hoạt",
    "check": {
      "prompt": "Theo đoạn văn, nhược điểm của sống thành phố là gì?",
      "options": ["Giao thông tắc", "Áp lực lớn, giao tiếp ít", "Không có trung tâm mua sắm"],
      "answer": "Áp lực lớn, giao tiếp ít",
      "explanation": "生活压力大，人与人之间的交流变少了 xác định nhược điểm."
    },
  },
  {
    "id": "hsk4-learning-chinese",
    "title": "Học tiếng Trung",
    "level": 4,
    "sentences": [
      "学习汉语不是一件容易的事，尤其是汉字。",
      "很多外国人觉得汉字难写，也难记。",
      "但是，只要每天坚持练习，进步就会很明显。",
      "可以通过看电影、听歌曲和和中国人交流来提高。",
      "兴趣是最好的老师，喜欢汉语就能学好。"
    ],
    "wordCount": 88,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Theo đoạn văn, cách nào không giúp提高 tiếng Trung?",
      "options": ["Xem phim", "Nghe nhạc", "Chỉ học teoria"],
      "answer": "Chỉ học teoria",
      "explanation": "Can through xem phim, nghe nhạc và giao tiếp được đề cập; chỉ học lý thuyết không được nhắc."
    },
  },
  {
    "id": "hsk4-environment",
    "title": "Bảo vệ môi trường",
    "level": 4,
    "sentences": [
      "环境保护是每个人的责任。",
      "我们可以从减少使用一次性塑料制品开始。",
      "出门随身带购物袋，不使用塑料袋。",
      "不用的时候记得关灯，节约用水。",
      "只要大家都行动起来，地球会变得更美好。"
    ],
    "wordCount": 86,
    "topic": "Môi trường",
    "check": {
      "prompt": "Theo đoạn văn, việc nào giúp bảo vệ môi trường?",
      "options": ["Sử dụng túi nilon dùng một lần", "Mang túi mua sắm khi đi ngoài", "Bỏ rác vào đường"],
      "answer": "Mang túi mua sắm khi đi ngoài",
      "explanation": "出门随身带购物袋，不使用塑料袋 xác định mang túi mua sắm."
    },
  },
  {
    "id": "hsk4-family",
    "title": "Gia đình",
    "level": 4,
    "sentences": [
      "家是最温暖的地方，无论在哪里工作，都想回家。",
      "父母一直支持孩子的梦想，鼓励他们勇敢追求。",
      "周末全家人一起吃饭，分享一周的趣事。",
      "虽然有时候会有意见分歧，但家人总是互相理解。",
      "家庭的爱让人感到安心和幸福。"
    ],
    "wordCount": 90,
    "topic": "Gia đình",
    "check": {
      "prompt": "Theo đoạn văn, điều gì khiến người ta cảm thấy an tâm?",
      "options": ["Làm việc xa nhà", "Tình yêu của gia đình", "Có nhiều tiền"],
      "answer": "Tình yêu của gia đình",
      "explanation": "家庭的爱让人感到安心和幸福 xác định tình yêu gia đình."
    },
  },
  {
    "id": "hsk4-travel-experience",
    "title": "Kinh nghiệm du lịch",
    "level": 4,
    "sentences": [
      "暑假到了，很多人计划去旅游。",
      "出发前要提前预订机票和酒店，这样更省钱。",
      "旅游时要注意安全，保管好护照和财物。",
      "尝试当地美食是旅行的一大乐趣。",
      "旅行不仅能放松身心，还能开阔眼界。"
    ],
    "wordCount": 92,
    "topic": "Du lịch",
    "check": {
      "prompt": "Theo đoạn văn, trước khi đi du lịch nên làm gì?",
      "options": ["Đặt vé máy bay và khách sạn trước", "Mua nhiều đồ dùng", "Chuẩn bị áo hướng dẫn"],
      "answer": "Đặt vé máy bay và khách sạn trước",
      "explanation": "出发前要提前预订机票和酒店 xác định đặt trước."
    },
  },
  {
    "id": "hsk4-technology",
    "title": "Công nghệ",
    "level": 4,
    "sentences": [
      "科技的发展改变了我们的生活方式。",
      "智能手机让人们随时随地都能上网。",
      "网上购物、外卖配送让生活变得更加便利。",
      "但是，过度使用电子产品会影响视力和睡眠。",
      "我们应该合理使用科技，享受它带来的便利。"
    ],
    "wordCount": 88,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, quá mức sử dụng điện tử gây ảnh hưởng gì?",
      "options": ["Sức khỏe mắt và giấc ngủ", "Tính năng điện thoại", "Vận hành ứng dụng"],
      "answer": "Sức khỏe mắt và giấc ngủ",
      "explanation": "过度使用电子产品会影响视力和睡眠 xác định ảnh hưởng mắt và ngủ."
    },
  },
  {
    "id": "hsk4-work-pressure",
    "title": "Áp lực công việc",
    "level": 4,
    "sentences": [
      "现代职场竞争激烈，很多年轻人感到压力很大。",
      "加班已经成为很多公司的常态。",
      "长期处于高压状态下，容易产生焦虑情绪。",
      "适当的休息和运动可以帮助缓解压力。",
      "找到工作与生活的平衡，才能更长久地发展。"
    ],
    "wordCount": 90,
    "topic": "Công việc",
    "check": {
      "prompt": "Theo đoạn văn, cách nào giúp giảm áp lực công việc?",
      "options": ["Làm thêm giờ", "Nghỉ ngơi và tập thể dục thích độ", "Làm việc không nghỉ"],
      "answer": "Nghỉ ngơi và tập thể dục thích độ",
      "explanation": "适当的休息和运动可以帮助缓解压力 xác định cách giảm áp lực."
    },
  },
  {
    "id": "hsk4-shopping-habits",
    "title": "Thói quen mua sắm",
    "level": 4,
    "sentences": [
      "现在很多人喜欢网上购物，不再跑商场了。",
      "网上购物不仅种类多，价格也往往更便宜。",
      "但是，不能实物查看，有时候买到的东西不符合预期。",
      "退货流程也比较麻烦，浪费时间。",
      "理性消费，根据实际需求购买，才是明智之举。"
    ],
    "wordCount": 90,
    "topic": "Mua sắm",
    "check": {
      "prompt": "Theo đoạn văn, nhược điểm của mua sắm online là gì?",
      "options": ["Sản phẩm ít", "Không thể xem thực tế", "Giá thành đắt"],
      "answer": "Không thể xem thực tế",
      "explanation": "不能实物查看 xác định không thể xem sản phẩm thực tế."
    },
  },
  {
    "id": "hsk4-food-culture",
    "title": "Văn hóa ẩm thực",
    "level": 4,
    "sentences": [
      "中国饮食文化源远流长，各地区特色鲜明。",
      "北方人喜欢吃面食，南方人则偏爱米饭。",
      "茶文化也是中国人生活中不可或缺的一部分。",
      "在餐桌上，尊重长辈是重要的礼仪。",
      "通过美食，可以更好地了解一个地方的风俗习惯。"
    ],
    "wordCount": 88,
    "topic": "Ẩm thực",
    "check": {
      "prompt": "Theo đoạn văn, người miền Bắc喜欢 ăn gì?",
      "options": ["Cơm", "Mì", "Chè"],
      "answer": "Mì",
      "explanation": "北方人喜欢吃面食 xác định miền Bắc thích mì."
    },
  },
  {
    "id": "hsk4-transportation",
    "title": "Giao thông",
    "level": 4,
    "sentences": [
      "共享单车在城市里非常普遍，方便人们短途出行。",
      "只需要用手机扫码，就可以解锁使用。",
      "骑行不仅环保，还能锻炼身体。",
      "但是，乱停放的单车也给城市管理带来麻烦。",
      "希望大家遵守规则，文明骑行。"
    ],
    "wordCount": 90,
    "topic": "Giao thông",
    "check": {
      "prompt": "Theo đoạn văn, vấn đề của xe đạp chia sẻ là gì?",
      "options": ["Không thân thiện môi trường", "Đỗ xe không đúng quy định", "Không thể mở khóa"],
      "answer": "Đỗ xe không đúng quy định",
      "explanation": "乱停放的单车 xác định đỗ xe không đúng quy định."
    },
  },
  {
    "id": "hsk4-friendship",
    "title": "Bạn bè",
    "level": 4,
    "sentences": [
      "朋友在人生中扮演着重要的角色。",
      "真正的朋友会在你困难时伸出援手。",
      "平时多联系，多聊聊，感情会更深。",
      "虽然大家都很忙，但抽出时间见面仍然很有意义。",
      "友谊需要经营，才能长久。"
    ],
    "wordCount": 86,
    "topic": "Bạn bè",
    "check": {
      "prompt": "Theo đoạn văn, điều gì làm tình bạn bền bỉ?",
      "options": ["Không liên lạc", "Chăm sóc và giữ kết nối", "Chỉ gặp gỡ khi rảnh"],
      "answer": "Chăm sóc và giữ kết nối",
      "explanation": "友谊需要经营，才能长久 xác định cần chăm sóc."
    },
  },
  {
    "id": "hsk4-weather",
    "title": "Thời tiết",
    "level": 4,
    "sentences": [
      "春天天气温暖，万物复苏，适合出游。",
      "夏天炎热，很多人喜欢去海边避暑。",
      "秋天天气凉爽，是收获的季节。",
      "冬天寒冷，下雪的地方景色很美。",
      "每个季节都有自己的美丽，关键在于如何欣赏。"
    ],
    "wordCount": 84,
    "topic": "Thời tiết",
    "check": {
      "prompt": "Theo đoạn văn, mùa nào là mùa thu hoạch?",
      "options": ["Mùa Xuân", "Mùa Thu", "Mùa Đông"],
      "answer": "Mùa Thu",
      "explanation": "秋天天气凉爽，是收获的季节 xác định mùa Thu."
    },
  },
  {
    "id": "hsk4-hobby",
    "title": "Sở thích",
    "level": 4,
    "sentences": [
      "每个人都有自己的爱好，爱好能让生活更丰富。",
      "有人喜欢读书，有人喜欢运动，也有人喜欢旅行。",
      "培养一个爱好不仅能消磨时间，还能结识新朋友。",
      "无论喜欢什么，只要能让自己快乐就好。",
      "不要因为他人的目光而放弃自己的兴趣。"
    ],
    "wordCount": 86,
    "topic": "Giải trí",
    "check": {
      "prompt": "Theo đoạn văn, sở thích mang lại gì ngoài giải trí?",
      "options": ["Tiền bạc", "Bạn bè mới", "Công việc mới"],
      "answer": "Bạn bè mới",
      "explanation": "还能结识新朋友 xác định có thể gặp bạn mới."
    },
  },
  {
    "id": "hsk4-time-management",
    "title": "Quản lý thời gian",
    "level": 4,
    "sentences": [
      "时间是宝贵的，合理安排时间非常重要。",
      "制定每日计划，把重要的事情放在前面。",
      "拖延会导致任务堆积，压力增大。",
      "学会拒绝不必要的社交，专注于自己的目标。",
      "高效利用时间，才能实现人生价值。"
    ],
    "wordCount": 88,
    "topic": "Sinh hoạt",
    "check": {
      "prompt": "Theo đoạn văn, hành động nào gây tải công việc dồn dập?",
      "options": ["Lập kế hoạch hàng ngày", "Hoãn hoãn hãm", "Từ chối giao dịch không cần thiết"],
      "answer": "Hoãn hoãn hãm",
      "explanation": "拖延会导致任务堆积 xác định việc lười biếng."
    },
  },
  {
    "id": "hsk4-study-abroad",
    "title": "Du học",
    "level": 4,
    "sentences": [
      "越来越多的年轻人选择出国留学。",
      "留学可以接触不同的文化，提高语言能力。",
      "但是，在异国他乡生活，也会面临思乡和语言障碍。",
      "提前做好准备，学习当地语言和风俗习惯。",
      "留学经历将成为人生宝贵的财富。"
    ],
    "wordCount": 90,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Theo đoạn văn, thách thức của du học là gì?",
      "options": ["Không có văn hóa", "Suoni nhà và rào cản ngôn ngữ", "Không cần chuẩn bị"],
      "answer": "Suoni nhà và rào cản ngôn ngữ",
      "explanation": "也会面临思乡和语言障碍 xác định thách thức là nhớ nhà và rào cản ngôn ngữ."
    },
  },
  {
    "id": "hsk4-internet-life",
    "title": "Cuộc sống trên mạng",
    "level": 4,
    "sentences": [
      "互联网已经深入我们生活的方方面面。",
      "我们可以在网上阅读新闻、购物、社交。",
      "网络信息传播速度快，但真伪难以辨别。",
      "要学会分辨真假信息，不轻易相信谣言。",
      "健康地使用互联网，才能受益匪浅。"
    ],
    "wordCount": 88,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, thông tin trên mạng có điểm yếu gì?",
      "options": ["Truyền tải chậm", "Khó phân biệt thật giả", "Không có tin tức"],
      "answer": "Khó phân biệt thật giả",
      "explanation": "真伪难以辨别 xác định khó phân biệt thật giả."
    },
  },
  {
    "id": "hsk4-weekend",
    "title": "Cuối tuần",
    "level": 4,
    "sentences": [
      "周末是人们放松自己的时间。",
      "有人选择睡懒觉，有人喜欢外出运动。",
      "和家人朋友一起聚餐，也是不错的选择。",
      "阅读一本书，或者看一部电影，都能让心情放松。",
      "充实的周末，让新一周的工作更有动力。"
    ],
    "wordCount": 84,
    "topic": "Sinh hoạt",
    "check": {
      "prompt": "Theo đoạn văn, hoạt động nào không được nhắc đến?",
      "options": ["Ngủ nướng", "Đọc sách", "Làm thêm giờ"],
      "answer": "Làm thêm giờ",
      "explanation": "Làm thêm giờ không được nhắc đến trong các hoạt động cuối tuần."
    },
  },
  {
    "id": "hsk4-gift",
    "title": "Tặng quà",
    "level": 4,
    "sentences": [
      "送礼是中国人重要的社交礼仪之一。",
      "选择礼物时要考虑对方的喜好和文化禁忌。",
      "例如，不宜送钟，因为“钟”与“终”谐音，寓意不吉。",
      "精美的茶叶、水果或地方特产都是不错的选择。",
      "用心挑选的礼物，能表达真诚的祝福。"
    ],
    "wordCount": 86,
    "topic": "Giao tiếp",
    "check": {
      "prompt": "Theo đoạn văn, tại sao không nên tặng đồng hồ?",
      "options": ["Giá quá đắt", "Phát âm giống chữ \"kết thúc\"", "Không đẹp"],
      "answer": "Phát âm giống chữ \"kết thúc\"",
      "explanation": "“钟”与“终”谐音 xác định phát âm giống chữ kết thúc."
    },
  },
  {
    "id": "hsk4-apology",
    "title": "Xin lỗi",
    "level": 4,
    "sentences": [
      "在人际交往中，难免会有冒犯他人的时候。",
      "真诚地说“对不起”，是化解矛盾的第一步。",
      "除了道歉，还应该弥补自己的错误。",
      "原谅他人也是一种善良，能让关系更和谐。",
      "学会道歉和原谅，才能维护良好的人际关系。"
    ],
    "wordCount": 88,
    "topic": "Giao tiếp",
    "check": {
      "prompt": "Theo đoạn văn, bước đầu tiên để hóa giải mâu thuẫn là gì?",
      "options": ["Bỏ qua vấn đề", "Thật lòng nói xin lỗi", "Trách bình người kia"],
      "answer": "Thật lòng nói xin lỗi",
      "explanation": "真诚地说“对不起”，是化解矛盾的第一步 xác định nói xin lỗi thật lòng."
    },
  },
  {
    "id": "hsk4-daily-routine",
    "title": "Thói quen hàng ngày",
    "level": 4,
    "sentences": [
      "每个人都有自己的作息时间，良好的作息有助于健康。",
      "我通常七点起床，先喝一杯温水，然后吃早餐。",
      "上午工作或学习，中午休息一小时。",
      "下午继续完成任务，晚上六点左右下班或放学。",
      "睡前阅读半小时，十点半左右入睡，保证充足睡眠。"
    ],
    "wordCount": 84,
    "topic": "Sinh hoạt",
    "check": {
      "prompt": "Theo đoạn văn, tác giả thường bắt đầu ngày mới vào lúc mấy giờ?",
      "options": ["Bảy giờ", "Sáu giờ", "Tám giờ"],
      "answer": "Bảy giờ",
      "explanation": "我通常七点起床 xác định bảy giờ."
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
  },
  {
    "id": "hsk5-technology-reading",
    "title": "Công nghệ thông tin",
    "level": 5,
    "sentences": [
      "智能手机已经成为现代人不可或缺的工具。",
      "人们可以用手机购物、付款、约车和社交。",
      "但是，过度使用手机会影响注意力和睡眠质量。",
      "专家建议每天限制屏幕使用时间，多与家人朋友交流。",
      "科学使用科技产品，才能让生活更便利更健康。"
    ],
    "wordCount": 84,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, điều gì sẽ bị ảnh hưởng nếu sử dụng điện thoại quá mức?",
      "options": ["Tính năng của điện thoại", "Tập trung và ngủ ngon", "Giá của điện thoại"],
      "answer": "Tập trung và ngủ ngon",
      "explanation": "过度使用手机会影响注意力和睡眠质量 xác định ảnh hưởng tập trung và giấc ngủ."
    },
  },
  {
    "id": "hsk5-employment-reading",
    "title": "Việc làm và việc nghiệp",
    "level": 5,
    "sentences": [
      "大学毕业生在找工作时常常遇到困难。",
      "一些大公司要求应聘者有工作经验，但应届生通常没有。",
      "因此，很多学生在上学期间就参加实习积累经验。",
      "实习不仅可以了解行业，还能增加就业机会。",
      "找工作需要耐心，也要不断提升自己的能力。"
    ],
    "wordCount": 86,
    "topic": "Công việc",
    "check": {
      "prompt": "Theo đoạn văn, tại sao sinh viên nên tham gia thực tập khi còn đang học?",
      "options": ["Để không phải đi học", "Để tích lũy kinh nghiệm làm việc", "Để được lương cao"],
      "answer": "Để tích lũy kinh nghiệm làm việc",
      "explanation": "很多学生在上学期间就参加实习积累经验 xác định tham gia thực tập để tích lũy kinh nghiệm."
    },
  },
  {
    "id": "hsk5-family-reading",
    "title": "Gia đình vàquant hệ",
    "level": 5,
    "sentences": [
      "在中国文化中，孝顺父母是一种重要的美德。",
      "很多年轻人工作后会常常回家陪伴父母。",
      "节假日，全家人团聚吃饭，气氛非常热闹。",
      "即使工作很忙，也要抽出时间打电话给父母。",
      "家庭的温暖是人生最大的力量。"
    ],
    "wordCount": 82,
    "topic": "Gia đình",
    "check": {
      "prompt": "Theo đoạn văn, hảo đạo với cha mẹ được xem là gì trong văn hóa Trung Quốc?",
      "options": ["Một loại nhân cách xấu", "Một đức tính quan trọng", "Không cần thiết"],
      "answer": "Một đức tính quan trọng",
      "explanation": "孝顺父母是一种重要的美德 xác định hảo đạo là một đức tính quan trọng."
    },
  },
  {
    "id": "hsk5-transport-reading",
    "title": "Giao thông thành phố",
    "level": 5,
    "sentences": [
      "大城市的交通问题越来越严重，早晚高峰道路非常拥堵。",
      "为了缓解交通压力，很多城市建设了地铁和轻轨。",
      "乘坐公共交通不仅环保，还能节省时间。",
      "政府鼓励市民绿色出行，减少私家车使用。",
      "共享单车也为市民短途出行提供了便利。"
    ],
    "wordCount": 90,
    "topic": "Giao thông",
    "check": {
      "prompt": "Theo đoạn văn, chính phủ khuyến khích dân dân làm gì để giảm áp lực giao thông?",
      "options": ["Xe ô tô riêng", "Di chuyển màu xanh (công cộng, xe đạp chia sẻ)", "Đi taxi"],
      "answer": "Di chuyển màu xanh (công cộng, xe đạp chia sẻ)",
      "explanation": "政府鼓励市民绿色出行，减少私家车使用 xác định khuyến khích di chuyển bằng phương tiện công cộng."
    },
  },
  {
    "id": "hsk5-shopping-reading",
    "title": "Thói quen tiêu dùng",
    "level": 5,
    "sentences": [
      "双十一购物节是中国最大的网上购物活动之一。",
      "很多商家会提前准备商品，吸引顾客下单。",
      "消费者应该理性购物，不要盲目跟风消费。",
      "买之前要比较价格，看清商品质量和售后服务。",
      "适度消费才能避免不必要的经济压力。"
    ],
    "wordCount": 84,
    "topic": "Mua sắm",
    "check": {
      "prompt": "Theo đoạn văn, người tiêu dùng nên làm gì trước khi mua hàng?",
      "options": ["Mua ngay khi thấy giảm giá", "So sánh giá và xem chất lượng", "Mua theo xu hướng"],
      "answer": "So sánh giá và xem chất lượng",
      "explanation": "买之前要比较价格，看清商品质量和售后服务 xác định so sánh giá và kiểm tra chất lượng."
    },
  },
  {
    "id": "hsk5-language-reading",
    "title": "Học ngôn ngữ",
    "level": 5,
    "sentences": [
      "学习一门外国语言需要时间和耐心。",
      "除了上课，还要多听、多说、多读、多写。",
      "可以通过看电影、听歌曲和与外国人交流来提高。",
      "不要害怕犯错，错误是学习进步的机会。",
      "坚持每天练习，语言能力会逐渐提高。"
    ],
    "wordCount": 82,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Theo đoạn văn, khi học ngoại ngữ, học viên không nên làm gì?",
      "options": ["Lắng nghe và nói nhiều", "Sợ phạm sai lầm", "Luyện tập mỗi ngày"],
      "answer": "Sợ phạm sai lầm",
      "explanation": "不要害怕犯错 khẳng định không nên sợ sai lầm, lỗi là cơ hội tiến bộ."
    },
  },
  {
    "id": "hsk5-festival-reading",
    "title": "Lễ hội Trung thu",
    "level": 5,
    "sentences": [
      "中秋节是中国传统的重要节日，每年农历八月十五。",
      "家人会团聚在一起，吃月饼，赏月，讲古老的故事。",
      "月饼象征团圆，有很多种馅料，比如豆沙和莲蓉。",
      "除了中国，一些东南亚国家也过中秋节。",
      "这个节日让人们感受到家庭的温暖和文化的魅力。"
    ],
    "wordCount": 84,
    "topic": "Văn hóa",
    "check": {
      "prompt": "Theo đoạn văn, bánh trung thu tượng trưng cho điều gì?",
      "options": ["Thành công", "Đội nhóm riun tập", "Sự giàu có"],
      "answer": "Đội nhóm riun tập",
      "explanation": "月饼象征团圆 xác định bánh trung thu tượng trưng sự reunited."
    },
  },
  {
    "id": "hsk5-city-reading",
    "title": "Sống thành phố",
    "level": 5,
    "sentences": [
      "越来越多的人喜欢住在大城市，因为那里有更多工作机会。",
      "大城市的生活便利，有医院、学校和购物中心。",
      "但是，生活成本高，空气污染和噪音也是问题。",
      "有些人选择住在郊区，每天通勤上班。",
      "选择住在哪里，取决于个人的需求和生活方式。"
    ],
    "wordCount": 84,
    "topic": "Sinh hoạt",
    "check": {
      "prompt": "Theo đoạn văn, nhược điểm của sống thành phố lớn là gì?",
      "options": ["Không có cơ sở hạ tầng", "Chi phí sống cao và ô nhiễm không khí", "Không có việc làm"],
      "answer": "Chi phí sống cao và ô nhiễm không khí",
      "explanation": "但是，生活成本高，空气污染和噪音也是问题 xác định nhược điểm."
    },
  },
  {
    "id": "hsk5-internet-reading",
    "title": "Internet và cuộc sống",
    "level": 5,
    "sentences": [
      "互联网改变了人们获取信息的方式。",
      "现在很多人通过网络新闻了解时事，而不是看报纸。",
      "网络信息传播速度快，但也有假消息。",
      "我们要学会分辨真假信息，不要轻易相信谣言。",
      "合理使用互联网，才能真正受益。"
    ],
    "wordCount": 80,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, tin tức trên mạng có điểm yếu gì?",
      "options": ["Truyền tải chậm", "Có thể có tin giả", "Không cập nhật"],
      "answer": "Có thể có tin giả",
      "explanation": "网络信息传播速度快，但也有假消息 xác định có thể có tin sai."
    },
  },
  {
    "id": "hsk5-study-reading",
    "title": "Phương pháp học tập",
    "level": 5,
    "sentences": [
      "高效的学习方法可以让人事半功倍。",
      "制定计划，把大任务分解成小步骤，更容易完成。",
      "学习时要专注，减少手机和其他干扰。",
      "定期复习所学内容，可以加深记忆。",
      "保持良好的作息，才能有充足的精力学习。"
    ],
    "wordCount": 80,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Theo đoạn văn, cách nào giúp học hiệu quả hơn?",
      "options": ["Học nhiều giờ mà không nghỉ", "Lập kế hoạch và chia nhỏ nhiệm vụ", "Chỉ học trước ngày thi"],
      "answer": "Lập kế hoạch và chia nhỏ nhiệm vụ",
      "explanation": "制定计划，把大任务分解成小步骤，更容易完成 xác định lập kế hoạch và chia nhỏ."
    },
  },
  {
    "id": "hsk6-research-reading",
    "title": "Nghiên cứu khoa học",
    "level": 6,
    "sentences": [
      "科学研究需要严谨的态度和精确的数据。",
      "研究者在得出结论之前，必须进行多次实验验证。",
      "同行评审是保证学术质量的重要环节。",
      "研究结果应该公开透明，方便其他学者复核。",
      "科研诚信是学者应当遵守的基本原则。"
    ],
    "wordCount": 90,
    "topic": "Học thuật",
    "check": {
      "prompt": "Theo đoạn văn, điều gì là yếu tố then chốt để đảm bảo chất lượng học thuật?",
      "options": ["Xuất bản nhiều bài báo", "Đánh giá đồng nghiệp (peer review)", "Hỗ trợ kinh phí cao"],
      "answer": "Đánh giá đồng nghiệp (peer review)",
      "explanation": "同行评审是保证学术质量的重要环节 xác định đánh giá đồng nghiệp là yếu tố then chốt."
    },
  },
  {
    "id": "hsk6-economy-reading",
    "title": "Kinh tế và phát triển",
    "level": 6,
    "sentences": [
      "全球化促进了国家之间的贸易和交流。",
      "跨国公司在发展中国家设立工厂，创造了就业机会。",
      "但是，全球化也可能导致本地产业受到冲击。",
      "政府需要制定政策，保护本地企业和劳动者。",
      "在开放与保护之间找到平衡，是经济发展的关键。"
    ],
    "wordCount": 90,
    "topic": "Kinh tế",
    "check": {
      "prompt": "Theo đoạn văn, toàn cầu hóa có thể gây ra vấn đề gì đối với ngành công nghiệp địa phương?",
      "options": ["Tăng số lượng lao động", "Gây áp lực cạnh tranh ảnh hưởng ngành địa phương", "Tăng xuất khẩu"],
      "answer": "Gây áp lực cạnh tranh ảnh hưởng ngành địa phương",
      "explanation": "全球化也可能导致本地产业受到冲击 xác định toàn cầu hóa có thể gây áp lực cho ngành địa phương."
    },
  },
  {
    "id": "hsk6-aging-reading",
    "title": "Đô thị hóa và dân số già",
    "level": 6,
    "sentences": [
      "中国的人口老龄化问题越来越严重。",
      "很多年轻人到大城市工作，留下老年人独自生活在农村。",
      "政府需要加强农村医疗和养老服务建设。",
      "子女也应该尽可能多陪伴年迈的父母。",
      "构建老年友好型社会需要全社会共同努力。"
    ],
    "wordCount": 88,
    "topic": "Xã hội",
    "check": {
      "prompt": "Theo đoạn văn, tại sao nhiều người lớn tuổi sống một mình ở nông thôn?",
      "options": ["Con cái xuống thành phố làm việc", "Họ thích sống-alone", "Nông thôn có điều kiện y tế tốt"],
      "answer": "Con cái xuống thành phố làm việc",
      "explanation": "很多年轻人到大城市工作，留下老年人独自生活在农村 xác định con cái đi thành phố làm việc."
    },
  },
  {
    "id": "hsk6-education-reform-reading",
    "title": "Cải cách giáo dục",
    "level": 6,
    "sentences": [
      "近年来，中国教育改革注重培养学生的创新能力。",
      "传统的应试教育越来越受到批评。",
      "新的课程标准鼓励学生参与实践和探究。",
      "教师的角色也从知识传授者变成学习引导者。",
      "教育改革的目标是让学生更好地适应未来社会。"
    ],
    "wordCount": 88,
    "topic": "Giáo dục",
    "check": {
      "prompt": "Theo đoạn văn, mục tiêu của cải cách giáo dục là gì?",
      "options": ["Giúp học viên thi tốt hơn", "Học viên thích nghi tốt hơn với xã hội tương lai", "Giảm tải giảng viên"],
      "answer": "Học viên thích nghi tốt hơn với xã hội tương lai",
      "explanation": "教育改革的目标是让学生更好地适应未来社会 xác định mục tiêu là thích nghi với xã hội tương lai."
    },
  },
  {
    "id": "hsk6-medical-reading",
    "title": "Y tế công cộng",
    "level": 6,
    "sentences": [
      "公共卫生事件对社会产生深远影响。",
      "疫情期间，人们要佩戴口罩，保持社交距离。",
      "疫苗是预防传染病的有效手段。",
      "政府应加强公共卫生体系建设，提高应急能力。",
      "个人卫生习惯也是防控疾病的重要一环。"
    ],
    "wordCount": 86,
    "topic": "Sức khỏe",
    "check": {
      "prompt": "Theo đoạn văn, gì là biện pháp phòng dịch hiệu quả?",
      "options": ["Không đi ra ngoài", "Tiêm chủng", "Chỉ uống thuốc"],
      "answer": "Tiêm chủng",
      "explanation": "疫苗是预防传染病的有效手段 xác định tiêm chủng là biện pháp hiệu quả."
    },
  },
  {
    "id": "hsk6-art-reading",
    "title": "Nghệ thuật và nghệ diễn",
    "level": 6,
    "sentences": [
      "中国传统艺术包括书法、国画、京剧和剪纸等。",
      "这些艺术形式承载着丰富的历史文化内涵。",
      "现代年轻人对传统艺术的兴趣有所下降。",
      "学校和社会应加强传统艺术的教育和推广。",
      "保护非物质文化遗产，需要一代又一代人的传承。"
    ],
    "wordCount": 86,
    "topic": "Văn hóa",
    "check": {
      "prompt": "Theo đoạn văn, điều gì cần được bảo tồn và truyền tải?",
      "options": ["Công nghệ hiện đại", "Di sản văn hóa phi vật thể", "Kiến trúc Tây phương"],
      "answer": "Di sản văn hóa phi vật thể",
      "explanation": "保护非物质文化遗产，需要一代又一代人的传承 xác định cần bảo tồn di sản văn hóa phi vật thể."
    },
  },
  {
    "id": "hsk6-environment-reading",
    "title": "Biến đổi khí hậu",
    "level": 6,
    "sentences": [
      "气候变化已成为全球面临的严峻挑战。",
      "极端天气现象，如洪涝和干旱，发生频率增加。",
      "减少碳排放是应对气候变化的重要措施。",
      "发展可再生能源，如太阳能和风能，可以降低对化石燃料的依赖。",
      "每个人都可以从节能减排的小事做起。"
    ],
    "wordCount": 88,
    "topic": "Môi trường",
    "check": {
      "prompt": "Theo đoạn văn, cách nào giúp giảm phụ thuộc nhiên liệu hóa thạch?",
      "options": ["Sử dụng nhiều xe máy", "Phát triển năng lượng tái tạo (mặt trời, gió)", "Tăng sản xuất nhựa"],
      "answer": "Phát triển năng lượng tái tạo (mặt trời, gió)",
      "explanation": "发展可再生能源，如太阳能和风能，可以降低对化石燃料的依赖 xác định phát triển năng lượng tái tạo."
    },
  },
  {
    "id": "hsk6-psychology-reading",
    "title": "Tâm lý và căng thẳng",
    "level": 6,
    "sentences": [
      "现代生活节奏快，很多人感到压力和焦虑。",
      "适度的压力可以激励人们进步，但过大的压力有害健康。",
      "运动、冥想和与朋友交流可以帮助缓解压力。",
      "必要时，应该寻求专业心理咨询师的帮助。",
      "关注心理健康，才能拥有更高质量的生活。"
    ],
    "wordCount": 86,
    "topic": "Sức khỏe",
    "check": {
      "prompt": "Theo đoạn văn, cách nào không giúp giảm căng thẳng?",
      "options": ["Tập thể dục và thiền định", "Giữ kín tutti và không chia sẻ", "Hạn chế khi cần"],
      "answer": "Giữ kín tutti và không chia sẻ",
      "explanation": "运动、冥想和与朋友交流可以帮助缓解压力 khẳng định cần chia sẻ, không giữ kín."
    },
  },
  {
    "id": "hsk6-urban-reading",
    "title": "Phát triển đô thị bền vững",
    "level": 6,
    "sentences": [
      "可持续城市发展需要兼顾经济、社会和环境。",
      "绿色建筑和公共交通可以减少能源消耗。",
      "城市规划应保留足够的绿地和公共空间。",
      "居民参与是城市治理的重要组成部分。",
      "只有各方共同努力，城市才能宜居且有活力。"
    ],
    "wordCount": 86,
    "topic": "Sinh hoạt",
    "check": {
      "prompt": "Theo đoạn văn, điều gì là thành phần quan trọng của quản trị thành phố?",
      "options": ["Chỉ chính quyền quyết định một mình", "Công dân tham gia", "Xây dựng nhiều tòa nhà cao tầng"],
      "answer": "Công dân tham gia",
      "explanation": "居民参与是城市治理的重要组成部分 xác định công dân tham gia là thành phần quan trọng."
    },
  },
  {
    "id": "hsk6-international-reading",
    "title": "Quan hệ quốc tế",
    "level": 6,
    "sentences": [
      "国际合作在应对全球性挑战中显得尤为重要。",
      "气候变化、流行病和网络安全等问题，没有一个国家能独自解决。",
      "各国应加强对话与合作，寻求共同利益。",
      "多边机构在协调国际事务中发挥重要作用。",
      "在相互尊重的基础上合作，才能实现共赢。"
    ],
    "wordCount": 90,
    "topic": "Quan hệ quốc tế",
    "check": {
      "prompt": "Theo đoạn văn, tại sao cần hợp tác quốc tế?",
      "options": ["Mỗi quốc gia có thể giải quyết tất cả vấn đề", "Một số thách thức toàn cầu cần nhiều nước cùng giải quyết", "Để cạnh tranh giữa các nước"],
      "answer": "Một số thách thức toàn cầu cần nhiều nước cùng giải quyết",
      "explanation": "气候变化、流行病和网络安全等问题，没有一个国家能独自解决 xác định cần hợp tác quốc tế."
    },
  },
  {
    "id": "hsk7-ai-reading",
    "title": "Trí tuệ nhân tạo và giáo dục",
    "level": 7,
    "sentences": [
      "人工智能技术正在深刻改变教育领域。",
      "智能辅导系统可以根据学生的进度提供个性化内容。",
      "但是，AI无法完全取代教师的情感支持和引导作用。",
      "未来的课堂应该是技术与教师协作的模式。",
      "教育公平是技术应用需要特别关注的问题。"
    ],
    "wordCount": 84,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, AI không thể thay thế hoàn toàn giáo viên vì lý do gì?",
      "options": ["AI chạy chậm", "Không thể cung cấp hỗ trợ cảm xúc và hướng dẫn", "Chi phí quá cao"],
      "answer": "Không thể cung cấp hỗ trợ cảm xúc và hướng dẫn",
      "explanation": "AI无法完全取代教师的情感支持和引导作用 xác định AI không thể thay thế sự hỗ trợ cảm xúc của giáo viên."
    },
  },
  {
    "id": "hsk7-cross-culture-reading",
    "title": "Giao tiếp văn hóa phân cấp",
    "level": 7,
    "sentences": [
      "跨文化交流中，语言只是沟通的一部分。",
      "肢体语言、社交距离和礼仪习惯在不同文化中差异很大。",
      "缺乏文化意识容易导致误解甚至冲突。",
      "了解目标文化的价值观和禁忌，有助于建立良好关系。",
      "尊重和包容是成功跨文化交流的基础。"
    ],
    "wordCount": 86,
    "topic": "Văn hóa",
    "check": {
      "prompt": "Theo đoạn văn, điều gì có thể gây ra hiểu lầm trong giao tiếp văn hóa phân cấp?",
      "options": ["Chỉ nói nhiều ngôn ngữ", "Thiếu nhận thức về văn hóa", "Sử dụng công nghệ"],
      "answer": "Thiếu nhận thức về văn hóa",
      "explanation": "缺乏文化意识容易导致误解甚至冲突 xác định thiếu nhận thức văn hóa gây hiểu lầm."
    },
  },
  {
    "id": "hsk7-academic-integrity-reading",
    "title": "Lòng trung thực học thuật",
    "level": 7,
    "sentences": [
      "学术不端行为包括抄袭、伪造数据和重复发表。",
      "这些行为不仅损害个人声誉，也破坏学术界的信任。",
      "大学应建立完善的学术诚信教育体系。",
      "期刊和出版社应加强论文的查重和审稿。",
      "维护学术诚信，需要每个研究者自觉遵守规范。"
    ],
    "wordCount": 88,
    "topic": "Học thuật",
    "check": {
      "prompt": "Theo đoạn văn, hành vi vi phạm đạo đức học thuật không bao gồm điều gì?",
      "options": ["Trộm bài / sao chép", "Giả mạo dữ liệu", "Trích dẫn nguồn rõ ràng"],
      "answer": "Trích dẫn nguồn rõ ràng",
      "explanation": "学术不端行为包括抄袭、伪造数据和重复发表 khẳng định trích dẫn nguồn rõ ràng không phải là vi phạm."
    },
  },
  {
    "id": "hsk7-digital-privacy-reading",
    "title": "Riêng tư số",
    "level": 7,
    "sentences": [
      "数字时代，个人数据的收集和使用变得前所未有地普遍。",
      "社交媒体、购物平台和移动应用都会收集用户信息。",
      "数据泄露和滥用可能导致严重的隐私风险。",
      "立法应平衡技术创新与个人隐私保护。",
      "用户也应提高自我保护意识，谨慎分享个人信息。"
    ],
    "wordCount": 88,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, ai cũng cần nâng cao ý thức tự bảo vệ?",
      "options": ["Chỉ doanh nghiệp", "Người dùng", "Chỉ chính phủ"],
      "answer": "Người dùng",
      "explanation": "用户也应提高自我保护意识，谨慎分享个人信息 xác định người dùng cần tự bảo vệ."
    },
  },
  {
    "id": "hsk7-globalization-reading",
    "title": "Toàn cầu hóa và bản địa",
    "level": 7,
    "sentences": [
      "全球化使不同国家和地区之间的联系更加紧密。",
      "文化交流促进了相互理解，但也带来了文化同质化的担忧。",
      "一些地方传统文化面临消失的风险。",
      "保护文化多样性，需要在全球化框架下寻找平衡点。",
      "尊重不同文化的独特性，是构建和谐世界的前提。"
    ],
    "wordCount": 86,
    "topic": "Xã hội",
    "check": {
      "prompt": "Theo đoạn văn, nguy cơ nào được nhắc đến về toàn cầu hóa?",
      "options": ["Giảm giao thương", "Đồng nhất văn hóa (mất đi đặc trưng địa phương)", "Tăng chi phí du lịch"],
      "answer": "Đồng nhất văn hóa (mất đi đặc trưng địa phương)",
      "explanation": "一些地方传统文化面临消失的风险 xác định nguy cơ đồng nhất văn hóa."
    },
  },
  {
    "id": "hsk7-healthcare-reading",
    "title": "Hệ thống y tế hiện đại",
    "level": 7,
    "sentences": [
      "远程医疗利用互联网技术，让患者可以在线咨询医生。",
      "这项技术对偏远地区和行动不便的患者尤其有帮助。",
      "但是，远程诊断的准确性仍有待提高。",
      "医生和患者需要建立信任关系，才能保证诊疗效果。",
      "远程医疗是传统医疗的重要补充，而非替代。"
    ],
    "wordCount": 86,
    "topic": "Sức khỏe",
    "check": {
      "prompt": "Theo đoạn văn, khám bệnh từ xa là gì đối với y tế truyền thống?",
      "options": ["Thay thế hoàn toàn", "Một bổ trợ quan trọng", "Không cần thiết"],
      "answer": "Một bổ trợ quan trọng",
      "explanation": "远程医疗是传统医疗的重要补充，而非替代 xác định đây là sự bổ trợ, không phải thay thế."
    },
  },
  {
    "id": "hsk7-research-ethics-reading",
    "title": "Đạo đức nghiên cứu",
    "level": 7,
    "sentences": [
      "涉及人体或动物的实验，必须经过伦理委员会审批。",
      "实验对象的自愿参与和知情同意是基本前提。",
      "研究者应最大限度减少实验对实验对象的伤害。",
      "实验数据应如实记录，不得随意修改。",
      "遵循伦理规范，是科学研究的底线。"
    ],
    "wordCount": 88,
    "topic": "Học thuật",
    "check": {
      "prompt": "Theo đoạn văn, điều kiện cơ bản nhất khi làm thí nghiệm với người hoặc động vật là gì?",
      "options": ["Chi phí thấp", "Tham gia nguyện ý và đồng ý biết trước", "Thời gian ngắn"],
      "answer": "Tham gia nguyện ý và đồng ý biết trước",
      "explanation": "实验对象的自愿参与和知情同意是基本前提 xác định điều kiện cơ bản là nguyện ý và thông thuận."
    },
  },
  {
    "id": "hsk8-ai-ethics-reading",
    "title": "Đạo đức AI",
    "level": 8,
    "sentences": [
      "人工智能算法在招聘、贷款和司法领域得到广泛应用。",
      "但是，算法可能存在偏见，导致不公平的结果。",
      "透明度和可解释性是算法伦理的重要要求。",
      "开发者应对算法的决策过程负责。",
      "建立算法监管机制，保护公民的合法权益。"
    ],
    "wordCount": 88,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, yêu cầu quan trọng của đạo đức thuật toán là gì?",
      "options": ["Chạy nhanh", "Trong suốt và có thể giải thích", "Chi phí thấp"],
      "answer": "Trong suốt và có thể giải thích",
      "explanation": "透明度和可解释性是算法伦理的重要要求 xác định trong suốt và giải thích được."
    },
  },
  {
    "id": "hsk8-academic-publishing-reading",
    "title": "Xuất bản học thuật",
    "level": 8,
    "sentences": [
      "学术出版是研究成果传播的重要渠道。",
      "开放获取使更多读者可以免费阅读学术文章。",
      "但是，出版费用和审稿周期仍是挑战。",
      "同行评审的公正性直接影响研究质量。",
      "学术出版需要在传播速度与质量之间取得平衡。"
    ],
    "wordCount": 88,
    "topic": "Học thuật",
    "check": {
      "prompt": "Theo đoạn văn, thách thức nào còn tồn tại trong xuất bản học thuật?",
      "options": ["Không có độc giả", "Phí xuất bản và thời gian đánh giá dài", "Chỉ xuất bản tiếng Trung"],
      "answer": "Phí xuất bản và thời gian đánh giá dài",
      "explanation": "但是，出版费用和审稿周期仍是挑战 xác định thách thức là phí và thời gian."
    },
  },
  {
    "id": "hsk8-civil-society-reading",
    "title": "Xã hội công dân",
    "level": 8,
    "sentences": [
      "公民社会的发展需要法治保障和公民参与。",
      "非政府组织在环境保护、教育和扶贫方面发挥重要作用。",
      "政府与社会组织之间应建立合作伙伴关系。",
      "透明的决策过程，能够增强公众的信任。",
      "公民社会的成熟度，是衡量一个国家治理水平的重要指标。"
    ],
    "wordCount": 88,
    "topic": "Xã hội",
    "check": {
      "prompt": "Theo đoạn văn, tổ chức phi chính phủ đóng vai trò gì?",
      "options": ["Chỉ kinh doanh", "Trung trọng trong bảo vệ môi trường, giáo dục, giảm nghèo", "Chỉ hoạt động ở thành phố"],
      "answer": "Trung trọng trong bảo vệ môi trường, giáo dục, giảm nghèo",
      "explanation": "非政府组织在环境保护、教育和扶贫方面发挥重要作用 xác định vai trò của tổ chức phi chính phủ."
    },
  },
  {
    "id": "hsk8-digital-divide-reading",
    "title": "Khoảng trắng số",
    "level": 8,
    "sentences": [
      "数字鸿沟是指不同群体在获取信息技术方面的差距。",
      "老年人、低收入群体和农村居民更容易受到影响。",
      "政府应提供数字技能培训和公共接入设施。",
      "企业也应设计更易于使用的产品和服务。",
      "缩小数字鸿沟，有助于促进社会包容和公平。"
    ],
    "wordCount": 86,
    "topic": "Công nghệ",
    "check": {
      "prompt": "Theo đoạn văn, nhóm nào dễ bị ảnh hưởng bởi khoảng trắng số nhất?",
      "options": ["Doanh nhân trẻ tuổi", "Người già, nhóm thu nhập thấp và dân cư nông thôn", "Sinh viên đại học"],
      "answer": "Người già, nhóm thu nhập thấp và dân cư nông thôn",
      "explanation": "老年人、低收入群体和农村居民更容易受到影响 xác định nhóm dễ bị ảnh hưởng."
    },
  },
  {
    "id": "hsk8-urban-rural-reading",
    "title": "Phát triển vùng nông thôn",
    "level": 8,
    "sentences": [
      "乡村振兴是中国当前的重要发展战略。",
      "改善农村基础设施，包括交通和网络，是首要任务。",
      "发展特色农业和乡村旅游，可以增加农民收入。",
      "吸引年轻人返乡创业，需要提供更多机会和平台。",
      "城乡融合发展，是实现共同富裕的重要途径。"
    ],
    "wordCount": 88,
    "topic": "Kinh tế",
    "check": {
      "prompt": "Theo đoạn văn, nhiệm vụ quan trọng nhất trong chiến lược phùng Hưng nông thôn là gì?",
      "options": ["Xây dựng lại thành phố", "Cải thiện cơ sở hạ tầng nông thôn", "Di dân từ thành phố xuống nông thôn"],
      "answer": "Cải thiện cơ sở hạ tầng nông thôn",
      "explanation": "改善农村基础设施，包括交通和网络，是首要任务 xác định cải thiện cơ sở hạ tầng là nhiệm vụ đầu tiên."
    },
  },
  {
    "id": "hsk9-interdisciplinary-reading",
    "title": "Nghiên cứu đa ngành",
    "level": 9,
    "sentences": [
      "跨学科研究正在成为解决复杂问题的重要方法。",
      "气候变化、公共卫生和人工智能等议题，需要多个学科共同参与。",
      "不同学科的理论框架和研究方法，可以相互补充。",
      "跨学科合作需要打破学术壁垒，建立共同语言。",
      "未来的科研人员，应当具备多元的知识背景。"
    ],
    "wordCount": 88,
    "topic": "Học thuật",
    "check": {
      "prompt": "Theo đoạn văn, nghiên cứu đa ngành cần làm gì để thành công?",
      "options": ["Giữ masing ngành làm việc riêng", "Phá wall các rào cản học thuật, xây dựng ngôn ngữ chung", "Chỉ tập trung vào một lĩnh vực"],
      "answer": "Phá壁 các rào cản học thuật, xây dựng ngôn ngữ chung",
      "explanation": "跨学科合作需要打破学术壁垒，建立共同语言 xác định cần phá壁 rào cản và tạo ngôn ngữ chung."
    },
  },
  {
    "id": "hsk9-ai-society-reading",
    "title": "AI và xã hội",
    "level": 9,
    "sentences": [
      "人工智能对就业市场产生深远影响。",
      "一些常规工作可能被自动化系统取代。",
      "同时，AI也创造了新的职业和机会。",
      "劳动者需要终身学习，不断更新技能。",
      "政府应制定政策，支持劳动力转型和再就业。"
    ],
    "wordCount": 86,
    "topic": "Công việc",
    "check": {
      "prompt": "Theo đoạn văn, người lao động cần làm gì để thích nghi với AI?",
      "options": ["Không thay đổi gì", "Học tập suốt đời và cập nhật kỹ năng", "Chỉ làm công việc thủ công"],
      "answer": "Học tập suốt đời và cập nhật kỹ năng",
      "explanation": "劳动者需要终身学习，不断更新技能 xác định cần học tập suốt đời."
    },
  },
  {
    "id": "hsk9-cultural-identity-reading",
    "title": "Định danh văn hóa",
    "level": 9,
    "sentences": [
      "在全球化背景下，文化认同变得更加复杂。",
      "移民和 diaspora 群体常常在多种文化之间寻找平衡。",
      "语言是文化认同的重要标志之一。",
      "保护少数民族语言和传统，有助于维护文化多样性。",
      "在变化的世界中，保持文化根基，是每个人的责任。"
    ],
    "wordCount": 88,
    "topic": "Xã hội",
    "check": {
      "prompt": "Theo đoạn văn, gì là dấu hiệu quan trọng của định danh văn hóa?",
      "options": ["Kiến trúc hiện đại", "Ngôn ngữ", "Công nghệ"],
      "answer": "Ngôn ngữ",
      "explanation": "语言是文化认同的重要标志之一 xác định ngôn ngữ là dấu hiệu quan trọng."
    },
  },
  {
    "id": "hsk9-academic-freedom-reading",
    "title": "Tự do nghiên cứu",
    "level": 9,
    "sentences": [
      "学术自由是高校的核心价值观之一。",
      "研究者应当能够独立选择研究课题和方法。",
      "但是，学术自由不等于可以忽视伦理规范。",
      "外部压力，无论来自政治还是商业，都不应影响研究独立性。",
      "保护学术自由，需要制度保障和学者的自觉。"
    ],
    "wordCount": 88,
    "topic": "Học thuật",
    "check": {
      "prompt": "Theo đoạn văn, tự do học thuật không có nghĩa là gì?",
      "options": ["Chọn chủ đề nghiên cứu độc lập", "Bỏ qua quy tắc đạo đức", "Không bị áp lực bên ngoài"],
      "answer": "Bỏ qua quy tắc đạo đức",
      "explanation": "但是，学术自由不等于可以忽视伦理规范 xác định không được bỏ qua đạo đức."
    },
  },
  {
    "id": "hsk9-sustainable-development-reading",
    "title": "Phát triển bền vững",
    "level": 9,
    "sentences": [
      "可持续发展目标涵盖经济、社会和环境三个维度。",
      "消除贫困、促进教育平等和应对气候变化，是核心任务。",
      "政府、企业和个人都需要参与其中。",
      "发展不应以牺牲环境为代价。",
      "只有实现人与自然的和谐共生，发展才能长久。"
    ],
    "wordCount": 86,
    "topic": "Môi trường",
    "check": {
      "prompt": "Theo đoạn văn, mục tiêu nào là核心 của phát triển bền vững?",
      "options": ["Tăng trưởng GDP ngắn hạn", "Loại bỏ nghèo đói, giáo dục bình đẳng, xử lý biến đổi khí hậu", "Phát triển công nghiệp nặng"],
      "answer": "Loại bỏ nghèo đói, giáo dục bình đẳng, xử lý biến đổi khí hậu",
      "explanation": "消除贫困、促进教育平等和应对气候变化，是核心任务 xác định các mục tiêu cốt lõi."
    },
  },
  {
    "id": "hsk9-global-governance-reading",
    "title": "Quản trị toàn cầu",
    "level": 9,
    "sentences": [
      "全球治理面临着越来越多的非传统安全挑战。",
      "网络安全、大流行病和跨国犯罪，都需要国际合作。",
      "多边主义是应对全球挑战的重要途径。",
      "改革国际组织，使其更具代表性和有效性，刻不容缓。",
      "各国应摒弃零和思维，寻求共同安全。"
    ],
    "wordCount": 86,
    "topic": "Quan hệ quốc tế",
    "check": {
      "prompt": "Theo đoạn văn, 접근 nào là quan trọng để đối mặt với thách thức toàn cầu?",
      "options": ["Tư duy tổng hợp (zero-sum)", "Đã nhiều bên (multilateralism)", "Cô lập quốc gia"],
      "answer": "Đã nhiều bên (multilateralism)",
      "explanation": "多边主义是应对全球挑战的重要途径 xác định đaendu đã nhiều bên là cách tiếp cận quan trọng."
    },
  },
];
];
