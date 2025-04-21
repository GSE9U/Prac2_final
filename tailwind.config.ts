import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class', // Habilita el modo oscuro basado en la clase 'dark' en <html> o <body>
  theme: {
    extend: {
      colors: {
        // Definimos un color primario personalizado
        primary: {
          600: '#FF5A5F' // Tonalidad 600 del color primario
        }
      }
    }
  },
  // Si necesitas añadir plugins de Tailwind (como typography)
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'), // Descomenta si usas este plugin
  ],
  // Asegúrate de que Tailwind escanee todos los archivos relevantes para encontrar clases
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./plugins/**/*.{js,ts}`,
    `./nuxt.config.{js,ts}`,
    `./app.vue`
  ]
} 