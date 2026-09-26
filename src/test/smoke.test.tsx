import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.stubGlobal('IntersectionObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
})

describe('Smoke tests', () => {
  it('renders the Hero section with name and title', async () => {
    const { default: Hero } = await import('../components/Hero')
    render(<Hero />)
    expect(screen.getByText('Arunabh Saikia')).toBeInTheDocument()
    expect(screen.getByText('Senior Software Engineer @Adobe')).toBeInTheDocument()
  })

  it('renders the Header with navigation links', async () => {
    const { default: Header } = await import('../components/Header')
    render(<Header />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders all 6 project cards', async () => {
    const { default: Projects } = await import('../components/Projects')
    render(<Projects />)
    expect(screen.getByText('Prep-Algo')).toBeInTheDocument()
    expect(screen.getByText('Pathfinding Visualizer')).toBeInTheDocument()
    expect(screen.getByText('Algorithm Visualizer')).toBeInTheDocument()
    expect(screen.getByText('Human Activity Recognition')).toBeInTheDocument()
    expect(screen.getByText('Hacktober-Bit_Lords')).toBeInTheDocument()
  })

  it('renders skill categories', async () => {
    const { default: Skills } = await import('../components/Skills')
    render(<Skills />)
    expect(screen.getByText('Frontend Technologies')).toBeInTheDocument()
    expect(screen.getByText('Backend Technologies')).toBeInTheDocument()
    expect(screen.getByText('DevOps & Tools')).toBeInTheDocument()
    expect(screen.getByText('Architecture & Leadership')).toBeInTheDocument()
  })

  it('renders contact section with updated availability text', async () => {
    const { default: Contact } = await import('../components/Contact')
    render(<Contact />)
    expect(screen.getByText('Open to connecting')).toBeInTheDocument()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('renders the dark mode toggle with aria-label', async () => {
    const { default: Header } = await import('../components/Header')
    render(<Header />)
    const toggle = screen.getByLabelText(/switch to (light|dark) mode/i)
    expect(toggle).toBeInTheDocument()
  })
})
