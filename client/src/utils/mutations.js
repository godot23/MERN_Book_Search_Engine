import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
    mutation Mutation($author: [String]!, $title: String!, $bookId: ID!, $description: String, $image: String, $link: String) {
  saveBook(author: $author, title: $title, bookId: $bookId, description: $description, image: $image, link: $link) {
    _id
    bookCount
    email
    savedBook {
      author
      bookId
      description
      link
      image
      title
    }
    username
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    bookCount
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
`;