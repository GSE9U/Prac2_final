<script setup lang="ts">
import ImportAirbnb from '../components/ImportAirbnb.vue'
import { ref } from 'vue'
import { useHead } from '#imports'
import { useRouter } from 'vue-router'

// Configuración de metadatos de la página
useHead({
  title: 'Importar anuncio de Airbnb',
  description: 'Importa fácilmente cualquier anuncio de Airbnb usando un enlace'
})

const router = useRouter()
const importSuccess = ref(false)
const importedListing = ref(null)

// Manejar cuando se guarda un listado
const handleListingSaved = (listing) => {
  importedListing.value = listing
  importSuccess.value = true
  
  // Simular la redirección a los detalles (en una app real se guardaría y redireccionaría)
  setTimeout(() => {
    router.push('/admin')
  }, 2000)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-extrabold text-zinc-900 dark:text-white">
        Importar anuncio de Airbnb
      </h1>
      <p class="mt-4 text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
        Importa cualquier alojamiento desde Airbnb con solo pegar su enlace
      </p>
    </div>
    
    <div class="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
      <div class="px-6 py-8 border-b border-zinc-200 dark:border-zinc-700">
        <ImportAirbnb @listing-saved="handleListingSaved" />
      </div>
      
      <div class="px-6 py-8 bg-zinc-50 dark:bg-zinc-900/50">
        <h3 class="text-lg font-medium text-zinc-900 dark:text-white mb-4">
          ¿Cómo funciona la importación?
        </h3>
        <div class="text-sm text-zinc-500 dark:text-zinc-400">
          <p>Nuestro sistema extrae automáticamente la información más relevante de cualquier anuncio de Airbnb:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Título y descripción del alojamiento</li>
            <li>Ubicación exacta</li>
            <li>Precio por noche y tarifas</li>
            <li>Puntuación y número de reseñas</li>
            <li>Características y servicios</li>
            <li>Imágenes y datos del anfitrión</li>
          </ul>
          <p class="mt-3">Una vez importado, podrás analizar el anuncio para mejorar su rendimiento y compararlo con otros similares en la zona.</p>
        </div>
        
        <div class="mt-5">
          <div class="rounded-md bg-blue-50 dark:bg-blue-900 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3 flex-1 md:flex md:justify-between">
                <p class="text-sm text-blue-700 dark:text-blue-200">
                  Con el plan Premium podrás importar y analizar anuncios ilimitados.
                </p>
                <p class="mt-3 text-sm md:mt-0 md:ml-6">
                  <router-link to="/pricing" class="whitespace-nowrap font-medium text-blue-700 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-100">
                    Ver planes
                    <span aria-hidden="true"> &rarr;</span>
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mensaje de éxito -->
    <div v-if="importSuccess" class="fixed inset-x-0 bottom-0 flex justify-center p-4 z-50">
      <div class="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg max-w-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800 dark:text-green-200">¡Anuncio importado con éxito!</p>
            <p class="mt-1 text-sm text-green-700 dark:text-green-300">Redirigiendo al panel de administración...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos para la página de importación */
</style> 