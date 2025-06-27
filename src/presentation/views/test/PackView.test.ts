import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import PackView from '@/presentation/views/PackView.vue'
import { nextTick } from 'vue'

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: 'pack-123' },
  }),
}))

const fetchPackById = vi.fn()

vi.mock('@/application/stores/PackStore', () => ({
  usePackStore: () => ({
    fetchPackById,
    loading: true,
    error: null,
    pack: null,
  }),
}))

vi.mock('@/application/stores/UserCollectionStore', () => ({
  useUserCollectionStore: () => ({
    isOwned: vi.fn(() => false),
    addCard: vi.fn(),
    removeCard: vi.fn(),
  }),
}))

vi.mock('@/presentation/stores/PackUIStore', () => ({
  usePackUIStore: () => ({
    editMode: false,
  }),
}))

vi.mock('@/presentation/components/CardModal.vue', () => ({
  default: { template: '<div />' },
}))
vi.mock('@/presentation/components/NoCardFound.vue', () => ({
  default: { template: '<div />' },
}))

describe('ComponentUnderTest', () => {
  beforeEach(() => {
    fetchPackById.mockReset()
  })

  it('calls fetchPackById on mount', async () => {
    shallowMount(PackView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })

    expect(fetchPackById).toHaveBeenCalledWith('pack-123')
  })

  it('shows skeletons when loading', async () => {
    const wrapper = shallowMount(PackView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })

    await nextTick()
    expect(wrapper.html()).toContain('skeleton')
  })
})
