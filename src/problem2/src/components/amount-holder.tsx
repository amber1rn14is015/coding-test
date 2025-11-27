import type { AmountHolderProps } from "../types";

const AmountHolder = ({ token, amount, onChange, disabled, placeholder }: AmountHolderProps) => {
  return (
    <div className="mt-3 mb-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-gray-700 text-white text-2xl font-semibold rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500 transition-all ${disabled ? 'cursor-not-allowed' : ''}`}
        disabled={disabled}
      />
      {token && amount && (
        <div className="text-right text-sm text-gray-400 mt-2">
          ≈ ${(parseFloat(amount) * (typeof token.price === 'string' ? parseFloat(token.price) : token.price)).toFixed(2)} USD
        </div>
      )}
    </div>
  )
}

export default AmountHolder;