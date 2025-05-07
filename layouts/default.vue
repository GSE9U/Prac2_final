<template>
  <div :class="[$colorMode.value, 'min-h-screen flex flex-col']">
    <header class="bg-primary-600 text-white shadow">
      <div class="container mx-auto flex items-center justify-between py-4 px-2">
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/airbnb.png" alt="Airbnb FinderLogo" class="w-8 h-8" />
          <span class="text-xl font-bold">Airbnb Finder</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-6 text-sm uppercase tracking-wide">
          <NuxtLink to="/listings" active-class="underline">Alojamientos</NuxtLink>
          <NuxtLink to="/admin" active-class="underline">Admin</NuxtLink>
          <NuxtLink to="/pricing" active-class="underline">Planes</NuxtLink>
          <NuxtLink to="/about" active-class="underline">Sobre</NuxtLink>
        </nav>

        <!-- Mobile burger - Usa Bars3Icon -->
        <button @click="drawer = !drawer" class="md:hidden">
          <Bars3Icon class="w-6 h-6" />
        </button>

        <!-- Dark-mode switch - Usa SunIcon y MoonIcon -->
        <button @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
                class="ml-4">
          <SunIcon v-if="$colorMode.value==='light'" class="w-5 h-5" />
          <MoonIcon v-else class="w-5 h-5" />
        </button>
      </div>
    </header>

    <!-- Mobile drawer -->
    <Transition 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform -translate-x-full opacity-0"
    >
      <aside v-if="drawer" class="fixed inset-0 bg-black/40 md:hidden z-30"
             @click.self="drawer=false">
        <nav class="bg-white dark:bg-zinc-900 w-64 h-full p-6 space-y-4 flex flex-col">
          <div class="flex items-center gap-2 mb-6">
            <img src="/airbnb-logo.svg" alt="Airbnb Logo" class="w-7 h-7" />
            <span class="text-lg font-bold">Airbnb Finder</span>
          </div>
          <NuxtLink to="/listings" @click="drawer=false" class="text-lg hover:text-primary-600">Alojamientos</NuxtLink>
          <NuxtLink to="/admin" @click="drawer=false" class="text-lg hover:text-primary-600">Admin</NuxtLink>
          <NuxtLink to="/pricing" @click="drawer=false" class="text-lg hover:text-primary-600">Planes</NuxtLink>
          <NuxtLink to="/about" @click="drawer=false" class="text-lg hover:text-primary-600">Sobre</NuxtLink>
        </nav>
      </aside>
    </Transition>

    <main class="grow container mx-auto p-4">
      <slot />
    </main>

    <footer class="bg-zinc-100 dark:bg-zinc-900 text-center py-4 text-sm text-zinc-600 dark:text-zinc-400">
      © 2025 Airbnb Finder. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
// Importa cada icono individualmente
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { SunIcon } from '@heroicons/vue/24/outline'
import { MoonIcon } from '@heroicons/vue/24/outline'
// Importa useColorMode si aún no está
import { useColorMode } from '#imports' // o '@nuxtjs/color-mode'

const drawer = ref(false)
const $colorMode = useColorMode()

const route = useRoute()
const isActive = computed(() => (path: string) => route.path === path)
</script>

<style scoped>
/* Estilos para el color primario */
.bg-primary-600   { @apply bg-[#FF5A5F]; }
.text-primary-600 { @apply text-[#FF5A5F]; }
.hover\:text-primary-600:hover { @apply text-[#FF5A5F]; } 

.nav-link {
  @apply text-zinc-700 dark:text-zinc-300 font-medium hover:text-[#FF5A5F] dark:hover:text-[#FF5A5F] transition;
}

.nav-link.active {
  @apply text-[#FF5A5F];
}

.footer-link {
  @apply text-sm text-zinc-500 dark:text-zinc-400 hover:text-[#FF5A5F] dark:hover:text-[#FF5A5F] transition;
}
</style> 