import { Typography, Stack } from '@mui/material';
import { Button, TextInput } from '.';

const Form = ({ fields, onSubmit, title, submitLabel }) => {

    return (
        <form onSubmit={onSubmit} >
            {title && <Typography variant='h6'>{title}</Typography>}
            <Stack spacing={2} marginY={1} maxWidth='300px'>
                {fields.array.map((field) => (
                    <TextInput key={field.name} {...field.input} />
                ))}
                <Button type='submit' color='success'>
                    {submitLabel}
                </Button>
            </Stack>
        </form>
    );
};

export default Form;
