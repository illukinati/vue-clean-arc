import { describe, it, expect, beforeEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'

import { CardRepositoryImpl } from '@/infrastructure/repositories-impl/CardRepositoryImpl'
import { axiosInstance } from '@/infrastructure/config/api-config'

describe('CardRepositoryImpl', () => {
  let mock: MockAdapter
  let repository: CardRepositoryImpl

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance)
    repository = new CardRepositoryImpl()
  })

  it('should return card data when getCardById succeeds', async () => {
    const mockCard = { id: '123', name: 'Pikachu' }
    mock.onGet('/cards/123').reply(200, mockCard)

    const result = await repository.getCardById('123')

    expect(result).toEqual(mockCard)
  })

  it('should throw error when getCardById fails', async () => {
    mock.onGet('/cards/123').reply(500)

    await expect(repository.getCardById('123')).rejects.toThrow('Failed to fetch card by ID')
  })
})
