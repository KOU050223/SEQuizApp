interface ExplanationPanelProps {
  correctAnswer: number;
  explanation?: string;
  isCorrect: boolean;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function ExplanationPanel({
  correctAnswer,
  explanation,
  isCorrect,
  onNext,
  isLastQuestion
}: ExplanationPanelProps) {
  const label = String.fromCharCode(65 + correctAnswer);

  return (
    <div className={`mt-6 p-6 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="mb-4">
        <div className="text-2xl font-bold mb-2">
          {isCorrect ? '✓ 正解!' : '✗ 不正解'}
        </div>
        <div className="text-lg">
          正解: <span className="font-bold">{label}</span>
        </div>
      </div>

      {explanation && (
        <div className="mb-4 p-4 bg-white rounded border">
          <div className="font-bold mb-2">解説</div>
          <p className="whitespace-pre-wrap">{explanation}</p>
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        {isLastQuestion ? '結果を見る' : '次の問題へ'}
      </button>
    </div>
  );
}
