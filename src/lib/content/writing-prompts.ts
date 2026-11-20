export type WritingPrompt = {
  id: string;
  level: string;
  title: string;
  instruction: string;
  checklist: string[];
};

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: "hsk1-greeting", level: "HSK 1", title: "Greeting someone",
    instruction: "Write 2–3 simple sentences to introduce yourself. Say your name, where you are from, and one thing you like.",
    checklist: ["State your name", "Say where you are from", "Mention one thing you like"],
  },
  {
    id: "hsk1-order-food", level: "HSK 1", title: "Ordering food",
    instruction: "Write a short note to order food at a restaurant. Say what you want to eat and drink.",
    checklist: ["Name one dish you want", "Name one drink you want", "Use polite words"],
  },
  {
    id: "hsk1-ask-time", level: "HSK 1", title: "Asking the time",
    instruction: "Write a short message to ask a friend what time it is and what time you are meeting.",
    checklist: ["Ask what time it is", "Mention the meeting time", "Use a question mark"],
  },
  {
    id: "hsk1-family", level: "HSK 1", title: "Giới thiệu gia đình",
    instruction: "Viết 3–4 câu giới thiệu thành viên trong gia đình bạn. Nêu tên, mối quan hệ và một đặc điểm của mỗi người.",
    checklist: ["Nêu ít nhất hai thành viên", "Gọi mối quan hệ đúng (mẹ, anh, em...)", "Mô tả một đặc điểm"],
  },
  {
    id: "hsk1-daily-routine", level: "HSK 1", title: "Hoạt động hàng ngày",
    instruction: "Viết về những việc bạn thường làm mỗi sáng. Nêu thời gian và hoạt động.",
    checklist: ["Nêu thời gian (bảy giờ, tám giờ...)", "Nêu ít nhất hai hoạt động", "Dùng động từ đúng cách"],
  },
  {
    id: "hsk1-food-drink", level: "HSK 1", title: "Thức ăn và đồ uống yêu thích",
    instruction: "Viết về món ăn và đồ uống bạn thích hoặc không thích. Giải thích tại sao ngắn gọn.",
    checklist: ["Nêu một món ăn thích", "Nêu một đồ uống thích", "Nêu lý do thích hoặc không thích"],
  },
  {
    id: "hsk1-hobby", level: "HSK 1", title: "Sở thích",
    instruction: "Viết về một hoạt động bạn thích làm vào rỗi. Nêu bạn làm khi nào và cùng ai.",
    checklist: ["Nêu hoạt động sở thích", "Nêu thời gian làm", "Nêu người cùng làm"],
  },
  {
    id: "hsk1-weather", level: "HSK 1", title: "Thời tiết hôm nay",
    instruction: "Mô tả thời tiết hôm nay và nói bạn sẽ mặc gì hoặc đi đâu phù hợp.",
    checklist: ["Mô tả thời tiết (nắng, mưa, lạnh...)", "Nêu hoạt động phù hợp", "Dùng câu đơn giản HSK 1"],
  },
  {
    id: "hsk1-shopping", level: "HSK 1", title: "Mua sắm",
    instruction: "Viết một ghi chú ngắn về vật phẩm bạn muốn mua. Nêu tên vật phẩm, màu sắc và giá cả.",
    checklist: ["Nêu tên vật phẩm", "Nêu màu sắc", "Nêu giá hoặc \"đắt\" / \"rẻ\""],
  },
  {
    id: "hsk1-location", level: "HSK 1", title: "Nơi bạn ở",
    instruction: "Viết về nơi bạn sinh sống. Nêu thành phố, nước và một nơi bạn thích ở đó.",
    checklist: ["Nêu thành phố hoặc quốc gia", "Nêu một địa điểm thích", "Dùng câu đơn, rõ ràng"],
  },
  {
    id: "hsk1-nationality", level: "HSK 1", title: "Quốc gia và nghề nghiệp",
    instruction: "Giới thiệu bản thân: tên, quốc gia, nghề nghiệp và một bằng ngôn ngữ bạn đang học.",
    checklist: ["Nêu tên bản thân", "Nêu quốc gia và nghề", "Nêu ngôn ngữ đang học"],
  },
  {
    id: "hsk1-friend", level: "HSK 1", title: "Bạn tốt",
    instruction: "Viết về một người bạn. Nêu tên, nghề nghiệp và lý do bạn thích người đó.",
    checklist: ["Nêu tên bạn", "Nêu nghề nghiệp", "Nêu lý do thích"],
  },
  {
    id: "hsk2-invitation", level: "HSK 2", title: "Rủ bạn đi ăn",
    instruction: "Viết 3–4 câu nhắn cho bạn. Rủ bạn đi ăn vào thứ Bảy, đề xuất giờ và nơi gặp rồi hỏi bạn có rảnh không.",
    checklist: ["Có lời mời, giờ và địa điểm", "Đặt thời gian trước động từ", "Có một câu hỏi dễ trả lời"],
  },
  {
    id: "hsk3-reschedule", level: "HSK 3", title: "Đổi lịch hẹn",
    instruction: "Viết một tin nhắn báo bạn sẽ đến muộn. Giải thích lý do và đề xuất một giờ gặp khác.",
    checklist: ["Nêu lý do và ảnh hưởng", "Đề xuất giờ mới cụ thể", "Giữ giọng lịch sự"],
  },
  {
    id: "hsk4-neighborhood", level: "HSK 4", title: "Chọn nơi ở",
    instruction: "So sánh hai nơi ở theo chi phí và đi lại. Chọn một nơi và giải thích lựa chọn cho người mới chuyển đến.",
    checklist: ["So sánh hai nơi trên cùng tiêu chí", "Có lý do cho lựa chọn", "Dùng liên từ để nối các ý"],
  },
  {
    id: "hsk5-work-email", level: "HSK 5", title: "Email đề nghị điều chỉnh công việc",
    instruction: "Viết email cho quản lý giải thích vì sao cần đổi thứ tự hai việc trong tuần. Đề xuất lịch mới và nêu tác động tới đồng đội.",
    checklist: ["Nêu đề nghị ở đầu email", "Giải thích tác động bằng chi tiết", "Dùng cách xưng hô phù hợp môi trường công việc"],
  },
  {
    id: "hsk6-research", level: "HSK 6", title: "Thiết kế khảo sát thói quen học",
    instruction: "Viết đề cương khảo sát về việc học ngôn ngữ hằng ngày. Nêu câu hỏi nghiên cứu, cách chọn người trả lời và một giới hạn của phương pháp.",
    checklist: ["Tách câu hỏi, phương pháp và giới hạn", "Giải thích lựa chọn phương pháp", "Dùng văn phong học thuật"],
  },
  {
    id: "hsk79-debate", level: "HSK 7–9", title: "Tranh luận về AI trong lớp học",
    instruction: "Viết một lập luận về việc cho phép AI hỗ trợ làm bài. Trình bày một phản biện nghiêm túc và đề xuất nguyên tắc thực thi. Kết thúc bằng một câu tóm tắt tiếng Trung tương đương với «Trợ giúp chỉ có giá trị khi người học vẫn giải thích được lựa chọn của mình».",
    checklist: ["Phân biệt luận điểm, phản biện và điều kiện", "Đề xuất nguyên tắc có thể áp dụng", "Câu kết giữ đúng quan hệ điều kiện của bản Việt"],
  },
];
