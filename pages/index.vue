<template>
  <div class="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900">
    <!-- Toolbar eliminada: la barra de navegación la gestiona el layout global -->
    <div class="space-y-12 flex-1">
      <section class="text-center space-y-8 pt-8">
        <h1 class="text-4xl md:text-5xl font-bold">Encuentra tu próximo alojamiento perfecto</h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">Explora miles de opciones alrededor del mundo compartidas por la comunidad.</p>
        <NuxtLink to="/listings" class="af-btn-primary inline-block px-8 py-3 text-lg rounded-lg shadow hover:bg-[#FF3A3F] transition">Ver alojamientos</NuxtLink>
      </section>
      <!-- Featured Properties Carousel -->
      <section class="pt-8 pb-12">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold">Alojamientos destacados</h2>
          <NuxtLink to="/listings" class="text-[#FF5A5F] hover:underline font-semibold">Ver todos</NuxtLink>
        </div>
        <ClientOnly>
          <swiper-container 
            :slides-per-view="slidesPerView" 
            :space-between="20"
            :pagination="true"
            ref="swiperRef"
          >
            <swiper-slide v-for="property in featuredProperties" :key="property.id">
              <div class="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img :src="property.img" :alt="property.name" class="h-48 w-full object-cover" />
                <div class="p-4 space-y-2">
                  <h3 class="font-semibold">{{ property.name }}</h3>
                  <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ property.city }}</p>
                  <div class="flex justify-between items-center pt-2">
                    <span class="font-bold text-[#FF5A5F]">{{ property.price }}€/noche</span>
                    <NuxtLink :to="`/listings/${property.id}`" class="text-sm text-[#FF5A5F] hover:underline font-semibold">
                      Ver detalles
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </section>
      <!-- Why Choose Us Section -->
      <section class="py-12 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold text-center mb-10">¿Por qué elegirnos?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center space-y-3">
              <div class="bg-[#FF5A5F] rounded-full w-12 h-12 mx-auto flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Búsqueda fácil</h3>
              <p class="text-zinc-500 dark:text-zinc-400">Encuentra rápidamente el alojamiento perfecto con nuestras herramientas de búsqueda avanzada.</p>
            </div>
            <div class="text-center space-y-3">
              <div class="bg-[#FF5A5F] rounded-full w-12 h-12 mx-auto flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Reserva segura</h3>
              <p class="text-zinc-500 dark:text-zinc-400">Todas las transacciones son seguras y tus datos están protegidos en todo momento.</p>
            </div>
            <div class="text-center space-y-3">
              <div class="bg-[#FF5A5F] rounded-full w-12 h-12 mx-auto flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Mejores precios</h3>
              <p class="text-zinc-500 dark:text-zinc-400">Garantizamos los mejores precios del mercado, sin costos ocultos.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- Footer mejorado -->
    <footer class="w-full bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 py-4 mt-8">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-zinc-500 dark:text-zinc-400 text-sm">
        <span>© {{ new Date().getFullYear() }} Airbnb Finder · Práctica de Sistemas Distribuidos</span>
        <a href="https://github.com/GSE9U/Prac2_final" target="_blank" class="hover:text-[#FF5A5F] ml-0 sm:ml-4">GitHub</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const swiperRef = ref(null)

// Sample featured properties
const featuredProperties = ref([
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
])

// Responsive slides per view
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

const slidesPerView = computed(() => {
  if (windowWidth.value < 640) {
    return 1
  } else if (windowWidth.value < 768) {
    return 2
  } else if (windowWidth.value < 1024) {
    return 3
  } else {
    return 4
  }
})

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})
</script>

<style scoped>
.af-btn-primary {
  @apply bg-[#FF5A5F] text-white rounded-lg transition hover:bg-opacity-90 font-semibold;
}

swiper-container {
  padding-bottom: 40px;
}

swiper-container::part(bullet) {
  background-color: #ddd;
  opacity: 0.6;
  width: 8px;
  height: 8px;
}

swiper-container::part(bullet-active) {
  background-color: #FF5A5F;
  opacity: 1;
}
</style> 