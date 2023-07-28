import { gql } from '@apollo/client';

export default gql`
  query GET_ANIME($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
      }
      bannerImage
      description
      episodes
      genres
      averageScore
    }
  }
`;
