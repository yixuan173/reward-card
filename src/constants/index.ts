export const INDEXEDDB_NAME = 'reward-card-db';

export const INDEXEDDB_STORES = {
  CARD_LIST: 'cardList',
} as const;

export const MODE = {
  CREATE: 'create',
  EDIT: 'edit',
} as const;

export const SORT_TYPE = {
  TIME_ASC: 'timeASC',
  TIME_DESC: 'timeDESC',
  TOTAL_POINTS_ASC: 'totalPointsASC',
  TOTAL_POINTS_DESC: 'totalPointsDESC',
  CURRENT_POINTS_ASC: 'currentPointsASC',
  CURRENT_POINTS_DESC: 'currentPointsDESC',
} as const;

export const ALERT_STATUS = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
} as const;

export const MAX_CARD_COUNT = 10;

const SITE_URL = 'https://yixuan173.github.io/reward-card';
export const IMAGES_PATH = `${SITE_URL}/images`;
