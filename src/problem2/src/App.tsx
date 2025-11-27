import { useState, useEffect } from 'react';
import type { Token } from './types';
import Loader from './components/loader';
import FromSection from './components/from-section';
import ToSection from './components/to-section';
import InfoSection from './components/info-section';
import ErrorMsg from './components/error-msg';
import SuccessMsg from './components/success-msg';
import FlipButton from './components/flip-button';
import SwapButton from './components/swap-button';

const CurrencySwapForm = () => {

  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [priceImpact, setPriceImpact] = useState<number>(0);
  const [loadError, setLoadError] = useState<string>('');

  // Fetch token prices
  useEffect(() => {
    const fetchTokenPrices = async () => {
      try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();

        // Filter tokens with valid prices and remove duplicates
        const uniqueTokens: { [key: string]: Token } = {};
        data.forEach((token: Token) => {
          if (token.price && token.price > 0) {
            const key = token.currency;
            if (!uniqueTokens[key] || new Date(token.date) > new Date(uniqueTokens[key].date)) {
              uniqueTokens[key] = token;
            }
          }
        });

        const tokenList = Object.values(uniqueTokens).map(token => ({
          ...token,
          logo: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`
        }));

        if (tokenList.length > 0) {
          setTokens(tokenList);
          setFromToken(tokenList[0]);
          setToToken(tokenList[1]);
        } else {
          throw new Error('No valid tokens found');
        }
        setIsLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        setLoadError('API unavailable');
      }
    };

    fetchTokenPrices();
  }, []);

  // Calculate conversion
  useEffect(() => {
    if (fromToken && toToken && fromAmount && !isNaN(parseFloat(fromAmount))) {
      const amount = parseFloat(fromAmount);

      if (fromToken.price && toToken.price && amount) {
        const converted = (amount * fromToken.price) / toToken.price;
        setToAmount(converted.toFixed(6));

        // Calculate price impact (simulated)
        const impact = (amount * fromToken.price > 10000) ? (amount * fromToken.price / 100000) * 0.5 : 0.1;
        setPriceImpact(impact);
      }
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwap = async () => {
    setError('');

    // Validation
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!fromToken || !toToken) {
      setError('Please select both tokens');
      return;
    }

    if (fromToken.currency === toToken.currency) {
      setError('Cannot swap the same token');
      return;
    }

    // Simulate swap transaction
    setIsSwapping(true);

    setTimeout(() => {
      setIsSwapping(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setFromAmount('');
        setToAmount('');
      }, 3000);
    }, 2000);
  };

  const handleFlipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 p-0 flex items-center justify-center w-screen">
      <div className="w-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Currency Swap</h1>
          <p className="text-gray-400">Trade tokens instantly with the best rates</p>
          {loadError && (
            <p className="text-yellow-400 text-sm mt-2">⚠️ {loadError}</p>
          )}
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-gray-700 max-w-xl mx-auto">
          <FromSection tokens={tokens} fromToken={fromToken} setFromToken={setFromToken} fromAmount={fromAmount} setFromAmount={setFromAmount} toToken={toToken} />
          <FlipButton handleFlipTokens={handleFlipTokens} />
          <ToSection tokens={tokens} toToken={toToken} setToToken={setToToken} toAmount={toAmount} fromToken={fromToken} />
          <InfoSection fromAmount={fromAmount} toAmount={toAmount} fromToken={fromToken} toToken={toToken} priceImpact={priceImpact} />
          {error && <ErrorMsg error={error} />}
          {showSuccess && <SuccessMsg />}
          <SwapButton handleSwap={handleSwap} isSwapping={isSwapping} fromAmount={fromAmount} toAmount={toAmount} />
        </div>

        <div className="text-center mt-6 text-gray-400 text-sm pb-8">
          This is an interview project • {tokens.length} tokens available
        </div>
      </div>
    </div>
  );
};

export default CurrencySwapForm;