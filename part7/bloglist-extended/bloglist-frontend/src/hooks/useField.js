import { useState } from 'react';

const useField = (type, name, required = true) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [text, setText] = useState('');

    const label = name.charAt(0).toUpperCase() + name.slice(1);

    const onChange = (event) => {
        setValue(event.target.value);
        setError(false);
        setText('');
    };

    const reset = () => {
        setValue('');
    };

    const onInvalid = (event) => {
        event.preventDefault();
        setError(true);
        setText(`${label} required.`);
    }

    return {
        value,
        name,
        input: {
            id: name,
            label,
            name,
            type,
            value,
            helperText: text,
            error,
            required,
            onChange,
            onInvalid,
        },
        reset,
    };
};

export default useField;
