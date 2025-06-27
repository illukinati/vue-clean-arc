// tests/Navbar.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import NavBar from '@/presentation/components/NavBar.vue'
import { usePackStore } from '@/application/stores/PackStore'
import { useUserCollectionStore } from '@/application/stores/UserCollectionStore'
import { usePackUIStore } from '@/presentation/stores/PackUIStore'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

// Mock router for useRoute() usage
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div />' } },
    { path: '/pack/:id', name: 'pack', component: { template: '<div />' } },
  ],
})

describe('Navbar.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    wrapper = mount(NavBar, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              pack: { pack: null, loading: false, error: null },
              userCollection: { ownedCardIds: [] },
              packUI: { editMode: false },
            },
            stubActions: false,
          }),
        ],
      },
    })
    await router.push('/pack/123')
    await router.isReady()
  })

  // -------------------------
  // UNIT TESTS
  // -------------------------
  it('computed insidePack returns true when route is /pack/:id', () => {
    // insidePack computed depends on route.path.startsWith('/pack/')
    expect(wrapper.vm.insidePack).toBe(true)
  })

  it('searchCards calls packStore.searchCardsInPack with correct params', () => {
    const packStore = usePackStore()
    const spy = vi.spyOn(packStore, 'searchCardsInPack')
    wrapper.vm.searchCards('pikachu')
    expect(spy).toHaveBeenCalledWith('123', 'pikachu')
  })

  it('fetchNotOwnedCards calls packStore.fetchNotOwnedCardsInPack with correct params', () => {
    const packStore = usePackStore()
    const userCollectionStore = useUserCollectionStore()
    const spy = vi.spyOn(packStore, 'fetchNotOwnedCardsInPack')
    wrapper.vm.fetchNotOwnedCards()
    expect(spy).toHaveBeenCalledWith('123', userCollectionStore.ownedCardIds)
  })

  it('toggleEditCollection calls packUIStore.toggleEditMode', () => {
    const packUIStore = usePackUIStore()
    const spy = vi.spyOn(packUIStore, 'toggleEditMode')
    wrapper.vm.toggleEditCollection()
    expect(spy).toHaveBeenCalled()
  })

  // -------------------------
  // COMPONENT TESTS
  // -------------------------
  it('renders navbar brand text', () => {
    expect(wrapper.find('.btn.btn-ghost.text-xl').text()).toBe('TCG Pocket')
  })

  it('shows search input and buttons only if insidePack is true', async () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('img[alt="all-cards"]').exists()).toBe(true)
    expect(wrapper.find('img[alt="all-cards"]').exists()).toBe(true)

    await router.push('/')
    await router.isReady()
    await nextTick()

    expect(wrapper.find('input[type="text"]').exists()).toBe(false)
    expect(wrapper.find('img[alt="all-cards"]').exists()).toBe(false)
  })

  // -------------------------
  // INTEGRATION TESTS
  // -------------------------
  it('typing in input triggers onInput and calls searchCards if >= 3 chars', async () => {
    const packStore = usePackStore()
    const spySearch = vi.spyOn(packStore, 'searchCardsInPack')

    const input = wrapper.find('input[type="text"]')
    await input.setValue('pi')
    expect(spySearch).not.toHaveBeenCalled()

    await input.setValue('pik')
    expect(spySearch).toHaveBeenCalledWith('123', 'pik')
  })

  it('clicking all-cards img calls searchCards with empty string', async () => {
    const searchSpy = vi.spyOn(wrapper.vm, 'searchCards')
    const btn = wrapper.find('img[alt="all-cards"]')
    await btn.trigger('click')
    expect(searchSpy).toHaveBeenCalledWith('')
  })

  it('clicking not-owned-cards img calls fetchNotOwnedCards', async () => {
    const packStore = usePackStore()
    const spyNotOwned = vi.spyOn(packStore, 'fetchNotOwnedCardsInPack')

    const btn = wrapper.find('img[alt="all-cards"]').element.nextElementSibling
    if (btn) {
      await btn.dispatchEvent(new Event('click'))
    }
    expect(spyNotOwned).toHaveBeenCalled()
  })
})
