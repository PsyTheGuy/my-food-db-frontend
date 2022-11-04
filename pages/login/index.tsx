import { Container } from '@mui/material';
import { NextPage } from 'next';
import LoginForm from '../../components/login/login-form'

const Login: NextPage = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  )
}

export default Login;
