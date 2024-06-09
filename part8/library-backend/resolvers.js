const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let filters = {};
            if (args.author) {
                const author = await Author.findOne({ name: args.author });
                filters.author = author.id;
            }
            if (args.genre) filters.genres = args.genre;
            return Book.find(filters).populate("author");
        },
        allAuthors: async () => Author.find({}),
        allGenres: async () =>
            (await Book.find({})).reduce((prev, curr) => {
                curr.genres.forEach((genre) => {
                    if (!prev.includes(genre)) prev = prev.concat(genre);
                });
                return prev;
            }, []),
        me: (root, args, context) => {
            return context.currentUser;
        },
    },

    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated.", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            if (args.title.length < 5)
                throw new GraphQLError(
                    "Title must be at least 5 chars longs.",
                    {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.title,
                        },
                    }
                );

            if (args.author.length < 4)
                throw new GraphQLError(
                    "Author name must be at least 4 chars longs.",
                    {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.author,
                        },
                    }
                );

            let book = await Book.findOne({ title: args.title });
            if (book) {
                throw new GraphQLError("Title must be unique.", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title,
                    },
                });
            }

            let author = await Author.findOne({ name: args.author });
            if (!author) {
                author = new Author({ name: args.author });
            } else {
                author.bookCount = author.bookCount + 1;
            }
            try {
                await author.save();
            } catch (error) {
                throw new GraphQLError("Error saving new author", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        error,
                    },
                });
            }
            book = new Book({ ...args, author: author.id });
            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError("Error saving book", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        error,
                    },
                });
            }
            book = await book.populate("author");
            pubsub.publish("BOOK_ADDED", { bookAdded: book });
            return book;
        },

        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated.", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const author = await Author.findOne({ name: args.name });
            if (!author)
                throw new GraphQLError("Author not found", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                    },
                });

            try {
                author.born = args.setBornTo;
                await author.save();
            } catch (error) {
                throw new GraphQLError("Saving author failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        error,
                    },
                });
            }
            return author;
        },

        createUser: async (root, args) => {
            const user = new User({ ...args });

            return user.save().catch((error) => {
                throw new GraphQLError("Creating the user failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        error,
                    },
                });
            });
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new GraphQLError("Wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const userForToken = {
                username: user.username,
                id: user.id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
        },
    },
};

module.exports = resolvers;
