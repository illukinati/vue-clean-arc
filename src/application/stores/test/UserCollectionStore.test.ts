import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserCollectionStore } from '@/application/stores/UserCollectionStore'

describe('useUserCollectionStore', () => {
  let store: ReturnType<typeof useUserCollectionStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useUserCollectionStore()
  })

  it('should add a card id if not already owned', () => {
    expect(store.ownedCardIds).toEqual([])

    store.addCard('abc123')
    expect(store.ownedCardIds).toContain('abc123')

    store.addCard('abc123')
    expect(store.ownedCardIds).toEqual(['abc123'])
  })

  it('should remove a card id if owned', () => {
    store.addCard('abc123')
    store.addCard('xyz789')

    store.removeCard('abc123')
    expect(store.ownedCardIds).toEqual(['xyz789'])

    store.removeCard('not-exist') // should not throw
    expect(store.ownedCardIds).toEqual(['xyz789'])
  })

  it('should check if a card id is owned', () => {
    store.addCard('cardA')
    expect(store.isOwned('cardA')).toBe(true)
    expect(store.isOwned('cardB')).toBe(false)
  })
})
