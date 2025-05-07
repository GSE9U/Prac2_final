<template>
  <!-- Usamos clases de Tailwind Typography para dar estilo al contenido Markdown/HTML -->
  <div class="prose dark:prose-invert max-w-none py-6">
    <h1>Sobre la aplicación</h1>
    <p>
      <strong>Airbnb Finder</strong> es una plataforma web de ejemplo para <b>reservar alojamientos</b> de forma sencilla, similar a Airbnb. Ha sido desarrollada como práctica para la asignatura de Sistemas Distribuidos.
    </p>

    <h2>¿Qué puedes hacer?</h2>
    <ul>
      <li>Ver todos los alojamientos disponibles y buscar por nombre o ciudad.</li>
      <li>Reservar un alojamiento seleccionando fechas libres (las fechas ocupadas están bloqueadas).</li>
      <li>Ver el historial de reservas de cada alojamiento.</li>
      <li>Acceder a un panel de administración para gestionar alojamientos y ver todas las reservas.</li>
      <li>La información se actualiza en tiempo real para todos los usuarios.</li>
    </ul>

    <h2>Tecnologías utilizadas</h2>
    <ul>
      <li><b>Nuxt 3</b> (Vue 3) — Framework principal</li>
      <li><b>Pinia</b> — Gestión de estado</li>
      <li><b>Firebase Firestore</b> — Base de datos en la nube y en tiempo real</li>
      <li><b>Tailwind CSS</b> — Estilos modernos y responsive</li>
    </ul>

    <h2>Cómo funciona el sistema de reservas</h2>
    <ul>
      <li>Las reservas se guardan en Firestore y se sincronizan en tiempo real.</li>
      <li>El sistema bloquea automáticamente las fechas ya reservadas para evitar solapamientos.</li>
      <li>Solo se pueden seleccionar fechas libres en el calendario.</li>
    </ul>

    <h2>Notas para el profesor</h2>
    <ul>
      <li>La app es anónima: no requiere registro ni inicio de sesión.</li>
      <li>Todos los datos son de prueba y pueden ser modificados libremente.</li>
      <li>El código está documentado y el README explica cómo instalar y ejecutar la app.</li>
    </ul>

    <h2>¿Quieres saber más?</h2>
    <p>
      El código fuente está disponible y es fácil de modificar o ampliar. Si tienes cualquier duda, puedes consultar el README o el propio código.
    </p>
  </div>
</template>

<script setup lang="ts">
// No se necesita script para contenido estático
</script>

<style scoped>
/* Estilos específicos si fueran necesarios, 
   aunque Tailwind Typography (@apply prose) se encarga de la mayoría */
</style> 