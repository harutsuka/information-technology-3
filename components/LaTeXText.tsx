import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function LaTeXText({ text }: { text: string }) {
  const parts = text.split(/(\$.*?\$)/g); // $で囲まれた部分で分割

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          const cleanedPart = part.replace(/^\$/, "").replace(/\$$/, "").trim();
          if (!cleanedPart) return null;

          return <InlineMath key={index} math={cleanedPart} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
