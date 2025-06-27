import { describe, it, expect, beforeEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { SeriesRepositoryImpl } from '@/infrastructure/repositories-impl/SeriesRepositoryImpl'
import { axiosInstance } from '@/infrastructure/config/api-config'

describe('SeriesRepositoryImpl', () => {
  let mock: MockAdapter
  let repository: SeriesRepositoryImpl

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance)
    repository = new SeriesRepositoryImpl()
  })

  it('should return series data when getSeriesById succeeds', async () => {
    const mockSeries = { id: '123', name: 'Base Set' }
    mock.onGet('/series/tcgp').reply(200, mockSeries)

    const result = await repository.getAllSeries()

    expect(result).toEqual(mockSeries)
  })

  it('should throw error when API call fails', async () => {
    mock.onGet('/series/tcgp').reply(500)

    await expect(repository.getAllSeries()).rejects.toThrow('Failed to fetch series')
  })
})
