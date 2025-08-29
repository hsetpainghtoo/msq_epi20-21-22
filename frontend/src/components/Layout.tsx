import { Box, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import AppSnackBar from './AppSnackBar'

interface Props {
  children: ReactNode
}
const Layout = ({ children }: Props) => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex", height: "93vh" }}>
        {accessToken ? <SideBar /> : null}
        <Box sx={{ flexGrow: 1, p: 2, bgcolor: "#F9F7F7" }}>
          {children}
        </Box>
      </Box>
      <AppSnackBar/>
    </Box>
  )
}

export default Layout