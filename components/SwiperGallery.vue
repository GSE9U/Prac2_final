<template>
  <div class="relative rounded-xl overflow-hidden">
    <ClientOnly>
      <swiper-container ref="swiperRef" class="w-full">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img 
            :src="image" 
            :alt="`Image ${index + 1}`" 
            class="w-full h-full object-cover" 
          />
        </swiper-slide>
      </swiper-container>

      <!-- Navigation buttons -->
      <div class="absolute inset-y-0 left-0 flex items-center">
        <button 
          @click="prevSlide" 
          class="bg-white/60 hover:bg-white/80 p-2 rounded-r-lg shadow"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <button 
          @click="nextSlide" 
          class="bg-white/60 hover:bg-white/80 p-2 rounded-l-lg shadow"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true
  },
  height: {
    type: String,
    default: '400px'
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  delay: {
    type: Number,
    default: 3000
  }
})

const swiperRef = ref(null)
const swiper = ref(null)

function nextSlide() {
  if (swiper.value) {
    swiper.value.slideNext()
  }
}

function prevSlide() {
  if (swiper.value) {
    swiper.value.slidePrev()
  }
}

onMounted(() => {
  // Initialize the swiper instance when component is mounted
  setTimeout(() => {
    if (swiperRef.value) {
      swiper.value = swiperRef.value.swiper
      
      // Configure swiper options
      if (props.autoplay) {
        swiper.value.params.autoplay = {
          delay: props.delay,
          disableOnInteraction: false
        }
        swiper.value.autoplay.start()
      }
    }
  }, 100)
})
</script>

<style scoped>
swiper-container {
  height: v-bind("height");
  border-radius: 0.75rem;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 