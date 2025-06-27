import { defineStore } from 'pinia'

export const useUserCollectionStore = defineStore('userCollection', {
  state: () => ({
    ownedCardIds: [] as string[],
  }),
  actions: {
    addCard(id: string) {
      if (!this.ownedCardIds.includes(id)) {
        this.ownedCardIds.push(id)
      }
    },
    removeCard(id: string) {
      this.ownedCardIds = this.ownedCardIds.filter((cardId) => cardId !== id)
    },
    isOwned(id: string): boolean {
      return this.ownedCardIds.includes(id)
    },
  },
  persist: true,
})
