import { defineStore } from 'pinia'
import { useFirestoreCollection } from '~/composables/useFirestoreCollection'

export const useFavoritesStore = defineStore('favorites', () => {
  const {
    path,
    documents,
    listener,
    error,
    ids,
    docsArray,
    unsubscribe,
    subscribe: subscribeCol,
    clearError,
    add,
    update,
    remove,
  } = useFirestoreCollection()

  function subscribe(userId) {
    subscribeCol('favorites', ['userId', '==', userId])
  }

  async function addFavorite(userId, listingId) {
    return await add({
      userId,
      listingId,
      createdAt: new Date().toISOString()
    })
  }

  async function removeFavorite(favoriteId) {
    return await remove(favoriteId)
  }

  return {
    path,
    documents,
    listener,
    error,
    ids,
    docsArray,
    unsubscribe,
    subscribe,
    clearError,
    addFavorite,
    removeFavorite,
  }
})