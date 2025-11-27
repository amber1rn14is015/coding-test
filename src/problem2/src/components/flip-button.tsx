import { ArrowDownUp } from "lucide-react";
import type { FlipButtonProps } from "../types";

const FlipButton = ({ handleFlipTokens }: FlipButtonProps) => {
  return (
    <div className="flex justify-center -my-2 relative" style={{ zIndex: 5 }}>
      <button
        type="button"
        onClick={handleFlipTokens}
        className="bg-gray-700 hover:bg-purple-600 p-3 rounded-xl transition-all hover:scale-110 border-4 border-gray-800"
      >
        <ArrowDownUp className="w-5 h-5 text-white" />
      </button>
    </div>
  )
}

export default FlipButton;