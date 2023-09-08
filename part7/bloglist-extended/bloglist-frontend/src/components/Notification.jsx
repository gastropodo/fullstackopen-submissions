import { Alert, Snackbar } from '@mui/material';
import { useClear, useNotificationValue } from '../contexts/notificationContext';
import { useEffect, useState } from 'react';

const Notification = () => {
    const { text, type, duration } = useNotificationValue();
    const clear = useClear();
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        clear();
        setOpen(false);
    };

    useEffect(() => {
        if (text) setOpen(true);
    }, [text]);
    
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration * 1000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
