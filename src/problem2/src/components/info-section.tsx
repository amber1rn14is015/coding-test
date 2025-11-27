import { TrendingUp } from "lucide-react";
import type { InfoSectionProps } from "../types";

const InfoSection = ({ fromAmount, toAmount, fromToken, toToken, priceImpact }: InfoSectionProps) => {
  if (fromAmount && toAmount) {
    return (
      <div className="mt-6 bg-gray-700/50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Exchange Rate</span>
          <span className="text-white font-medium">
            {fromToken && toToken && (
              <>1 {fromToken.currency} = {((typeof fromToken.price === 'string' ? parseFloat(fromToken.price) : fromToken.price) / (typeof toToken.price === 'string' ? parseFloat(toToken.price) : toToken.price)).toFixed(6)} {toToken.currency}</>
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Price Impact
          </span>
          <span className={`font-medium ${priceImpact > 1 ? 'text-red-400' : 'text-green-400'}`}>
            {priceImpact.toFixed(2)}%
          </span>
        </div>
      </div>
    )
  };
}

export default InfoSection;