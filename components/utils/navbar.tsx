import React from 'react';
import { useRouter } from 'next/router';
import { AppBar, Box, Button, Icon, Toolbar, Typography } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AppBar sx={{ paddingX: "2vw", backgroundColor: '#2196f3', color: '#fff' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex'}}>
          <Icon>
            <FastfoodIcon />
          </Icon>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              flexGrow: 1,
              pointerEvents: "none" }}
          >
            My FoodDB
          </Typography>
        </Box>
        <Box>
          <Button sx={{ marginX: 1, fontWeight: 600}} variant="outlined" color="inherit" onClick={() => router.push('/')}>
            Home <HomeIcon sx={{paddingLeft: 1}}/>
          </Button>
          <Button sx={{ marginX: 1, fontWeight: 600}} variant="outlined" color="inherit" onClick={logout}>
            Logout <LogoutIcon sx={{paddingLeft: 1}}/>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
