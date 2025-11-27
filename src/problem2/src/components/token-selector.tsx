import { useState } from "react";
import type { TokenSelectorProps } from "../types";


const TokenSelector = ({ tokens, value, onChange, label, exclude }: TokenSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableTokens = tokens.filter(t => t.currency !== exclude?.currency);

  return (
    <div className="relative mb-4" style={{ zIndex: isOpen ? 50 : 10 }}>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-700 hover:bg-gray-600 rounded-xl p-3 flex items-center justify-between transition-colors relative"
        style={{ zIndex: 10 }}
      >
        {value ? (
          <div className="flex items-center gap-3">
            <img
              src={value.logo}
              alt={value.currency}
              className="w-8 h-8 rounded-full bg-white p-1"
              onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
            />
            <div className="text-left">
              <div className="font-semibold text-white">{value.currency}</div>
              <div className="text-xs text-gray-400">${(typeof value.price === 'string' ? parseFloat(value.price) : value.price).toFixed(4)}</div>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Select token</span>
        )}
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            style={{ zIndex: 40 }}
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-xl shadow-2xl border-2 border-purple-500 overflow-hidden"
            style={{
              zIndex: 50,
              maxHeight: '300px'
            }}
          >
            <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
              {availableTokens.length > 0 ? (
                availableTokens.map((token, index) => (
                  <button
                    key={`${token.currency}-${index}`}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onChange(token);
                      setIsOpen(false);
                    }}
                    className="w-full p-4 flex items-center gap-3 hover:bg-purple-600 transition-colors text-left border-b border-gray-700 last:border-b-0"
                  >
                    <img
                      src={token.logo}
                      alt={token.currency}
                      className="w-8 h-8 rounded-full bg-white p-1 shrink-0"
                      onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white">{token.currency}</div>
                      <div className="text-xs text-gray-400">${(typeof token.price === 'string' ? parseFloat(token.price) : token.price).toFixed(4)}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400">No tokens available</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TokenSelector;