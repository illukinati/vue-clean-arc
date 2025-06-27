import { describe, it, expect, beforeEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { PackRepositoryImpl } from '@/infrastructure/repositories-impl/PackRepositoryImpl'
import { axiosInstance } from '@/infrastructure/config/api-config'

describe('PackRepositoryImpl', () => {
  let mock: MockAdapter
  let repository: PackRepositoryImpl

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance)
    repository = new PackRepositoryImpl()
  })

  it('should return pack data when getPackById succeeds', async () => {
    const mockPack = { id: '123', name: 'Base Set' }
    mock.onGet('/sets/123').reply(200, mockPack)

    const result = await repository.getPackById('123')

    expect(result).toEqual(mockPack)
  })

  it('should throw error when getPackById fails', async () => {
    mock.onGet('/sets/123').reply(500)

    await expect(repository.getPackById('123')).rejects.toThrow('Failed to fetch pack by ID')
  })
})
