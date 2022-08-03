import React, { useState } from 'react';
import { Title, Text, Card, TextInput, Button, PasswordInput } from '@mantine/core';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

// styles
import useStyles from '../styles/index.style';
//functionalities
import axios from '../helper/axios';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

export default function HomePage() {
  const { classes } = useStyles();
  const router = useRouter();

  const [user, setUser] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
    setLoading(true);
    try {
      const data = await axios.post('/admin/user/login', { ...user });
      if (data?.data?.success) {
        showNotification({
          title: 'Login Success',
          message: 'Welcome ',
        });
        setTimeout(() => {
          localStorage.setItem('user', JSON.stringify(data?.data?.msg));
          localStorage.setItem('token', data?.data?.jwt?.token);
          router.push('/dashboard')
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      if (error?.response?.data) {
        showNotification({
          title: 'Error',
          color: 'red',
          message: error?.response?.data?.data ?? 'Someting went wrong',
        });
      } else {
        showNotification({
          title: 'Error',
          color: 'red',
          message: error?.message ?? 'Something went wrong ',
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        TPI CLMS{' '}
        <Text inherit variant="gradient" component="span">
          Login
        </Text>
      </Title>
      <div className={classes.container}>
        <Card shadow="sm" p="lg" radius="md" withBorder className={classes.card} mt={37}>
          <TextInput
            label="Email"
            required
            value={user.email}
            onChange={(event) => setUser({ ...user, email: event.currentTarget.value })}
            id="emailuniq"
            icon={<EnvelopeClosedIcon />}
          />
          <PasswordInput
            label="Password"
            required
            value={user.password}
            onChange={(event) => setUser({ ...user, password: event.currentTarget.value })}
            id="passworduniq"
            icon={<LockClosedIcon />}

          />
          <Text inherit color="blue" className={classes.forgot} component="span">
            Forgot Password ?
          </Text>
          <Button loading={loading} onClick={handleSign}>
            Sign in
          </Button>
        </Card>
      </div>
    </>
  );
}
