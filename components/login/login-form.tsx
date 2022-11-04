import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Container, FormControl, FormHelperText, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useLocalStorage from '../utils/use-localstorage';

const serverURL = 'https://my-food-db-backend.herokuapp.com/'

const validationSchema = yup.object({
  username: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [token, setToken] = useLocalStorage('token', null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await toast.promise(axios.post(`${serverURL}login`, values),
          {
	          pending: "We're logging you in...",
            success: "Success! You're in!",
            error: "Invalid username or password!"
          }
        );
        setToken(response.data.token);
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <Container maxWidth="xs" sx={{
      borderRadius: 1,
      marginTop: 20,
      padding: 2,
      backgroundColor: "white"
    }}>
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
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth sx={{marginY: 1}}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            name="username"
            label="Email"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {(formik.touched.username && formik.errors.username)
          ? <FormHelperText id="email-error-text" error={formik.touched.username && Boolean(formik.errors.username)}>{formik.errors.username}</FormHelperText>
          : <></>}
        </FormControl>
        <FormControl fullWidth sx={{marginY: 1}}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            label="Password"
            type={isVisible ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsVisible(!isVisible)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {isVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {(formik.touched.password && formik.errors.password)
          ? <FormHelperText id="password-error-text" error={formik.touched.password && Boolean(formik.errors.password)}>{formik.errors.password}</FormHelperText>
          : <></>}
        </FormControl>
        <div>
          <Button fullWidth sx={{marginY: 2, fontWeight: 600 }} color="primary" variant="contained" size="large" type="submit">
            Login
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginForm;
