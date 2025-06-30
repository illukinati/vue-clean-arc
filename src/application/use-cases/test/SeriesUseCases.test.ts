import { describe, it, expect, vi } from 'vitest'
import { GetAllSeriesUseCase } from '@/application/use-cases/SeriesUseCases'
import type { SeriesRepository } from '@/domain/repositories/SeriesRepository'
import type { Series } from '@/domain/entities/Series'

describe('GetAllSeriesUseCase', () => {
  it('should return series when repository resolves successfully', async () => {
    const mockSeries: Series[] = [
      {
        id: '1',
        logo: 'logo1.png',
        name: 'Series A',
        releaseDate: '2020-01-01',
        sets: [{ id: 'set1', name: 'Set 1' }],
      },
      {
        id: '2',
        logo: 'logo2.png',
        name: 'Series B',
        releaseDate: '2021-01-01',
        sets: [{ id: 'set2', name: 'Set 2' }],
      },
    ]

    const mockRepo: SeriesRepository = {
      getAllSeries: vi.fn().mockResolvedValue(mockSeries),
    }

    const useCase = new GetAllSeriesUseCase(mockRepo)

    // Act
    const result = await useCase.execute()

    // Assert
    expect(mockRepo.getAllSeries).toHaveBeenCalled()
    expect(result).toEqual(mockSeries)
  })

  it('should throw error with custom message when repository fails', async () => {
    // Arrange
    const mockRepo: SeriesRepository = {
      getAllSeries: vi.fn().mockRejectedValue(new Error('DB error')),
    }

    const useCase = new GetAllSeriesUseCase(mockRepo)

    // Act + Assert
    await expect(useCase.execute()).rejects.toThrow('Failed to fetch series')
  })
})
