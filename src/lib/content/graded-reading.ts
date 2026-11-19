import type { ReadingPassage } from "./reading";

const passages: Omit<ReadingPassage, "wordCount">[] = [
  {
    id: "hsk2-bus-change", title: "Chuyến xe đến thư viện", level: 2, topic: "Đời sống",
    sentences: ["小安星期六想去图书馆。", "他平时坐公交车，可是今天车来得很晚。", "他和朋友一起走过去，二十分钟就到了。"],
    check: {
      prompt: "Hôm nay Tiểu An đến thư viện bằng cách nào?",
      options: ["Đi bộ cùng bạn", "Đi xe buýt một mình", "Đi xe đạp cùng bạn"],
      answer: "Đi bộ cùng bạn",
      explanation: "一起走过去 nghĩa là cùng nhau đi bộ đến đó. Xe buýt là phương tiện Tiểu An thường đi.",
    },
  },
  {
    id: "hsk3-library-volunteers", title: "Buổi tình nguyện ở thư viện", level: 3, topic: "Đời sống",
    sentences: ["周六，图书馆请几位学生帮忙整理旧书。", "小林原来想下午去，但是管理员说上午人手更少。", "她和同学商量以后，把见面的时间改到了九点。", "工作结束时，她们还选了两本书带回家。"],
    check: {
      prompt: "Vì sao Tiểu Lâm đổi lịch sang buổi sáng?",
      options: ["Buổi sáng thiếu người hơn", "Buổi chiều thư viện đóng cửa", "Cô ấy chỉ mượn được sách lúc chín giờ"],
      answer: "Buổi sáng thiếu người hơn",
      explanation: "上午人手更少 cho biết buổi sáng có ít người hỗ trợ hơn.",
    },
  },
  {
    id: "hsk4-work-commute", title: "Đi làm xa hay ở gần?", level: 4, topic: "Công việc",
    sentences: ["吴明刚换了工作，正在考虑要不要搬家。", "现在的房租比较低，但是每天来回要花两个小时。", "公司附近的房子虽然贵一些，却能让他每天多出一个小时学习。", "他决定先记录一个月的交通费和通勤时间，再和家人讨论。"],
    check: {
      prompt: "Ngô Minh quyết định làm gì trước khi trao đổi với gia đình?",
      options: ["Ghi chi phí và thời gian đi lại trong một tháng", "Thuê nhà gần cơ quan ngay", "Xin công ty hỗ trợ tiền thuê"],
      answer: "Ghi chi phí và thời gian đi lại trong một tháng",
      explanation: "先记录……再讨论 xác định thứ tự của hai hành động.",
    },
  },
  {
    id: "hsk5-meeting-notes", title: "Biên bản cuộc họp có ích", level: 5, topic: "Công việc",
    sentences: ["部门过去把会议内容逐句记下来，但同事很少翻阅这些记录。", "新负责人要求每次只写清楚三个问题：作出了什么决定、由谁负责、何时完成。", "如果某个问题还没有结论，应当注明下次讨论之前需要补充哪些信息。", "几周以后，大家发现会议时间没有变短，重复讨论的次数却明显减少了。"],
    check: {
      prompt: "Sau vài tuần, thay đổi nào được quan sát?",
      options: ["Ít thảo luận lặp lại hơn", "Thời lượng họp giảm rõ rệt", "Mọi vấn đề đều có kết luận ngay"],
      answer: "Ít thảo luận lặp lại hơn",
      explanation: "却 chuyển sang kết quả tương phản với thời lượng. Điều giảm là 重复讨论的次数.",
    },
  },
  {
    id: "hsk6-survey-bias", title: "Ai trả lời khảo sát?", level: 6, topic: "Học thuật",
    sentences: ["为了了解学生的课外阅读习惯，研究组在图书馆门口发放了问卷。", "结果显示，大部分受访者每周至少借一次书。", "然而，这一比例并不能代表全校学生，因为几乎不去图书馆的人本来就不容易被抽到。", "研究组随后改用随机抽取的学号邀请学生填写，并比较两次调查的结果。"],
    check: {
      prompt: "Hạn chế chính của khảo sát lần đầu là gì?",
      options: ["Địa điểm lấy mẫu thiên về người thường đến thư viện", "Câu hỏi chỉ cho một lựa chọn", "Nhóm nghiên cứu dùng sai mã sinh viên"],
      answer: "Địa điểm lấy mẫu thiên về người thường đến thư viện",
      explanation: "Người hiếm khi đến thư viện ít có cơ hội được khảo sát, làm mẫu không đại diện.",
    },
  },
  {
    id: "hsk79-disclosure", title: "Công khai cách dùng công cụ", level: 7, topic: "Tranh luận",
    sentences: ["围绕写作工具的争论，常常把工具的存在与作者是否尽责混为一谈。", "一种更可操作的规则是要求作者披露工具介入的环节，并解释自己为何接受或拒绝关键建议。", "不过，披露本身不能替代核实；如果教师没有时间核对材料，冗长的说明反而可能成为形式负担。", "因此，制度设计应当把有限的核查资源集中到对结论影响最大的环节。"],
    check: {
      prompt: "Đoạn văn đề xuất dùng nguồn lực kiểm tra có hạn ra sao?",
      options: ["Tập trung vào các khâu ảnh hưởng nhất tới kết luận", "Kiểm tra mọi bước với mức độ như nhau", "Chỉ kiểm tra độ dài phần công khai"],
      answer: "Tập trung vào các khâu ảnh hưởng nhất tới kết luận",
      explanation: "对结论影响最大的环节 là những khâu có ảnh hưởng lớn nhất đến kết luận.",
    },
  },
];

export const GRADED_READING: ReadingPassage[] = passages.map(passage => ({
  ...passage,
  wordCount: (passage.sentences.join("").match(/\p{Script=Han}/gu) ?? []).length,
}));
