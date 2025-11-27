import { Loader2 } from "lucide-react";
import type { SwapButtonProps } from "../types";

const SwapButton = ({ handleSwap, isSwapping, fromAmount, toAmount }: SwapButtonProps) => {
  return (
    <button
      onClick={handleSwap}
      disabled={isSwapping || !fromAmount || !toAmount}
      className="w-full mt-6 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isSwapping ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Swapping...
        </>
      ) : (
        'Swap Tokens'
      )}
    </button>
  );
};

export default SwapButton;