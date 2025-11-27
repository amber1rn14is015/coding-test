export interface Token {
  currency: string;
  date: string;
  price: number;
  logo?: string;
}

export interface TokenSelectorProps {
  tokens: Token[];
  value: Token | null;
  onChange: (token: Token) => void;
  label: string;
  exclude?: Token | null;
}

export interface FlipButtonProps {
  handleFlipTokens: () => void;
}

export interface AmountHolderProps {
  token: Token | null;
  amount: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface FromSectionProps {
  tokens: Token[];
  fromToken: Token | null;
  setFromToken: (token: Token) => void;
  fromAmount: string;
  setFromAmount: (amount: string) => void;
  toToken: Token | null;
};

export interface ToSectionProps {
  tokens: Token[];
  toToken: Token | null;
  setToToken: (token: Token) => void;
  toAmount: string;
  fromToken?: Token | null;
}

export interface InfoSectionProps {
  fromAmount: string;
  toAmount: string;
  fromToken: Token | null;
  toToken: Token | null;
  priceImpact: number;
}

export interface SwapButtonProps {
  handleSwap: () => void;
  isSwapping: boolean;
  fromAmount: string;
  toAmount: string;
}