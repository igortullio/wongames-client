import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameInfo from '.'

const props = {
  title: 'My game title',
  description: 'Game description',
  price: '210.00'
}

describe('<GameInfo />', () => {
  it('should render game informations and buttons', () => {
    const { container } = renderWithTheme(<GameInfo {...props} />)

    expect(screen.getByRole('heading', { name: /my game title/i })).toBeInTheDocument()
    expect(screen.getByText(/game description/i)).toBeInTheDocument()
    expect(screen.getByText(/\$210.00/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /wishlist/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
