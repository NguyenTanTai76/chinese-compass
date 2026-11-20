export type GrammarLesson = {
  id: string;
  title: string;
  description: string;
  level: number;
  content: string;
  order: number;
};

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    "id": "pinyin-tones",
    "title": "Pinyin và Thanh điệu",
    "description": "Học phát âm chuẩn",
    "level": 1,
    "content": "# Pinyin và Thanh điệu\n\nPinyin là hệ thống phiên âm tiếng Trung dùng chữ Latin để đại diện cho âm thanh Hán tự. Có 21 tử âm (initials), 35 phương âm (finals) và 4 thanh điệu (tones) cùng một thanh nhẹ (neutral tone).\n\n## Bốn thanh điệu\n1. Thanh 1 (ngang): mā — âm cao, không 변 động.\n2. Thanh 2 (sắc): má — âm từ thấp lên cao.\n3. Thanh 3 (huyền): mǎ — âm từ cao xuống thấp rồi nhẹ nhàng lên.\n4. Thanh 4 (nặng): mà — âm từ cao xuống thấp nhanh gắt.\n5. Thanh nhẹ (trung bình): ma — âm ngắn, không nhấn mạnh.\n\nVí dụ: mā (mẹ), má (tơ/xanh), mǎ (ng mã), mà (mắng), ma (đạo từ)}\n\nHọc thành thạo pinyin là bước đầu tiên để đọc chính xác và tra từ điển.",
    "order": 1
  },
  {
    "id": "greetings",
    "title": "Chào hỏi cơ bản",
    "description": "Cách chào hỏi và giới thiệu bản thân",
    "level": 1,
    "content": "# Chào hỏi cơ bản\n\n- 你好 (nǐ hǎo) - Xin chào\n- 你叫什么名字？(nǐ jiào shén me míng zi?) - Bạn tên là gì?\n- 我叫... (wǒ jiào...) - Tôi tên là...\n- 很高兴认识你 (hěn gāo xìng rèn shi nǐ) - Rất vui được gặp bạn\n- 谢谢 (xiè xiè) - Cảm ơn\n- 不客气 (bù kè qì) - Không có chi\n- 对不起 (duì bu qǐ) - Xin lỗi\n- 没关系 (méi guān xi) - Không sao\n- 再见 (zài jiàn) - Tạm biệt\n\nCú pháp: 你好 dùng để chào chung. 谢谢 dùng để cảm ơn, đáp lại là 不客气.",
    "order": 2
  },
  {
    "id": "numbers",
    "title": "Số đếm và Số lượng",
    "description": "Từ 1-100 và mạo từ",
    "level": 1,
    "content": "# Số đếm\n\n1-10: 一 二 三 四 五 六 七 八 九 十\n11-19: 十一 十二 ... 十九 (mười + đơn vị)\n20-99: 二十 二十一 ... 九十九 (hàng chục + hàng đơn vị)\n100: 一百\n\nMạo từ: 个 (gè), 本 (běn), 张 (zhāng), 只 (zhī), 杯 (bēi)...\n\nCấu trúc: Số + Mạo từ + Danh từ (Ví dụ: 三本书 = ba quyển sách)",
    "order": 3
  },
  {
    "id": "family-jobs",
    "title": "Gia đình và Nghề nghiệp",
    "description": "Từ vựng về gia đình",
    "level": 1,
    "content": "# Gia đình\n\n爸爸 (bà ba) - Bố\n妈妈 (mā ma) - Mẹ\n哥哥 (gē ge) - Anh trai\n姐姐 (jiě jie) - Chị gái\n弟弟 (dì di) - Em trai\n妹妹 (mèi mei) - Em gái\n\nNghề nghiệp:\n老师 (lǎo shī) - Giáo viên\n医生 (yī shēng) - Bác sĩ\n学生 (xué sheng) - Học sinh\n公司员工 (gōng sī yuán gōng) - Nhân viên công ty\n\nCú pháp: 我家有... (Tôi gia đình có...), 这是我爸爸 (Đây là bố tôi)",
    "order": 4
  },
  {
    "id": "routines",
    "title": "Sinh hoạt hàng ngày",
    "description": "Đồng hồ, thói quen, hoạt động",
    "level": 1,
    "content": "# Sinh hoạt hàng ngày\n\n早上好 (zǎo shang hǎo) - Chào buổi sáng\n吃早饭 (chī zǎo fàn) - Ăn sáng\n上班 (shàng bān) - Đi làm\n下班 (xià bān) - Tan làm\n睡觉 (shuì jiào) - Ngủ\n起床 (qǐ chuáng) - Thức dậy\n\nCú pháp: Thời gian trạng ngữ đứng trước động từ (Ví dụ: 我八点去学校 = Tôi tám giờ đi học).",
    "order": 5
  },
  {
    "id": "shopping-food",
    "title": "Mua sắm và Ăn uống",
    "description": "Hỏi giá, đặt món, thanh toán",
    "level": 2,
    "content": "# Mua sắm\n\n多少钱？(duō shao qián?) - Bao nhiêu tiền?\n太贵了 (tài guì le) - Quá đắt\n便宜一点 (pián yi yī diǎn) - Rẻ hơn một chút\n我要这个 (wǒ yào zhè ge) - Tôi muốn cái này\n买单 (mǎi dān) - Tính tiền\n可以刷卡吗 (kě yǐ shuā kǎ ma) - Có thể quẹt thẻ không\n\nCú pháp: 这个多少钱？ (Cái này bao nhiêu?), 我要... (Tôi muốn...), 太贵了 (Quá đắt)",
    "order": 6
  },
  {
    "id": "core-particles",
    "title": "Ngữ pháp cơ bản: 是, 有, 了, 的",
    "description": "4 cấu trúc quan trọng nhất",
    "level": 2,
    "content": "# Ngữ pháp cơ bản\n\n## 是 (shì) - Là\n我是学生 (wǒ shì xué sheng) - Tôi là học sinh\n\n## 有 (yǒu) - Có\n我有书 (wǒ yǒu shū) - Tôi có sách\n\n## 了 (le) - Đã/Thể hoàn thành\n我吃了 (wǒ chī le) - Tôi đã ăn\n\n## 的 (de) - Sở hữu/Định ngữ\n我的书 (wǒ de shū) - Sách của tôi",
    "order": 7
  },
  // ==================== HSK 2 GRAMMAR LESSONS ====================
  {
    "id": "hsk2-comparison-bi",
    "title": "Cấu trúc so sánh A 比 B",
    "description": "Dùng 比 để so sánh hai đối tượng",
    "level": 2,
    "content": "# Cấu trúc so sánh A 比 B\n\nCông thức: A + 比 + B + Tính từ\n\nVí dụ:\n- 我比他高。(wǒ bǐ tā gāo) - Tôi cao hơn anh ấy.\n- 这个比那个便宜。(zhè ge bǐ nà ge pián yi) - Cái này rẻ hơn cái kia.\n- 中文比英文难。(zhōng wén bǐ yīng wén nán) - Tiếng Trung khó hơn tiếng Anh.\n\nPhủ định: A + 不 + 比 + B + ... (không dùng trong tiếng Hán chuẩn, dùng A 没 B ... adj hoặc A 没有 B ... adj)\n\nCâu hỏi so sánh: A 比 B adj 吗？",
    "order": 8
  },
  {
    "id": "hsk2-degree-complement-de",
    "title": "Bổ ngữ mức độ V 得 adj",
    "description": "Dùng 得 để diễn tả mức độ của hành động",
    "level": 2,
    "content": "# Bổ ngữ mức độ V 得 adj\n\nCông thức: Động từ + 得 + Tính từ/Trạng thái\n\nVí dụ:\n- 他说中文说得很好。(tā shuō zhōng wén shuō de hěn hǎo) - Anh ấy nói tiếng Trung rất tốt.\n- 她唱歌唱得很好。(tā chàng gē chàng de hěn hǎo) - Cô ấy hát rất hay.\n- 我跑得比你快。(wǒ pǎo de bǐ nǐ kuài) - Tôi chạy nhanh hơn bạn.\n\nLưu ý: Động từ có thể lặp lại trước 得 (V-O-V得) hoặc dùng V得 (động từ nội tâm).",
    "order": 9
  },
  {
    "id": "hsk2-le-change",
    "title": "了 báo hiệu tình huống mới",
    "description": "Dùng 了 cuối câu để báo sự thay đổi",
    "level": 2,
    "content": "# 了 báo hiệu tình huống mới\n\nKhi ₂ ở cuối câu, nó báo hiệu tình huống mới hoặc sự thay đổi trạng thái.\n\nVí dụ:\n- 他走 le。(tā zǒu le) - Anh ấy đi rồi.\n- 下雨了。(xià yǔ le) - Trời mưa rồi.\n- 我饿了。(wǒ è le) - Tôi đói rồi.\n\nPhân biệt: 了 sau động từ (hoàn thành) vs 了 cuối câu (thay đổi trạng thái).",
    "order": 10
  },
  {
    "id": "hsk2-attributes-de",
    "title": "Cụm định ngữ + 的 + danh từ",
    "description": "Dùng để nối thành phần sửa đổi với danh từ",
    "level": 2,
    "content": "# Cụm định ngữ + 的 + danh từ\n\nCông thức: Cụm từ/ Mệnh đề + 的 + Danh từ\n\nVí dụ:\n- 我买的书。(wǒ mǎi de shū) - Quyển sách tôi mua.\n- 昨天去北京的那个人。(zuó tiān qù běi jīng de nà gè rén) - Người đó đi Bắc Kinh hôm qua.\n- 这个是我昨天买的书。(zhè shì wǒ zuó tiān mǎi de shū) - Đây là quyển sách tôi mua hôm qua.\n\nDùng để tạo thành câu phức, sửa đổi danh từ theo ngữ cảnh.",
    "order": 11
  },
  {
    "id": "hsk2-direction-complement",
    "title": "Bổ ngữ hướng: 来, 去, 进来, 出去",
    "description": "Hướng chuyển động đến hoặc đi xa",
    "level": 2,
    "content": "# Bổ ngữ hướng\n\nCông thức: V + 来/去/进来/出去/上去/下去\n\nVí dụ:\n- 请进来。(qǐng jìn lái) - Mời vào đây.\n- 请出去。(qǐng chū qù) - Vui lòng ra ngoài.\n- 请上来。(qǐng shàng lái) - Mời lên trên.\n- 请下去。(qǐng xià qù) - Vui lòng xuống dưới.\n- 书掉在地上了。(shū diào zài dì shàng le) - Sách rơi xuống sàn rồi.\n\n来 = về phía nơi nói, 去 = đi ra xa nơi nói.",
    "order": 12
  },
  {
    "id": "hsk2-ba-construction",
    "title": "Câu把 (bă)",
    "description": "Dùng把 để xử lý tân ngữ",
    "level": 2,
    "content": "# Câu把 (bǎ)\n\nCông thức: S + 把 + O + V + (địa chỉ/补语)\n\nVí dụ:\n- 我把书放在桌子上。(wǒ bǎ shū fàng zài zhuō zi shàng) - Tôi đặt sách lên bàn.\n- 他把门关上了。(tā bǎ mén guān shàng le) - Anh ấy đã đóng cửa.\n- 我把水喝了。(wǒ bǎ shuǐ hē le) - Tôi đã uống nước.\n\nput条件: Động từ phải có bổ ngữ hoặc địa chỉ sau sau.",
    "order": 13
  },
  {
    "id": "hsk2-bei-construction",
    "title": "Câu被 (bèi) - Thể động đành",
    "description": "Dùng bị để diễn tả hành động bị động",
    "level": 2,
    "content": "# Câu被 (bèi)\n\nCông thức: S + 被 + O + V\n\nVí dụ:\n- 书被我借了。(shū bèi wǒ jiè le) - Sách đã bị tôi mượn.\n- 窗户被风吹坏了。(chuāng hu bèi fēng chuāi huài le) - Cửa sổ bị gió hoãn hỏng.\n- 我被他骂了。(wǒ bèi tā mà le) - Tôi bị anh ấy mắng.\n\nDùng khi muốn nhấn mạnh đối tượng bị tác động hoặc kết quả tiêu cực.",
    "order": 14
  },
  {
    "id": "hsk2-yue-yue",
    "title": "Cấu trúc 越...越...",
    "description": "Càng ... càng ...",
    "level": 2,
    "content": "# Cấu trúc 越...越...\n\nCông thức: 越 + V/adj + 越 + adj\n\nVí dụ:\n- 越学越好。(yuè xué yuè hǎo) - Càng học càng tốt.\n- 天越来越热。(tiān yuè lái yuè rè) - Trời càng ngày càng nóng.\n- 这本书越来越贵。(zhè běn shū yuè lái yuè guì) - Cuốn sách này càng ngày càng đắt.\n\nDùng để diễn tả sự tương quan, thay đổi song song.",
    "order": 15
  },
  {
    "id": "hsk2-complement-result",
    "title": "Bổ ngữ kết quả V + 完/对/好",
    "description": "Dùng để diễn tả kết quả của hành động",
    "level": 2,
    "content": "# Bổ ngữ kết quả\n\nCông thức: V + 补语 (完, 对, 好, 错...)\n\nVí dụ:\n- 我看完了。(wǒ kàn wán le) - Tôi đã xem xong.\n- 他说对了。(tā shuō duì le) - Anh ấy nói đúng rồi.\n- 我做错了。(wǒ zuò cuò le) - Tôi đã làm sai.\n- 天气好了。(tiān qì hǎo le) - Thời tiết đã tốt rồi.\n\n完 = xong, 对 = đúng, 好 = tốt/hoàn thành, 错 = sai.",
    "order": 16
  },
  {
    "id": "hsk2-modal-verbs",
    "title": "Động từ khuyết thiếu: 会, 能, 要, 想",
    "description": "Dùng để diễn tả khả năng, nguyện vọng",
    "level": 2,
    "content": "# Động từ khuyết thiếu\n\n- 会 (huì): kỹ năng, biết làm gì (会说中文 = biết nói tiếng Trung)\n- 能 (néng): khả năng, có thể (能来 = có thể đến)\n- 要 (yào): muốn, sẽ, cần (要去 = sẽ đi)\n- 想 (xiǎng): muốn, nghĩ (想学 = muốn học)\n\nVí dụ:\n- 他会说中文。(tā huì shuō zhōng wén) - Anh ấy biết nói tiếng Trung.\n- 我能帮你。(wǒ néng bāng nǐ) - Tôi có thể giúp bạn.\n- 我想喝茶。(wǒ xiǎng hē chá) - Tôi muốn uống trà.\n- 明天要下雨。(míng tiān yào xià yǔ) - Ngày mai sẽ mưa.",
    "order": 17
  },
  {
    "id": "hsk2-serial-verbs",
    "title": "Câu liên động (连动句)",
    "description": "Hai động từ liên tiếp mà không có liên từ",
    "level": 2,
    "content": "# Câu liên động (连动句)\n\nCông thức: S + V1 + O1 + V2 + O2\n\nVí dụ:\n- 我去超市买东西。(wǒ qù chāo shì mǎi dōng xi) - Tôi đi siêu thị mua đồ.\n- 他来我家玩。(tā lái wǒ jiā wán) - Anh ấy đến nhà tôi chơi.\n- 我回家睡觉。(wǒ huí jiā shuì jiào) - Tôi về nhà ngủ.\n- 请进来坐。(qǐng jìn lái zuò) - Mời vào ngồi.\n\nHai động từ diễn tả hành động liên tiếp,目的 và phương tiện.",
    "order": 18
  },
  {
    "id": "hsk2-prepositions",
    "title": "Giới từ: 在, 对, 从, 向, 给",
    "description": "Dùng để chỉ vị trí, đối tượng, nguồn gốc",
    "level": 2,
    "content": "# Giới từ\n\n- 在 (zài): chỉ vị trí (书在桌子上 = sách ở trên bàn)\n- 对 (duì): đối với (他对我很好 = anh ấy rất thân thiện với tôi)\n- 从 (cóng): từ (我从北京来 = tôi đến từ Bắc Kinh)\n- 向 (xiàng): hướng tới (走向学校 = đi hướng trường học)\n- 给 (gěi): cho (给我帮忙 = giúp tôi)\n\nMỗi giới từ có vị trí cố định trong câu, thường đứng trước động từ chính.",
    "order": 19
  },
  {
    "id": "hsk2-compound-sentences",
    "title": "Câu phức: 因为, 虽然, 如果",
    "description": "Nối hai mệnh đề bằng liên từ",
    "level": 2,
    "content": "# Câu phức (复句)\n\n- 因为...所以... (yīn wèi... suǒ yǐ...): bởi vì... nên... (因为下雨，所以我们不去了)\n- 虽然...但是... (suī rán... dàn shì...): mặc dù... nhưng... (虽然忙，但是很高兴)\n- 如果...那么... (rú guǒ... nà me...): nếu... thì... (如果你来，那么我去)\n- 不但...而且... (bù dàn... ér qiě...): không chỉ... mà còn... (他不但会说中文，而且会说英文)\n- 宁可...也... (nìng kě... yě...):宁可... cũng... (我宁可不吃，也不吃这个)\n- 刚...就... (gāng... jiù...): vừa... đã... (我刚来就学习)",
    "order": 20
  },
  {
    "id": "hsk2-adverbs",
    "title": "Trạng từ: 也, 又, 再, 都",
    "description": "Phân biệt các trạng từ thể hiện lặp lại",
    "level": 2,
    "content": "# Trạng từ\n\n- 也 (yě): cũng (我也去过 = tôi cũng đã đến)\n- 又 (yòu): lại (quá khứ) (我又做了一次 = tôi lại làm một lần)\n- 再 (zài): lần nữa (tương lai) (请再来一次 = vui lòng đến một lần nữa)\n- 都 (dōu): tất cả (他们都是学生 = họ đều là học sinh)\n\nPhân biệt 又 (quá khứ) và 再 (tương lai/lần nữa).",
    "order": 21
  },
  {
    "id": "hsk2-tense-aspect",
    "title": "Thể và thì: 正在, 在...呢, 着, 刚",
    "description": "Diễn tả hành động tiếp diễn và vừa xảy ra",
    "level": 2,
    "content": "# Thể và thì\n\n- 正在 (zhèng zài): đang (正在学中文 = đang học tiếng Trung)\n- 在...呢 (zài... ne): đang (我在吃饭呢 = tôi đang ăn cơm)\n- 着 (zhe): trạng thái持続 (门开着 = cửa đang mở)\n- 刚 (gāng): vừa (我刚走了 = tôi vừa đi)\n- 刚才 (gāng cái): vừa rồi (刚才来过 = vừa rồi đã đến)\n\nDùng để chỉ thời gian và trạng thái của hành động.",
    "order": 22
  },
  {
    "id": "hsk2-conjunctions",
    "title": "Liên từ: 除了...还..., 只要...那么...",
    "description": "Cấu trúc liên từ phức hợp",
    "level": 2,
    "content": "# Liên từ phức hợp\n\n- 除了...还... (chú le... hái...): ngoài... còn... (除了中文，我还学英文)\n- 只要...那么... (zhǐ yào... nà me...): chỉ cần... thì... (只要不累，那么不停止)\n- 不但...而且... (bù dàn... ér qiě...): không chỉ... mà còn...\n- 要么...要么... (yào yào... yào yào...): hoặc... hoặc...\n- 虽然...但是... (suī rán... dàn shì...): mặc dù... nhưng...",
    "order": 23
  },
  {
    "id": "hsk2-tendency-complement",
    "title": "Bổ ngữ khuan định (趋向补语)",
    "description": "V + 来/去 báo hướng chuyển động",
    "level": 2,
    "content": "# Bổ ngữ khuan định\n\nCông thức: V + 来/去/进来/出去/上去/下去\n\n- 来 (lái): về phía nơi nói (拿来 = mang ra đây)\n- 去 (qù): đi ra xa nơi nói (拿去 = mang đi)\n- 进来 (jìn lái): vào trong (跑进来 = chạy vào)\n- 出去 (chū qù): ra ngoài (走出去 = đi ra ngoài)\n- 上去 (shàng qù): lên trên (爬上去 = leo lên trên)\n- 下去 (xià qù): xuống dưới (走下来 = đi xuống dưới)\n\nDùng để chỉ hướng chuyển động của hành động.",
    "order": 24
  },
  {
    "id": "hsk2-comparison-reduplication",
    "title": "So sánh bằng A 比 B adj",
    "description": "Cùng cấu trúc so sánh, nhiều ví dụ thực tế",
    "level": 2,
    "content": "# So sánh bằng A 比 B adj\n\nBài học bổ sung về cấu trúc so sánh với nhiều ví dụ thực tế.\n\nVí dụ:\n- 这个苹果比那个苹果甜。(zhè ge píng guǒ bǐ nà ge píng guǒ tián) - Táo này ngon hơn táo kia.\n- 我比哥哥大。(wǒ bǐ gē ge dà) - Tôi lớn hơn anh trai.\n- 今天比昨天热。(jīn tiān bǐ zuó tiān rè) - Hôm nay nóng hơn hôm qua.\n- 她比我高。(tā bǐ wǒ gāo) - Cô ấy cao hơn tôi.\n- 这个比那个大。(zhè ge bǐ nà ge dà) - Cái này lớn hơn cái kia.",
    "order": 25
  },
  {
    "id": "hsk2-one-side-other-side",
    "title": "Cấu trúc 一边...一边...",
    "description": "Cùng lúc làm hai việc",
    "level": 2,
    "content": "# Cấu trúc 一边...一边...\n\nCông thức: 一边 + V1 + 一边 + V2\n\nVí dụ:\n- 我一边吃饭一边看电视。(wǒ yī biān chī fàn yī biān kàn diàn shì) - Tôi ăn cơm mà xem tivi.\n- 他一边听音乐一边跑步。(tā yī biān tīng yīn yuè yī biān pǎo bù) - Anh ấy nghe nhạc mà chạy bộ.\n- 我一边开车一边打电话。(wǒ yī biān kāi chē yī biān dǎ diàn huà) - Tôi lái xe mà gọi điện.\n- 她一边做作业一边听音乐。(tā yī biān zuò zuò yè yī biān tīng yīn yuè) - Cô ấy làm bài mà nghe nhạc.\n- 我们一边聊天一边喝茶。(wǒ men yī biān liáo tiān yī biān hē chá) - Chúng tôi nói chuyện mà uống trà.\n\nDùng để diễn tả hai hành động xảy ra cùng lúc.",
    "order": 26
  },
  // ==================== HSK 3 GRAMMAR LESSONS ====================
  {
    "id": "hsk3-result-complement",
    "title": "Bổ ngữ kết quả HSK3",
    "description": "V + 补语 nâng cao",
    "level": 3,
    "content": "# Bổ ngữ kết quả nâng cao\n\n- 听懂 (tīng dǒng): nghe hiểu\n- 看完 (kàn wán): xem xong\n- 买完 (mǎi wán): mua xong\n- 做完 (zuò wán): làm xong\n- 写对 (xiě duì): viết đúng\n- 做错 (zuò cuò): làm sai\n- 冷了 (lěng le): lạnh rồi\n- 累坏了 (lèi huài le): mệt đến mức hỏng\n\nCấu trúc: V + 补语 + 了 (báo hoàn thành/thay đổi)",
    "order": 27
  },
  {
    "id": "hsk3-direction-complement-adv",
    "title": "Bổ ngữ khuan định HSK3",
    "description": "V + 来/去 với nhiều động từ",
    "level": 3,
    "content": "# Bổ ngữ khuan định nâng cao\n\n- 进来 (jìn lái): vào (请进来)\n- 拿去 (ná qù): mang đi (请拿去)\n- 走来 (zǒu lái): đi tới (请走来)\n- 走去 (zǒu qù): đi đi (请走去)\n- 爬上去 (pá shàng qù): leo lên (请爬上去)\n- 走下来 (zǒu xià lái): đi xuống (请走下来)\n- 跑进来 (pǎo jìn lái): chạy vào (请跑进来)\n\nDùng trong chỉ dẫn và mô tả chuyển động.",
    "order": 28
  },
  {
    "id": "hsk3-ba-bei-adv",
    "title": "把 và 被 nâng cao",
    "description": "Cấu trúc把 và被 với nhiều trường hợp",
    "level": 3,
    "content": "# Cấu trúc把 và被 nâng cao\n\n把 (bǎ): S + 把 + O + V + 补语/địa chỉ\n- 我把门关上了 (tôi đã đóng cửa)\n- 我的书被他拿走了 (sách của tôi bị anh ấy lấy đi)\n\n被 (bèi): S + 被 + O + V\n- 窗户被风吹坏了 (cửa sổ bị gió hoãn hỏng)\n- 我被他批评了 (tôi bị anh ấy chỉ trích)\n\nPhân biệt:把 nhấn mạnh tác động lên tân ngữ, 被 nhấn mạnh đối tượng bị tác động.",
    "order": 29
  },
  {
    "id": "hsk3-comparison-adv",
    "title": "So sánh nâng cao HSK3",
    "description": "比, 得 với cấu trúc phức",
    "level": 3,
    "content": "# So sánh nâng cao\n\n- A 比 B adj: 这个比那个大\n- V 得 adj: 他说中文说得很好\n- 越...越...: 越学越好\n- A 不如 B: 这个不如那个好 (cái này không bằng cái kia)\n- A 和 B 一样 adj: 这和那一样大 (cái này và cái kia bằng nhau)\n\nNhiều cấu trúc so sánh cùng xuất hiện trong một câu.",
    "order": 30
  },
  {
    "id": "hsk3-serial-sentences",
    "title": "Câu liên động nâng cao",
    "description": "Nhiều động từ liên tiếp",
    "level": 3,
    "content": "# Câu liên động nâng cao\n\n- 去北京玩 (qù běi jīng wán): đi Bắc Kinh chơi\n- 回家睡觉 (huí jiā shuì jiào): về nhà ngủ\n- 进来坐 (jìn lái zuò): vào ngồi\n- 去超市买东西 (qù chāo shì mǎi dōng xi): đi siêu thị mua đồ\n\nCó thể có 3+ động từ liên tiếp trong một câu.",
    "order": 31
  },
  {
    "id": "hsk3-complement-potential",
    "title": "Bổ ngữ tiềm năng V 得/不 + adj",
    "description": "Dùng để diễn tả khả năng làm được việc gì",
    "level": 3,
    "content": "# Bổ ngữ tiềm năng\n\n- V 得 + adj: làm được (听得懂 = nghe được hiểu)\n- V 不 + adj: không làm được (听不懂 = không nghe được hiểu)\n- 看得见 (kàn de jiàn): có thể nhìn thấy\n- 听得见 (tīng de jiàn): có thể nghe thấy\n- 做得完 (zuò de wán): có thể làm xong\n- 买不完 (mǎi bù wán): không mua xong được\n\nDùng để diễn tả khả năng hoặc không khả năng của hành động.",
    "order": 32
  },
  {
    "id": "hsk3-time-expression",
    "title": "Thời gian và tần suất",
    "description": "Dùng để chỉ thời gian xảy ra hành động",
    "level": 3,
    "content": "# Thời gian và tần suất\n\n- 每天 (měi tiān): mỗi ngày (每天学习中文 = học tiếng Trung mỗi ngày)\n- 每周 (měi zhōu): mỗi tuần (每周运动三次 = tập thể dục ba lần một tuần)\n- 每个月 (měi gè yuè): mỗi tháng\n- 上个月 (shàng gè yuè): tháng ngoái\n- 明年 (míng nián): năm sau\n- 去年 (qù nián): năm ngoái\n\nThời gian trạng ngữ đứng đầu câu hoặc trước động từ.",
    "order": 33
  },
  // ==================== HSK 4 GRAMMAR LESSONS ====================
  {
    "id": "hsk4-ba-complex",
    "title": "Câu把 phức tạp",
    "description": "把 với bổ ngữ kết quả và hướng",
    "level": 4,
    "content": "# Câu把 phức tạp\n\n- 我把书放在桌子上 (tôi đặt sách lên bàn)\n- 他把门关上了 (anh ấy đã đóng cửa)\n- 她把水喝了 (cô ấy đã uống nước)\n- 我把作业做完了 (tôi đã làm xong bài tập)\n\n把 + O + V + 补语/địa chỉ. Động từ phải đi kèm bổ ngữ hoặc địa chỉ.",
    "order": 34
  },
  {
    "id": "hsk4-bei-complex",
    "title": "Câu被 phức tạp",
    "description": "被 với nguyên nhân và kết quả",
    "level": 4,
    "content": "# Câu被 phức tạp\n\n- 书被我借了 (sách bị tôi mượn)\n- 窗户被风吹坏了 (cửa sổ bị gió hoãn hỏng)\n- 我被他骂了 (tôi bị anh ấy mắng)\n- 我的书被他拿走了 (sách của tôi bị anh ấy lấy đi)\n\nS + 被 + O + V. Nhấn mạnh đối tượng bị tác động, thường mang nghĩa tiêu cực.",
    "order": 35
  },
  {
    "id": "hsk4-passive-alternative",
    "title": "Thể bị động thay thế",
    "description": "叫, 让, 给 thay thế cho被",
    "level": 4,
    "content": "# Thể bị động thay thế\n\n- 叫 (jiào): lui gọi (他叫我去 = anh ấy bảo tôi đi)\n- 让 (ràng): để, bảo (让我去 = để tôi đi)\n- 给 (gěi): cho (给我打电话 = gọi điện cho tôi)\n\nCó thể dùng thay thế cho被 trong nhiều trường hợp, đặc biệt là ngữ văn nói.",
    "order": 36
  },
  {
    "id": "hsk4-causative",
    "title": "Cấu trúc làm cho (使, 让, 叫)",
    "description": "Dùng để diễn tả gây ra hành động",
    "level": 4,
    "content": "# Cấu trúc làm cho\n\n- 使 (shǐ): làm cho (使我高兴 = làm tôi vui vẻ)\n- 让 (ràng): để, bảo (让他去 = để anh ấy đi)\n- 叫 (jiào): gọi, bảo (叫我等 = bảo tôi chờ)\n\nS + 使/让/叫 + O + V. Dùng để diễn tả gây ra hoặc yêu cầu hành động.",
    "order": 37
  },
  {
    "id": "hsk4-object-fronting",
    "title": "Đưa tân ngữ lên trước",
    "description": "把 và bị động với tân ngữ lên trước",
    "level": 4,
    "content": "# Đưa tân ngữ lên trước\n\n- 把把 tân ngữ lên trước động từ (我把书放在桌子上)\n- 被把 tân ngữ lên trước để nhấn mạnh (书被我借了)\n- 被 động với 给 (这本书给我借了 = quyển sách này bị tôi mượn)\n\nDùng khi muốn nhấn mạnh tân ngữ hoặc khi tân ngữ dài phức tạp.",
    "order": 38
  },
  {
    "id": "hsk4-complement-direction",
    "title": "Bổ ngữ hướng nâng cao",
    "description": "V + 来/去 với nhiều động từ phức",
    "level": 4,
    "content": "# Bổ ngữ hướng nâng cao\n\n- 拿来 (ná lái): mang ra đây\n- 拿去 (ná qù): mang đi\n- 拿进来 (ná jìn lái): mang vào trong\n- 拿出去 (ná chū qù): mang ra ngoài\n- 走上来 (zǒu shàng lái): đi lên trên\n- 走下去 (zǒu xià qù): đi xuống dưới\n\nDùng trong chỉ dẫn chi tiết và mô tả chuyển động phức tạp.",
    "order": 39
  },
  {
    "id": "hsk4-potential-complement",
    "title": "Bổ ngữ tiềm năng nâng cao",
    "description": "V 得/不 + 补语",
    "level": 4,
    "content": "# Bổ ngữ tiềm năng nâng cao\n\n- 听得懂 (tīng de dǒng): nghe được hiểu\n- 听不懂 (tīng bù dǒng): không nghe được hiểu\n- 看得见 (kàn de jiàn): có thể nhìn thấy\n- 看不见 (kàn bù jiàn): không thể nhìn thấy\n- 做得完 (zuò de wán): có thể làm xong\n- 做不完 (zuò bù wán): không thể làm xong\n\nPhân biệt khả năng (tiềm năng) và hoàn thành (kết quả).",
    "order": 40
  },
  // ==================== HSK 5 GRAMMAR LESSONS ====================
  {
    "id": "hsk5-discourse-markers",
    "title": "Đánh dấu ngữ cảnh trong văn viết",
    "description": "Các từ nối trong bài luận",
    "level": 5,
    "content": "# Đánh dấu ngữ cảnh\n\n- 首先 (shǒu xiān): trước hết\n- 其次 (qì cì): thứ hai\n- 再然后 (zài rán hòu): sau đó\n- 最后 (zuì hòu): cuối cùng\n- 总之 (zǒng zhī): tóm lại\n- 然而 (rán ér): nhưng/nhưng lại\n- 因此 (yīn cǐ): do đó\n- 另外 (lìng wài): ngoài ra\n\nDùng trong bài luận và văn viết trang trọng.",
    "order": 41
  },
  {
    "id": "hsk5-complex-sentences",
    "title": "Câu phức nhiều mệnh đề",
    "description": "Nối nhiều mệnh đề với liên từ phức",
    "level": 5,
    "content": "# Câu phức nhiều mệnh đề\n\n- 虽然...但是... (mặc dù... nhưng...)\n- 因为...所以... (bởi vì... nên...)\n- 如果...那么... (nếu... thì...)\n- 既然...那么... (v既然... thì...)\n- 不仅...而且... (không chỉ... mà còn...)\n- 宁可...也... (宁可... cũng...)\n- 只要...就... (chỉ cần... thì...)\n\nDùng trong văn viết và nói trang trọng.",
    "order": 42
  },
  {
    "id": "hsk5-formal-writing",
    "title": "Văn phong trang trọng",
    "description": "Các cấu trúc dùng trong email, báo cáo",
    "level": 5,
    "content": "# Văn phong trang trọng\n\n- 您 (nín): quý vị (xưng hô trang trọng)\n- 请问 (qǐng wèn): làm ơn hỏi\n- 麻烦你 (má fan nǐ): phiền bạn\n- 感谢您 (gǎn xiè nín): cảm ơn quý vị\n- 此致 (cǐ zhì): kiến gửi\n- 顺颂 (shùn sòng): chúc...\n\nDùng trong email làm việc, báo cáo, văn bản chính thức.",
    "order": 43
  },
  {
    "id": "hsk5-idioms",
    "title": "Thành ngữ phổ biến",
    "description": "Chengyu dùng trong giao tiếp cấp cao",
    "level": 5,
    "content": "# Thành ngữ phổ biến\n\n- 一石二鸟 (yī shí èr niǎo): một viên n bắn hai con chim\n- 画蛇添足 (huà shé tiān zú): vẽ rắn thêm chân (làm thừa)\n- 塞翁失马 (sài wēng shī mǎ): lão sỹ mất ngựa (điều xui may có lành)\n- 杞人忧天 (qǐ rén yōu tiān): người Qi lo trời sập (lo lắng vô lý)\n- 畫龍點睛 (huà lóng diǎn jīng): vẽLong điểm睛 (điểm nhấn quan trọng)\n\nDùng để làm giàu bài viết và nói chuyện cấp cao.",
    "order": 44
  },
  // ==================== HSK 6 GRAMMAR LESSONS ====================
  {
    "id": "hsk6-academic-writing",
    "title": "Văn phong học thuật",
    "description": "Cấu trúc dùng trong luận文, báo cáo nghiên cứu",
    "level": 6,
    "content": "# Văn phong học thuật\n\n- 根据 (gēn jù): dựa theo\n- 表明 (biǎo míng): chỉ ra, bày tỏ\n- 表明 (biǎo xiàn): thể hiện\n- 分析 (fēn xī): phân tích\n- 结论 (jié lùn): kết luận\n- 发现 (fā xiàn): phát hiện\n- 研究 (yán jiū): nghiên cứu\n- 调查 (diào chá): khảo sát\n- 数据 (shù jù): dữ liệu\n- 方法论 (fāng fǎ lùn): phương pháp luận\n\nDùng trong luận文, báo cáo và văn viết học thuật.",
    "order": 45
  },
  {
    "id": "hsk6-logical-connectors",
    "title": "Liên từ logic trong học thuật",
    "description": "Các từ nối lập luận",
    "level": 6,
    "content": "# Liên từ logic\n\n- 因此 (yīn cǐ): do đó\n- 然而 (rán ér): tuy nhiên\n- 相比之下 (xiāng duì xià lái): ngược lại\n- 具体来说 (jù tǐ lái shuō): cụ thể nói\n- 一般来说 (yī bān lái shuō): nói chung\n- 换句话说 (hái shì shuō): có thể nói là\n- 也就是说 (nà jiù shì shuō): có nghĩa là\n- 例如 (lì rú): ví dụ\n\nDùng để xây dựng lập luận mạch lạc trong văn học thuật.",
    "order": 46
  },
  {
    "id": "hsk6-critical-thinking",
    "title": "Suy nghĩ phê bình",
    "description": "Cấu trúc để phản biện và đánh giá",
    "level": 6,
    "content": "# Suy nghĩ phê bình\n\n- 然而 (rán ér): tuy nhiên\n- 但是 (dàn shì): nhưng\n- 尽管 (jǐn guǎn): mặc dù\n- 尽管...但是... (mặc dù... nhưng...)\n- 反而 (fǎn ér): ngược lại\n- 实际上 (shí shí shàng): thực tế là\n- 事实上 (shí shàng): trên thực tế\n\nDùng để phản biện lập luận đối phương và đưa ra ý kiến riêng.",
    "order": 47
  },
  // ==================== HSK 7-9 GRAMMAR LESSONS ====================
  {
    "id": "hsk79-classical-chinese",
    "title": "Văn ngôn và cấu trúc cổ điển",
    "description": "Các cấu trúc từ văn ngôn trong tiếng Hán hiện đại",
    "level": 7,
    "content": "# Văn ngôn và cấu trúc cổ điển\n\n- 之 (zhī): trợ từ sở hữu (ngương của 的)\n- 其 (qí): của nó, của họ\n- 所 (suǒ): trợ từ chỉ động động bị động\n- 焉 (yān): trợ từ nơi chỗ, कारण\n- 而 (ér): và, nhưng\n- 然後 (rán hòu): sau đó\n- 遂 (suí): rồi, sau đó\n\nNhiều cấu trúc văn ngôn vẫn dùng trong văn viết trang trọng và học thuật.",
    "order": 48
  },
  {
    "id": "hsk9-formal-register",
    "title": "Ngôn ngữ trang trọng cao nhất",
    "description": "Cấu trúc dùng trong ngoại giao, luật, chính sách",
    "level": 9,
    "content": "# Ngôn ngữ trang trọng cao nhất\n\n- 具体而言 (jù tǐ ér yán): cụ thể nói là\n- 从...角度 (cóng... jiǎo dù): từ góc độ...\n- 在...方面 (zài... fāng miàn): về phía...\n- 就...而言 (jiù... ér yán): về...\n- 相应地 (xiāng yìng de): tương ứng\n- 与此同时 (xiāng tóng shí): đồng thời\n- 总而言之 (zǒng zhī ér yán): tóm lại\n\nDùng trong bài phát biểu, văn bản pháp lý, chính sách cấp cao.",
    "order": 49
  },
  {
    "id": "hsk9-academic-discourse",
    "title": "Ngôn ngữ học thuật cao cấp",
    "description": "Cấu trúc trong luận án, bài báo khoa học",
    "level": 9,
    "content": "# Ngôn ngữ học thuật cao cấp\n\n- 实证主义 (shí zhèng zhǔ yĩ): maine-positive\n- 现象学 (xiàn xiàng xué): hiện tượng học\n- 解构主义 (jiě gòu zhǔ yĩ): giải cấu chủ nghĩa\n- 后结构主义 (hòu jié gòu zhǔ yĩ): sau cấu trúc chủ nghĩa\n- 话语分析 (huà yǔ fēn xī): phân tích Gespräche\n- 权力话语 (quán lì huà yǔ): Gespräche quyền lực\n\nDùng trong luận án tiến sĩ, bài báo khoa học cấp cao.",
    "order": 50
  }
];

// Count verification helper (not exported)
const LEVEL_COUNTS: Record<number, number> = {};
for (const lesson of GRAMMAR_LESSONS) {
  LEVEL_COUNTS[lesson.level] = (LEVEL_COUNTS[lesson.level] || 0) + 1;
}
console.log(`Grammar lessons loaded: ${GRAMMAR_LESSONS} total`);
for (const [level, count] of Object.entries(LEVEL_COUNTS)) {
  console.log(`  HSK ${level}: ${count} lessons`);
}
