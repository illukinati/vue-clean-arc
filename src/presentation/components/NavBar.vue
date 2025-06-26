<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { usePackStore } from '@/application/stores/PackStore'
import { useUserCollectionStore } from '@/application/stores/UserCollectionStore'
import { usePackUIStore } from '@/presentation/stores/PackUIStore'

const route = useRoute()
const insidePack = computed(() => route.path.startsWith('/pack/'))

const packStore = usePackStore()
const userCollectionStore = useUserCollectionStore()
const packUIStore = usePackUIStore()
const packId = computed(() => route.params.id as string | '')

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  if (value.length >= 3) {
    searchCards(value)
  } else if (value.length === 0) {
    packStore.fetchPackById(packId.value)
  }
}

function searchCards(query: string) {
  packStore.searchCardsInPack(packId.value, query)
}

function fetchNotOwnedCards() {
  packStore.fetchNotOwnedCardsInPack(packId.value, userCollectionStore.ownedCardIds)
}

function toggleEditCollection() {
  packUIStore.toggleEditMode()
}
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">TCG Pocket</a>
    </div>
    <div class="flex gap-2">
      <img
        v-if="insidePack"
        src="/images/all-cards.png"
        alt="all-cards"
        class="w-18 h-10 btn"
        @click="searchCards('')"
      />
      <img
        v-if="insidePack"
        src="/images/not-owned-cards.png"
        alt="all-cards"
        class="w-18 h-10 btn"
        @click="fetchNotOwnedCards"
      />

      <input
        v-if="insidePack"
        type="text"
        placeholder="Search"
        class="input input-bordered w-24 md:w-auto"
        @input="onInput"
      />
      <div class="dropdown dropdown-end">
        <div tabIndex="{0}" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="/images/pokeball.png" />
          </div>
        </div>
        <ul
          tabIndex="{0}"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <!-- <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li> -->
          <li><a @click="toggleEditCollection">Edit collection</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
