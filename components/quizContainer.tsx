import style from "./quizContainer.module.css";

export default function QuizContainer({ question }: { question: any }) {
  return (
    <div className={style.container}>
      {question && (
        <div key={question.id} className={style.question}>
          <p className={style.week}>第{question.week}回</p>
          <p>問題: {question.question}</p>
          {question.choices?.length > 0 && <p>選択肢: {question.choices}</p>}
          <p>解答: {question.answer}</p>
        </div>
      )}
    </div>
  );
}
