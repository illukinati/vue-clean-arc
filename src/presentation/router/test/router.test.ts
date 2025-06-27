import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import router from '@/presentation/router'
import HomeView from '@/presentation/views/HomeView.vue'
import PackView from '@/presentation/views/PackView.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Vue Router', () => {
  beforeEach(async () => {
    router.push('/')
    await router.isReady()
  })

  it('navigates to HomeView on path "/"', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })

    expect(wrapper.html()).toContain('')
  })

  it('navigates to PackView on path "/pack/:id"', async () => {
    router.push('/pack/abc123')
    await router.isReady()

    const wrapper = mount(PackView, {
      global: {
        plugins: [router, createTestingPinia({ createSpy: vi.fn })],
      },
    })

    expect(wrapper.html()).toContain('')
  })
})
