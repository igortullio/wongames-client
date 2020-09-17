import { screen } from '@testing-library/react'

import { renderWithTheme } from 'utils/tests/helpers'
import Banner from '.'
import { bannerPropsExample } from './stories'

describe('<Banner />', () => {
  it('should render the banner', () => {
    const { container } = renderWithTheme(<Banner {...bannerPropsExample} />)

    expect(screen.getByRole('heading', { name: /Defy death/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Play the new CrashLands season/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Defy death/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
