import Input from "./Input";

const PersonForm = (props) => {
    const { nameHandler, numberHandler, onSubmit } = props;

    return (
        <form onSubmit={onSubmit}>
            <Input text="name:" handler={nameHandler} />
            <Input text="number:" handler={numberHandler} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;