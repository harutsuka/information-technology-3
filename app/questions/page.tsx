import { getQuestions } from "@/lib/questions";
import QuizListAll from "./QuizListAll";

export default async function QuestionsPage() {
  const allQuestions = (await getQuestions()) || [];

  return <QuizListAll allQuestions={allQuestions} />;
}
