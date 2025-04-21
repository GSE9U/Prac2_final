<template>
  <Dialog :open="open" @close="close">
    <div class="fixed inset-0 bg-black/40" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="bg-white dark:bg-zinc-800 p-6 rounded-xl w-full max-w-md space-y-4">
        <DialogTitle class="text-lg font-medium">Nuevo alojamiento</DialogTitle>
        <form @submit.prevent="save" class="space-y-3">
          <input v-model="name" required placeholder="Nombre" class="af-input">
          <input v-model="city" required placeholder="Ciudad" class="af-input">
          <input v-model.number="price" required type="number" min="0" placeholder="Precio (€)" class="af-input">
          <input v-model="img" required placeholder="URL de imagen" class="af-input">
          <input v-model="url" required placeholder="URL Airbnb" class="af-input">
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="close" class="af-btn-outlined">Cancelar</button>
            <button class="af-btn-primary">Guardar</button>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
// import { useListingsStore } from '../stores/listings.ts' // <-- Comentado temporalmente

const props = defineProps<{ open: boolean }>()
const emit  = defineEmits(['close'])

const name = ref(''), city = ref(''), price = ref<number|null>(null), img = ref(''), url = ref('')

function close() { emit('close') }

function save() {
  // Comentamos la llamada al store
  // if (price.value !== null) {
  //   useListingsStore().add({ name: name.value, city: city.value, price: price.value, img: img.value, url: url.value })
  // }
  console.log('Guardar presionado (Store desconectado)', {
    name: name.value,
    city: city.value,
    price: price.value,
    img: img.value,
    url: url.value
  });
  // Resetear campos después de guardar
  name.value = ''
  city.value = ''
  price.value = null
  img.value = ''
  url.value = ''
  close() // Cierra el modal
}
</script>

<style scoped>
/* Definimos las clases de utilidad para Tailwind */
.af-input { @apply w-full border rounded-lg px-3 py-2 dark:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600; }
.af-btn-primary { @apply bg-primary-600 text-white rounded-lg px-4 py-2 transition hover:bg-opacity-90; }
.af-btn-outlined { @apply border border-zinc-400 rounded-lg px-4 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-700; }
</style> 