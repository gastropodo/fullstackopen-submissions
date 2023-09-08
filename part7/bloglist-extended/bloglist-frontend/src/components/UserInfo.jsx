import { useNotify } from '../contexts/notificationContext';
import { useLogout, useUserValue } from '../contexts/authContext';
import { Stack, Typography } from '@mui/material';
import { Button } from './styles';

const UserInfo = () => {
    const user = useUserValue();
    const logout = useLogout();
    const notify = useNotify();

    const handleLogout = () => {
        logout();
        notify({ type: 'success', text: 'Logged out successfuly.' });
    };

    return (
        <Stack direction='row' spacing={2}>
            <Typography
                textAlign='center'
                sx={{ pt: 0.3, textTransform: 'uppercase' }}
            >
                {user.name}
            </Typography>
            <Button onClick={handleLogout} color='inherit'>LOGOUT</Button>
        </Stack>
    );
};

export default UserInfo;
