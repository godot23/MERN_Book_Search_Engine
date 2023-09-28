const typeDefs = `
    type User{
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBook: [Book]!
    }

    type Book{
        bookId: String!
        author: [String]!
        description: String
        title: String
        image: String
        link: String
    }

    type Auth{
        token: ID!
        user: User
    }

    type Query{
        getSingleUser(id: Int): User
    }

    type Mutation{
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(author: [String]!, description: String, title: String!, bookId: ID!, image: String, link: String): User
        removeBook(bookId: ID!): User
    }

`