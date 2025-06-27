import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rarity from '@/presentation/components/Rarity.vue'

describe('Rarity.vue', () => {
  it('renders correct symbol based on rarity prop', () => {
    const testCases = [
      { rarity: 'One Diamond', expected: '◆' },
      { rarity: 'Two Diamond', expected: '◆◆' },
      { rarity: 'Three Diamond', expected: '◆◆◆' },
      { rarity: 'Four Diamond', expected: '◆◆◆◆' },
      { rarity: 'One Star', expected: '⭐️' },
      { rarity: 'Two Star', expected: '⭐️⭐️' },
      { rarity: 'Three Star', expected: '⭐️⭐️⭐️' },
      { rarity: 'Crown', expected: '👑' },
      { rarity: undefined, expected: '' },
      { rarity: 'Unknown', expected: undefined },
    ]

    testCases.forEach(({ rarity, expected }) => {
      const wrapper = mount(Rarity, { props: { rarity } })
      expect(wrapper.text()).toBe(expected ?? '')
    })
  })
})
