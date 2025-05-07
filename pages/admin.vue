<script setup lang="ts">
import { PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref, reactive, onMounted, computed } from 'vue'
import ImportAirbnb from '../components/ImportAirbnb.vue'
import { useListingsStore } from '~/stores/useListingsStore'
import { useBookingsStore } from '~/stores/useBookingsStore'
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../services/Fireinit'

const store = useListingsStore()
const bookingsStore = useBookingsStore()

onMounted(() => {
  store.subscribe()
  items.value.forEach(l => bookingsStore.subscribe(l.id))
})

const items = computed(() => store.docsArray)

const activeView = ref('table')
const isEditModalOpen = ref(false)
const currentEditItem = ref(null)
const showPasswordFailModal = ref(false)

const editForm = reactive({
  id: '',
  title: '',
  city: '',
  price: 0,
  image: '',
  description: '',
  capacity: 1,
  bedrooms: 1,
  bathrooms: 1,
  rating: 5,
  reviews: 0,
  reserved: false,
  reservedDate: null
})

function openNewListingForm() {
  editForm.id = ''
  editForm.title = ''
  editForm.city = ''
  editForm.price = 0
  editForm.image = ''
  editForm.description = ''
  editForm.capacity = 1
  editForm.bedrooms = 1
  editForm.bathrooms = 1
  editForm.rating = 5
  editForm.reviews = 0
  editForm.reserved = false
  editForm.reservedDate = null
  isEditModalOpen.value = true
}

function edit(id) {
  const item = items.value.find(item => item.id === id)
  if (item) {
    currentEditItem.value = item
    editForm.id = item.id
    editForm.title = item.title || item.name || ''
    editForm.city = item.city
    editForm.price = item.price
    editForm.image = item.image || item.img || ''
    editForm.description = item.description || ''
    editForm.capacity = item.capacity || 1
    editForm.bedrooms = item.bedrooms || 1
    editForm.bathrooms = item.bathrooms || 1
    editForm.rating = item.rating || 5
    editForm.reviews = item.reviews || 0
    editForm.reserved = item.reserved || false
    editForm.reservedDate = item.reservedDate || null
    isEditModalOpen.value = true
  }
}

async function del(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este alojamiento?')) {
    await deleteDoc(doc(db, 'listings', id));
    await store.subscribe(); // Refresca la lista
  }
}

function formatDate(date) {
  if (!date) return ''
  if (typeof date === 'string') return date
  if (date.toDate) return date.toDate().toLocaleDateString()
  return new Date(date).toLocaleDateString()
}

async function toggleReserved(listing) {
  await store.toggleReserved(listing.id, !listing.reserved)
}

async function borrarTodosAlojamientos() {
  if (confirm('¿Seguro que quieres borrar TODOS los alojamientos? Esta acción no se puede deshacer.')) {
    const querySnapshot = await getDocs(collection(db, 'listings'));
    const batch = [];
    querySnapshot.forEach((docu) => {
      batch.push(deleteDoc(doc(db, 'listings', docu.id)));
    });
    await Promise.all(batch);
    await store.fetchListings(); // Refresca el store
    alert('¡Todos los alojamientos han sido borrados!');
  }
}

async function saveChanges() {
  if (!editForm.id) {
    // NUEVO alojamiento: pedir contraseña
    const password = prompt('Introduce la contraseña para subir el alojamiento:');
    if (password !== 'autorizadoP3') {
      showPasswordFailModal.value = true;
      return;
    }
  }
  if (editForm.id) {
    await store.updateListing(editForm.id, {
      title: editForm.title,
      city: editForm.city,
      price: Number(editForm.price),
      image: editForm.image,
      description: editForm.description,
      capacity: Number(editForm.capacity),
      bedrooms: Number(editForm.bedrooms),
      bathrooms: Number(editForm.bathrooms),
      rating: Number(editForm.rating),
      reviews: Number(editForm.reviews),
      reserved: !!editForm.reserved,
      reservedDate: editForm.reserved ? (editForm.reservedDate || new Date().toISOString()) : null
    })
  } else {
    await store.addListing({
      title: editForm.title,
      city: editForm.city,
      price: Number(editForm.price),
      image: editForm.image,
      description: editForm.description,
      capacity: Number(editForm.capacity),
      bedrooms: Number(editForm.bedrooms),
      bathrooms: Number(editForm.bathrooms),
      rating: Number(editForm.rating),
      reviews: Number(editForm.reviews),
      reserved: !!editForm.reserved,
      reservedDate: editForm.reserved ? new Date().toISOString() : null
    })
  }
  isEditModalOpen.value = false
  await store.subscribe(); // Refresca la lista tras añadir/editar
}

