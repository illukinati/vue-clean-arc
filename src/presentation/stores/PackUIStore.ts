import { defineStore } from 'pinia'

export const usePackUIStore = defineStore('packUI', {
  state: () => ({
    editMode: false,
  }),
  actions: {
    toggleEditMode() {
      this.editMode = !this.editMode
    },
    setEditMode(value: boolean) {
      this.editMode = value
    },
  },
})
