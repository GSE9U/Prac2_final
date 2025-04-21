<script setup lang="ts">
// Importamos los estilos globales definidos en main.css
import '~/assets/main.css'
</script>

<template>
  <!-- NuxtLayout buscará automáticamente layouts/default.vue 
       y renderizará el contenido de la página actual dentro del <slot /> -->
  <NuxtLayout>
    <!-- NuxtPage renderiza el componente de la página actual basado en la ruta -->
    <NuxtPage />
  </NuxtLayout>
</template> 