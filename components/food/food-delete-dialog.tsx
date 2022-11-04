import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { FoodEntry } from '../../types';

type Props = {
  food: FoodEntry,
  isDeleteDialogOpen: boolean,
  setIsDeleteDialogOpen: Function,
  deleteFood: Function
}

const FoodDeleteDialog = (props: Props) => {
  const { food, deleteFood, isDeleteDialogOpen, setIsDeleteDialogOpen } = props;

  const handleSubmit = (id: string):void => {
    deleteFood(id);
    setIsDeleteDialogOpen(false);
  }

  return (
    <Dialog
      maxWidth="xs"
      open={isDeleteDialogOpen}
      onClose={():void => setIsDeleteDialogOpen(false)}
    >
      <DialogTitle>
        <Typography sx={{ fontWeight: 600, fontSize: 20, flexGrow: 1, pointerEvents: "none" }}>
          Do you really want to delete this food?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action is permanent! If you delete a food from
          the list, you won't be able to restore it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
       <Button onClick={() => handleSubmit(food._id)} autoFocus>
          Confirm
        </Button>
        <Button onClick={():void => setIsDeleteDialogOpen()}>Back</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FoodDeleteDialog;
