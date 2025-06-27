import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePackUIStore } from '@/presentation/stores/PackUIStore'

describe('usePackUIStore', () => {
  let store: ReturnType<typeof usePackUIStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = usePackUIStore()
  })

  it('has default editMode as false', () => {
    expect(store.editMode).toBe(false)
  })

  it('toggleEditMode toggles editMode value', () => {
    expect(store.editMode).toBe(false)
    store.toggleEditMode()
    expect(store.editMode).toBe(true)
    store.toggleEditMode()
    expect(store.editMode).toBe(false)
  })

  it('setEditMode sets editMode to given value', () => {
    store.setEditMode(true)
    expect(store.editMode).toBe(true)
    store.setEditMode(false)
    expect(store.editMode).toBe(false)
  })
})
