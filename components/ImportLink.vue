<script setup lang="ts">
import { ref, computed } from 'vue'

// Estado del componente
const airbnbUrl = ref('')
const isLoading = ref(false)
const error = ref('')
const importSuccess = ref(false)
const isPremium = ref(false) // En una app real, esto vendría de un store de autenticación

// Validar formato de URL de Airbnb
const isValidUrl = computed(() => {
  if (!airbnbUrl.value) return false
  try {
    const url = new URL(airbnbUrl.value)
    return url.hostname.includes('airbnb.com') || url.hostname.includes('airbnb.es')
  } catch (e) {
    return false
  }
})

// Verificar si es premium para mostrar mensaje adecuado
const canImport = computed(() => {
  return isPremium.value
})

// Simular la importación de un anuncio
const importListing = async () => {
  if (!isValidUrl.value) {
    error.value = 'Por favor, introduce una URL válida de Airbnb'
    return
  }
  
  if (!canImport.value) {
    error.value = 'Necesitas una suscripción Premium para importar anuncios'
    return
  }
  
  try {
    isLoading.value = true
    error.value = ''
    
    // Simulación de una llamada a API para importar el anuncio
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Éxito en la importación
    importSuccess.value = true
    airbnbUrl.value = ''
    
    // Reseteamos el estado de éxito después de un tiempo
    setTimeout(() => {
      importSuccess.value = false
    }, 5000)
  } catch (err) {
    error.value = 'Ha ocurrido un error al importar el anuncio'
    console.error('Error importando anuncio:', err)
  } finally {
    isLoading.value = false
  }
}

// Reset del formulario
const resetForm = () => {
  airbnbUrl.value = ''
  error.value = ''
  importSuccess.value = false
}
</script>

<template>
  <div class="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 max-w-3xl mx-auto">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Importar Anuncio de Airbnb</h2>
      <p class="text-zinc-600 dark:text-zinc-300">
        Pega un enlace de Airbnb para importar automáticamente todos los detalles del alojamiento.
        <span v-if="!isPremium" class="text-[#FF5A5F] font-medium">
          Esta función requiere una suscripción Premium.
        </span>
      </p>
    </div>
    
    <form @submit.prevent="importListing" class="space-y-4">
      <div>
        <label for="airbnb-url" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          URL del anuncio de Airbnb
        </label>
        <div class="relative">
          <input
            id="airbnb-url"
            v-model="airbnbUrl"
            type="url"
            placeholder="https://www.airbnb.es/rooms/..."
            class="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg
                   focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] dark:bg-zinc-700 dark:text-white
                   placeholder-zinc-400 dark:placeholder-zinc-500"
            :disabled="isLoading"
          />
          
          <div v-if="airbnbUrl && !isLoading" class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <svg v-if="isValidUrl" class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      </div>
      
      <div class="flex space-x-3">
        <button
          type="submit"
          :disabled="isLoading || !isValidUrl || !canImport"
          class="px-4 py-2 rounded-lg bg-[#FF5A5F] text-white font-medium
                 hover:bg-[#FF3A3F] focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-[#FF5A5F] disabled:opacity-50 disabled:cursor-not-allowed
                 transition flex items-center"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isLoading ? 'Importando...' : 'Importar Anuncio' }}</span>
        </button>
        
        <button
          type="button"
          @click="resetForm"
          :disabled="isLoading || !airbnbUrl"
          class="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600
                 text-zinc-700 dark:text-zinc-300 font-medium
                 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:outline-none
                 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500
                 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Limpiar
        </button>
      </div>
    </form>
    
    <!-- Mensaje de éxito -->
    <div v-if="importSuccess" class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800 dark:text-green-200">Anuncio importado con éxito</p>
          <p class="mt-1 text-sm text-green-700 dark:text-green-300">El anuncio ha sido añadido a tu lista de favoritos.</p>
        </div>
      </div>
    </div>
    
    <!-- Mensaje para usuarios no premium -->
    <div v-if="!isPremium" class="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-amber-800 dark:text-amber-200">Función Premium</h3>
          <div class="mt-2 text-sm text-amber-700 dark:text-amber-300">
            <p>La importación directa de anuncios está disponible solo para usuarios Premium.</p>
            <a href="/pricing" class="mt-1 inline-block font-medium text-[#FF5A5F] hover:text-[#FF3A3F] dark:text-[#FF7A7F] dark:hover:text-[#FF5A5F]">
              Actualizar a Premium
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Demo de cómo funciona -->
    <div class="mt-8 border-t border-zinc-200 dark:border-zinc-700 pt-6">
      <h3 class="text-lg font-medium text-zinc-900 dark:text-white mb-3">¿Cómo funciona?</h3>
      <ol class="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-300">
        <li>Encuentra un alojamiento en Airbnb.com que te interese.</li>
        <li>Copia la URL completa del anuncio desde la barra de direcciones.</li>
        <li>Pega la URL en el campo de arriba y haz clic en "Importar Anuncio".</li>
        <li>Nuestro sistema extraerá automáticamente todos los detalles: imágenes, precios, características, ubicación, etc.</li>
        <li>El anuncio se guardará en tu cuenta para que puedas compararlo con otros o añadirlo a favoritos.</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos para el componente de importación */
</style> 