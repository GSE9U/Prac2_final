<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ListingCard from '~/components/ListingCard.vue'
import { useListingsStore } from '~/stores/useListingsStore'
import { useBookingsStore } from '~/stores/useBookingsStore'
import { Timestamp } from 'firebase/firestore'


const store = useListingsStore()
const bookingsStore = useBookingsStore()
const search = ref('')

const showBookingModal = ref(false)
const bookingListing = ref(null)
const bookingRange = ref({ start: '', end: '' })
const bookingError = ref('')

onMounted(() => {
  store.subscribe()
})

const filtered = computed(() => {
  if (!search.value) {
    return store.docsArray
  }
  const lowerCaseQuery = search.value.toLowerCase()
  return store.docsArray.filter(l =>
    (l.title?.toLowerCase().includes(lowerCaseQuery) ||
     l.city?.toLowerCase().includes(lowerCaseQuery))
  )
})

// 1. Calcular fechas ocupadas a partir de las reservas existentes
const bookedDates = computed(() => {
  const dates = new Set()
  bookingsStore.bookings.forEach(b => {
    // Si los campos son Timestamp, conviértelos a Date
    const start = b.startDate?.toDate ? b.startDate.toDate() : new Date(b.startDate)
    const end = b.endDate?.toDate ? b.endDate.toDate() : new Date(b.endDate)
    for (
      let d = new Date(start);
      d <= end;
      d.setDate(d.getDate() + 1)
    ) {
      dates.add(d.toISOString().split('T')[0])
    }
  })
  return dates
})

// 2. Validar la selección en los inputs
function validateDate(type) {
  const date = bookingRange.value[type]
  if (bookedDates.value.has(date)) {
    bookingError.value = '¡Esa fecha ya está reservada!'
    bookingRange.value[type] = ''
  } else {
    bookingError.value = ''
  }
}

function formatDate(date) {
  if (!date) return ''
  if (typeof date === 'string') return date
  if (date.toDate) return date.toDate().toLocaleDateString()
  return new Date(date).toLocaleDateString()
}

async function openBookingModal(listing) {
  bookingListing.value = listing
  bookingRange.value = { start: '', end: '' }
  bookingError.value = ''
  bookingsStore.subscribe(listing.id)
  showBookingModal.value = true
}

async function confirmBooking() {
  bookingError.value = ''
  if (!bookingRange.value.start || !bookingRange.value.end) {
    bookingError.value = 'Selecciona un rango de fechas.'
    return
  }
  // Comprobar si ya hay reservas en ese rango
  const overlapping = await bookingsStore.getBookingsForRange(
    bookingListing.value.id,
    bookingRange.value.start,
    bookingRange.value.end
  )
  if (overlapping.length > 0) {
    bookingError.value = 'Ya existe una reserva para ese rango.'
    return
  }
  try {
    await bookingsStore.addBooking(
      bookingListing.value.id,
      bookingRange.value.start,
      bookingRange.value.end
    )
    bookingError.value = ''
    showBookingModal.value = false
    alert('¡Reserva realizada con éxito!')
  } catch (e) {
    bookingError.value = 'Error al guardar la reserva: ' + e.message
    console.error(e)
  }
}
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <!-- Input de búsqueda con estilos Tailwind -->
    <input 
      v-model="search" 
      placeholder="Buscar nombre o ciudad…" 
      class="af-input w-full sm:w-72" 
    />
    <!-- Botón para añadir eliminado para clientes -->
  </div>

  <!-- Grid de resultados -->
  <div v-if="filtered.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div v-for="l in filtered" :key="l.id" class="relative">
      <ListingCard :listing="l" />
      <div class="absolute top-2 right-2 flex flex-col items-end">
        <button
          class="bg-primary-600 hover:bg-primary-700 text-white text-xs px-3 py-1 rounded transition mb-1"
          @click="openBookingModal(l)"
        >
          Reservar
        </button>
      </div>
    </div>
  </div>
  <p v-else class="text-center text-zinc-500 dark:text-zinc-400 mt-8">
    <span v-if="search">Sin resultados para "{{ search }}"</span>
    <span v-else>No hay alojamientos disponibles.</span>
  </p>

  <!-- Modal de reserva -->
  <div v-if="showBookingModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-zinc-800 p-8 rounded-2xl w-full max-w-md shadow-xl space-y-6 relative">
      <h3 class="text-2xl font-bold mb-2 text-primary-600">Reservar: {{ bookingListing?.title || bookingListing?.name }}</h3>
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <label class="text-base font-medium">Entrada:</label>
          <input type="date" v-model="bookingRange.start" class="af-input flex-1" @input="validateDate('start')" />
          <label class="text-base font-medium">Salida:</label>
          <input type="date" v-model="bookingRange.end" class="af-input flex-1" @input="validateDate('end')" />
        </div>
        <div v-if="bookingError" class="text-red-600 bg-red-100 rounded px-3 py-2 text-sm font-semibold">
          {{ bookingError }}
        </div>
        <div class="flex justify-end gap-4 pt-2">
          <button @click="showBookingModal=false" class="af-btn-outlined text-base px-6 py-2">Cancelar</button>
          <button @click="confirmBooking" class="af-btn-primary text-base px-6 py-2">Confirmar reserva</button>
        </div>
        <div class="mt-4">
          <h4 class="font-semibold text-base mb-1 text-primary-600">Reservas existentes:</h4>
          <ul class="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
            <li v-for="b in bookingsStore.bookings" :key="b.id">
              {{ formatDate(b.startDate) }} → {{ formatDate(b.endDate) }}
            </li>
            <li v-if="bookingsStore.bookings.length === 0" class="text-zinc-400">Sin reservas para este alojamiento.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reutilizamos las clases definidas en AddListingModal o las definimos globalmente */
.af-input { @apply border rounded-lg px-3 py-2 dark:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600; }
.af-btn-primary { @apply bg-[#FF5A5F] text-white rounded-lg px-4 py-2 transition hover:bg-opacity-90; }
.af-btn-outlined { @apply border border-zinc-400 rounded-lg px-4 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-700; }
</style> 