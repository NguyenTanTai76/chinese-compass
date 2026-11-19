export type GrammarQuestion = {
  id: string;
  level: 1 | 2;
  topic: string;
  sentence: string;
  hintVi: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  { id: "g01", level: 1, topic: "是", sentence: "我___学生。", hintVi: "Tôi là học sinh.", options: ["是", "有", "在", "的"], answer: 0, explanation: "是 (shì) dùng để nối chủ ngữ với danh từ: 我是学生 = Tôi là học sinh." },
  { id: "g02", level: 1, topic: "是", sentence: "她___老师吗？", hintVi: "Cô ấy là giáo viên phải không?", options: ["是", "有", "在", "了"], answer: 0, explanation: "Câu hỏi yes/no dùng 吗 ở cuối, động từ 是 đứng trước danh từ." },
  { id: "g03", level: 1, topic: "是", sentence: "这___我的书。", hintVi: "Đây là sách của tôi.", options: ["是", "有", "的", "在"], answer: 0, explanation: "这 (đây) + 是 + danh từ: 这是我的书." },
  { id: "g04", level: 1, topic: "有", sentence: "我___两本书。", hintVi: "Tôi có hai quyển sách.", options: ["有", "是", "在", "了"], answer: 0, explanation: "有 (yǒu) diễn tả sở hữu: 我有两本书." },
  { id: "g05", level: 1, topic: "有", sentence: "你___哥哥吗？", hintVi: "Bạn có anh trai không?", options: ["有", "是", "在", "的"], answer: 0, explanation: "Hỏi sở hữu dùng 有 + 吗." },
  { id: "g06", level: 1, topic: "有", sentence: "桌子上___一本书。", hintVi: "Trên bàn có một quyển sách.", options: ["有", "是", "在", "了"], answer: 0, explanation: "Câu tồn tại dùng 有: 桌子上有一本书." },
  { id: "g07", level: 1, topic: "在", sentence: "他___家。", hintVi: "Anh ấy ở nhà.", options: ["在", "有", "是", "的"], answer: 0, explanation: "在 (zài) chỉ vị trí: 他在家." },
  { id: "g08", level: 1, topic: "在", sentence: "你___哪里？", hintVi: "Bạn ở đâu?", options: ["在", "有", "是", "去"], answer: 0, explanation: "Hỏi vị trí: 你在哪里？" },
  { id: "g09", level: 1, topic: "了", sentence: "我吃___。", hintVi: "Tôi ăn rồi.", options: ["了", "的", "是", "有"], answer: 0, explanation: "了 sau động từ biểu thị hành động đã hoàn thành." },
  { id: "g10", level: 1, topic: "了", sentence: "他走___。", hintVi: "Anh ấy đi rồi.", options: ["了", "的", "在", "吗"], answer: 0, explanation: "了 cuối câu báo hiệu thay đổi trạng thái: 他走了." },
  { id: "g11", level: 1, topic: "的", sentence: "这___我的书。", hintVi: "Đây là sách của tôi.", options: ["是", "的", "有", "了"], answer: 0, explanation: "Câu này dùng 是, còn 的 đã có trong 我的." },
  { id: "g12", level: 1, topic: "的", sentence: "我___妈妈是医生。", hintVi: "Mẹ của tôi là bác sĩ.", options: ["的", "是", "有", "在"], answer: 0, explanation: "的 nối sở hữu: 我的妈妈 = mẹ của tôi." },
  { id: "g13", level: 1, topic: "的", sentence: "漂亮___花", hintVi: "Bông hoa đẹp", options: ["的", "是", "了", "在"], answer: 0, explanation: "Tính từ + 的 + danh từ: 漂亮的花." },
  { id: "g14", level: 1, topic: "吗/呢", sentence: "你是越南人___？", hintVi: "Bạn là người Việt Nam phải không?", options: ["吗", "呢", "的", "了"], answer: 0, explanation: "吗 tạo câu hỏi yes/no." },
  { id: "g15", level: 1, topic: "吗/呢", sentence: "我很好，你___？", hintVi: "Tôi khỏe, còn bạn thì sao?", options: ["呢", "吗", "的", "是"], answer: 0, explanation: "呢 dùng để hỏi lại \"còn ... thì sao?\"." },
  { id: "g16", level: 1, topic: "量词", sentence: "一___书", hintVi: "Một quyển sách", options: ["本", "个", "只", "张"], answer: 0, explanation: "本 (běn) là lượng từ cho sách." },
  { id: "g17", level: 1, topic: "量词", sentence: "一___人", hintVi: "Một người", options: ["个", "本", "张", "杯"], answer: 0, explanation: "个 là lượng từ phổ biến nhất cho người và vật." },
  { id: "g18", level: 1, topic: "量词", sentence: "一___猫", hintVi: "Một con mèo", options: ["只", "本", "个", "张"], answer: 0, explanation: "只 (zhī) dùng cho động vật nhỏ." },
  { id: "g19", level: 1, topic: "量词", sentence: "一___纸", hintVi: "Một tờ giấy", options: ["张", "本", "只", "杯"], answer: 0, explanation: "张 (zhāng) dùng cho vật phẳng như giấy, bàn." },
  { id: "g20", level: 1, topic: "量词", sentence: "一___水", hintVi: "Một ly nước", options: ["杯", "本", "只", "张"], answer: 0, explanation: "杯 (bēi) là lượng từ cho ly/cốc." },
  { id: "g21", level: 1, topic: "语序", sentence: "Chọn câu đúng:", hintVi: "Tôi thích học tiếng Trung.", options: ["我喜欢学习中文。", "我学习喜欢中文。", "中文喜欢我学习。", "学习中文喜欢我。"], answer: 0, explanation: "Trật tự cơ bản: Chủ ngữ + Động từ + Tân ngữ." },
  { id: "g22", level: 1, topic: "语序", sentence: "Chọn câu đúng:", hintVi: "Tôi ăn cơm ở nhà.", options: ["我在家吃饭。", "我吃饭在家。", "在家我吃饭。", "我吃在家饭。"], answer: 0, explanation: "Cụm 在 + địa điểm đứng trước động từ chính." },
  { id: "g23", level: 1, topic: "语序", sentence: "Chọn câu đúng:", hintVi: "Hôm nay trời rất đẹp.", options: ["今天天气很好。", "今天很好天气。", "天气今天很好。", "很好今天天气。"], answer: 0, explanation: "Chủ ngữ 今天天气 + vị ngữ 很好." },
  { id: "g24", level: 1, topic: "语序", sentence: "Chọn câu đúng:", hintVi: "Tôi tên là Nam.", options: ["我叫南。", "南叫我的。", "我南叫。", "叫南我。"], answer: 0, explanation: "我叫 + tên = Tôi tên là..." },
  { id: "g25", level: 1, topic: "数字", sentence: "十___是二十。", hintVi: "Mười cộng mười là hai mươi.", options: ["加十", "减十", "十加", "十减"], answer: 0, explanation: "A + 加 + B = A cộng B." },
  { id: "g26", level: 1, topic: "数字", sentence: "3 ___ 5 是 8。", hintVi: "3 cộng 5 là 8.", options: ["加", "减", "乘", "除"], answer: 0, explanation: "加 (jiā) = cộng; 减 = trừ; 乘 = nhân; 除 = chia." },
  { id: "g27", level: 1, topic: "时间", sentence: "现在___点？", hintVi: "Bây giờ mấy giờ?", options: ["几", "多少", "怎么", "什么"], answer: 0, explanation: "Hỏi giờ dùng 几点 (jǐ diǎn)." },
  { id: "g28", level: 1, topic: "时间", sentence: "我___八点上班。", hintVi: "Tôi đi làm lúc 8 giờ.", options: ["早上", "上午", "晚上", "下午"], answer: 0, explanation: "8 giờ sáng là 早上八点 (上午 cũng đúng nhưng 早上 tự nhiên hơn)." },
  { id: "g29", level: 1, topic: "时间", sentence: "今天星期___。", hintVi: "Hôm nay là thứ hai.", options: ["一", "二", "三", "日"], answer: 0, explanation: "Thứ hai = 星期一." },
  { id: "g30", level: 1, topic: "代词", sentence: "___是越南人。", hintVi: "Tôi là người Việt Nam.", options: ["我", "你", "他", "她"], answer: 0, explanation: "我 = tôi, phù hợp với nghĩa câu." },
  { id: "g31", level: 1, topic: "代词", sentence: "___们都是学生。", hintVi: "Chúng tôi đều là học sinh.", options: ["我", "你", "他", "她"], answer: 0, explanation: "我们 = chúng tôi; 们 là hậu tố số nhiều." },
  { id: "g32", level: 1, topic: "否定", sentence: "我___是老师。", hintVi: "Tôi không phải giáo viên.", options: ["不", "没", "别", "无"], answer: 0, explanation: "Phủ định 是 dùng 不是." },
  { id: "g33", level: 1, topic: "否定", sentence: "我___有哥哥。", hintVi: "Tôi không có anh trai.", options: ["没", "不", "别", "无"], answer: 0, explanation: "Phủ định 有 dùng 没有, không dùng 不有." },
  { id: "g34", level: 1, topic: "否定", sentence: "___说话！", hintVi: "Đừng nói chuyện!", options: ["别", "不", "没", "无"], answer: 0, explanation: "别 (bié) = đừng, dùng cho mệnh lệnh phủ định." },
  { id: "g35", level: 2, topic: "比较", sentence: "我___他高。", hintVi: "Tôi cao hơn anh ấy.", options: ["比", "跟", "和", "对"], answer: 0, explanation: "A 比 B + tính từ = A ... hơn B." },
  { id: "g36", level: 2, topic: "比较", sentence: "这个___那个便宜。", hintVi: "Cái này rẻ hơn cái kia.", options: ["比", "跟", "给", "从"], answer: 0, explanation: "So sánh dùng 比: 这个比那个便宜." },
  { id: "g37", level: 2, topic: "比较", sentence: "他跑___比我快。", hintVi: "Anh ấy chạy nhanh hơn tôi.", options: ["得", "的", "地", "了"], answer: 0, explanation: "Bổ ngữ mức độ dùng 得: 跑得比我快." },
  { id: "g38", level: 2, topic: "了", sentence: "我昨天去___超市。", hintVi: "Hôm qua tôi đã đi siêu thị.", options: ["了", "的", "是", "在"], answer: 0, explanation: "了 sau động từ chỉ hành động đã xảy ra trong quá khứ." },
  { id: "g39", level: 2, topic: "了", sentence: "下雨___，我们别去了。", hintVi: "Trời mưa rồi, chúng ta đừng đi nữa.", options: ["了", "的", "吗", "呢"], answer: 0, explanation: "了 báo hiệu tình huống mới: 下雨了." },
  { id: "g40", level: 2, topic: "的", sentence: "这是我昨天买___书。", hintVi: "Đây là quyển sách tôi mua hôm qua.", options: ["的", "了", "是", "得"], answer: 0, explanation: "Cụm định ngữ + 的 + danh từ: 昨天买的书." },
  { id: "g41", level: 2, topic: "的", sentence: "他慢慢___走过来。", hintVi: "Anh ấy từ từ bước tới.", options: ["地", "的", "得", "了"], answer: 0, explanation: "Trạng ngữ dùng 地: 慢慢地走." },
  { id: "g42", level: 2, topic: "的", sentence: "他高兴___笑了。", hintVi: "Anh ấy vui vẻ cười.", options: ["地", "的", "得", "了"], answer: 0, explanation: "高兴地笑: trạng từ + 地 + động từ." },
  { id: "g43", level: 2, topic: "有", sentence: "我___去过北京。", hintVi: "Tôi chưa từng đến Bắc Kinh.", options: ["没", "不", "别", "无"], answer: 0, explanation: "Chưa từng làm gì: 没 + động từ + 过." },
  { id: "g44", level: 2, topic: "语序", sentence: "Chọn câu đúng:", hintVi: "Tôi đã học tiếng Trung hai năm.", options: ["我学中文两年了。", "我中文学两年了。", "我两年学中文了。", "中文我学两年了。"], answer: 0, explanation: "Thời lượng đứng sau động từ: 学中文两年了." },
  { id: "g45", level: 2, topic: "语序", sentence: "Chọn câu đúng:", hintVi: "Anh ấy nói tiếng Trung rất tốt.", options: ["他中文说得很好。", "他说中文得很好。", "他很好说中文得。", "他说得很好中文。"], answer: 0, explanation: "Tân ngữ đứng trước 得: 中文说得很好." },
  { id: "g46", level: 2, topic: "吗/呢", sentence: "你吃___饭了吗？", hintVi: "Bạn ăn cơm chưa?", options: ["过", "了", "的", "是"], answer: 0, explanation: "过 nhấn mạnh trải nghiệm đã từng; 吃饭了吗 cũng đúng nhưng 过 hợp ngữ cảnh \"đã từng\"." },
  { id: "g47", level: 2, topic: "量词", sentence: "一___咖啡", hintVi: "Một ly cà phê", options: ["杯", "个", "本", "张"], answer: 0, explanation: "杯 dùng cho đồ uống." },
  { id: "g48", level: 2, topic: "数字", sentence: "一百___十是九十。", hintVi: "Một trăm trừ mười là chín mươi.", options: ["减", "加", "乘", "除"], answer: 0, explanation: "减 (jiǎn) = trừ: 100 减 10 = 90." },
  { id: "g49", level: 2, topic: "是", sentence: "他___我的朋友。", hintVi: "Anh ấy là bạn của tôi.", options: ["是", "有", "在", "了"], answer: 0, explanation: "是 nối chủ ngữ với danh từ: 他是我的朋友." },
  { id: "g50", level: 2, topic: "时间", sentence: "我明天___去机场。", hintVi: "Ngày mai tôi sẽ đi sân bay.", options: ["要", "了", "的", "过"], answer: 0, explanation: "要 diễn tả kế hoạch tương lai: 明天要去机场." },
];
