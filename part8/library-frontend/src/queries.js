import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
    fragment bookDetails on Book {
        id
        title
        published
        genres
        author {
            name
        }
    }
`;

const AUTHOR_DETAILS = gql`
    fragment authorDetails on Author {
        id
        name
        born
        bookCount
    }
`;

export const ME = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...authorDetails
        }
    }
    ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
    query allBooks($genre: String) {
        allBooks(genre: $genre) {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const ALL_GENRES = gql`
    query allGenres {
        allGenres
    }
`;

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const EDIT_AUTHOR = gql`
    mutation updateAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            ...authorDetails
        }
    }
    ${AUTHOR_DETAILS}
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;
