import React, { useMemo } from 'react';

// Define the interface correctly to include usage of blockchain
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added this field based on usage in original code
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
  // defined elsewhere
}

// 1. Optimization: Move constant mapping outside the component.
// An object map is technically faster (O(1)) than a switch statement for lookups.
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  'Osmosis': 100,
  'Ethereum': 50,
  'Arbitrum': 30,
  'Zilliqa': 20,
  'Neo': 20,
};

const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      // 2. Logic Fix: Changed lhsPriority to balancePriority
      // 3. Logic Fix: assuming we want to show balances > 0 with valid priority
      return balancePriority > -99 && balance.amount > 0;
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      // Simplified sort logic for descending order
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
      return 0;
    });
    // 4. Optimization: Removed 'prices' from dependency array
  }, [balances]);

  // 5. Optimization: Combine mapping to format and generate rows in the render logic
  // We can generate the rows directly here to avoid iterating twice.

  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    const formattedAmount = balance.amount.toFixed();

    return (
      <WalletRow
        className={classes.row}
        // 6. Fix: Use unique ID (currency) instead of index
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};