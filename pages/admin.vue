<script setup lang="ts">
// import { useListingsStore } from '../stores/listings.ts' // <-- Comentado temporalmente
import { PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref, reactive } from 'vue'
import ImportAirbnb from '../components/ImportAirbnb.vue'

// const store = useListingsStore() // <-- Comentado temporalmente

// Datos de prueba para mostrar en la interfaz de administración
const items = ref([
  {
    id: '1',
    name: 'Apartamento con vistas al mar',
    city: 'Barcelona',
    price: 85,
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3',
    description: 'Bonito apartamento con vistas panorámicas al mar Mediterráneo',
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.8,
    reviews: 45
  },
  {
    id: '2',
    name: 'Loft moderno en el centro',
    city: 'Madrid',
    price: 75,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3',
    description: 'Espacioso loft en pleno centro de Madrid con todas las comodidades',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.5,
    reviews: 32
  },
  {
    id: '3',
    name: 'Villa con piscina',
    city: 'Valencia',
    price: 120,
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3',
    description: 'Villa exclusiva con piscina privada y jardín a 5 minutos de la playa',
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.9,
    reviews: 67
  },
  {
    id: '4',
    name: 'Apartamento acogedor',
    city: 'Sevilla',
    price: 65,
    img: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-4.0.3',
    description: 'Acogedor apartamento en el barrio de Santa Cruz, a pocos pasos de la Giralda',
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    reviews: 28
  }
])

// Vista activa y modal de edición
const activeView = ref('table') // 'table' o 'listing'
const isEditModalOpen = ref(false)
const currentEditItem = ref(null)

// Formulario para editar/crear alojamiento
const editForm = reactive({
  id: '',
  name: '',
  city: '',
  price: 0,
  img: '',
  description: '',
  capacity: 1,
  bedrooms: 1,
  bathrooms: 1,
  rating: 5,
  reviews: 0
})

// Para añadir un nuevo alojamiento
function openNewListingForm() {
  editForm.id = ''
  editForm.name = ''
  editForm.city = ''
  editForm.price = 0
  editForm.img = ''
  editForm.description = ''
  editForm.capacity = 1
  editForm.bedrooms = 1
  editForm.bathrooms = 1
  editForm.rating = 5
  editForm.reviews = 0
  isEditModalOpen.value = true
}

// Para editar un alojamiento existente
function edit(id) {
  const item = items.value.find(item => item.id === id)
  if (item) {
    currentEditItem.value = item
    // Copiar los valores al formulario
    editForm.id = item.id
    editForm.name = item.name
    editForm.city = item.city
    editForm.price = item.price
    editForm.img = item.img
    editForm.description = item.description || ''
    editForm.capacity = item.capacity || 1
    editForm.bedrooms = item.bedrooms || 1
    editForm.bathrooms = item.bathrooms || 1
    editForm.rating = item.rating || 5
    editForm.reviews = item.reviews || 0
    isEditModalOpen.value = true
  }
}

// Para eliminar un alojamiento
function del(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este alojamiento?')) {
    items.value = items.value.filter(item => item.id !== id)
  }
}

// Para guardar los cambios
function saveChanges() {
  if (editForm.id) {
    // Editar existente
    const index = items.value.findIndex(item => item.id === editForm.id)
    if (index !== -1) {
      items.value[index] = {
        ...items.value[index],
        name: editForm.name,
        city: editForm.city,
        price: Number(editForm.price),
        img: editForm.img,
        description: editForm.description,
        capacity: Number(editForm.capacity),
        bedrooms: Number(editForm.bedrooms),
        bathrooms: Number(editForm.bathrooms),
        rating: Number(editForm.rating),
        reviews: Number(editForm.reviews)
      }
    }
  } else {
    // Crear nuevo
    const newId = (Math.max(...items.value.map(item => parseInt(item.id)), 0) + 1).toString()
    items.value.push({
      id: newId,
      name: editForm.name,
      city: editForm.city,
      price: Number(editForm.price),
      img: editForm.img,
      description: editForm.description,
      capacity: Number(editForm.capacity),
      bedrooms: Number(editForm.bedrooms),
      bathrooms: Number(editForm.bathrooms),
      rating: Number(editForm.rating),
      reviews: Number(editForm.reviews)
    })
  }
  isEditModalOpen.value = false
}

// Para cerrar el modal sin guardar
function cancelEdit() {
  isEditModalOpen.value = false
}

