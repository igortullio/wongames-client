import Game, { GameTemplateProps } from 'templates/Game'

import { useRouter } from 'next/router'
import { initializeApollo } from 'utils/apollo'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'
import { GET_GAMES, GET_GAME_BY_SLUG } from 'graphql/queries/games'
import { GetGameBySlug, GetGameBySlugVariables } from 'graphql/generated/GetGameBySlug'
import { GetStaticProps } from 'next'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import { GET_UPCOMING } from 'graphql/queries/upcoming'
import { GetUpcoming, GetUpcomingVariables } from 'graphql/generated/GetUpcoming'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return <Game {...props} />
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<GetGames, GetGamesVariables>({ query: GET_GAMES, variables: { limit: 9 } })
  const paths = data.games.map(({ slug }) => ({ params: { slug } }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<GetGameBySlug, GetGameBySlugVariables>({
    query: GET_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` }
  })

  if (!data.games.length) {
    return { props: { notFound: true } }
  }

  const game = data.games[0]

  const {
    data: { recommended }
  } = await apolloClient.query<GetRecommended>({
    query: GET_RECOMMENDED
  })

  const TODAY = new Date().toISOString().slice(0, 10)
  const { data: upcoming } = await apolloClient.query<GetUpcoming, GetUpcomingVariables>({
    query: GET_UPCOMING,
    variables: { date: TODAY }
  })

  return {
    props: {
      revalidate: 60,
      cover: `http://localhost:1337${game.cover?.src}`,
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: `http://localhost:1337${image.src}`,
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingTitle: upcoming.showcase?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcoming.upcomingGames),
      upcomingHighlight: highlightMapper(upcoming.showcase?.upcomingGames?.highlight),
      recommendedTitle: recommended?.section?.title,
      recommendedGames: gamesMapper(recommended?.section?.games)
    }
  }
}
