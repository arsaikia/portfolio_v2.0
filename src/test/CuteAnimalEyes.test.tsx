import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CuteAnimalEyes from '../components/CuteAnimalEyes'

let reducedMotion = false
let onMotionChange: (() => void) | undefined

beforeEach(() => {
  reducedMotion = false
  onMotionChange = undefined
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    get matches() { return reducedMotion },
    addEventListener: (_type: string, listener: () => void) => { onMotionChange = listener },
    removeEventListener: vi.fn(),
  })))
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(0), 0))
  vi.stubGlobal('cancelAnimationFrame', (id: number) => window.clearTimeout(id))
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('header bear', () => {
  it('keeps the pupils within the sockets regardless of rendered size', async () => {
    const { container } = render(<CuteAnimalEyes size={40} />)
    const bear = container.querySelector('.animated-eyes')!
    vi.spyOn(bear, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 40, height: 40, right: 40, bottom: 40,
      x: 0, y: 0, toJSON: () => ({}),
    })
    const pupils = container.querySelectorAll('circle[fill="#2D3748"]')

    fireEvent.mouseMove(document, { clientX: 1000, clientY: 20 })
    await waitFor(() => expect(pupils[0].getAttribute('cx')).toBe('43.5'))
    expect(pupils[1].getAttribute('cx')).toBe('67.5')

    fireEvent.mouseMove(document, { clientX: 20, clientY: -1000 })
    await waitFor(() => expect(Number(pupils[0].getAttribute('cy'))).toBeLessThan(48))
    expect(Number(pupils[0].getAttribute('cy'))).toBeGreaterThanOrEqual(42.5)
  })

  it('perks up on pointer hover or keyboard focus, without reacting to touch hover', async () => {
    const { container } = render(<CuteAnimalEyes />)
    const bear = container.querySelector('.animated-eyes')!

    fireEvent.pointerEnter(bear, { pointerType: 'touch' })
    expect(bear).toHaveAttribute('data-mood', 'neutral')
    fireEvent.pointerEnter(bear, { pointerType: 'mouse' })
    expect(bear).toHaveAttribute('data-mood', 'happy')
    fireEvent.pointerLeave(bear)
    expect(bear).toHaveAttribute('data-mood', 'neutral')

    const { default: Header } = await import('../components/Header')
    render(<Header />)
    const home = screen.getByRole('button', { name: 'Back to top' })
    const headerBear = home.querySelector('.animated-eyes')!
    fireEvent.focus(home)
    expect(headerBear).toHaveAttribute('data-mood', 'happy')
    fireEvent.blur(home)
    expect(headerBear).toHaveAttribute('data-mood', 'neutral')
  })

  it('yawns and naps when idle, then wakes up surprised on activity', () => {
    vi.useFakeTimers()
    const { container } = render(<CuteAnimalEyes />)
    const bear = container.querySelector('.animated-eyes')!

    act(() => { vi.advanceTimersByTime(6000) })
    expect(bear).toHaveAttribute('data-phase', 'yawn')
    act(() => { vi.advanceTimersByTime(1400) })
    expect(bear).toHaveAttribute('data-sleeping', 'true')

    fireEvent.keyDown(window, { key: 'a' })
    expect(bear).toHaveAttribute('data-phase', 'awake')
    expect(bear).toHaveAttribute('data-mood', 'surprised')
    act(() => { vi.advanceTimersByTime(700) })
    expect(bear).toHaveAttribute('data-mood', 'neutral')
  })

  it('reacts to escalating boops from its host button and startles when napping', () => {
    vi.useFakeTimers()
    const onClick = vi.fn()
    render(<button onClick={onClick} aria-label="Back to top"><CuteAnimalEyes /></button>)
    const button = screen.getByRole('button', { name: 'Back to top' })
    const bear = button.querySelector('.animated-eyes')!
    const boop = (times: number) => {
      for (let i = 0; i < times; i++) fireEvent.click(button)
    }

    boop(1)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(button.querySelectorAll('.bear-particle')).toHaveLength(1)
    expect(button.querySelector('.bear-wiggle')).toBeInTheDocument()

    boop(2)
    expect(bear).toHaveAttribute('data-blush', 'true')
    expect(button).toHaveTextContent('hey! 🙈')

    boop(4)
    expect(button).toHaveTextContent('ok ok, back to top ↑')
    expect(button.querySelector('.bear-spin')).toBeInTheDocument()

    act(() => { vi.advanceTimersByTime(1500) })
    expect(bear).toHaveAttribute('data-blush', 'false')
    act(() => { vi.advanceTimersByTime(7400) })
    expect(bear).toHaveAttribute('data-phase', 'sleep')

    boop(1)
    expect(bear).toHaveAttribute('data-phase', 'awake')
    expect(bear).toHaveAttribute('data-mood', 'surprised')
    expect(button).toHaveTextContent('!')
    expect(onClick).toHaveBeenCalledTimes(8)
  })

  it('centers the eyes when reduced motion is enabled or toggled on', async () => {
    const { container } = render(<CuteAnimalEyes />)
    const bear = container.querySelector('.animated-eyes')!
    vi.spyOn(bear, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 60, height: 60, right: 60, bottom: 60,
      x: 0, y: 0, toJSON: () => ({}),
    })
    const pupil = container.querySelector('circle[fill="#2D3748"]')!

    fireEvent.mouseMove(document, { clientX: 300, clientY: 30 })
    await waitFor(() => expect(Number(pupil.getAttribute('cx'))).toBeGreaterThan(38))
    reducedMotion = true
    act(() => onMotionChange?.())
    expect(pupil.getAttribute('cx')).toBe('38')
    fireEvent.mouseMove(document, { clientX: 300, clientY: 30 })
    expect(pupil.getAttribute('cx')).toBe('38')
  })
})
