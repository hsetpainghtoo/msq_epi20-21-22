import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const sidebarItems = [
    {id: 1, name: "Menu", link: "/menu", icon: <RestaurantMenuIcon />},
    {id: 2, name: "Menu Category", link: "/menu-category", icon: <MenuBookIcon />}
  ]

  return (
    <Box sx={{ width: 250 , height: '93vh', bgcolor: "#DBE2EF"}} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {sidebarItems.map((item, index) => (
          <Link to={item.link} key={index} style={{textDecoration: 'none', color: '#112D4E'}}>
            <ListItem key={item.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Setting'].map((item, index) => (
          <Link to="/setting" key={index} style={{textDecoration: 'none', color: '#112D4E'}}>
            <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
    </Box>

  )
}

export default SideBar