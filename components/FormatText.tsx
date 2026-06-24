import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function FormatText({ text }: { text: string }) {
  const formattedText = text.replace(/\\n/g, "\n");

  if (!formattedText.includes('$')) {
    return <span className="whitespace-pre-wrap">{formattedText}</span>;
  }
  
  const parts = formattedText.split(/(\$.*?\$)/g); // $で囲まれた部分で分割

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          const cleanedPart = part.replace(/^\$/, "").replace(/\$$/, "").trim();
          if (!cleanedPart) return null;

          return <InlineMath key={index} math={cleanedPart} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
