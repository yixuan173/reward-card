export const getItemFromLocalStorage = (key: string) => {
  const rewardCardListFromLocalStorage = localStorage.getItem(key) || '[]';
  return JSON.parse(rewardCardListFromLocalStorage);
};
