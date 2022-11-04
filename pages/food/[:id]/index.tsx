import { Box, Card, Container, Divider, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '../../../components/utils/navbar';
import useLocalStorage from '../../../components/utils/use-localstorage';
import { FoodEntry } from '../../../types';

const serverURL = 'http://localhost:3001/'

const Food = () => {
  const [food, setFood] = useState<FoodEntry | null>(null);
  const [token, setToken] = useLocalStorage('token', null);
  const router = useRouter();

  const getFood = async(id: string): Promise<void> => {
    try {
      const response = await axios.get(`${serverURL}api/v1/food/${id}`,
        {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      )
      setFood(response.data.entry);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const id = router.query[':id'];
    getFood(id);
  },[])

  return (
    <>
    <NavBar />
    <Container maxWidth='sm'>
      <Card sx={{padding: 0}}>
        <Box>
          <Box sx={{display: 'flex'}}>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 1}}>
          <Typography sx={{fontWeight: 'bold'}}>{food?.name}</Typography>
            </Box>
            <Divider orientation='vertical' flexItem/>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 1}}>
              <Typography>Available: </Typography>
              <Typography sx={{fontSize: 30}}>{food?.details?.amount}</Typography>
              <Typography sx={{fontSize: 14}}>{food?.details?.unit}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{padding: 1,backgroundColor: '#2196f3'}}>
            <Typography sx={{fontSize: 14}}>Last modified: {food?.createdAt.substring(0,10).replace('-', '.')}.</Typography>
          </Box>
        </Box>
      </Card>
    </Container>
    </>
  )
}

export default Food;
