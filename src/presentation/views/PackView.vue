<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePackStore } from '@/application/stores/PackStore'
import { useCardStore } from '@/application/stores/CardStore'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const modalRef = ref<HTMLDialogElement | null>(null)

const cardStore = useCardStore()
const { card } = storeToRefs(cardStore)

function openModal(packId: string) {
  cardStore.fetchCardById(packId)
  modalRef.value?.showModal()
}

const route = useRoute()
const packId = route.params.id as string

const packStore = usePackStore()

onMounted(() => {
  packStore.fetchPackById(packId)
  console.log('Pack ID:', packId)
})
</script>

<template>
  <!-- Skeleton loading view -->
  <section>
    <div v-if="packStore.loading">
      <ul class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
        <li v-for="i in 100" :key="i">
          <div class="skeleton bg-gray-200 animate-pulse w-48 h-48 mx-auto object-contain"></div>
        </li>
      </ul>
    </div>
  </section>

  <div class="min-h-screen" v-if="packStore.error">{{ packStore.error }}</div>

  <!-- Cards view -->
  <section class="mx-auto">
    <ul
      v-if="packStore.pack?.cards"
      class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4"
    >
      <li v-for="card in packStore.pack.cards" :key="card.id">
        <!-- <RouterLink :to="`/card/${card.id}`"> -->
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
        <!-- </RouterLink> -->
      </li>
    </ul>
  </section>

  <!-- Modal -->
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="h-100 w-full bg-gray-200 animate-pulse rounded-lg" v-if="cardStore.loading" />

      <img
        v-else
        :src="card?.image + '/high.png'"
        alt="Sample Image"
        :key="card?.id"
        class="object-contain h-100 md:max-h-full md:max-w-full mx-auto"
      />

      <div class="modal-action items-center justify-center flex">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
