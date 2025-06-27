import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

const mockExecute = vi.fn()

vi.doMock('@/infrastructure/repositories-impl/CardRepositoryImpl', () => {
  return {
    CardRepositoryImpl: vi.fn(),
  }
})

vi.doMock('@/application/use-cases/CardUseCases', () => {
  return {
    GetCardByIdUseCase: vi.fn(() => ({
      execute: mockExecute,
    })),
  }
})

describe('useCardStore', () => {
  let useCardStore: any

  beforeEach(async () => {
    setActivePinia(createPinia())
    mockExecute.mockReset()

    const storeModule = await import('@/application/stores/CardStore')
    useCardStore = storeModule.useCardStore
  })

  it('fetchCardById success', async () => {
    const mockCard = { id: '1', name: 'Test Card' }
    mockExecute.mockResolvedValue(mockCard)

    const store = useCardStore()
    await store.fetchCardById('1')

    expect(store.loading).toBe(false)
    expect(store.card).toEqual(mockCard)
    expect(store.error).toBe(null)
  })

  it('fetchCardById failure', async () => {
    mockExecute.mockRejectedValue(new Error('Fetch error'))

    const store = useCardStore()
    await store.fetchCardById('2')

    expect(store.loading).toBe(false)
    expect(store.card).toBe(null)
    expect(store.error).toBe('Fetch error')
  })
})
