import React from 'react';
import { ButtonBase, Card, CardActions, CardContent, Divider, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodEntry } from '../../types';

type Props = {
  food: FoodEntry,
  setSelected: Function,
  setIsEditDialogOpen: Function,
  setIsDeleteDialogOpen: Function
}

const FoodCard = (props: Props) => {
  const { food, setSelected, setIsEditDialogOpen, setIsDeleteDialogOpen } = props;


  const handleClick = (type: string):void => {
    setSelected(food)

    if (type == 'edit') {
      setIsEditDialogOpen(true);
    } else {
      setIsDeleteDialogOpen(true);
    }
  }

  return (
    <Card sx={{color: '#969696', overflow: 'hidden', ':hover': { backgroundColor: '#e3f2fd', color: '#000'}}}>
      <CardContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0}}>
        <ButtonBase  sx={{ width: '100%', '&:hover': {background: 'transparent'}}} href={`/food/${food._id}`}>
          <Typography sx={{ fontWeight: 'bold', color: 'inherit', margin: 3}}>
            {food.name}
          </Typography>
        </ButtonBase>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: 0}}>
        <IconButton color='inherit' onClick={():void => handleClick('edit')}>
          <EditIcon />
        </IconButton>
        <Divider orientation='vertical' flexItem />
        <IconButton color='inherit' onClick={():void => handleClick('delete')}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default FoodCard;
