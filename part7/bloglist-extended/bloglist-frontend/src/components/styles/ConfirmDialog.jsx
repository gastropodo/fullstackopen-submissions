import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import Button from './Button';
import { useState } from 'react';

const ConfirmDialog = ({ buttonLabel, buttonColor, title, text, onCofirm }) => {
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        onCofirm();
        handleClose();
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                sx={{ mt: 2 }}
                onClick={() => setOpen(true)}
                color={buttonColor}
            >
                {buttonLabel}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>
                    <DialogContentText>{text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='success' onClick={handleConfirm}>
                        CONFIRM
                    </Button>
                    <Button color='error' onClick={handleClose}>
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmDialog;
