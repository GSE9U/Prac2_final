<template>
  <!-- Usamos clases de Tailwind Typography para dar estilo al contenido Markdown/HTML -->
  <div class="prose dark:prose-invert max-w-none py-6">
    <h1>Sobre esta Aplicación</h1>
    <p><strong>Airbnb Finder</strong> es un proyecto demostrativo construido con las siguientes tecnologías:</p>
    <ul>
      <li><strong>Framework:</strong> Nuxt 3 (basado en Vue 3)</li>
      <li><strong>Estilos:</strong> Tailwind CSS</li>
      <li><strong>Componentes UI:</strong> Headless UI (para modales) y Heroicons (iconos)</li>
      <li><strong>Gestión de Estado:</strong> Pinia</li>
      <li><strong>Persistencia:</strong> localStorage del navegador (sin backend)</li>
      <li><strong>Funcionalidades:</strong> Diseño responsive, modo oscuro, routing.</li>
    </ul>
    
    <h2>Características Principales</h2>
    <ul>
      <li><strong>Datos Locales:</strong> Toda la información se guarda únicamente en tu navegador. No hay inicio de sesión ni conexión a servidores externos.</li>
      <li><strong>Interfaz Moderna:</strong> Uso de utilidades de Tailwind para una apariencia limpia y adaptable.</li>
      <li><strong>PWA (Progressive Web App):</strong> Puedes instalar esta aplicación en tu dispositivo (busca la opción "Añadir a pantalla de inicio" o similar en tu navegador).</li>
      <li><strong>Código Abierto:</strong> El código fuente está disponible para consulta y aprendizaje (enlace a GitHub si procede).</li>
    </ul>

     <h2>Próximos Pasos (Ideas)</h2>
     <p>Este proyecto podría extenderse con:</p>
     <ul>
        <li>Integración con Firebase (Firestore y Authentication).</li>
        <li>Animaciones y transiciones más elaboradas.</li>
        <li>Notificaciones/Snackbars para feedback de usuario.</li>
        <li>Funcionalidad de edición completa en el panel de admin.</li>
        <li>Paginación o carga infinita para grandes listas.</li>
     </ul>

  </div>
</template>

<script setup lang="ts">
// No se necesita script para contenido estático
</script>

<style scoped>
/* Estilos específicos si fueran necesarios, 
   aunque Tailwind Typography (@apply prose) se encarga de la mayoría */
</style> 