<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePackStore } from '@/application/stores/PackStore'
import CardModal from '@/presentation/components/CardModal.vue'
import NoCardFound from '@/presentation/components/NoCardFound.vue'

const route = useRoute()
const packId = route.params.id as string

const packStore = usePackStore()

const isModalOpen = ref(false)
const selectedCardId = ref<string | null>(null)

onMounted(() => {
  packStore.fetchPackById(packId)
})

function openModal(cardId: string) {
  selectedCardId.value = cardId
  isModalOpen.value = true
}
</script>

<template>
  <!-- Skeleton -->
  <section v-if="packStore.loading">
    <ul class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
      <li v-for="i in 100" :key="i">
        <div class="skeleton bg-gray-200 animate-pulse w-48 h-48 mx-auto object-contain" />
      </li>
    </ul>
  </section>

  <!-- Error -->
  <div v-else-if="packStore.error" class="min-h-screen text-center py-8 text-red-500">
    {{ packStore.error }}
  </div>

  <!-- Cards -->
  <section v-else class="mx-auto">
    <ul class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
      <li v-for="card in packStore.pack?.cards" :key="card.id">
        <img
          v-if="card.image"
          :src="card.image + '/low.png'"
          alt="Card Image"
          class="w-48 h-48 mx-auto object-contain cursor-pointer"
          @click="openModal(card.id)"
        />
        <h1 v-else class="text-center text-lg font-bold">
          {{ card.name }}
        </h1>
      </li>
    </ul>
  </section>

  <!-- No Cards Found -->
  <NoCardFound v-if="packStore.pack?.cards.length === 0" />

  <!-- Panggil modal -->
  <CardModal v-model="isModalOpen" :cardId="selectedCardId" />
</template>
