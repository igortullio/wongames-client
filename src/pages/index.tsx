import Home, { HomeTemplateProps } from 'templates/Home'
import { GET_HOME } from 'graphql/queries/home'
import { GetHome, GetHomeVariables } from 'graphql/generated/GetHome'
import { initializeApollo } from 'utils/apollo'
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

export async function getStaticProps() {
  const TODAY = new Date().toISOString().slice(0, 10)

  const apolloClient = initializeApollo()
  const {
    data: { banners, newGames, upcomingGames, freeGames, sections }
  } = await apolloClient.query<GetHome, GetHomeVariables>({
    query: GET_HOME,
    variables: {
      date: TODAY
    }
  })

  return {
    props: {
      revalidate: 10,
      banners: bannerMapper(banners),
      newGamesTitle: newGames.length && sections?.newGames?.title,
      newGames: gamesMapper(newGames),
      mostPopularGamesTitle: sections?.popularGames?.games?.length && sections?.popularGames?.title,
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGames: gamesMapper(sections!.popularGames!.games),
      upcomingGamesTitle: upcomingGames.length && sections?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcomingGames),
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
      freeGamesTitle: freeGames.length && sections?.freeGames?.title,
      freeGames: gamesMapper(freeGames),
      freeHighlight: highlightMapper(sections?.freeGames?.highlight)
    }
  }
}
