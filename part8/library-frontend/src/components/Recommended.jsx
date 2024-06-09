import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const BookTable = (props) => {
    const { user } = props;

    const result = useQuery(ALL_BOOKS, {
        variables: { genre: user.favoriteGenre },
    });

    if (result.loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favorite genre <b>{user.favoriteGenre}</b>
            </p>
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
        </div>
    );
};

const Recommended = (props) => {
    const result = useQuery(ME);

    if (result.loading) {
        return <p>loading...</p>;
    }

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <BookTable user={result.data.me} />
        </div>
    );
};

export default Recommended;
