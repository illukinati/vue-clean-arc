<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rarity?: string
}>()

const raritySymbol = computed(() => {
  const map: Record<string, string> = {
    'One Diamond': '◆',
    'Two Diamond': '◆◆',
    'Three Diamond': '◆◆◆',
    'Four Diamond': '◆◆◆◆',
    'One Star': '⭐️',
    'Two Star': '⭐️⭐️',
    'Three Star': '⭐️⭐️⭐️',
    'Crown': '👑',
  }
  return map[props.rarity ?? '']
})
</script>

<template>
  <p>{{ raritySymbol }}</p>
</template>
