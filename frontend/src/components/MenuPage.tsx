import { useState } from 'react'
import Layout from './Layout'
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from './store/hook';
import { NewMenu } from '../types/menu';
import NewMenuDialog from './NewMenuDialog';

const MenuPage = () => {
    const [open, setOpen] = useState(false);
    const [newMenu, setNewMenu] = useState<NewMenu>({ name: "", price: 0 });

    

    return (
        <Layout>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={() => setOpen(true)} variant="contained" sx={{ bgcolor: "#3F72AF", "&:hover": { bgcolor: "#1976D2" } }}>
                        New Menu
                    </Button>
                </Box>

                <NewMenuDialog  open={open} setOpen={setOpen} newMenu={newMenu} setNewMenu={setNewMenu} />
            </Box>
        </Layout>
    )
}

export default MenuPage