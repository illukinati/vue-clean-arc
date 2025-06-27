import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// Global mock function
const mockExecute = vi.fn()

// Mock repo
vi.doMock('@/infrastructure/repositories-impl/SeriesRepositoryImpl', () => {
  return {
    SeriesRepositoryImpl: vi.fn(),
  }
})

// Mock use case
vi.doMock('@/application/use-cases/SeriesUseCases', () => {
  return {
    GetAllSeriesUseCase: vi.fn(() => ({
      execute: mockExecute,
    })),
  }
})

describe('useSeriesStore', () => {
  let useSeriesStore: any

  beforeEach(async () => {
    setActivePinia(createPinia())
    mockExecute.mockReset()

    const storeModule = await import('@/application/stores/SeriesStore')
    useSeriesStore = storeModule.useSeriesStore
  })

  it('fetchSeries success', async () => {
    const mockData = { id: 'series-1', title: 'Mock Series' }
    mockExecute.mockResolvedValue(mockData)

    const store = useSeriesStore()
    await store.fetchSeries()

    expect(store.loading).toBe(false)
    expect(store.series).toEqual(mockData)
    expect(store.error).toBe(null)
  })

  it('fetchSeries failure', async () => {
    mockExecute.mockRejectedValue(new Error('Series fetch failed'))

    const store = useSeriesStore()
    await store.fetchSeries()

    expect(store.loading).toBe(false)
    expect(store.series).toBe(null)
    expect(store.error).toBe('Series fetch failed')
  })
})
