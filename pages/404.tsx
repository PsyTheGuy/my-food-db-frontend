import { Box, Button, Container, Typography } from '@mui/material';
import NavBar from '../components/utils/navbar';

const FourOhFour = () => {
  return (
    <>
      <NavBar />
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Box sx={{position: 'absolute', top: '10%'}}>
          <Typography sx={{letterSpacing: 10, fontSize: 400, fontWeight: 1000, color: '#d8d8d8', pointerEvents: 'none'}}>404</Typography>
        </Box>
        <Box sx={{position: 'absolute', top: '40%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <Typography sx={{ fontSize: 30, fontWeight: 1000, color: '#000', textAlign: 'center', pointerEvents: 'none'}}>WE ARE SORRY, PAGE NOT FOUND!</Typography>
          <Typography sx={{fontSize: 18, fontWeight: 500, color: '#000', textAlign: 'center', marginTop: '20px', pointerEvents: 'none'}}>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, HAD ITS NAME CHANGED, OR IS TEMPORARILY UNAVAILABLE</Typography>
          <Button sx={{width: '200px', marginTop: '10px'}} variant='contained' href='/'>BACK TO HOMEPAGE</Button>
        </Box>
      </Container>
    </>
  )
}

export default FourOhFour;
