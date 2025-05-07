import { defineStore } from 'pinia'
import { useFirestoreCollection } from '~/composables/useFirestoreCollection'

export const useListingsStore = defineStore('listings', () => {
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

  function subscribe() {
    subscribeCol('listings')
  }

  // Custom actions for listings
  async function addListing(listing) {
    // listing debe tener: city, image, price, rating, reviews, title
    return await add({
      ...listing,
      reserved: false,
      reservedDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  async function updateListing(id, changes) {
    return await update(id, {
      ...changes,
      updatedAt: new Date().toISOString()
    })
  }

  async function removeListing(id) {
    return await remove(id)
  }

  async function toggleReserved(id, reserved) {
    await update(id, {
      reserved,
      reservedDate: reserved ? new Date().toISOString() : null
    })
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
    addListing,
    updateListing,
    removeListing,
    toggleReserved,
  }
}) 