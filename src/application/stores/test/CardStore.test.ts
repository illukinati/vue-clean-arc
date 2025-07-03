// Test suite for CardStore Pinia store
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// Mock function to simulate use case execution
const mockExecute = vi.fn()

// Mock CardRepositoryImpl to isolate store testing from infrastructure layer
vi.doMock('@/infrastructure/repositories-impl/CardRepositoryImpl', () => {
  return {
    CardRepositoryImpl: vi.fn(),
  }
})

// Mock CardUseCases to control use case behavior in tests
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
    // Set up fresh Pinia instance for each test
    setActivePinia(createPinia())
    // Reset mock to ensure clean state between tests
    mockExecute.mockReset()

    // Dynamically import store to ensure mocks are applied
    const storeModule = await import('@/application/stores/CardStore')
    useCardStore = storeModule.useCardStore
  })

  it('fetchCardById success', async () => {
    // Arrange: Set up mock card data and successful response
    const mockCard = { id: '1', name: 'Test Card' }
    mockExecute.mockResolvedValue(mockCard)

    // Act: Call fetchCardById with test ID
    const store = useCardStore()
    await store.fetchCardById('1')

    // Assert: Verify store state after successful fetch
    expect(store.loading).toBe(false)
    expect(store.card).toEqual(mockCard)
    expect(store.error).toBe(null)
  })

  it('fetchCardById failure', async () => {
    // Arrange: Set up mock to simulate fetch error
    mockExecute.mockRejectedValue(new Error('Fetch error'))

    // Act: Call fetchCardById with test ID
    const store = useCardStore()
    await store.fetchCardById('2')

    // Assert: Verify store state after failed fetch
    expect(store.loading).toBe(false)
    expect(store.card).toBe(null)
    expect(store.error).toBe('Fetch error')
  })
})
