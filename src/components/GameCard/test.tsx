import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  slug: 'population-zero',
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 235
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    const { container } = renderWithTheme(<GameCard {...props} />)

    expect(screen.getByRole('heading', { name: /population zero/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /rockstar games/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /population zero/i })).toHaveAttribute('src', props.img)
    expect(screen.getByLabelText(/Add to Wishlist/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: props.title })).toHaveAttribute('href', `/game/${props.slug}`)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render price in label', () => {
    renderWithTheme(<GameCard {...props} />)

    const price = screen.getByText('$235.00')
    expect(price).not.toHaveStyle({ textDecoration: 'line-through' })
    expect(price).toHaveStyle({ backgroundColor: '#3CD3C1' })
  })

  it('should render a line-through in price when promotional', () => {
    renderWithTheme(<GameCard {...props} promotionalPrice={210} />)

    expect(screen.getByText('$235.00')).toHaveStyle({ textDecoration: 'line-through' })
    expect(screen.getByText('$210.00')).not.toHaveStyle({ textDecoration: 'line-through' })
  })

  it('should render a filled Favorite icon when favorite is true', () => {
    renderWithTheme(<GameCard {...props} favorite />)

    expect(screen.getByLabelText(/Remove from Wishlist/i)).toBeInTheDocument()
  })

  it('should call onFav method when favorite is clicked', () => {
    const onFav = jest.fn()
    renderWithTheme(<GameCard {...props} favorite onFav={onFav} />)

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(onFav).toBeCalled()
  })

  it('should render Ribbon', () => {
    renderWithTheme(<GameCard {...props} ribbon="My Ribbon" ribbonColor="secondary" ribbonSize="small" />)

    const ribbon = screen.getByText(/my ribbon/i)
    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
    expect(ribbon).toBeInTheDocument()
  })
})
