export const LOCAL_STORAGE_KEYS = {
  REWARD_CARD_LIST: 'rewardCardList',
} as const;

export const INDEXEDDB_NAME = 'reward-card-db';

export const INDEXEDDB_STORES = {
  CARD_LIST: 'cardList',
} as const;

export const ALERT_STATUS = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
} as const;
