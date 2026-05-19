export function filterQuestionsByWeek(questions: any[], week: number) {
  return questions.filter((q) => q.week === week);
}

export function filterQuestionsByKeyword(questions: any[], keyword: string) {
  return questions.filter((q) => q.question.includes(keyword));
}

export function shuffleQuestions(questions: any[]) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}
