import Base from 'templates/Base'
import Showcase from 'components/Showcase'
import Heading from 'components/Heading'
import Empty from 'components/Empty'
import GameCard, { GameCardProps } from 'components/GameCard'
import { Container } from 'components/Container'
import { HighlightProps } from 'components/Highlight'
import { Grid } from 'components/Grid'
import { Divider } from 'components/Divider'

export type WishlistTemplateProps = {
  games?: GameCardProps[]
  recommendedTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
}

const Wishlist = ({ games = [], recommendedTitle, recommendedGames, recommendedHighlight }: WishlistTemplateProps) => (
  <Base>
    <Container>
      <Heading lineLeft lineColor="secondary">
        Wishlist
      </Heading>

      {games?.length ? (
        <Grid>
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </Grid>
      ) : (
        <Empty title="Your wishlist is empty" description="Games added to yout wishlist will appear here" hasLink />
      )}

      <Divider />
    </Container>

    <Showcase title={recommendedTitle} games={recommendedGames} highlight={recommendedHighlight} />
  </Base>
)

export default Wishlist
