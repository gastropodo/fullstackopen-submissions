import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const BookTable = (props) => {
    const { genre } = props;
    const result = useQuery(ALL_BOOKS, { variables: { genre } });

    if (result.loading) {
        return <div>loading...</div>;
    }

    return (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {result.data.allBooks.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const GenreList = (props) => {
    const { genres, setGenre } = props;
    return (
        <div>
            {genres.map((genre) => (
                <button key={genre} onClick={() => setGenre(genre)}>
                    {genre}
                </button>
            ))}
            <button onClick={() => setGenre("")}>all genres</button>
        </div>
    );
};

const Books = (props) => {
    const [genre, setGenre] = useState("");
    const result = useQuery(ALL_GENRES);

    if (result.loading) {
        return <div>loading...</div>;
    }

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>books</h2>
            <p>
                in genre <b>{genre || "all genres"}</b>
            </p>
            <GenreList genres={result.data.allGenres} setGenre={setGenre} />
            <BookTable genre={genre} />
        </div>
    );
};

export default Books;
