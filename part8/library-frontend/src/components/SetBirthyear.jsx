import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const SetBirthyear = (props) => {
    const { setError, authors } = props;
    const [author, setAuthor] = useState(authors[0]?.name);
    const [born, setBorn] = useState("");

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            const messages = error.graphQLErrors
                .map((e) => e.message)
                .join("\n");
            setError(messages);
        },
    });

    const submit = async (event) => {
        event.preventDefault();
        if (!author) {
            setError("Author cannot be empty.");
            return;
        }
        if (!born) {
            setError("Born year cannot be empty.");
            return;
        }

        await editAuthor({
            variables: {
                name: author,
                setBornTo: born,
            },
        });

        setAuthor(authors[0].name);
        setBorn("");
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name
                    <select
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    >
                        {authors.map((author) => (
                            <option key={author.name} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) =>
                            setBorn(parseInt(target.value))
                        }
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    );
};

export default SetBirthyear;
