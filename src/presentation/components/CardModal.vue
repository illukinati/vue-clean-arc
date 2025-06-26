<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/application/stores/CardStore'
import { useUserCollectionStore } from '@/application/stores/UserCollectionStore'

const props = defineProps<{
  modelValue: boolean
  cardId: string | null
}>()

const emit = defineEmits(['update:modelValue'])

const modalRef = ref<HTMLDialogElement | null>(null)
const cardStore = useCardStore()
const { card, loading: cardLoading } = storeToRefs(cardStore)

const collectionStore = useUserCollectionStore()

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      if (props.cardId) {
        cardStore.fetchCardById(props.cardId)
      }
      modalRef.value?.showModal()
    } else {
      modalRef.value?.close()
    }
  },
)

function handleAdd(id: string) {
  collectionStore.addCard(id)
  closeModal() // tutup modal
}

function handleRemove(id: string) {
  collectionStore.removeCard(id)
  closeModal() // tutup modal
}

function closeModal() {
  emit('update:modelValue', false)
}
</script>

<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle" @close="closeModal">
    <div class="modal-box">
      <div v-if="cardLoading" class="h-100 w-full bg-gray-200 animate-pulse rounded-lg" />
      <img
        v-else
        :src="card?.image + '/low.png'"
        :alt="card?.name"
        class="object-contain h-100 md:max-h-full md:max-w-full mx-auto"
        :key="card?.id"
      />

      <div class="modal-action justify-center flex flex-col gap-2">
        <button
          class="btn mt-2"
          v-if="collectionStore.isOwned(card?.id ?? '')"
          @click="handleRemove(card?.id ?? '')"
        >
          Remove from collection
        </button>
        <button class="btn mt-2" v-else @click="handleAdd(card?.id ?? '')">
          Add to collection
        </button>
        <form method="dialog">
          <button class="btn w-full">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
