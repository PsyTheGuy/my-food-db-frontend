import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Fab, Typography, Grid, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useLocalStorage from '../utils/use-localstorage';
import FoodCard from './food-card';
import FoodCreateDialog from './food-create-dialog';
import FoodEditDialog from './food-edit-dialog';
import FoodDeleteDialog from './food-delete-dialog';
import { FoodEntry, FoodEntryCreateOptions } from '../../types';

const serverURL = 'http://localhost:3001/'

const FoodList = () => {
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [selected, setSelected] = useState<FoodEntry>({name: ''} as FoodEntry);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [token, setToken] = useLocalStorage('token', null)

  const getFoods = async ():Promise<void> => {
    try {
      const response = await axios.get(`${serverURL}api/v1/food`,
        {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      );
      setFoods(response.data.entries)
    } catch (error) {
      console.log(error);
    }
  }

  const createFood = async (food: FoodEntryCreateOptions):Promise<void> => {
    try {
      await toast.promise(axios.post(`${serverURL}api/v1/food`, food,
        {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }),
        {
	        pending: "Saving...",
          success: "Food created!",
          error: "Something went wrong!"
        }
      );
    } catch (error) {
      console.error(error);
    }
    getFoods()
  }

  const editFood = async ( food: FoodEntryCreateOptions, _id: Partial<FoodEntry> ):Promise<void> => {
    try {
      await toast.promise(axios.put(`${serverURL}api/v1/food/${_id}`, food,
        {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }),
        {
	        pending: "Saving...",
          success: "Food edited!",
          error: "Something went wrong!"
        }
      );
    } catch (error) {
      console.error(error);
    }
    getFoods();
  }

  const deleteFood = async (_id: Partial<FoodEntry>):Promise<void> => {
    try {
      await toast.promise(axios.delete(`${serverURL}api/v1/food/${_id}`,
        {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }),
        {
	        pending: "Deleting...",
          success: "Food deleted!",
          error: "Something went wrong!"
        }
      );
    } catch (error) {
      console.error(error);
    }
    getFoods();
  }

  useEffect(() => {
    getFoods();
  },[]);

  return (
    <>
      <Grid container spacing={3} columns={12}>
        {foods.map(food => {
          return (
          <Grid item key={food._id} xs={12} sm={6} md={4}>
            <FoodCard
              food={food}
              setSelected={setSelected}
              setIsEditDialogOpen={setIsEditDialogOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />
          </Grid>
          )
        })}
      </Grid>
      <Fab
        size="large"
        sx={{
          position: 'fixed',
          bottom: '50px',
          right: '50px',
          backgroundColor: '#2196f3',
          color: '#fff',
          ':hover': {
            backgroundColor: '#fff',
            color: '#2196f3'
          } }}
        onClick={():void => setIsCreateDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
      {foods.length === 0 &&
        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '20%'}}>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 800,
              textAlign: 'center',
              color: '#969696',
              pointerEvents: 'none'}}
          >
            There is no food in the database...
          </Typography>
        </Box>}
      {isCreateDialogOpen && <FoodCreateDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        createFood={createFood}
      />}
      {isEditDialogOpen && <FoodEditDialog
        food={selected}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        editFood={editFood}
      />}
      {isDeleteDialogOpen && <FoodDeleteDialog
        food={selected}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        deleteFood={deleteFood}/>}
    </>
  )
}

export default FoodList;
