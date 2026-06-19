import { Wordcloud } from "@visx/wordcloud";

interface Palavra {
  text: string;
  value: number;
}

interface Props {
  palavras: Palavra[];
}

export default function NuvemPalavras({ palavras }: Props) {
  return (
    <div className="flex justify-center w-full">
      <svg width={900} height={350}>
        <Wordcloud
          words={palavras}
          width={900}
          height={350}
          font="Inter"
          padding={2}
          spiral="archimedean"
          rotate={() => 0}
          fontSize={(word) => {
            const min = Math.min(...palavras.map((p) => p.value));
            const max = Math.max(...palavras.map((p) => p.value));

            if (max === min) return 30;

            return 18 + ((word.value - min) / (max - min)) * 42;
          }}
        >
          {(words) =>
            words.map((word, i) => (
              <text
                key={i}
                textAnchor="middle"
                transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
                fontSize={word.size}
                fontFamily={word.font}
                fill="#C96A3D"
                fontWeight={700}
              >
                {word.text}
              </text>
            ))
          }
        </Wordcloud>
      </svg>
    </div>
  );
}