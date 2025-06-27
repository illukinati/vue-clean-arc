// tests/unit/components/CardModal.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CardModal from '@/presentation/components/CardModal.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserCollectionStore } from '@/application/stores/UserCollectionStore'

const defaultProps = {
  modelValue: true,
  cardId: 'abc123',
}

const fakeCard = {
  id: 'abc123',
  name: 'Pikachu',
  image: 'https://example.com/pikachu',
}

describe('CardModal.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // -------------------------
  // UNIT TESTS
  // -------------------------
  it('calls addCard when clicking "Add to collection"', async () => {
    const wrapper = mount(CardModal, {
      props: defaultProps,
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              card: {
                card: { id: 'abc123', image: 'https://example.com/img' },
                loading: false,
              },
              userCollection: { ownedCardIds: [] },
            },
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    const store = useUserCollectionStore()
    vi.spyOn(store, 'addCard')

    await wrapper.get('button.btn.mt-2').trigger('click')

    expect(store.addCard).toHaveBeenCalledWith('abc123')
  })

  it('calls removeCard when clicking "Remove from collection"', async () => {
    const wrapper = mount(CardModal, {
      props: defaultProps,
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              card: {
                card: { id: 'abc123', image: 'https://example.com/img' },
                loading: false,
              },
              userCollection: { ownedCardIds: ['abc123'] },
            },
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    const userCollectionStore = useUserCollectionStore()
    vi.spyOn(userCollectionStore, 'removeCard')

    await wrapper.get('button.btn.mt-2').trigger('click')

    expect(userCollectionStore.removeCard).toHaveBeenCalledWith('abc123')
  })

  // -------------------------
  // COMPONENT TESTS
  // -------------------------
  it('renders modal with loading when card is loading', () => {
    const wrapper = mount(CardModal, {
      props: defaultProps,
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              card: { card: null, loading: true },
              userCollection: { ownedCardIds: [] },
            },
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
  })

  it('renders card image when loading is false', async () => {
    const wrapper = mount(CardModal, {
      props: defaultProps,
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              card: {
                card: { id: 'abc123', image: 'https://example.com/img' },
                loading: false,
              },
              userCollection: { ownedCardIds: [] },
            },
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    expect(wrapper.find('img').attributes('src')).toContain('https://example.com/img/low.png')
  })

  // -------------------------
  // INTEGRATION TESTS
  // -------------------------
  it('renders and interacts with stores correctly', async () => {
    const addCardMock = vi.fn()
    const isOwnedMock = vi.fn().mockReturnValue(false)

    const wrapper = mount(CardModal, {
      props: {
        modelValue: true,
        cardId: 'abc123',
      },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              card: {
                card: fakeCard,
                loading: false,
              },
              userCollection: {
                ownedCardIds: [],
              },
            },
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    const userCollectionStore = useUserCollectionStore()
    userCollectionStore.addCard = addCardMock
    userCollectionStore.isOwned = isOwnedMock

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toContain('pikachu')

    await wrapper.get('button.btn.mt-2').trigger('click')
    expect(addCardMock).toHaveBeenCalledWith('abc123')
  })
})
