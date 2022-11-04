import React from 'react'
import FoodForm from './food-form';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

type Props = {
  isCreateDialogOpen: boolean
  setIsCreateDialogOpen: Function
  createFood: Function
}

const FoodCreateDialog = (props: Props) => {
  const { createFood, isCreateDialogOpen, setIsCreateDialogOpen } = props;

  return (
    <Dialog maxWidth="xs" open={isCreateDialogOpen} onClose={():void => setIsCreateDialogOpen(false)}>
      <DialogTitle>
        <Typography sx={{ fontWeight: 600, fontSize: 22, pointerEvents: "none" }}>
          Create Food
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FoodForm handleSubmit={createFood} setIsDialogOpen ={setIsCreateDialogOpen}/>
      </DialogContent>
    </Dialog>
  )
}

export default FoodCreateDialog;
