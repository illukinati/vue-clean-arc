import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NoCardFound from '@/presentation/components/NoCardFound.vue'

describe('EmptyCardView.vue', () => {
  it('renders image and heading correctly', () => {
    const wrapper = mount(NoCardFound)

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/images/empty%20pokeball.png')
    expect(img.attributes('alt')).toBe('empty pokeball')

    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toBe('card not found!')
  })

  it('has correct container classes for centering', () => {
    const wrapper = mount(NoCardFound)
    const div = wrapper.find('div')

    expect(div.classes()).toContain('h-[calc(100vh-64px)]')
    expect(div.classes()).toContain('w-screen')
    expect(div.classes()).toContain('flex')
    expect(div.classes()).toContain('flex-col')
    expect(div.classes()).toContain('items-center')
    expect(div.classes()).toContain('justify-center')
    expect(div.classes()).toContain('text-center')
  })
})
