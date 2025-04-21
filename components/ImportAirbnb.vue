<template>
  <div class="import-container bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Importar alojamiento desde Airbnb</h2>
    
    <div v-if="!previewListing">
      <p class="mb-4 text-zinc-600 dark:text-zinc-400">
        Pega el enlace de un alojamiento de Airbnb para importar sus datos automáticamente.
      </p>
      
      <div class="mb-4">
        <label for="airbnb-url" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Enlace de Airbnb
        </label>
        <input
          id="airbnb-url"
          v-model="url"
          type="url"
          placeholder="https://www.airbnb.es/rooms/..."
          class="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md 
                 focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent 
                 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
          :disabled="loading"
        />
        <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
      </div>
      
      <button 
        @click="fetchListing"
        class="af-btn-primary"
        :disabled="loading || !url.trim()"
        :class="{'opacity-70 cursor-not-allowed': loading || !url.trim()}"
      >
        <span v-if="loading">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando...
        </span>
        <span v-else>
          Obtener detalles
        </span>
      </button>
    </div>
    
    <!-- Vista previa -->
    <div v-else class="preview">
      <h3 class="text-lg font-medium mb-3">Vista previa del alojamiento</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="md:col-span-1">
          <img 
            :src="previewListing.image" 
            :alt="previewListing.name" 
            class="w-full h-auto rounded-lg object-cover aspect-[4/3]"
          />
        </div>
        
        <div class="md:col-span-2">
          <h4 class="text-lg font-medium">{{ previewListing.name }}</h4>
          <p class="text-zinc-600 dark:text-zinc-400 mt-1">{{ previewListing.location }}</p>
          
          <div class="mt-3 grid grid-cols-2 gap-2">
            <div class="text-sm">
              <span class="font-medium">Precio:</span> 
              {{ previewListing.price }}€ por noche
            </div>
            <div class="text-sm">
              <span class="font-medium">Capacidad:</span> 
              {{ previewListing.capacity }} personas
            </div>
            <div class="text-sm">
              <span class="font-medium">Habitaciones:</span> 
              {{ previewListing.rooms }}
            </div>
          </div>
          
          <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            {{ previewListing.description }}
          </p>
        </div>
      </div>
      
      <div class="flex space-x-3">
        <button @click="saveListing" class="af-btn-primary">
          Guardar alojamiento
        </button>
        <button @click="cancelImport" class="af-btn-secondary">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const url = ref('')
const loading = ref(false)
const error = ref('')
const previewListing = ref(null)

// Emite el evento cuando se guarda un listado
const emit = defineEmits(['listing-saved'])

async function fetchListing() {
  // Validar que la URL sea de airbnb
  if (!url.value.includes('airbnb.com')) {
    error.value = 'Por favor, introduce un enlace válido de Airbnb'
    return
  }

  try {
    loading.value = true
    error.value = ''
    
    // En una implementación real, aquí se llamaría a un backend que
    // haría scrapping del enlace de Airbnb para obtener los datos
    // Como esto es una simulación, crearemos datos ficticios basados en la URL
    
    // Simular una llamada a API con timeout
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Extraer un ID de la URL (simulado)
    const id = url.value.split('/').pop() || Math.random().toString(36).substring(2, 8)
    
    // Crear datos ficticios basados en partes de la URL
    const urlParts = url.value.toLowerCase().split('/')
    const cityHint = urlParts.find(part => 
      ['barcelona', 'madrid', 'valencia', 'sevilla', 'malaga'].includes(part)
    ) || 'España'
    
    // Datos simulados
    previewListing.value = {
      id,
      name: `Alojamiento en ${cityHint.charAt(0).toUpperCase() + cityHint.slice(1)}`,
      location: cityHint.charAt(0).toUpperCase() + cityHint.slice(1),
      price: Math.floor(Math.random() * 100) + 50,
      image: `https://source.unsplash.com/random/300x200/?apartment,${cityHint}`,
      description: 'Este alojamiento ha sido importado desde Airbnb',
      capacity: Math.floor(Math.random() * 6) + 1,
      rooms: Math.floor(Math.random() * 3) + 1
    }
  } catch (e) {
    error.value = 'Error al procesar el enlace. Por favor, inténtalo de nuevo.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

function saveListing() {
  if (previewListing.value) {
    emit('listing-saved', previewListing.value)
    // Resetear el formulario
    url.value = ''
    previewListing.value = null
  }
}

function cancelImport() {
  url.value = ''
  previewListing.value = null
  error.value = ''
}
</script>

<style scoped>
.af-btn-primary { 
  @apply bg-[#FF5A5F] text-white rounded-lg px-4 py-2 transition hover:bg-opacity-90; 
}
.af-btn-secondary {
  @apply bg-zinc-200 text-zinc-800 rounded-lg px-4 py-2 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600;
}
</style> 