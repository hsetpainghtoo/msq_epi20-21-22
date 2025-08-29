import { Alert, Snackbar } from '@mui/material'
import { useAppDispatch, useAppSelector } from './store/hook'
import { hideSnackbar } from './store/slices/snackbarSlice';
import { useEffect } from 'react';

const AppSnackBar = () => {
    const { type, message, open } = useAppSelector((state) => state.snackbar);
    const dispatch = useAppDispatch();

    useEffect(() => { 
        if (message) {
            setTimeout(() => {
                dispatch(hideSnackbar());
            }, 3000);
        }
    }, [message])
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={open}
            onClose={() => { }}
        >
            <Alert
                onClose={() => dispatch(hideSnackbar())}
                severity={type}
                variant="filled"
                sx={{ width: '100%', backgroundColor: type === "success" ? "#4caf50" : "#f44336" }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default AppSnackBar