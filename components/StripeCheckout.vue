<template>
  <div class="stripe-checkout">
    <button 
      @click="processPayment" 
      class="af-btn-primary w-full py-3"
      :disabled="loading"
    >
      <span v-if="loading">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Procesando...
      </span>
      <span v-else>
        {{ buttonText }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'eur'
  },
  buttonText: {
    type: String,
    default: 'Pagar ahora'
  },
  description: {
    type: String,
    default: 'Reserva de alojamiento'
  }
})

const loading = ref(false)
const stripePromise = ref<any>(null)

// In a real app, this would be an environment variable or fetched from the server
const STRIPE_PUBLIC_KEY = 'pk_test_51O3PQwLxxxxxxxxxxxxxxxJ4DUzYJdP4W7wmTuPgk2M9QF8JxwxxxxxxxxxrKSf9xkvWdRu00xxxxxxxxxx'

onMounted(async () => {
  try {
    // Initialize Stripe
    stripePromise.value = await loadStripe(STRIPE_PUBLIC_KEY)
  } catch (error) {
    console.error('Error loading Stripe:', error)
  }
})

// This would typically call your backend to create a payment intent
// Here we're just simulating the process
async function processPayment() {
  if (!stripePromise.value) {
    console.error('Stripe has not been initialized')
    return
  }

  loading.value = true

  try {
    // In a real implementation, this would be an API call to your backend
    // which would create a PaymentIntent and return the client secret
    
    // Mock implementation
    setTimeout(() => {
      alert(`Simulando pago de ${props.amount} ${props.currency.toUpperCase()} por "${props.description}"\n\nEn una implementación real, se abriría el formulario de pago de Stripe.`)
      loading.value = false
    }, 1500)

    // Real implementation would look like this:
    /*
    const stripe = stripePromise.value
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_id_from_stripe', // Would come from your backend
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: window.location.origin + '/success',
      cancelUrl: window.location.origin + '/cancel',
    })

    if (error) {
      console.error('Error during checkout:', error)
    }
    */
  } catch (error) {
    console.error('Payment error:', error)
    loading.value = false
  }
}
</script>

<style scoped>
.af-btn-primary {
  @apply bg-[#FF5A5F] text-white rounded-lg px-5 py-2 transition hover:bg-opacity-90 disabled:opacity-70;
}
</style> 