import { useLocation, useNavigate } from 'react-router-dom';
import { UserInfo } from '.';
import { AppBar, Box, Toolbar, Container, Stack } from '@mui/material';
import { Button } from './styles';

const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pages = [
        { key: 'blogs', name: 'blogs', route: '/' },
        { key: 'users', name: 'users', route: '/users' },
    ];

    if (location.pathname === '/login') return null;

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                        }}
                    >
                        <Stack direction='row'>
                            {pages.map((page) => (
                                <Button key={page.key} sx={{ color: 'white' }} onClick={() => navigate(page.route)}>
                                    {page.name}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <UserInfo />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;
