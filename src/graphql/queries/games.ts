import { gql } from '@apollo/client'

export const GET_GAMES = gql`
  query GetGames($limit: Int!) {
    games(limit: $limit) {
      name
      slug
      cover {
        url
      }
      developers {
        name
      }
      price
    }
  }
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
