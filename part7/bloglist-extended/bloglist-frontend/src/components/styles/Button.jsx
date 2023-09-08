import { Button as MUIButton } from '@mui/material';

const Button = (props) => {
    const { children, ...rest } = props;
    return (
        <MUIButton variant='outlined' size='small' {...rest}>
            {children}
        </MUIButton>
    );
};

export default Button;
