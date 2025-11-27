import type { FromSectionProps } from "../types";
import AmountHolder from "./amount-holder";
import TokenSelector from "./token-selector";

const FromSection = ({ tokens, fromToken, setFromToken, fromAmount, setFromAmount, toToken }: FromSectionProps) => {
  return (
    <div>
      <TokenSelector
        tokens={tokens}
        value={fromToken}
        onChange={setFromToken}
        label="From"
        exclude={toToken}
      />
      <AmountHolder token={fromToken} amount={fromAmount} onChange={setFromAmount} placeholder="0.00" />
    </div>
  )
}

export default FromSection;