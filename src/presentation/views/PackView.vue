<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { usePackStore } from '@/application/stores/PackStore'
import { useCardStore } from '@/application/stores/CardStore'

const modalRef = ref<HTMLDialogElement | null>(null)

const route = useRoute()
const packId = route.params.id as string

const packStore = usePackStore()
const cardStore = useCardStore()
const { card, loading: cardLoading } = storeToRefs(cardStore)

onMounted(() => {
  packStore.fetchPackById(packId)
})

function openModal(cardId: string) {
  cardStore.fetchCardById(cardId)
  modalRef.value?.showModal()
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

  <!-- Modal -->
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div v-if="cardLoading" class="h-100 w-full bg-gray-200 animate-pulse rounded-lg" />
      <img
        v-else
        :src="card?.image + '/high.png'"
        :alt="card?.name"
        class="object-contain h-100 md:max-h-full md:max-w-full mx-auto"
        :key="card?.id"
      />
      <div class="modal-action justify-center">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
