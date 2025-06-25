<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/application/stores/CardStore'

const props = defineProps<{
  modelValue: boolean
  cardId: string | null
}>()

const emit = defineEmits(['update:modelValue'])

const modalRef = ref<HTMLDialogElement | null>(null)
const cardStore = useCardStore()
const { card, loading: cardLoading } = storeToRefs(cardStore)

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
      <div class="modal-action justify-center">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
