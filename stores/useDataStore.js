import { defineStore } from 'pinia'
import { getDatabase, ref, set, get, remove } from 'firebase/database'
import app from '../services/Fireinit'

export const useDataStore = defineStore('data', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const db = getDatabase(app)
        const itemsRef = ref(db, 'items')
        const snapshot = await get(itemsRef)
        if (snapshot.exists()) {
          this.items = Object.values(snapshot.val())
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async addItem(item) {
      try {
        const db = getDatabase(app)
        const itemsRef = ref(db, 'items')
        const newItemRef = ref(db, `items/${Date.now()}`)
        await set(newItemRef, item)
        await this.fetchItems()
      } catch (error) {
        this.error = error.message
      }
    },

    async removeItem(itemId) {
      try {
        const db = getDatabase(app)
        const itemRef = ref(db, `items/${itemId}`)
        await remove(itemRef)
        await this.fetchItems()
      } catch (error) {
        this.error = error.message
      }
    }
  }
}) 