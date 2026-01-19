interface ChoiceButtonProps {
  choice: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isAnswered: boolean;
  onClick: () => void;
}

export function ChoiceButton({
  choice,
  index,
  isSelected,
  isCorrect,
  isAnswered,
  onClick
}: ChoiceButtonProps) {
  const label = String.fromCharCode(65 + index); // A, B, C, D, E

  const getButtonStyle = () => {
    if (!isAnswered) {
      return isSelected
        ? 'bg-blue-500 text-white border-blue-500'
        : 'bg-white hover:bg-gray-50 border-gray-300';
    }

    if (isCorrect) {
      return 'bg-green-500 text-white border-green-500';
    }

    if (isSelected) {
      return 'bg-red-500 text-white border-red-500';
    }

    return 'bg-gray-100 border-gray-300';
  };

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${getButtonStyle()}`}
    >
      <span className="font-bold mr-2">{label}.</span>
      {choice}
    </button>
  );
}
