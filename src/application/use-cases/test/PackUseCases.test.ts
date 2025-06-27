import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Pack } from '@/domain/entities/Pack'
import type { PackRepository } from '@/domain/repositories/PackRepository'
import {
  GetPackByIdUseCase,
  SearchCardsInPackUseCase,
  NotOwnedCardsInPackUseCase,
} from '@/application/use-cases/PackUseCases'

describe('Pack Use Cases', () => {
  let mockRepo: PackRepository
  let mockGetPackById: ReturnType<typeof vi.fn>

  const dummyPack: Pack = {
    id: 'pack1',
    name: 'Test Pack',
    cards: [
      {
        id: 'card1',
        name: 'Fire Dragon',
        image: '',
        localeId: '',
      },
      {
        id: 'card2',
        name: 'Water Phoenix',
        image: '',
        localeId: '',
      },
      {
        id: 'card3',
        name: 'Earth Golem',
        image: '',
        localeId: '',
      },
    ],
    cardCount: {
      firstEd: 0,
      holo: 0,
      normal: 0,
      official: 0,
      reverse: 0,
      total: 0,
    },
    releaseDate: '',
    boosters: [],
  }

  beforeEach(() => {
    mockGetPackById = vi.fn()
    mockRepo = { getPackById: mockGetPackById }
  })

  it('GetPackByIdUseCase returns pack', async () => {
    mockGetPackById.mockResolvedValue(dummyPack)

    const useCase = new GetPackByIdUseCase(mockRepo)
    const result = await useCase.execute('pack1')

    expect(result).toEqual(dummyPack)
    expect(mockGetPackById).toHaveBeenCalledWith('pack1')
  })

  it('SearchCardsInPackUseCase filters cards by name', async () => {
    mockGetPackById.mockResolvedValue(dummyPack)

    const useCase = new SearchCardsInPackUseCase(mockRepo)
    const result = await useCase.execute('pack1', 'Fire')

    expect(result?.cards).toEqual([{ id: 'card1', image: '', localeId: '', name: 'Fire Dragon' }])
  })

  it('NotOwnedCardsInPackUseCase filters out owned cards', async () => {
    mockGetPackById.mockResolvedValue(dummyPack)

    const useCase = new NotOwnedCardsInPackUseCase(mockRepo)
    const result = await useCase.execute('pack1', ['card2'])

    expect(result?.cards).toEqual([
      { id: 'card1', image: '', localeId: '', name: 'Fire Dragon' },
      { id: 'card3', image: '', localeId: '', name: 'Earth Golem' },
    ])
  })

  it('should throw error if getPackById throws', async () => {
    mockGetPackById.mockRejectedValue(new Error('DB error'))

    const getUseCase = new GetPackByIdUseCase(mockRepo)
    await expect(getUseCase.execute('x')).rejects.toThrow('Failed to fetch pack by ID')

    const searchUseCase = new SearchCardsInPackUseCase(mockRepo)
    await expect(searchUseCase.execute('x', 'dragon')).rejects.toThrow(
      'Failed to search cards in pack',
    )

    const notOwnedUseCase = new NotOwnedCardsInPackUseCase(mockRepo)
    await expect(notOwnedUseCase.execute('x', ['card1'])).rejects.toThrow(
      'Failed to filter not owned cards in pack',
    )
  })

  it('should return null if pack not found', async () => {
    mockGetPackById.mockResolvedValue(null)

    const searchUseCase = new SearchCardsInPackUseCase(mockRepo)
    await expect(searchUseCase.execute('pack404', 'dragon')).rejects.toThrow(
      'Failed to search cards in pack',
    )

    const notOwnedUseCase = new NotOwnedCardsInPackUseCase(mockRepo)
    await expect(notOwnedUseCase.execute('pack404', [])).rejects.toThrow(
      'Failed to filter not owned cards in pack',
    )
  })
})
