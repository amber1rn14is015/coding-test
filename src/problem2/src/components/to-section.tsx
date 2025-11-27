import type { ToSectionProps } from "../types";
import AmountHolder from "./amount-holder";
import TokenSelector from "./token-selector";

const ToSection = ({ tokens, toToken, setToToken, toAmount, fromToken }: ToSectionProps) => {
  return (
    <div>
      <TokenSelector
        tokens={tokens}
        value={toToken}
        onChange={setToToken}
        label="To"
        exclude={fromToken}
      />
      <AmountHolder token={toToken} amount={toAmount} disabled placeholder="0.00" />
    </div>
  )
}

export default ToSection;