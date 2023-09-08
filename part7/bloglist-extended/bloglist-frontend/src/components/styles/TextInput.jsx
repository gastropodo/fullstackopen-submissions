import { InputAdornment, TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

const PasswordInput = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            type={show ? 'text' : 'password'}
            {...props}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton
                            onClick={handleShow}
                            onMouseDown={handleMouseDown}
                        >
                            {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

const TextInput = (props) => {
    const { type, ...rest } = props;
    rest.variant = 'outlined';
    rest.size = 'small';

    if (type === 'password') return <PasswordInput {...rest} />;
    return <TextField type={type} {...rest} />;
};

export default TextInput;
