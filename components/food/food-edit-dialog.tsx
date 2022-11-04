import React from 'react'
import FoodForm from './food-form';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { FoodEntry } from '../../types';

type Props = {
  food: FoodEntry,
  isEditDialogOpen: boolean,
  setIsEditDialogOpen: Function,
  editFood: Function
}

const FoodEditDialog = (props: Props) => {
  const { food, editFood, isEditDialogOpen, setIsEditDialogOpen } = props;

  return (
    <Dialog maxWidth="xs" open={isEditDialogOpen} onClose={():void => setIsEditDialogOpen(false)}>
      <DialogTitle>
        <Typography sx={{ fontWeight: 600, fontSize: 22, pointerEvents: "none" }}>
          Edit Food
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FoodForm food={food} handleSubmit={editFood} setIsDialogOpen ={setIsEditDialogOpen}/>
      </DialogContent>
    </Dialog>
  )
}

export default FoodEditDialog;
