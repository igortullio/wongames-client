import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import gameMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export async function getStaticProps() {
  return {
    props: {
      games: gameMock.slice(0, 5),
      recommendedGames: gameMock.slice(0, 5),
      recommendedHighlight: highlightMock
    }
  }
}
