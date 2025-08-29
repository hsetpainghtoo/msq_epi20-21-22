import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material"
import { NewMenu } from "../types/menu"
import { useAppDispatch, useAppSelector } from "./store/hook"
import { createMenu } from "./store/slices/menuSlice"
import { useState } from "react"
import Alert from '@mui/material/Alert';
import { showSnackbar } from "./store/slices/snackbarSlice"


interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    newMenu: NewMenu
    setNewMenu: React.Dispatch<React.SetStateAction<NewMenu>>
}
const NewMenuDialog = ({ open, setOpen, newMenu, setNewMenu }: Props) => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.menu);

    const handleCreateMenu = () => {
        const { name, price } = newMenu;

        if (!name || price === undefined) {
            return;
        }


        dispatch(createMenu({
            ...newMenu,
            onSuccess: () => {
                // setShowSnackbar(true);
                // setOpen(false);

                dispatch(showSnackbar({ message: 'Menu created successfully', type: 'success' }));
                setOpen(false);
            },
            onError: () => {
                dispatch(showSnackbar({ message: 'Error creating menu', type: 'error' }))
            }
        }));
    }


    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>New Menu</DialogTitle>
            <DialogContent sx={{ width: 300 }}>
                <Box>
                    <TextField onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })} style={{ marginTop: 7, marginBottom: 12 }} label="Name" name="name" variant="outlined" fullWidth />
                    <TextField onChange={(e) => setNewMenu({ ...newMenu, price: Number(e.target.value) })} style={{ marginTop: 7, marginBottom: 12 }} type='number' label="Price" name="price" variant="outlined" fullWidth />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: "#3F72AF" }} onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant='contained' sx={{ bgcolor: "#3F72AF", "&:hover": { bgcolor: "#1976D2" }, width: 100, height: 38 }} onClick={handleCreateMenu}>
                    {isLoading ? <CircularProgress sx={{ color: "#DBE2EF" }} size={20} /> : "Create"}
                </Button>


            </DialogActions>
        </Dialog>
    )
}

export default NewMenuDialog