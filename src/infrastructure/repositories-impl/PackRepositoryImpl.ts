import { axiosInstance } from '@/infrastructure/config/api-config'
import type { PackRepository } from '@/domain/repositories/PackRepository'
import type { Pack } from '@/domain/entities/Pack'

export class PackRepositoryImpl implements PackRepository {
  async getPackById(id: string): Promise<Pack | null> {
    try {
      const response = await axiosInstance.get(`/sets/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching pack by ID:', error)
      throw new Error('Failed to fetch pack by ID')
    }
  }
}
