<script setup lang="ts">
import { useRoute } from 'vue-router'
// import { useListingsStore } from '../stores/listings.ts' // <-- Comentado temporalmente
import { computed, ref, onMounted } from 'vue' // Añadido ref y onMounted
import StripeCheckout from '~/components/StripeCheckout.vue'
import SwiperGallery from '~/components/SwiperGallery.vue'

const route = useRoute()
// const store = useListingsStore() // <-- Comentado temporalmente

// Datos de muestra de propiedades
const mockProperties = [
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
  }
]

// Buscar la propiedad según el ID en la URL
const property = computed(() => {
  const propertyId = route.params.id as string
  return mockProperties.find(p => p.id === propertyId) || null
})

// Función auxiliar para formatear precio (o mostrar N/A)
const formatPrice = (price: number | undefined | null): string => {
  return price !== null && price !== undefined ? `${price} € / noche` : 'Precio no disponible'
}

// Sample images for the carousel 
const propertyImages = ref([
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'
])

// Swiper functionality
const swiperRef = ref(null)
const swiper = ref(null)

function nextSlide() {
  if (swiper.value) {
    swiper.value.slideNext()
  }
}

function prevSlide() {
  if (swiper.value) {
    swiper.value.slidePrev()
  }
}

onMounted(() => {
  // Initialize the swiper instance when component is mounted
  setTimeout(() => {
    if (swiperRef.value) {
      swiper.value = swiperRef.value.swiper
    }
  }, 100)
})
</script>

<template>
  <div v-if="property" class="space-y-8">
    <!-- Image carousel -->
    <SwiperGallery :images="propertyImages" height="400px" />

    <!-- Property details -->
    <div class="grid md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-4">
        <h1 class="text-2xl font-bold">{{ property.name }}</h1>
        <p class="text-xl text-zinc-600 dark:text-zinc-400">{{ property.city }}</p>
        
        <div class="border-t border-b py-6 my-6 border-zinc-200 dark:border-zinc-700">
          <h2 class="text-xl font-semibold mb-4">Descripción</h2>
          <p class="text-zinc-600 dark:text-zinc-400">
            Este hermoso alojamiento te ofrece una experiencia única con todas las comodidades que necesitas para disfrutar de tu estancia.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus non magna vitae neque ultrices feugiat.
          </p>
        </div>

        <h2 class="text-xl font-semibold mb-4">Características</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>3 Habitaciones</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Disponible ahora</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>WiFi</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Cocina</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Estacionamiento</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Baño privado</span>
          </div>
        </div>
      </div>

      <!-- Price and booking card -->
      <div class="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg h-fit sticky top-4">
        <div class="flex justify-between items-center mb-4">
          <span class="text-2xl font-bold text-primary-600">{{ property.price }} €</span>
          <span class="text-zinc-500">por noche</span>
        </div>

        <div class="space-y-4 mt-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Check In</label>
              <input type="date" class="af-input w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Check Out</label>
              <input type="date" class="af-input w-full" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Huéspedes</label>
            <select class="af-input w-full">
              <option>1 huésped</option>
              <option>2 huéspedes</option>
              <option>3 huéspedes</option>
              <option>4+ huéspedes</option>
            </select>
          </div>

          <StripeCheckout 
            :amount="property.price * 5 + 55"
            :description="`Reserva de 5 noches en ${property.name}`"
            button-text="Reservar ahora"
          />
          
          <div class="text-center text-sm text-zinc-500 mt-2">
            No se cargará nada todavía
          </div>

          <div class="border-t pt-4 mt-4">
            <div class="flex justify-between mb-2">
              <span>{{ property.price }} € x 5 noches</span>
              <span>{{ property.price * 5 }} €</span>
            </div>
            <div class="flex justify-between mb-2">
              <span>Tarifa de limpieza</span>
              <span>35 €</span>
            </div>
            <div class="flex justify-between mb-2">
              <span>Tarifa de servicio</span>
              <span>20 €</span>
            </div>
            <div class="flex justify-between font-bold pt-2 border-t mt-2">
              <span>Total</span>
              <span>{{ property.price * 5 + 55 }} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p>Alojamiento no encontrado. <NuxtLink to="/listings" class="text-primary-600 underline">Volver al listado</NuxtLink></p>
  </div>
</template>

<style scoped>
/* Reutilizamos las clases definidas globalmente o en otros componentes */
.af-btn-primary {
  @apply bg-[#FF5A5F] text-white rounded-lg px-5 py-2 transition hover:bg-opacity-90;
}
.text-primary-600 { 
  @apply text-[#FF5A5F]; 
}

.af-input { 
  @apply border rounded-lg px-3 py-2 dark:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600; 
}

swiper-container {
  height: 400px;
  border-radius: 0.75rem;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 