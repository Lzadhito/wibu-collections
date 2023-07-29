import { gql } from '@apollo/client';

export default gql`
  query GET_ANIME_LIST($page: Int) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        total
        lastPage
        currentPage
      }
      media(type: ANIME) {
        id
        title {
          english
          native
        }
        coverImage {
          extraLarge
          large
        }
      }
    }
  }
`;
