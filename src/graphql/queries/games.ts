import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { GameFragment } from 'graphql/fragments/game'
import { GetGames, GetGamesVariables } from 'graphql/generated/GetGames'

export const GET_GAMES = gql`
  query QueryGames($limit: Int!, $start: Int) {
    games(limit: $limit, start: $start) {
      ...GameFragment
    }
  }

  ${GameFragment}
`

export const GET_GAME_BY_SLUG = gql`
  query GetGameBySlug($slug: String!) {
    games(where: { slug: $slug }) {
      name
      short_description
      description
      price
      rating
      release_date
      gallery {
        src: url
        label: alternativeText
      }
      cover {
        src: url
      }
      developers {
        name
      }
      publisher {
        name
      }
      categories {
        name
      }
      platforms {
        name
      }
    }
  }
`

export function useQueryGames(options?: QueryHookOptions<GetGames, GetGamesVariables>) {
  return useQuery<GetGames, GetGamesVariables>(GET_GAMES, options)
}
