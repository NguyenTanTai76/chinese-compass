import { pinyin } from "pinyin-pro";
import type { Level, Scenario } from "./speaking";

type Scene = [id: string, title: string, role: string, context: string, opening: string, meaning: string, goal: string, keyword: string, gloss: string];

const scenes: Record<Level, Scene[]> = {
  "Mới bắt đầu": [
    ["hello-classmate", "Chào bạn cùng lớp", "Bạn cùng lớp", "Hai người gặp nhau trước giờ học", "早上好！你好吗？", "Chào buổi sáng! Bạn khỏe không?", "Chào lại, nói mình khỏe và hỏi thăm bạn.", "我很好", "tôi khỏe"],
    ["choose-water-tea", "Chọn nước hay trà", "Bạn đến chơi", "Bạn được mời uống một trong hai loại", "你喝水还是喝茶？", "Bạn uống nước hay trà?", "Chọn đồ uống và cảm ơn.", "谢谢", "cảm ơn"],
  ],
  "HSK 1": [
    ["family-photo", "Ảnh gia đình", "Bạn cùng lớp", "Hai bạn xem ảnh gia đình", "照片里的人是谁？", "Người trong ảnh là ai?", "Giới thiệu một người và quan hệ với mình.", "这是", "đây là"],
    ["class-time", "Giờ vào lớp", "Bạn cùng lớp", "Bạn cần hẹn giờ đến trường", "你几点去学校？", "Bạn đi học lúc mấy giờ?", "Nói một giờ cụ thể và nơi sẽ đến.", "八点", "tám giờ"],
    ["where-from", "Quê bạn ở đâu?", "Bạn mới quen", "Hai người nói về quê quán", "你是哪国人？", "Bạn là người nước nào?", "Nói quốc tịch và hỏi lại quốc tịch của bạn mới.", "越南人", "người Việt Nam"],
    ["small-pet", "Con vật ở nhà", "Hàng xóm", "Hai người nói về thú cưng", "你家有猫吗？", "Nhà bạn có mèo không?", "Trả lời có hay không và nói tên con vật nếu có.", "没有", "không có"],
    ["fruit-stand", "Mua táo", "Người bán trái cây", "Chọn số lượng táo cần mua", "你要几个苹果？", "Bạn muốn mấy quả táo?", "Nói số lượng với lượng từ 个.", "两个", "hai cái"],
    ["weather-today", "Hôm nay trời thế nào?", "Bạn nhắn tin", "Bạn ở nơi khác đang hỏi thời tiết", "你那儿今天天气怎么样？", "Hôm nay chỗ bạn thời tiết thế nào?", "Mô tả thời tiết bằng một cụm quen thuộc.", "很冷", "rất lạnh"],
    ["book-in-bag", "Tìm sách", "Bạn cùng lớp", "Tìm quyển sách trước giờ học", "你的书在哪儿？", "Sách của bạn ở đâu?", "Dùng 在 để nói vị trí.", "在包里", "ở trong túi"],
    ["tomorrow-plan", "Ngày mai làm gì?", "Bạn thân", "Hai người định gặp ngày mai", "你明天想做什么？", "Ngày mai bạn muốn làm gì?", "Nói một hoạt động và đưa ra lời rủ.", "一起", "cùng nhau"],
    ["birthday-date", "Ngày sinh nhật", "Bạn cùng lớp", "Nhóm đang chọn ngày chúc mừng bạn", "你的生日是几月几号？", "Sinh nhật bạn là ngày mấy tháng mấy?", "Nói tháng và ngày theo đúng thứ tự.", "月", "tháng"],
  ],
  "HSK 2": [
    ["train-station-delay", "Đến muộn ở ga", "Bạn đi cùng", "Lỡ xe và sắp muộn giờ gặp", "你大概几点能到车站？", "Khoảng mấy giờ bạn đến được ga?", "Báo giờ đến mới và giải thích ngắn lý do.", "迟到", "đến muộn"],
    ["return-size", "Đổi cỡ áo", "Nhân viên cửa hàng", "Chiếc áo đã mua không vừa", "这件衣服哪里不合适？", "Cái áo này không vừa chỗ nào?", "Mô tả vấn đề và hỏi có cỡ khác không.", "换", "đổi"],
    ["healthy-routine", "Vận động sau giờ học", "Bạn học", "Hai bạn muốn vận động thường xuyên", "你平时怎么锻炼身体？", "Bạn thường tập thể dục thế nào?", "Nói hoạt động, tần suất và một lý do.", "每周", "mỗi tuần"],
    ["ticket-choice", "Chọn chuyến tàu", "Nhân viên bán vé", "Hai chuyến có thời gian khác nhau", "你想坐早上的车还是下午的车？", "Bạn muốn đi chuyến sáng hay chuyến chiều?", "Chọn chuyến và giải thích giờ phù hợp.", "更早", "sớm hơn"],
    ["restaurant-preference", "Món ăn cho cả nhóm", "Bạn cùng bàn", "Cả nhóm chọn món chung", "你想点什么菜？", "Bạn muốn gọi món gì?", "Nêu một món và một yêu cầu như ít cay.", "少放", "cho ít"],
    ["study-after-work", "Học sau giờ làm", "Đồng nghiệp", "Bạn muốn duy trì việc học tiếng Trung", "你下班以后什么时候学习？", "Bạn học lúc nào sau giờ tan làm?", "Nói lịch thường lệ và một việc bạn học.", "以后", "sau khi"],
    ["lend-book", "Mượn sách của bạn", "Bạn cùng phòng", "Bạn cần sách về nhà đọc", "你打算什么时候还书？", "Bạn định trả sách lúc nào?", "Hẹn giờ trả và cảm ơn người cho mượn.", "还书", "trả sách"],
    ["weekend-visit", "Thăm nhà bạn", "Chủ nhà", "Bạn đến chơi cuối tuần", "你想在我家待多久？", "Bạn muốn ở nhà mình bao lâu?", "Nói thời lượng và giải thích kế hoạch kế tiếp.", "待", "ở lại"],
    ["lost-umbrella", "Tìm ô bị bỏ quên", "Nhân viên trực", "Bạn bỏ quên ô trong phòng học", "你最后一次在哪儿用那把伞？", "Lần cuối bạn dùng chiếc ô ở đâu?", "Nêu địa điểm và mô tả chiếc ô.", "忘了", "quên mất"],
    ["new-phone", "So sánh điện thoại", "Người bán", "Bạn cân nhắc hai mẫu điện thoại", "你比较喜欢哪一部手机？", "Bạn thích chiếc điện thoại nào hơn?", "So sánh hai mẫu theo giá hoặc kích thước.", "比较", "tương đối, so sánh"],
    ["buy-gift", "Chọn quà sinh nhật", "Bạn đi mua quà", "Hai người chọn quà cho bạn chung", "你觉得给她买什么礼物好？", "Bạn nghĩ mua quà gì cho cô ấy thì tốt?", "Đề xuất quà và nói vì sao.", "我觉得", "tôi nghĩ"],
    ["library-seat", "Xin ngồi cạnh cửa sổ", "Người đang học", "Thư viện còn một chỗ trống", "你想坐这里吗？", "Bạn muốn ngồi ở đây à?", "Hỏi chỗ có người chưa rồi cảm ơn.", "有人", "có người"],
    ["practice-language", "Hẹn luyện tiếng Trung", "Bạn trao đổi ngôn ngữ", "Hai bạn có lịch rảnh khác nhau", "你一般哪天有空练习汉语？", "Thường ngày nào bạn rảnh luyện tiếng Trung?", "Nói một ngày rảnh và đề nghị thời lượng.", "有空", "có thời gian rảnh"],
    ["daily-route", "Đường đi làm", "Đồng nghiệp mới", "So sánh cách đi làm hằng ngày", "你每天怎么来公司？", "Mỗi ngày bạn đến công ty bằng cách nào?", "Nêu phương tiện và thời gian di chuyển.", "花", "tốn"],
  ],
  "HSK 3": [
    ["hsk3-event-change", "Đổi giờ hoạt động lớp", "Lớp trưởng", "Giờ dự kiến trùng với lịch của vài bạn", "你建议把活动改到什么时候？", "Bạn đề nghị đổi hoạt động sang lúc nào?", "Đề xuất mốc giờ mới và giải thích vì sao.", "改到", "đổi sang"],
    ["hsk3-lost-parcel", "Tìm kiện hàng", "Nhân viên giao hàng", "Ứng dụng báo đã giao nhưng bạn chưa nhận", "你最后一次查看物流是什么时候？", "Lần cuối bạn xem thông tin vận chuyển là khi nào?", "Nêu thời điểm và hỏi bước kiểm tra tiếp theo.", "物流", "thông tin vận chuyển"],
  ],
  "HSK 4": [
    ["hsk4-rent-decision", "Chọn căn hộ", "Bạn cùng thuê", "Cân nhắc giá và thời gian đi làm", "你愿意为了节省通勤时间多付一点房租吗？", "Bạn có sẵn sàng trả thêm tiền thuê để tiết kiệm thời gian đi làm không?", "Nêu một đánh đổi và điều kiện chấp nhận.", "权衡", "cân nhắc đánh đổi"],
    ["hsk4-training-plan", "Phân công buổi hướng dẫn", "Đồng nghiệp", "Nhóm sắp hướng dẫn người mới", "我们应该先给新同事介绍哪项工作？", "Ta nên giới thiệu việc nào trước cho người mới?", "Chọn một việc và giải thích thứ tự.", "优先", "ưu tiên"],
  ],
  "HSK 5": [
    ["hsk5-delivery-risk", "Báo nguy cơ trễ hạn", "Quản lý dự án", "Một hạng mục phụ thuộc bên cung cấp", "如果供应商推迟交付，你准备怎么调整计划？", "Nếu nhà cung cấp giao muộn, bạn định điều chỉnh kế hoạch thế nào?", "Giải thích rủi ro và nêu phương án dự phòng.", "应对", "ứng phó"],
    ["hsk5-negotiate", "Thương lượng phạm vi", "Khách hàng nội bộ", "Nguồn lực chỉ đủ cho một yêu cầu trong tuần", "这两个需求里，你认为哪个必须在本周完成？", "Trong hai yêu cầu, theo bạn việc nào bắt buộc xong tuần này?", "Thuyết phục đối tác bằng tiêu chí giá trị và cam kết.", "取舍", "chọn và bỏ"],
  ],
  "HSK 6": [
    ["hsk6-sample-design", "Bảo vệ cách lấy mẫu", "Người phản biện", "Bạn trình bày đề cương nghiên cứu", "你的样本如何覆盖不常使用图书馆的学生？", "Mẫu của bạn bao phủ sinh viên ít dùng thư viện thế nào?", "Giải thích cách giảm thiên lệch chọn mẫu và nêu một giới hạn.", "抽样", "lấy mẫu"],
    ["hsk6-prior-evidence", "Bằng chứng trái chiều", "Đồng tác giả", "Nghiên cứu trước cho kết quả không thống nhất", "如果两项研究的结论不同，你会先比较哪些因素？", "Nếu hai nghiên cứu kết luận khác nhau, bạn sẽ so sánh yếu tố nào trước?", "Phân biệt phương pháp, mẫu và khả năng khái quát.", "变量", "biến số"],
  ],
  "HSK 7–9": [
    ["hsk79-ai-disclosure", "Tranh luận về khai báo AI", "Người chủ trì hội thảo", "Trường muốn ban hành quy định dùng AI khi viết bài", "要求学生披露使用人工智能的过程，在哪些情况下可能流于形式？", "Trong trường hợp nào yêu cầu sinh viên khai báo quá trình dùng AI có thể thành hình thức?", "Nêu lập luận, phản biện và điều kiện thực thi có thể kiểm tra.", "流于形式", "rơi vào hình thức"],
    ["hsk79-translation-brief", "Bảo vệ lựa chọn dịch thuật", "Biên tập viên", "Bạn giải thích một đoạn dịch cho độc giả phổ thông", "原文的语气和译文的可读性发生冲突时，你会如何取舍？", "Khi giọng nguyên văn và độ dễ đọc của bản dịch xung đột, bạn cân nhắc ra sao?", "Nêu một tiêu chí giữ nghĩa, một ngoại lệ và ví dụ minh họa.", "语体", "phong cách ngôn ngữ"],
  ],
};

export const AUTHORED_SCENARIOS: Scenario[] = Object.entries(scenes).flatMap(([level, group]) =>
  group.map(([id, label, roleplay, description, openingZh, openingVi, objective, keyword, vi]) => ({
    id, label, roleplay, description, openingZh, openingVi, objective, level: level as Level,
    openingPinyin: pinyin(openingZh, { nonZh: "consecutive" }),
    practice: `Làm lại tình huống với chi tiết khác. Cố gắng dùng ${keyword} đúng ngữ cảnh.`,
    keywords: [{ zh: keyword, pinyin: pinyin(keyword), vi }],
  })),
);
