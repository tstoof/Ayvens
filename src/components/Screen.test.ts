import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Screen from './Screen.vue'

describe('Screen.vue', () => {
  let setResult: ReturnType<typeof vi.fn>

  beforeEach(() => {
    setResult = vi.fn()
  })

  it('renders input with correct value', () => {
    const wrapper = mount(Screen, {
      props: {
        result: '1+2',
        showNumber: '3',
        setResult,
        buttonsDisabled: false
      }
    })

    const input = wrapper.get('input')
    expect(input.element.value).toBe('3')
  })

  it('disables input when buttonsDisabled is true', () => {
    const wrapper = mount(Screen, {
      props: {
        result: '',
        showNumber: '',
        setResult,
        buttonsDisabled: true
      }
    })

    const input = wrapper.get('input')
    expect(input.element.disabled).toBe(true)
  })

  it('calls setResult on input change (with comma replaced)', async () => {
    const wrapper = mount(Screen, {
      props: {
        result: '',
        showNumber: '',
        setResult,
        buttonsDisabled: false
      }
    })

    const input = wrapper.get('input')
    await input.setValue('12,5') 

    expect(setResult).toHaveBeenCalledWith('12.5') 
  })

  it('evaluates result on Enter key and updates via setResult', async () => {
    const wrapper = mount(Screen, {
      props: {
        result: '2+3',
        showNumber: '',
        setResult,
        buttonsDisabled: false
      }
    })

    const input = wrapper.get('input')
    await input.trigger('keyup.enter')

    expect(setResult).toHaveBeenCalledWith('5')
  })

  it('handles invalid expression with Error fallback and resets after timeout', async () => {
    vi.useFakeTimers()

    const wrapper = mount(Screen, {
      props: {
        result: '2++3',
        showNumber: '',
        setResult,
        buttonsDisabled: false
      }
    })

    const input = wrapper.get('input')
    await input.trigger('keyup.enter')

    expect(setResult).toHaveBeenCalledWith('Error')

    // Fast-forward 1000ms timer
    vi.advanceTimersByTime(1000)

    expect(setResult).toHaveBeenCalledWith('0')

    vi.useRealTimers()
  })
})
