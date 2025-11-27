//Problem 1: Three ways to sum to n

// Implementation 1: Using the mathematical formula n * (n + 1) / 2
var sum_to_n_a = function(n) {
  return (n * (n + 1)) / 2;
};

// Implementation 2: Using a for loop
var sum_to_n_b = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Implementation 3: Using recursion
var sum_to_n_c = function(n) {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};