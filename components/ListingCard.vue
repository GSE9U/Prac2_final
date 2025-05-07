<template>
  <div class="bg-white dark:bg-zinc-800 rounded-xl shadow hover:shadow-lg transition p-0">
    <NuxtLink :to="`/listings/${listing.id}`">
      <img :src="listing.image || listing.img || 'https://placehold.co/400x300?text=Sin+Imagen'" class="rounded-t-xl aspect-video object-cover" />
    </NuxtLink>
    <div class="p-4">
      <h3 class="font-semibold text-lg">{{ listing.title || listing.name }}</h3>
      <div class="flex justify-between mt-2 text-sm text-zinc-500">
        <span>{{ listing.city }}</span>
        <span class="text-primary-600 font-bold">{{ listing.price }} €</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ 
  listing: { 
    id: string; 
    title?: string;
    name?: string;
    city: string; 
    price: number; 
    image?: string;
    img?: string;
    url?: string;
  }; 
}>()
</script>

<style scoped>
.text-primary-600 { 
  @apply text-[#FF5A5F]; 
}
</style> 