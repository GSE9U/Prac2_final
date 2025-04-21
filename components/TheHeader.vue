<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const navItems = [
  { name: 'Inicio', route: '/' },
  { name: 'Importar', route: '/import' },
  { name: 'Precios', route: '/pricing' },
]
</script>

<template>
  <header class="bg-white dark:bg-zinc-900 shadow-sm border-b border-zinc-200 dark:border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center">
            <svg class="w-8 h-8 text-[#FF5A5F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-1.8 0-3.3 1.5-3.3 3.3 0 1.8 1.5 3.3 3.3 3.3s3.3-1.5 3.3-3.3c0-1.8-1.5-3.3-3.3-3.3zm0 8.3c-2.8 0-5-2.3-5-5.1s2.2-5.1 5-5.1 5 2.3 5 5.1-2.2 5.1-5 5.1z" />
              <path d="M12 2c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3 1.3-.6 1.3-1.3-.6-1.3-1.3-1.3zm0 5c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7 3.7 1.7 3.7 3.7-1.7 3.7-3.7 3.7z" />
              <path d="M22.5 17.2l-2.2-2.5c-.2-.3-.6-.5-1-.5h-1c-.4 0-.8.2-1 .5l-2.2 2.5c-.3.3-.5.7-.5 1.1v4.5c0 .4.3.7.7.7h7c.4 0 .7-.3.7-.7v-4.5c0-.4-.2-.8-.5-1.1zm-1.5 4.8h-5v-3.7c0-.1 0-.2.1-.3l1.8-2.1c0-.1.1-.1.2-.1h.8c.1 0 .2 0 .2.1l1.8 2.1c.1.1.1.2.1.3v3.7z" />
              <path d="M14.8 12.5c-.3-.5-.8-.8-1.4-.8h-2.8c-.6 0-1.1.3-1.4.8l-2.9 5c-.3.5-.3 1.1 0 1.6l5.4 9.4c.3.5.8.8 1.4.8h.2c.6 0 1.1-.3 1.4-.8l5.4-9.4c.3-.5.3-1.1 0-1.6l-2.9-5zm1.9 5.9l-5.4 9.4c-.1.1-.2.2-.3.2h-.2c-.1 0-.3-.1-.3-.2l-5.4-9.4c-.1-.1-.1-.3 0-.4l2.9-5c.1-.1.2-.2.3-.2h2.8c.1 0 .3.1.3.2l2.9 5c.2.1.2.3.1.4z" />
            </svg>
            <span class="ml-2 text-lg font-bold text-zinc-900 dark:text-white">Airbnb Finder</span>
          </router-link>
        </div>

        <!-- Navegación escritorio -->
        <nav class="hidden md:ml-6 md:flex md:space-x-8">
          <router-link 
            v-for="item in navItems" 
            :key="item.name" 
            :to="item.route"
            class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full"
            :class="[
              $route.path === item.route
                ? 'border-[#FF5A5F] text-zinc-900 dark:text-white'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
            ]"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Botones de acción -->
        <div class="hidden md:flex items-center">
          <router-link 
            to="/pricing" 
            class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF5A5F] hover:bg-[#FF3A3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
          >
            Actualiza a Premium
          </router-link>
        </div>

        <!-- Botón menú móvil -->
        <div class="-mr-2 flex items-center md:hidden">
          <button 
            @click="toggleMobileMenu"
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF5A5F]" 
            aria-expanded="false"
          >
            <span class="sr-only">Abrir menú principal</span>
            <!-- Icono menú -->
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icono cerrar -->
            <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menú móvil -->
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link 
          v-for="item in navItems" 
          :key="item.name" 
          :to="item.route" 
          @click="closeMobileMenu"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="[
            $route.path === item.route
              ? 'bg-zinc-50 dark:bg-zinc-800 border-[#FF5A5F] text-[#FF5A5F]'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300'
          ]"
        >
          {{ item.name }}
        </router-link>
        
        <router-link 
          to="/pricing" 
          @click="closeMobileMenu"
          class="block pl-3 pr-4 py-2 mt-4 text-center border border-transparent rounded-md shadow-sm text-white bg-[#FF5A5F] hover:bg-[#FF3A3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Actualiza a Premium
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 