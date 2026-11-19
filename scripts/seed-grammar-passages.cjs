// scripts/seed-grammar.cjs
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

const grammarLessons = [
  { title: "Pinyin và Thanh điệu", description: "Học phát âm chuẩn", level: 1, content: "# Pinyin và Thanh điệu\n\nPinyin là hệ thống phiên âm tiếng Trung...", order: 1 },
  { title: "Chào hỏi cơ bản", description: "Cách chào hỏi và giới thiệu bản thân", level: 1, content: "# Chào hỏi cơ bản\n\n- 你好 (nǐ hǎo) - Xin chào\n- 你叫什么名字？(nǐ jiào shén me míng zi?) - Bạn tên là gì?\n- 我叫... (wǒ jiào...) - Tôi tên là...", order: 2 },
  { title: "Số đếm và Số lượng", description: "Từ 1-100 và mạo từ", level: 1, content: "# Số đếm\n\n1-10: 一 二 三 四 五 六 七 八 九 十\nMạo từ: 个 (gè), 本 (běn), 张 (zhāng)...", order: 3 },
  { title: "Gia đình và Nghề nghiệp", description: "Từ vựng về gia đình", level: 1, content: "# Gia đình\n\n爸爸 (bà ba) - Bố\n妈妈 (mā ma) - Mẹ\n哥哥 (gē ge) - Anh trai\n姐姐 (jiě jie) - Chị gái", order: 4 },
  { title: "Sinh hoạt hàng ngày", description: "Đồng hồ, thói quen, hoạt động", level: 1, content: "# Sinh hoạt hàng ngày\n\n早上好 (zǎo shang hǎo) - Chào buổi sáng\n吃早饭 (chī zǎo fàn) - Ăn sáng\n上班 (shàng bān) - Đi làm", order: 5 },
  { title: "Mua sắm và Ăn uống", description: "Hỏi giá, đặt món, thanh toán", level: 2, content: "# Mua sắm\n\n多少钱？(duō shao qián?) - Bao nhiêu tiền?\n太贵了 (tài guì le) - Quá đắt\n便宜一点 (pián yi yī diǎn) - Rẻ hơn một chút", order: 6 },
  { title: "Ngữ pháp cơ bản: 是, 有, 了, 的", description: "4 cấu trúc quan trọng nhất", level: 2, content: "# Ngữ pháp cơ bản\n\n## 是 (shì) - Là\n我是学生 (wǒ shì xué sheng) - Tôi là học sinh\n\n## 有 (yǒu) - Có\n我有书 (wǒ yǒu shū) - Tôi có sách\n\n## 了 (le) - Đã/Thể hoàn thành\n我吃了 (wǒ chī le) - Tôi đã ăn\n\n## 的 (de) - Sở hữu/Định ngữ\n我的书 (wǒ de shū) - Sách của tôi", order: 7 },
];

const passages = [
  { title: "Chào buổi sáng", content: "# Chào buổi sáng\n\n早上好！\n我叫小明。\n我是中国人。\n我今年二十岁。\n我是学生。\n我喜欢学习中文。", level: 1, word_count: 45 },
  { title: "Gia đình tôi", content: "# Gia đình tôi\n\n我家有四口人。\n爸爸、妈妈、哥哥和我。\n爸爸是医生。\n妈妈是老师。\n哥哥是学生。\n我们都很忙。", level: 1, word_count: 50 },
  { title: "Ngày nghỉ", content: "# Ngày nghỉ\n\n今天是星期天。\n我不上班。\n早上八点起床。\n吃早饭。\n然后去公园。\n公园很漂亮。\n有很多花。\n我拍了很多照片。\n中午吃面条。\n下午看书。\n晚上看电视。\n很开心。", level: 1, word_count: 70 },
  { title: "Mua sắm", content: "# Mua sắm\n\n我去超市买东西。\n买苹果、香蕉、面包、牛奶。\n苹果很甜。\n香蕉很便宜。\n面包很好吃。\n牛奶很新鲜。\n一共五十元。\n我用手机付钱。\n很方便。", level: 2, word_count: 65 },
  { title: "Đi bệnh viện", content: "# Đi bệnh viện\n\n昨天我生病了。\n头疼，嗓子疼。\n妈妈带我去医院。\n医生看了看。\n说是感冒。\n给我开药。\n让我多喝水。\n多休息。\n今天好多了。", level: 2, word_count: 60 },
  { title: "Du lịch Bắc Kinh", content: "# Du lịch Bắc Kinh\n\n上个月我去北京旅行。\n坐飞机去的。\n参观了故宫。\n爬了长城。\n吃了烤鸭。\n很有名。\n也去了天安门广场。\n拍了很多照片。\n北京很大。\n很漂亮。\n我想再去。", level: 2, word_count: 75 },
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

async function main() {
  await upsert('GrammarLesson', grammarLessons, 'title');
  await upsert('ReadingPassage', passages, 'title');
  console.log('\n✅ Grammar & Passages seeded successfully!');
}

main();