import { defineStore } from 'pinia'
import { collection, addDoc, deleteDoc, query, where, getDocs, onSnapshot, Timestamp } from 'firebase/firestore'
import { ref } from 'vue'
import { db } from '~/services/Fireinit'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref([])
  const loading = ref(false)
  const error = ref(null)
  let unsubscribe = null

  // Escuchar reservas de un alojamiento en tiempo real
  function subscribe(listingId) {
    if (unsubscribe) unsubscribe()
    loading.value = true
    const q = query(collection(db, 'bookings'), where('listingId', '==', listingId))
    unsubscribe = onSnapshot(q, (snapshot) => {
      bookings.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      loading.value = false
    }, (err) => {
      error.value = err.message
      loading.value = false
    })
  }

  // Añadir reserva
  async function addBooking(listingId, startDate, endDate) {
    await addDoc(collection(db, 'bookings'), {
      listingId,
      startDate: Timestamp.fromDate(new Date(startDate)),
      endDate: Timestamp.fromDate(new Date(endDate)),
      createdAt: Timestamp.now()
    })
  }

  // Eliminar reserva
  async function removeBooking(bookingId) {
    await deleteDoc(collection(db, 'bookings'), bookingId)
  }

  // Consultar reservas para un alojamiento y rango de fechas
  async function getBookingsForRange(listingId, startDate, endDate) {
    console.log('Consultando bookings:', { listingId, startDate, endDate });
    const q = query(
      collection(db, 'bookings'),
      where('listingId', '==', listingId),
      where('endDate', '>=', Timestamp.fromDate(new Date(startDate))),
      where('startDate', '<=', Timestamp.fromDate(new Date(endDate)))
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  return {
    bookings,
    loading,
    error,
    subscribe,
    addBooking,
    removeBooking,
    getBookingsForRange
  }
}) 