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

  async getPacksBySeries(seriesId: string): Promise<Pack[]> {
    try {
      const response = await axiosInstance.get(`/packs/series/${seriesId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching packs by series:', error)
      throw new Error('Failed to fetch packs by series')
    }
  }

  async searchPacks(query: string): Promise<Pack[]> {
    try {
      const response = await axiosInstance.get(`/packs/search`, { params: { q: query } })
      return response.data
    } catch (error) {
      console.error('Error searching packs:', error)
      throw new Error('Failed to search packs')
    }
  }

  async getAllPacks(): Promise<Pack[]> {
    try {
      const response = await axiosInstance.get('/packs')
      return response.data
    } catch (error) {
      console.error('Error fetching all packs:', error)
      throw new Error('Failed to fetch all packs')
    }
  }
}
