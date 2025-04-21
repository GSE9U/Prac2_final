<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800">
    <div class="max-w-3xl mx-auto">
      <!-- Encabezado -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          <span class="block">Encuentra el plan</span>
          <span class="block mt-1 text-[#FF5A5F]">perfecto para ti</span>
        </h1>
        <p class="mt-6 text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          Desde análisis básicos hasta características avanzadas, tenemos una solución para cada necesidad
        </p>
      </div>

      <!-- Selector de período de facturación -->
      <div class="flex justify-center mb-12">
        <div class="relative bg-white dark:bg-zinc-800 rounded-full p-1 shadow-md flex w-64">
          <button
            type="button"
            class="relative w-1/2 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:z-10 transition-all duration-200"
            :class="billingPeriod === 'monthly' ? 'bg-[#FF5A5F] text-white shadow' : 'text-zinc-700 dark:text-zinc-300 hover:text-[#FF5A5F]'"
            @click="setBillingPeriod('monthly')"
          >
            Mensual
          </button>
          <button
            type="button"
            class="relative w-1/2 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:z-10 transition-all duration-200"
            :class="billingPeriod === 'annually' ? 'bg-[#FF5A5F] text-white shadow' : 'text-zinc-700 dark:text-zinc-300 hover:text-[#FF5A5F]'"
            @click="setBillingPeriod('annually')"
          >
            Anual <span class="text-xs font-bold ml-1" :class="billingPeriod === 'annually' ? 'text-white' : 'text-green-500'">-15%</span>
          </button>
        </div>
      </div>

      <!-- Tarjetas de planes (verticales) -->
      <div class="space-y-10">
        <!-- Plan Gratuito -->
        <div class="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div class="px-6 pt-6 pb-8">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                <span>Plan Gratuito</span>
              </h3>
              <span class="bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 py-1 px-3 rounded-full text-sm font-medium">
                Para empezar
              </span>
            </div>
            
            <div class="flex items-baseline text-zinc-900 dark:text-white mb-6">
              <span class="text-5xl font-extrabold">0€</span>
              <span class="ml-1 text-2xl font-medium text-zinc-500 dark:text-zinc-400">/mes</span>
            </div>

            <p class="text-zinc-600 dark:text-zinc-400 mb-8">
              Ideal para usuarios que quieren probar nuestra plataforma y explorar funcionalidades básicas.
            </p>
            
            <button
              @click="startCheckout('free')"
              class="w-full py-3 px-6 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white rounded-xl font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 dark:focus:ring-offset-zinc-800"
            >
              Comenzar gratis
            </button>
          </div>
          
          <div class="border-t border-zinc-200 dark:border-zinc-700 px-6 py-6 bg-zinc-50 dark:bg-zinc-900/50">
            <h4 class="font-medium text-zinc-900 dark:text-white mb-4">Incluye:</h4>
            <ul class="space-y-4">
              <li v-for="feature in features" :key="feature.name" class="flex items-start">
                <div v-if="feature.free !== false" class="h-5 w-5 text-green-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div v-else class="h-5 w-5 text-zinc-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span class="text-zinc-700 dark:text-zinc-300">{{ feature.name }}</span>
                  <span v-if="typeof feature.free === 'string'" class="text-sm text-zinc-500 dark:text-zinc-400 block">
                    {{ feature.free }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Plan Premium -->
        <div class="bg-gradient-to-br from-white to-pink-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl shadow-xl overflow-hidden relative transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ring-2 ring-[#FF5A5F]">
          <div class="absolute top-0 right-0">
            <div class="bg-[#FF5A5F] text-white px-4 py-1 shadow-md transform rotate-45 translate-x-5 -translate-y-1 font-medium text-sm">
              Popular
            </div>
          </div>
          
          <div class="px-6 pt-6 pb-8">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                <span>Plan Premium</span>
              </h3>
              <span class="bg-pink-100 dark:bg-pink-900/30 text-[#FF5A5F] py-1 px-3 rounded-full text-sm font-medium">
                Todo incluido
              </span>
            </div>
            
            <div class="flex items-baseline text-zinc-900 dark:text-white mb-6">
              <span class="text-5xl font-extrabold">{{ billingPeriod === 'monthly' ? '4,99€' : '50,90€' }}</span>
              <span class="ml-1 text-2xl font-medium text-zinc-500 dark:text-zinc-400">{{ billingPeriod === 'monthly' ? '/mes' : '/año' }}</span>
            </div>
            
            <p class="text-zinc-600 dark:text-zinc-400 mb-8">
              Desbloquea todas las funciones avanzadas y análisis ilimitados para maximizar tu rendimiento.
            </p>
            
            <button
              @click="startCheckout('premium')"
              class="w-full py-3 px-6 bg-[#FF5A5F] text-white rounded-xl font-medium transition-colors hover:bg-[#FF3A3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] dark:focus:ring-offset-zinc-800"
            >
              <span v-if="billingPeriod === 'monthly'">Comenzar prueba de 7 días</span>
              <span v-else>Comenzar con Premium</span>
            </button>
            
            <p class="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-3">
              {{ billingPeriod === 'monthly' ? 'Prueba gratuita de 7 días, cancela cuando quieras' : 'Garantía de devolución de 30 días' }}
            </p>
          </div>
          
          <div class="border-t border-zinc-200 dark:border-zinc-700 px-6 py-6 bg-zinc-50 dark:bg-zinc-900/50">
            <h4 class="font-medium text-zinc-900 dark:text-white mb-4">Todo lo de Gratuito, más:</h4>
            <ul class="space-y-4">
              <li v-for="feature in features" :key="feature.name" class="flex items-start">
                <div class="h-5 w-5 text-green-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span class="text-zinc-700 dark:text-zinc-300 font-medium">{{ feature.name }}</span>
                  <span v-if="typeof feature.premium === 'string'" class="text-sm text-zinc-500 dark:text-zinc-400 block">
                    {{ feature.premium }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Testimonios (Nuevo) -->
      <div class="mt-20">
        <h2 class="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-8">Lo que dicen nuestros usuarios</h2>
        
        <div class="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 relative">
          <div class="absolute -top-4 left-8">
            <div class="bg-[#FF5A5F] text-white p-2 rounded-full shadow">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          
          <div class="mt-2">
            <p class="text-zinc-700 dark:text-zinc-300 italic">
              "Gracias a Airbnb Finder, he conseguido aumentar mis ingresos en un 30% en solo dos meses. La herramienta analiza mejor que nadie los precios de la competencia."
            </p>
            
            <div class="mt-4 flex items-center">
              <img src="https://randomuser.me/api/portraits/women/43.jpg" alt="Ana García" class="h-10 w-10 rounded-full" />
              <div class="ml-3">
                <p class="text-sm font-medium text-zinc-900 dark:text-white">Ana García</p>
                <p class="text-xs text-zinc-500 dark:text-zinc-400">Propietaria de 5 apartamentos en Barcelona</p>
              </div>
              <div class="ml-auto flex">
                <svg v-for="i in 5" :key="i" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preguntas frecuentes -->
      <div class="mt-20">
        <h2 class="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-8">Preguntas frecuentes</h2>
        
        <div class="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-700">
          <div v-for="(faq, index) in faqs" :key="index" class="cursor-pointer" @click="toggleFaq(index)">
            <div class="px-6 py-4 flex justify-between items-center">
              <h3 class="text-lg font-medium text-zinc-900 dark:text-white">{{ faq.question }}</h3>
              <svg 
                class="h-5 w-5 text-zinc-500 transition-transform duration-200" 
                :class="openFaq === index ? 'transform rotate-180' : ''"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div 
              class="px-6 pb-4 text-zinc-600 dark:text-zinc-400 overflow-hidden transition-all duration-200 ease-in-out"
              :class="openFaq === index ? 'max-h-96' : 'max-h-0'"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA final -->
      <div class="mt-20 text-center">
        <h2 class="text-2xl font-bold text-zinc-900 dark:text-white">¿Listo para mejorar tus alojamientos?</h2>
        <p class="mt-4 text-zinc-600 dark:text-zinc-400">Únete a miles de propietarios que ya están optimizando sus anuncios</p>
        <div class="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button 
            @click="startCheckout('free')"
            class="px-6 py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          >
            Comenzar gratis
          </button>
          <button 
            @click="startCheckout('premium')"
            class="px-6 py-3 bg-[#FF5A5F] text-white rounded-xl font-medium hover:bg-[#FF3A3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
          >
            Probar Premium
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '#imports'

// Configuración de metadatos de la página
useHead({
  title: 'Planes y Precios - Airbnb Finder',
  meta: [
    { name: 'description', content: 'Descubre nuestros planes de suscripción y elige el que mejor se adapte a tus necesidades.' }
  ]
})

// Estado para controlar la visualización anual/mensual
const billingPeriod = ref('monthly')

// Control de FAQs expandidos
const openFaq = ref(null)

// Función para cambiar el período de facturación
const setBillingPeriod = (period: 'monthly' | 'annually') => {
  billingPeriod.value = period
}

// Función para alternar las preguntas frecuentes
const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

// Función para simular el inicio del checkout
const startCheckout = (plan: 'free' | 'premium') => {
  if (plan === 'free') {
    alert('Te has suscrito al plan gratuito con éxito.')
  } else {
    // Aquí se integraría con Stripe para el pago
    alert('Redirigiendo al proceso de pago...')
  }
}

// Lista de características por plan
const features = [
  { 
    name: 'Importación de anuncios', 
    free: 'Limitado (5/mes)', 
    premium: 'Ilimitado' 
  },
  { 
    name: 'Alertas de precios', 
    free: false, 
    premium: true 
  },
  { 
    name: 'Sincronización automática', 
    free: false, 
    premium: true 
  },
  { 
    name: 'Exportación de datos', 
    free: false, 
    premium: true 
  },
  { 
    name: 'Filtros avanzados', 
    free: false, 
    premium: true 
  },
  { 
    name: 'Soporte prioritario', 
    free: false, 
    premium: true 
  },
  { 
    name: 'Almacenamiento de anuncios', 
    free: '10 anuncios', 
    premium: 'Ilimitado' 
  },
  { 
    name: 'Acceso a estadísticas', 
    free: 'Básicas', 
    premium: 'Avanzadas' 
  }
]

// Preguntas frecuentes
const faqs = [
  {
    question: '¿Puedo cancelar mi suscripción en cualquier momento?',
    answer: 'Sí, puedes cancelar tu suscripción Premium en cualquier momento. Seguirás teniendo acceso a las funciones Premium hasta el final del período de facturación actual.'
  },
  {
    question: '¿Cómo funciona el período de prueba?',
    answer: 'Al suscribirte al plan Premium, obtienes acceso gratuito durante los primeros 7 días. Si decides que no es lo que buscas, puedes cancelar antes de que finalice el período de prueba sin cargo alguno.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos todas las principales tarjetas de crédito y débito, así como PayPal.'
  },
  {
    question: '¿Emiten facturas para empresas?',
    answer: 'Sí, todas las suscripciones incluyen facturas con IVA que puedes descargar desde tu perfil. Si necesitas una factura personalizada, contáctanos a través del soporte.'
  },
  {
    question: '¿Puedo cambiar de plan después de suscribirme?',
    answer: 'Sí, puedes cambiar entre planes en cualquier momento. Si pasas a un plan de nivel superior, se te cobrará la diferencia prorrateada. Si cambias a un plan inferior, el nuevo precio se aplicará en tu próximo ciclo de facturación.'
  }
]
</script>

<style scoped>
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
</style> 