export type DictationItem = {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  level: 1 | 2;
};

export const DICTATION_ITEMS: DictationItem[] = [
  { id: "d01", hanzi: "你好", pinyin: "nǐ hǎo", meaningVi: "Xin chào", level: 1 },
  { id: "d02", hanzi: "谢谢你", pinyin: "xiè xie nǐ", meaningVi: "Cảm ơn bạn", level: 1 },
  { id: "d03", hanzi: "早上好", pinyin: "zǎo shang hǎo", meaningVi: "Chào buổi sáng", level: 1 },
  { id: "d04", hanzi: "晚上好", pinyin: "wǎn shang hǎo", meaningVi: "Chào buổi tối", level: 1 },
  { id: "d05", hanzi: "我叫小明", pinyin: "wǒ jiào xiǎo míng", meaningVi: "Tôi tên là Tiểu Minh", level: 1 },
  { id: "d06", hanzi: "我是越南人", pinyin: "wǒ shì yuè nán rén", meaningVi: "Tôi là người Việt Nam", level: 1 },
  { id: "d07", hanzi: "今天天气很好", pinyin: "jīn tiān tiān qì hěn hǎo", meaningVi: "Hôm nay thời tiết rất đẹp", level: 2 },
  { id: "d08", hanzi: "我饿了", pinyin: "wǒ è le", meaningVi: "Tôi đói rồi", level: 1 },
  { id: "d09", hanzi: "我渴了", pinyin: "wǒ kě le", meaningVi: "Tôi khát nước", level: 1 },
  { id: "d10", hanzi: "我想喝水", pinyin: "wǒ xiǎng hē shuǐ", meaningVi: "Tôi muốn uống nước", level: 1 },
  { id: "d11", hanzi: "这个多少钱", pinyin: "zhè ge duō shao qián", meaningVi: "Cái này bao nhiêu tiền", level: 1 },
  { id: "d12", hanzi: "太贵了", pinyin: "tài guì le", meaningVi: "Đắt quá", level: 1 },
  { id: "d13", hanzi: "便宜一点", pinyin: "pián yi yī diǎn", meaningVi: "Rẻ hơn một chút", level: 2 },
  { id: "d14", hanzi: "我要这个", pinyin: "wǒ yào zhè ge", meaningVi: "Tôi muốn cái này", level: 1 },
  { id: "d15", hanzi: "洗手间在哪里", pinyin: "xǐ shǒu jiān zài nǎ lǐ", meaningVi: "Nhà vệ sinh ở đâu", level: 2 },
  { id: "d16", hanzi: "我明白了", pinyin: "wǒ míng bai le", meaningVi: "Tôi hiểu rồi", level: 2 },
  { id: "d17", hanzi: "我不懂", pinyin: "wǒ bù dǒng", meaningVi: "Tôi không hiểu", level: 1 },
  { id: "d18", hanzi: "请再说一遍", pinyin: "qǐng zài shuō yī biàn", meaningVi: "Làm ơn nói lại một lần", level: 2 },
  { id: "d19", hanzi: "你说什么", pinyin: "nǐ shuō shén me", meaningVi: "Bạn nói gì", level: 1 },
  { id: "d20", hanzi: "我们走吧", pinyin: "wǒ men zǒu ba", meaningVi: "Chúng ta đi thôi", level: 1 },
  { id: "d21", hanzi: "我明天上班", pinyin: "wǒ míng tiān shàng bān", meaningVi: "Ngày mai tôi đi làm", level: 2 },
  { id: "d22", hanzi: "今天很忙", pinyin: "jīn tiān hěn máng", meaningVi: "Hôm nay rất bận", level: 1 },
  { id: "d23", hanzi: "我很累", pinyin: "wǒ hěn lèi", meaningVi: "Tôi rất mệt", level: 1 },
  { id: "d24", hanzi: "你吃饭了吗", pinyin: "nǐ chī fàn le ma", meaningVi: "Bạn ăn cơm chưa", level: 2 },
  { id: "d25", hanzi: "我吃过了", pinyin: "wǒ chī guo le", meaningVi: "Tôi ăn rồi", level: 2 },
  { id: "d26", hanzi: "这个很好吃", pinyin: "zhè ge hěn hǎo chī", meaningVi: "Món này rất ngon", level: 2 },
  { id: "d27", hanzi: "我喜欢喝茶", pinyin: "wǒ xǐ huan hē chá", meaningVi: "Tôi thích uống trà", level: 2 },
  { id: "d28", hanzi: "请给我菜单", pinyin: "qǐng gěi wǒ cài dān", meaningVi: "Làm ơn cho tôi menu", level: 2 },
  { id: "d29", hanzi: "买单", pinyin: "mǎi dān", meaningVi: "Tính tiền", level: 1 },
  { id: "d30", hanzi: "坐地铁", pinyin: "zuò dì tiě", meaningVi: "Đi tàu điện ngầm", level: 2 },
  { id: "d31", hanzi: "火车站在哪里", pinyin: "huǒ chē zhàn zài nǎ lǐ", meaningVi: "Ga tàu ở đâu", level: 2 },
  { id: "d32", hanzi: "我要去机场", pinyin: "wǒ yào qù jī chǎng", meaningVi: "Tôi muốn đi sân bay", level: 2 },
  { id: "d33", hanzi: "现在几点", pinyin: "xiàn zài jǐ diǎn", meaningVi: "Bây giờ mấy giờ", level: 1 },
  { id: "d34", hanzi: "八点半", pinyin: "bā diǎn bàn", meaningVi: "Tám giờ rưỡi", level: 1 },
  { id: "d35", hanzi: "明天见", pinyin: "míng tiān jiàn", meaningVi: "Mai gặp lại", level: 1 },
  { id: "d36", hanzi: "生日快乐", pinyin: "shēng rì kuài lè", meaningVi: "Sinh nhật vui vẻ", level: 2 },
  { id: "d37", hanzi: "新年快乐", pinyin: "xīn nián kuài lè", meaningVi: "Năm mới vui vẻ", level: 2 },
  { id: "d38", hanzi: "我爱你", pinyin: "wǒ ài nǐ", meaningVi: "Tôi yêu bạn", level: 1 },
  { id: "d39", hanzi: "你叫什么名字", pinyin: "nǐ jiào shén me míng zi", meaningVi: "Bạn tên là gì", level: 1 },
  { id: "d40", hanzi: "我住在河内", pinyin: "wǒ zhù zài hé nèi", meaningVi: "Tôi sống ở Hà Nội", level: 2 },
];
