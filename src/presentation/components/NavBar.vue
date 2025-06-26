<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { usePackStore } from '@/application/stores/PackStore'

const route = useRoute()
const showSearch = computed(() => route.path.startsWith('/pack/'))

const packStore = usePackStore()
const packId = route.params.id as string

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  if (value.length >= 3) {
    searchCards(value)
  } else if (value.length === 0) {
    packStore.fetchPackById(packId)
  }
}

function searchCards(query: string) {
  packStore.searchCardsInPack(packId, query)
}
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Pokemon TCG Pocket</a>
    </div>
    <div class="flex gap-2">
      <input
        v-if="showSearch"
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
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
