import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import SetBirthyear from "./SetBirthyear";

const AuthorsTable = (props) => {
    const { authors } = props;

    return (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.map((a) => (
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Authors = (props) => {
    const { setError } = props;
    const result = useQuery(ALL_AUTHORS);

    if (result.loading) {
        return <div>loading...</div>;
    }

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>Authors</h2>
            <AuthorsTable authors={result.data.allAuthors} />
            {props.token && (
                <>
                    <h3>Set birthyear</h3>
                    <SetBirthyear
                        setError={setError}
                        authors={result.data.allAuthors}
                    />
                </>
            )}
        </div>
    );
};

export default Authors;