function addImportedListing(listing) {
  // Añadir el listado importado a la lista de alojamientos
  const newId = (Math.max(...items.value.map(item => parseInt(item.id)), 0) + 1).toString()
  
  items.value.push({
    id: newId,
    name: listing.name,
    city: listing.location || 'Sin especificar',
    price: listing.price || 0,
    img: listing.image || 'https://placehold.co/600x400?text=Sin+Imagen',
    description: listing.description || '',
    capacity: listing.capacity || 1,
    bedrooms: listing.bedrooms || 1,
    bathrooms: listing.bathrooms || 1,
    rating: listing.rating || 5,
    reviews: listing.reviews || 0
  })
  
  // Cambiar a la vista de tabla después de importar
  activeView.value = 'table'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">Panel de administración</h1>
      
      <div class="mt-4 md:mt-0 flex space-x-3">
        <button 
          @click="openNewListingForm"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FF3A3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Añadir alojamiento
        </button>
        <router-link 
          to="/import"
          class="inline-flex items-center px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
        >
          Importar de Airbnb
        </router-link>
      </div>
    </div>
    
    <!-- Tabla de alojamientos -->
    <div class="overflow-x-auto shadow rounded-lg">
      <table class="min-w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
        <thead class="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400">
          <tr>
            <th scope="col" class="px-6 py-3">Imagen</th>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Ciudad</th>
            <th scope="col" class="px-6 py-3">Precio (€)</th>
            <th scope="col" class="px-6 py-3">Valoración</th>
            <th scope="col" class="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          <tr v-for="l in items" :key="l.id" 
              class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-600">
            <td class="px-6 py-4">
              <img :src="l.img" :alt="l.name" class="h-12 w-16 object-cover rounded-md" />
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-zinc-900 dark:text-white whitespace-nowrap">
              {{ l.name }}
            </th>
            <td class="px-6 py-4">{{ l.city }}</td>
            <td class="px-6 py-4">{{ l.price }}€</td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <span class="text-yellow-400 mr-1">★</span>
                <span>{{ l.rating || "N/A" }}</span>
                <span class="text-zinc-400 text-xs ml-1">({{ l.reviews || 0 }})</span>
              </div>
            </td>
            <!-- Acciones: Editar y Eliminar -->
            <td class="px-6 py-4 text-right space-x-3 whitespace-nowrap">
              <button 
                @click="edit(l.id)" 
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                title="Editar"
              >
                <PencilSquareIcon class="w-5 h-5 inline" />
              </button>
              <button 
                @click="del(l.id)" 
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                title="Eliminar"
              >
                <TrashIcon class="w-5 h-5 inline" />
              </button>
            </td>
          </tr>
          <!-- Mensaje si no hay listings -->
          <tr v-if="!items.length">
            <td colspan="6" class="px-6 py-4 text-center text-zinc-500 dark:text-zinc-400">
              No hay alojamientos disponibles.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Modal de edición -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
          <h3 class="text-lg font-medium text-zinc-900 dark:text-white">
            {{ editForm.id ? 'Editar alojamiento' : 'Añadir nuevo alojamiento' }}
          </h3>
          <button @click="cancelEdit" class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
        
        <div class="px-6 py-4">
          <form @submit.prevent="saveChanges" class="space-y-4">
            <!-- Nombre -->
            <div>
              <label for="name" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nombre</label>
              <input 
                type="text" 
                id="name" 
                v-model="editForm.name" 
                class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
                required
              />
            </div>
            
            <!-- Ciudad -->
            <div>
              <label for="city" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Ciudad</label>
              <input 
                type="text" 
                id="city" 
                v-model="editForm.city" 
                class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
                required
              />
            </div>
            
            <!-- Descripción -->
            <div>
              <label for="description" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Descripción</label>
              <textarea 
                id="description" 
                v-model="editForm.description"
                rows="3" 
                class="mt-1 block w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
              ></textarea>
            </div>
            
            <!-- URL de la imagen -->
            <div>
              <label for="img" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">URL de imagen</label>
              <input 
                type="url" 
                id="img" 
                v-model="editForm.img" 
                class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
              />
              <div v-if="editForm.img" class="mt-2">
                <img :src="editForm.img" alt="Vista previa" class="h-24 w-32 object-cover rounded-md" />
              </div>
            </div>
            
            <!-- Fila de 3 columnas -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Precio -->
              <div>
                <label for="price" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Precio por noche (€)</label>
                <input 
                  type="number" 
                  id="price" 
                  v-model="editForm.price" 
                  min="0" 
                  step="0.01" 
                  class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
                  required
                />
              </div>
              
              <!-- Capacidad -->
              <div>
                <label for="capacity" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Capacidad (personas)</label>
                <input 
                  type="number" 
                  id="capacity" 
                  v-model="editForm.capacity" 
                  min="1" 
                  class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
                  required
                />
              </div>
              
              <!-- Valoración -->
              <div>
                <label for="rating" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Valoración</label>
                <input 
                  type="number" 
                  id="rating" 
                  v-model="editForm.rating" 
                  min="0" 
                  max="5" 
                  step="0.1" 
                  class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
                />
              </div>
            </div>
            
            <!-- Fila de 3 columnas -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Habitaciones -->
              <div>
                <label for="bedrooms" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Habitaciones</label>
                <input 
                  type="number" 
                  id="bedrooms" 
                  v-model="editForm.bedrooms" 
                  min="0" 
                  class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
                />
              </div>
              
              <!-- Baños -->
              <div>
                <label for="bathrooms" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Baños</label>
                <input 
                  type="number" 
                  id="bathrooms" 
                  v-model="editForm.bathrooms" 
                  min="0" 
                  step="0.5" 
                  class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
                />
              </div>
              
              <!-- Reseñas -->
              <div>
                <label for="reviews" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Número de reseñas</label>
                <input 
                  type="number" 
                  id="reviews" 
                  v-model="editForm.reviews" 
                  min="0" 
                  class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
                />
              </div>
            </div>
            
            <!-- Botones -->
            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button" 
                @click="cancelEdit"
                class="py-2 px-4 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FF3A3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales */
.af-btn-primary { 
  @apply bg-[#FF5A5F] text-white rounded-lg px-4 py-2 transition hover:bg-opacity-90; 
}
.af-btn-secondary {
  @apply bg-zinc-200 text-zinc-800 rounded-lg px-4 py-2 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600;
}
.af-btn {
  @apply font-medium;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style> 