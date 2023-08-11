const Input = (props) => {
    const { text, handler } = props;
    const { value, onChange } = handler;
    return (
        <div>
            {text} <input value={value} onChange={onChange} />
        </div>
    )
}

export default Input;