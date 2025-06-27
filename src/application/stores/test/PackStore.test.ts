import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// 1. Mock global functions
const mockGetPack = vi.fn()
const mockSearchCards = vi.fn()
const mockNotOwnedCards = vi.fn()

// 2. Mock dependencies BEFORE importing the store
vi.doMock('@/infrastructure/repositories-impl/PackRepositoryImpl', () => {
  return {
    PackRepositoryImpl: vi.fn(),
  }
})

vi.doMock('@/application/use-cases/PackUseCases', () => {
  return {
    GetPackByIdUseCase: vi.fn(() => ({ execute: mockGetPack })),
    SearchCardsInPackUseCase: vi.fn(() => ({ execute: mockSearchCards })),
    NotOwnedCardsInPackUseCase: vi.fn(() => ({ execute: mockNotOwnedCards })),
  }
})

describe('usePackStore', () => {
  let usePackStore: any

  beforeEach(async () => {
    setActivePinia(createPinia())
    mockGetPack.mockReset()
    mockSearchCards.mockReset()
    mockNotOwnedCards.mockReset()

    const storeModule = await import('@/application/stores/PackStore')
    usePackStore = storeModule.usePackStore
  })

  it('fetchPackById success', async () => {
    const mockPack = { id: 'pack-1', name: 'Awesome Pack' }
    mockGetPack.mockResolvedValue(mockPack)

    const store = usePackStore()
    await store.fetchPackById('pack-1')

    expect(store.pack).toEqual(mockPack)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('searchCardsInPack success', async () => {
    const searchedPack = { id: 'pack-1', cards: [{ id: 'c1' }, { id: 'c2' }] }
    mockSearchCards.mockResolvedValue(searchedPack)

    const store = usePackStore()
    await store.searchCardsInPack('pack-1', 'dragon')

    expect(store.pack).toEqual(searchedPack)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('fetchNotOwnedCardsInPack success', async () => {
    const notOwned = { id: 'pack-1', cards: [{ id: 'c3' }] }
    mockNotOwnedCards.mockResolvedValue(notOwned)

    const store = usePackStore()
    await store.fetchNotOwnedCardsInPack('pack-1', ['c1', 'c2'])

    expect(store.pack).toEqual(notOwned)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('fetchPackById failure', async () => {
    mockGetPack.mockRejectedValue(new Error('Get error'))

    const store = usePackStore()
    await store.fetchPackById('fail')

    expect(store.pack).toBe(null)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Get error')
  })

  it('searchCardsInPack failure', async () => {
    mockSearchCards.mockRejectedValue(new Error('Search error'))

    const store = usePackStore()
    await store.searchCardsInPack('id', 'term')

    expect(store.pack).toBe(null)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Search error')
  })

  it('fetchNotOwnedCardsInPack failure', async () => {
    mockNotOwnedCards.mockRejectedValue(new Error('Not owned error'))

    const store = usePackStore()
    await store.fetchNotOwnedCardsInPack('id', ['x'])

    expect(store.pack).toBe(null)
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Not owned error')
  })
})
