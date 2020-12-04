import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameDetails from '.'
import mockGameDetails from './mock'

describe('<GameDetails />', () => {
  it('should render the blocks', () => {
    renderWithTheme(<GameDetails {...mockGameDetails} />)

    expect(screen.getByRole('heading', { name: /developer/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /release date/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /platforms/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /publisher/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /rating/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /genres/i })).toBeInTheDocument()
  })

  it('should render platform icons', () => {
    renderWithTheme(<GameDetails {...mockGameDetails} />)

    expect(screen.getByRole('img', { name: /linux/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /mac/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /windows/i })).toBeInTheDocument()
  })

  it('should render the formated date', () => {
    renderWithTheme(<GameDetails {...mockGameDetails} />)

    expect(screen.getByText('Dec 3, 2020')).toBeInTheDocument()
  })

  it('should render FREE rating when BR0', () => {
    renderWithTheme(<GameDetails {...mockGameDetails} />)

    expect(screen.getByText('FREE')).toBeInTheDocument()
  })

  it('should render 18+ rating when BR18', () => {
    renderWithTheme(<GameDetails {...mockGameDetails} rating="BR18" />)

    expect(screen.getByText('18+')).toBeInTheDocument()
  })

  it('should render a list of genres', () => {
    renderWithTheme(<GameDetails {...mockGameDetails} />)

    expect(screen.getByText('Role-playing / Narrative')).toBeInTheDocument()
  })
})
