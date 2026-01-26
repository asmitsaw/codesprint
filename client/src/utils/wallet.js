// Wallet Management using localStorage

const WALLET_KEY = "rail_wallet_balance";

export const getWalletBalance = () => {
  const balance = localStorage.getItem(WALLET_KEY);
  return balance ? parseFloat(balance) : 500; // Default ₹500
};

export const addMoney = (amount) => {
  const currentBalance = getWalletBalance();
  const newBalance = currentBalance + amount;
  localStorage.setItem(WALLET_KEY, newBalance.toString());
  return newBalance;
};

export const deductMoney = (amount) => {
  const currentBalance = getWalletBalance();
  if (currentBalance < amount) {
    throw new Error("Insufficient balance");
  }
  const newBalance = currentBalance - amount;
  localStorage.setItem(WALLET_KEY, newBalance.toString());
  return newBalance;
};

export const resetWallet = () => {
  localStorage.setItem(WALLET_KEY, "500");
  return 500;
};
