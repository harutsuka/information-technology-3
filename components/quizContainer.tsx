import style from "./quizContainer.module.css";

export default function QuizContainer({ questions }: { questions: any[] }) {
  return (
    <div className={style.container}>
      {questions.map((q) => (
        <div key={q.id} className={style.question}>
          <p className={style.week}>第{q.week}回</p>
          <p>問題: {q.question}</p>
          {q.choices !== "" && <p>選択肢: {q.choices}</p>}
          <p>解答: {q.answer}</p>
        </div>
      ))}
    </div>
  );
}
