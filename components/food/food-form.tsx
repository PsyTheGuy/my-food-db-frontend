import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { FoodEntry } from '../../types';


type Props = {
  food?: FoodEntry
  handleSubmit: Function
  setIsDialogOpen: Function
}

const foodSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-záéíóöőúüűÁÉÍÓÖŐÚÜŰ ]+$/, {message: 'Only letters allowed'})
    .required('Name is required'),
  details: yup
    .object()
    .shape({
      unit: yup
        .string()
        .matches(/^[A-Za-záéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$/, {message: 'Only letters allowed'})
        .when('amount', {
          is: (amount: string | undefined) => typeof(amount) !== 'undefined',
          then: yup.string().required("Unit is required")
        }),
      amount: yup
        .number()
        .integer('Amount must be an integer')
        .min(1, 'Amount must be at least 1 or higher')
        .when("unit", {
          is: (amount: number | undefined) => typeof(amount) !== 'undefined',
          then: yup.number().required("Amount is required")
        }),
    },
    [['unit', 'amount']]),
});

const FoodForm = (props: Props) => {
  const { food, handleSubmit, setIsDialogOpen } = props;

  const formik = useFormik({
    initialValues: {
      name: food ? food.name : '',
      details: {
        unit: food?.details ? food.details.unit : '',
        amount: food?.details ? food.details.amount : '',
      },
    },
    validationSchema: foodSchema,
    onSubmit: (values, _id?) => {
      if (String(values.details.unit).length > 0) {
        handleSubmit({
          name: values.name,
          details: {
            unit: values.details.unit,
            amount: values.details.amount,
          }
        }, food?._id);
      } else {
        handleSubmit({ name: values.name }, food?._id);
      }
      setIsDialogOpen(false);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth sx={{marginY: 1}}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput
          id="name"
          name="name"
          label="Name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {(formik.touched.name && formik.errors.name)
          ? <FormHelperText
              id="name-error-text"
              error={formik.touched.name && Boolean(formik.errors.name)}
            >
              {formik.errors.name}
            </FormHelperText>
          : <></>}
      </FormControl>
      <FormControl fullWidth sx={{marginY: 1}}>
        <InputLabel htmlFor="unit">Unit</InputLabel>
        <OutlinedInput
          id="unit"
          name="details.unit"
          label="Unit"
          type="text"
          value={formik.values.details.unit}
          onChange={formik.handleChange}
        />
        {(formik.touched.details?.unit && formik.errors.details?.unit)
          ? <FormHelperText
              id="unit-error-text"
              error={formik.touched.details?.unit && Boolean(formik.errors.details?.unit)}
            >
              {formik.errors.details?.unit}
            </FormHelperText>
          : <></>}
      </FormControl>
      <FormControl fullWidth sx={{marginY: 1}}>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <OutlinedInput
          id="amount"
          name="details.amount"
          label="Amount"
          type="number"
          value={formik.values.details.amount}
          onChange={formik.handleChange}
        />
        {(formik.touched.details?.amount && formik.errors.details?.amount)
          ? <FormHelperText
              id="amount-error-text"
              error={formik.touched.details?.amount && Boolean(formik.errors.details?.amount)}
            >
              {formik.errors.details?.amount}
            </FormHelperText>
          : <></>}
      </FormControl>
          <Button fullWidth sx={{marginY: 2, fontWeight: 600 }} color="primary" variant="contained" size="large" type="submit">
            Submit
          </Button>
    </form>
  );
};

export default FoodForm;
