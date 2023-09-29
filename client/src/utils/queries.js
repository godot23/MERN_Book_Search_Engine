import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`{
    me{
    _id
    email
    username
    savedBook {
      author
      bookId
      description
      image
      link
      title
    }
  }
}
`