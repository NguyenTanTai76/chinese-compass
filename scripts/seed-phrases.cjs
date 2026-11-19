// scripts/seed-phrases.cjs
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const content = fs.readFileSync(envPath, 'utf-8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        let value = trimmed.slice(idx + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  });
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BASE_HEADERS = {
  'apikey': SUPABASE_SERVICE_KEY,
  'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates, count=exact'
};

const phrases = [
  { vietnamese: "Xin chào", chinese: "你好", pinyin: "nǐ hǎo", category: "greeting", difficulty: 1 },
  { vietnamese: "Cảm ơn", chinese: "谢谢", pinyin: "xiè xiè", category: "greeting", difficulty: 1 },
  { vietnamese: "Không có chi", chinese: "不客气", pinyin: "bú kè qì", category: "greeting", difficulty: 1 },
  { vietnamese: "Xin lỗi", chinese: "对不起", pinyin: "duì bu qǐ", category: "greeting", difficulty: 1 },
  { vietnamese: "Tạm biệt", chinese: "再见", pinyin: "zài jiàn", category: "greeting", difficulty: 1 },
  { vietnamese: "Tôi là...", chinese: "我是...", pinyin: "wǒ shì...", category: "intro", difficulty: 1 },
  { vietnamese: "Bạn tên là gì?", chinese: "你叫什么名字？", pinyin: "nǐ jiào shén me míng zi？", category: "intro", difficulty: 1 },
  { vietnamese: "Tôi tên là...", chinese: "我叫...", pinyin: "wǒ jiào...", category: "intro", difficulty: 1 },
  { vietnamese: "Rất vui được gặp bạn", chinese: "很高兴认识你", pinyin: "hěn gāo xìng rèn shi nǐ", category: "intro", difficulty: 2 },
  { vietnamese: "Bạn bao nhiêu tuổi?", chinese: "你多大？", pinyin: "nǐ duō dà？", category: "intro", difficulty: 1 },
  { vietnamese: "Tôi ... tuổi", chinese: "我...岁", pinyin: "wǒ...suì", category: "intro", difficulty: 1 },
  { vietnamese: "Bạn từ đâu đến?", chinese: "你是哪国人？", pinyin: "nǐ shì nǎ guó rén？", category: "intro", difficulty: 1 },
  { vietnamese: "Tôi là người Việt Nam", chinese: "我是越南人", pinyin: "wǒ shì yuè nán rén", category: "intro", difficulty: 1 },
  { vietnamese: "Bạn nói tiếng Anh không?", chinese: "你会说英语吗？", pinyin: "nǐ huì shuō yīng yǔ ma？", category: "language", difficulty: 1 },
  { vietnamese: "Tôi nói được một chút tiếng Trung", chinese: "我会说一点中文", pinyin: "wǒ huì shuō yī diǎn zhōng wén", category: "language", difficulty: 2 },
  { vietnamese: "Bạn có thể nói chậm hơn không?", chinese: "你可以说慢一点吗？", pinyin: "nǐ kě yǐ shuō màn yī diǎn ma？", category: "language", difficulty: 2 },
  { vietnamese: "Tôi không hiểu", chinese: "我不懂", pinyin: "wǒ bù dǒng", category: "language", difficulty: 1 },
  { vietnamese: "Làm ơn nói lại lần nữa", chinese: "请再说一遍", pinyin: "qǐng zài shuō yī biàn", category: "language", difficulty: 2 },
  { vietnamese: "Cái này là gì?", chinese: "这是什么？", pinyin: "zhè shì shén me？", category: "daily", difficulty: 1 },
  { vietnamese: "Cái kia là gì?", chinese: "那是什么？", pinyin: "nà shì shén me？", category: "daily", difficulty: 1 },
  { vietnamese: "Cái này多少钱?", chinese: "这个多少钱？", pinyin: "zhè ge duō shao qián？", category: "shopping", difficulty: 1 },
  { vietnamese: "Có rẻ hơn không?", chinese: "便宜一点可以吗？", pinyin: "pián yi yī diǎn kě yǐ ma？", category: "shopping", difficulty: 2 },
  { vietnamese: "Tôi mua cái này", chinese: "我买这个", pinyin: "wǒ mǎi zhè ge", category: "shopping", difficulty: 1 },
  { vietnamese: "Tôi không muốn mua", chinese: "我不买", pinyin: "wǒ bù mǎi", category: "shopping", difficulty: 1 },
  { vietnamese: "Cho tôi xem cái kia", chinese: "给我看那个", pinyin: "gěi wǒ kàn nà ge", category: "shopping", difficulty: 2 },
  { vietnamese: "Nhà vệ sinh ở đâu?", chinese: "洗手间在哪里？", pinyin: "xǐ shǒu jiān zài nǎ lǐ？", category: "daily", difficulty: 1 },
  { vietnamese: "Tôi muốn đi vệ sinh", chinese: "我要上厕所", pinyin: "wǒ yào shàng cè suǒ", category: "daily", difficulty: 1 },
  { vietnamese: "Cho tôi một ly nước", chinese: "给我一杯水", pinyin: "gěi wǒ yī bēi shuǐ", category: "daily", difficulty: 1 },
  { vietnamese: "Tôi khát nước", chinese: "我渴了", pinyin: "wǒ kě le", category: "daily", difficulty: 1 },
  { vietnamese: "Tôi đói", chinese: "我饿了", pinyin: "wǒ è le", category: "daily", difficulty: 1 },
  { vietnamese: "Món này ngon lắm", chinese: "这个很好吃", pinyin: "zhè ge hěn hǎo chī", category: "food", difficulty: 1 },
  { vietnamese: "Tôi muốn ăn...", chinese: "我想吃...", pinyin: "wǒ xiǎng chī...", category: "food", difficulty: 1 },
  { vietnamese: "Menu cho tôi xem", chinese: "请给我菜单", pinyin: "qǐng gěi wǒ cài dān", category: "food", difficulty: 2 },
  { vietnamese: "Tính tiền cho tôi", chinese: "买单", pinyin: "mǎi dān", category: "food", difficulty: 1 },
  { vietnamese: "Có thể thanh toán bằng thẻ không?", chinese: "可以刷卡吗？", pinyin: "kě yǐ shuā kǎ ma？", category: "shopping", difficulty: 2 },
  { vietnamese: "Hôm nay thời tiết đẹp", chinese: "今天天气很好", pinyin: "jīn tiān tiān qì hěn hǎo", category: "weather", difficulty: 1 },
  { vietnamese: "Trời mưa", chinese: "下雨了", pinyin: "xià yǔ le", category: "weather", difficulty: 1 },
  { vietnamese: "Trời nóng", chinese: "很热", pinyin: "hěn rè", category: "weather", difficulty: 1 },
  { vietnamese: "Trời lạnh", chinese: "很冷", pinyin: "hěn lěng", category: "weather", difficulty: 1 },
  { vietnamese: "Bây giờ mấy giờ?", chinese: "现在几点？", pinyin: "xiàn zài jǐ diǎn？", category: "time", difficulty: 1 },
  { vietnamese: "7 giờ sáng", chinese: "早上七点", pinyin: "zǎo shang qī diǎn", category: "time", difficulty: 1 },
  { vietnamese: "12 giờ trưa", chinese: "中午十二点", pinyin: "zhōng wǔ shí èr diǎn", category: "time", difficulty: 1 },
  { vietnamese: "6 giờ tối", chinese: "晚上六点", pinyin: "wǎn shang liù diǎn", category: "time", difficulty: 1 },
  { vietnamese: "Ngày mai tôi đi làm", chinese: "明天我上班", pinyin: "míng tiān wǒ shàng bān", category: "work", difficulty: 1 },
  { vietnamese: "Tôi nghỉ hôm nay", chinese: "我今天休息", pinyin: "wǒ jīn tiān xiū xi", category: "work", difficulty: 1 },
  { vietnamese: "Công việc bận rộn", chinese: "工作很忙", pinyin: "gōng zuò hěn máng", category: "work", difficulty: 2 },
  { vietnamese: "Tôi mệt", chinese: "我累了", pinyin: "wǒ lèi le", category: "health", difficulty: 1 },
  { vietnamese: "Tôi ốm", chinese: "我生病了", pinyin: "wǒ shēng bìng le", category: "health", difficulty: 1 },
  { vietnamese: "Tôi đau đầu", chinese: "我头疼", pinyin: "wǒ tóu téng", category: "health", difficulty: 1 },
  { vietnamese: "Tôi đau bụng", chinese: "我肚子疼", pinyin: "wǒ dù zi téng", category: "health", difficulty: 1 },
  { vietnamese: "Gọi bác sĩ", chinese: "叫医生", pinyin: "jiào yī shēng", category: "health", difficulty: 2 },
  { vietnamese: "Uống thuốc", chinese: "吃药", pinyin: "chī yào", category: "health", difficulty: 1 },
  { vietnamese: "Đi bộ", chinese: "走路", pinyin: "zǒu lù", category: "transport", difficulty: 1 },
  { vietnamese: "Đi xe buýt", chinese: "坐公交车", pinyin: "zuò gōng jiāo chē", category: "transport", difficulty: 1 },
  { vietnamese: "Đi taxi", chinese: "坐出租车", pinyin: "zuò chū zū chē", category: "transport", difficulty: 1 },
  { vietnamese: "Đi tàu điện ngầm", chinese: "坐地铁", pinyin: "zuò dì tiě", category: "transport", difficulty: 1 },
  { vietnamese: "Đi máy bay", chinese: "坐飞机", pinyin: "zuò fēi jī", category: "transport", difficulty: 1 },
  { vietnamese: "Vé máy bay", chinese: "机票", pinyin: "jī piào", category: "transport", difficulty: 2 },
  { vietnamese: "Vé tàu", chinese: "火车票", pinyin: "huǒ chē piào", category: "transport", difficulty: 2 },
  { vietnamese: "Ga tàu", chinese: "火车站", pinyin: "huǒ chē zhàn", category: "transport", difficulty: 2 },
  { vietnamese: "Sân bay", chinese: "机场", pinyin: "jī chǎng", category: "transport", difficulty: 2 },
  { vietnamese: "Hành lý", chinese: "行李", pinyin: "xíng lǐ", category: "transport", difficulty: 2 },
  { vietnamese: "Hộ chiếu", chinese: "护照", pinyin: "hù zhào", category: "transport", difficulty: 2 },
  { vietnamese: "Đặt phòng khách sạn", chinese: "订酒店", pinyin: "dìng jiǔ diàn", category: "travel", difficulty: 2 },
  { vietnamese: "Nhận phòng", chinese: "办入住", pinyin: "bàn rù zhù", category: "travel", difficulty: 2 },
  { vietnamese: "Trả phòng", chinese: "退房", pinyin: "tuì fáng", category: "travel", difficulty: 2 },
  { vietnamese: "Khóa cửa", chinese: "锁门", pinyin: "suǒ mén", category: "daily", difficulty: 1 },
  { vietnamese: "Mở cửa", chinese: "开门", pinyin: "kāi mén", category: "daily", difficulty: 1 },
  { vietnamese: "Bật đèn", chinese: "开灯", pinyin: "kāi dēng", category: "daily", difficulty: 1 },
  { vietnamese: "Tắt đèn", chinese: "关灯", pinyin: "guān dēng", category: "daily", difficulty: 1 },
  { vietnamese: "Mở cửa sổ", chinese: "开窗", pinyin: "kāi chuāng", category: "daily", difficulty: 1 },
  { vietnamese: "Đóng cửa sổ", chinese: "关窗", pinyin: "guān chuāng", category: "daily", difficulty: 1 },
  { vietnamese: "Dọn dẹp nhà", chinese: "打扫房间", pinyin: "dǎ sǎo fáng jiān", category: "daily", difficulty: 2 },
  { vietnamese: "Giặt quần áo", chinese: "洗衣服", pinyin: "xǐ yī fu", category: "daily", difficulty: 1 },
  { vietnamese: "Phơi quần áo", chinese: "晒衣服", pinyin: "shài yī fu", category: "daily", difficulty: 1 },
  { vietnamese: "Gọi điện thoại", chinese: "打电话", pinyin: "dǎ diàn huà", category: "communication", difficulty: 1 },
  { vietnamese: "Nhắn tin", chinese: "发微信", pinyin: "fā wēi xìn", category: "communication", difficulty: 1 },
  { vietnamese: "Gửi email", chinese: "发邮件", pinyin: "fā yóu jiàn", category: "communication", difficulty: 2 },
  { vietnamese: "Xem tin nhắn", chinese: "看信息", pinyin: "kàn xìn xī", category: "communication", difficulty: 1 },
  { vietnamese: "Trả lời tin nhắn", chinese: "回消息", pinyin: "huí xiāo xī", category: "communication", difficulty: 2 },
];

async function upsert(table, data, conflictColumn) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?on_conflict=${conflictColumn}`;
  const batchSize = 50;
  console.log(`Seeding ${data.length} rows to ${table}...`);
  
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const response = await fetch(url, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(batch)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`Batch ${Math.floor(i/batchSize) + 1} failed for ${table}:`, error);
      process.exit(1);
    }
    console.log(`  Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(data.length/batchSize)} done`);
  }
  console.log(`${table} seeded successfully!`);
}

upsert('Phrase', phrases, 'chinese');