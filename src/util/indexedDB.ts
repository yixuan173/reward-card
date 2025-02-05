import { INDEXEDDB_NAME, INDEXEDDB_STORES } from '@constants/index';
import type { CardData } from '@type/common';
import { openDB } from 'idb';

const dbPromise = openDB(INDEXEDDB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(INDEXEDDB_STORES.CARD_LIST)) {
      db.createObjectStore(INDEXEDDB_STORES.CARD_LIST, { keyPath: 'id' });
    }
  },
});

/**
 * Get all the cards from the IndexedDB.
 * @returns {Promise<CardData[]>} A promise that resolves with an array of all the cards in the IndexedDB.
 */
export const getCardListFromIndexedDB = async (): Promise<CardData[]> => {
  try {
    const db = await dbPromise;
    const cardList = await db.getAll(INDEXEDDB_STORES.CARD_LIST);
    return cardList;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Get a card from the IndexedDB.
 * @param {string} id The ID of the card to get.
 * @returns {Promise<CardData | null>} A promise that resolves with the card from the IndexedDB with the given ID, or undefined if no such card exists.
 */
export const getCardFromIndexedDB = async (id: string): Promise<CardData | null> => {
  try {
    const db = await dbPromise;
    const card = await db.get(INDEXEDDB_STORES.CARD_LIST, id);
    if (!card) {
      throw new Error('Card not found');
    }

    return card;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Add a new card to the IndexedDB.
 * @param {CardData} card The new card to add to the IndexedDB.
 * @returns {Promise<void>} A promise that resolves when the card has been added to the IndexedDB.
 */
export const addCardToIndexedDB = async (card: CardData): Promise<void> => {
  const db = await dbPromise;
  await db.add(INDEXEDDB_STORES.CARD_LIST, card);
};

/**
 * Update a card in the IndexedDB.
 * @param {CardData} updateData The updated card data to update in the IndexedDB.
 * @returns {Promise<void>} A promise that resolves when the card has been updated in the IndexedDB.
 */
export const updateCardToIndexedDB = async (updateData: CardData): Promise<void> => {
  const db = await dbPromise;
  await db.put(INDEXEDDB_STORES.CARD_LIST, updateData);
};

/**
 * Delete a card from the IndexedDB.
 * @param {string} id - The ID of the card to delete.
 * @returns {Promise<void>} A promise that resolves when the card has been deleted from the IndexedDB.
 */
export const deleteCardFromIndexedDB = async (id: string): Promise<void> => {
  const db = await dbPromise;
  await db.delete(INDEXEDDB_STORES.CARD_LIST, id);
};
