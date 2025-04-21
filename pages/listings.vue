<script setup lang="ts">
// import { useListingsStore } from '../stores/listings.ts' // <-- Comentado temporalmente
import { ref, computed } from 'vue'
import ListingCard from '~/components/ListingCard.vue'
import AddListingModal from '~/components/AddListingModal.vue'

// const store = useListingsStore() // <-- Comentado temporalmente
const search = ref('')
const modal = ref(false)

// Datos de prueba para mostrar en la interfaz
const mockListings = ref([
  {
    id: '1',
    name: 'Apartamento con vistas al mar',
    city: 'Barcelona',
    price: 85,
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '2',
    name: 'Loft moderno en el centro',
    city: 'Madrid',
    price: 75,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '3',
    name: 'Villa con piscina',
    city: 'Valencia',
    price: 120,
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '4',
    name: 'Apartamento acogedor',
    city: 'Sevilla',
    price: 65,
    img: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '5',
    name: 'Chalet con jardín',
    city: 'Málaga',
    price: 95,
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: '6',
    name: 'Estudio céntrico',
    city: 'Barcelona', 
    price: 70,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
  }
])

// Propiedad computada que filtra los datos de prueba
const filtered = computed(() => {
  if (!search.value) {
    return mockListings.value;
  }
  
  const lowerCaseQuery = search.value.toLowerCase();
  return mockListings.value.filter(l =>
    (l.name?.toLowerCase().includes(lowerCaseQuery) ||
     l.city?.toLowerCase().includes(lowerCaseQuery))
  )
})
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <!-- Input de búsqueda con estilos Tailwind -->
    <input 
      v-model="search" 
      placeholder="Buscar nombre o ciudad…" 
      class="af-input w-full sm:w-72" 
    />
    <!-- Botón para añadir, de momento no hará nada funcional con el store -->
    <button class="af-btn-primary ml-4 flex-shrink-0" @click="modal=true">Añadir</button>
  </div>

  <!-- Grid de resultados -->
  <div v-if="filtered.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <ListingCard v-for="l in filtered" :key="l.id" :listing="l" />
  </div>
  <p v-else class="text-center text-zinc-500 dark:text-zinc-400 mt-8">
    <span v-if="search">Sin resultados para "{{ search }}"</span>
    <span v-else>No hay alojamientos disponibles.</span>
  </p>

  <!-- Modal para añadir listings (no guardará en el store) -->
  <AddListingModal :open="modal" @close="modal=false" />
</template>

<style scoped>
/* Reutilizamos las clases definidas en AddListingModal o las definimos globalmente */
.af-input { @apply border rounded-lg px-3 py-2 dark:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600; }
.af-btn-primary { @apply bg-[#FF5A5F] text-white rounded-lg px-4 py-2 transition hover:bg-opacity-90; }
</style> 