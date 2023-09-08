import { Navigate } from 'react-router-dom';
import { LoginForm, Notification } from '../components';
import { useUserValue } from '../contexts/authContext';
import { Container, Paper, Stack, Typography } from '@mui/material';

const Login = () => {
    const user = useUserValue();

    if (user) return <Navigate replace to='/' />;

    return (
        <>
            <Paper
                component={Container}
                elevation={6}
                sx={{
                    maxWidth: '300px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translateY(-50%) translateX(-50%)',
                }}
            >
                <Container sx={{ paddingY: 5 }}>
                    <Typography marginBottom={3} variant='h4' textAlign='center'>
                        BLOG APP
                    </Typography>
                    <LoginForm />
                </Container>
            </Paper>
            <Notification />
        </>
    );
};

export default Login;
