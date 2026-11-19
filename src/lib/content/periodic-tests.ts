import { DICTATION_ITEMS } from "./dictation";
import { GRAMMAR_QUESTIONS } from "./grammar-questions";
import { VOCAB, type VocabEntry } from "./vocab";

export type PeriodicQuestion = {
  id: string;
  kind: "vocab" | "grammar" | "listening";
  audio?: string;
  hanzi?: string;
  prompt: string;
  options: string[];
  answer: string;
  note: string;
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildVocabQuestion(word: VocabEntry, pool: VocabEntry[]): PeriodicQuestion {
  const meanings = [...new Set(pool.map(item => item.meaningVi))];
  const options = shuffle([word.meaningVi, ...shuffle(meanings.filter(meaning => meaning !== word.meaningVi)).slice(0, 3)]);
  return {
    id: `v-${word.hanzi}`,
    kind: "vocab",
    hanzi: word.hanzi,
    prompt: "Chọn nghĩa đúng của từ sau",
    options,
    answer: word.meaningVi,
    note: `${word.hanzi} (${word.pinyin}) — ${word.meaningVi}`,
  };
}

export function buildPeriodicTest(form: 0 | 1): PeriodicQuestion[] {
  const vocabPool = VOCAB.filter((word) => word.hskLevel === 1);
  const vocabPicks = [...new Map(vocabPool.map(word => [word.hanzi, word])).values()].slice(form * 8, (form + 1) * 8);
  const grammarPicks = GRAMMAR_QUESTIONS.filter(item => item.level === 1).slice(form * 7, (form + 1) * 7);

  const vocabQuestions = vocabPicks.map((word) => buildVocabQuestion(word, vocabPool));
  const grammarQuestions: PeriodicQuestion[] = grammarPicks.map((item) => ({
    id: item.id,
    kind: "grammar",
    hanzi: item.sentence.replace("___", "____"),
    prompt: item.hintVi,
    options: shuffle(item.options),
    answer: item.options[item.answer],
    note: item.explanation,
  }));

  const audioPool = DICTATION_ITEMS.filter(item => item.level === 1);
  const listeningQuestions: PeriodicQuestion[] = audioPool.slice(form * 5, (form + 1) * 5).map(item => {
    const wrongMeanings = [...new Set(audioPool.map(option => option.meaningVi))].filter(meaning => meaning !== item.meaningVi);
    return {
      id: item.id,
      kind: "listening",
      audio: item.hanzi,
      prompt: "Nghe câu tiếng Trung và chọn nghĩa đúng.",
      options: shuffle([item.meaningVi, ...shuffle(wrongMeanings).slice(0, 3)]),
      answer: item.meaningVi,
      note: `${item.hanzi} (${item.pinyin}) · ${item.meaningVi}`,
    };
  });

  return [...shuffle([...vocabQuestions, ...grammarQuestions]), ...listeningQuestions];
}
