export const getItemFromLocalStorage = (key: string) => {
  if (!key) return;

  const rewardCardListFromLocalStorage = localStorage.getItem(key) || '[]';
  return JSON.parse(rewardCardListFromLocalStorage);
};

export const setItemToLocalStorage = <T>(key: string, value: T) => {
  if (!value) return;

  if (typeof value === 'string') {
    localStorage.setItem(key, value);
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
};