function cancelEdit() {
  isEditModalOpen.value = false
}

function addImportedListing(listing) {
  // Siempre pide contraseña antes de importar
  const password = prompt('Introduce la contraseña para subir el alojamiento:');
  if (password !== 'autorizadoP3') {
    showPasswordFailModal.value = true;
    return;
  }
  store.addListing({
    title: listing.name,
    city: listing.location || 'Sin especificar',
    price: listing.price || 0,
    image: listing.image || 'https://placehold.co/600x400?text=Sin+Imagen',
    description: listing.description || '',
    capacity: listing.capacity || 1,
    bedrooms: listing.bedrooms || 1,
    bathrooms: listing.bathrooms || 1,
    rating: listing.rating || 5,
    reviews: listing.reviews || 0
  })
  activeView.value = 'table'
  store.subscribe(); // Refresca la lista
}

function getActiveBookings(listingId) {
  const today = new Date().toISOString().slice(0, 10)
  return bookingsStore.bookings.filter(b => b.listingId === listingId && b.endDate >= today)
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
        <button
          @click="borrarTodosAlojamientos"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Borrar TODOS
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
            <th scope="col" class="px-6 py-3">Reservado</th>
            <th scope="col" class="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody> 
          <tr v-for="l in items" :key="l.id" 
              class="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-600">
            <td class="px-6 py-4">
              <img :src="l.image || 'https://placehold.co/120x80?text=Sin+Imagen'" :alt="l.title" class="h-12 w-16 object-cover rounded-md" />
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-zinc-900 dark:text-white whitespace-nowrap">
              {{ l.title }}
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
            <td class="px-6 py-4">
              <span v-if="getActiveBookings(l.id).length > 0" class="bg-red-500 text-white text-xs px-2 py-1 rounded">Reservado</span>
              <span v-else class="bg-green-500 text-white text-xs px-2 py-1 rounded">Disponible</span>
              <ul v-if="getActiveBookings(l.id).length > 0" class="text-xs text-zinc-400 mt-1">
                <li v-for="b in getActiveBookings(l.id)" :key="b.id">
                  {{ formatDate(b.startDate) }} → {{ formatDate(b.endDate) }}
                </li>
              </ul>
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
            <td colspan="7" class="px-6 py-4 text-center text-zinc-500 dark:text-zinc-400">
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
              <label for="title" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nombre</label>
              <input 
                type="text" 
                id="title" 
                v-model="editForm.title" 
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
              <label for="image" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">URL de imagen</label>
              <input 
                type="url" 
                id="image" 
                v-model="editForm.image" 
                class="mt-1 block w-full border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]" 
              />
              <div v-if="editForm.image" class="mt-2">
                <img :src="editForm.image" alt="Vista previa" class="h-24 w-32 object-cover rounded-md" />
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
            
            <!-- En el modal de edición, dentro del formulario -->
            <div>
              <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Reservado</label>
              <input type="checkbox" v-model="editForm.reserved" />
              <span v-if="editForm.reserved && editForm.reservedDate" class="text-xs text-zinc-400 ml-2">
                (Reservado el {{ formatDate(editForm.reservedDate) }})
              </span>
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
        <div class="mt-6">
          <h4 class="font-semibold text-sm mb-1">Historial de reservas</h4>
          <ul class="text-xs text-zinc-500 dark:text-zinc-400">
            <li v-for="b in bookingsStore.bookings.filter(b => b.listingId === editForm.id)" :key="b.id">
              {{ formatDate(b.startDate) }} → {{ formatDate(b.endDate) }}
            </li>
            <li v-if="bookingsStore.bookings.filter(b => b.listingId === editForm.id).length === 0">Sin reservas para este alojamiento.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modal de error de contraseña -->
    <div v-if="showPasswordFailModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-md w-full flex flex-col items-center p-6">
        <img src="https://c.tenor.com/SQBSmoPOLJIAAAAC/mono-riendo.gif" alt="Mono riendo" class="w-48 h-48 object-contain mb-4" />
        <p class="text-lg font-bold text-center text-zinc-800 dark:text-white mb-2">
          ¿Otra vez intentando sabotearme la práctica, Unai? Esta vez no 😏
        </p>
        <p class="text-center text-zinc-500 dark:text-zinc-300 mb-4">¡Vuelve a intentarlo, pero no te va a salir!</p>
        <p class="text-center text-primary-600 font-semibold mb-2">Pista: la contraseña está en el README.</p>
        <button @click="showPasswordFailModal = false" class="mt-2 px-4 py-2 bg-[#FF5A5F] text-white rounded hover:bg-[#FF3A3F]">Cerrar</button>
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