import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import HomeView from '@/presentation/views/HomeView.vue'

describe('SeriesView', () => {
  let fetchSeriesMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchSeriesMock = vi.fn()
  })

  it('shows loading state', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              series: {
                loading: true,
              },
            },
            createSpy: () => fetchSeriesMock,
          }),
        ],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Loading...')
  })

  it('shows error state', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              series: {
                error: 'Something went wrong',
              },
            },
            createSpy: () => fetchSeriesMock,
          }),
        ],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Something went wrong')
  })

  it('calls fetchSeries on mount', () => {
    mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: () => fetchSeriesMock,
          }),
        ],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(fetchSeriesMock).toHaveBeenCalled()
  })
})
