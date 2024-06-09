import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommended from "./components/Recommended";
import { updateBookCache } from "./cache";
import { useApolloClient, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
    const client = useApolloClient();
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useSubscription(BOOK_ADDED, {
        onData: ({ data, client }) => {
            const addedBook = data.data.bookAdded;
            notify(`${addedBook.title} added`);
            updateBookCache(
                client.cache,
                { query: ALL_BOOKS, variables: { genre: "" } },
                addedBook
            );
            addedBook.genres.forEach((genre) => {
                updateBookCache(
                    client.cache,
                    {
                        query: ALL_BOOKS,
                        variables: { genre },
                    },
                    addedBook
                );
            });
        },
    });

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 10000);
    };

    const logout = () => {
        setPage("authors");
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                {token && (
                    <button onClick={() => setPage("add")}>add book</button>
                )}
                {!token && (
                    <button onClick={() => setPage("login")}>login</button>
                )}
                {token && (
                    <button onClick={() => setPage("recommended")}>
                        recommended
                    </button>
                )}
                {token && <button onClick={() => logout()}>logout</button>}
            </div>

            <Notify errorMessage={errorMessage} />

            <Authors
                show={page === "authors"}
                setError={notify}
                token={token}
            />

            <Books show={page === "books"} />

            <NewBook show={page === "add"} setError={notify} token={token} />

            <Recommended show={page === "recommended"} />

            <Login
                show={page === "login"}
                setError={notify}
                setToken={setToken}
                setPage={setPage}
            />
        </div>
    );
};

const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
        return null;
    }
    return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
