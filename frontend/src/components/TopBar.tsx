import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#3F72AF" }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            Foodie POS
          </Typography>
          {accessToken && <Button color="inherit" onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/login");
          }}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>

  )
}

export default TopBar