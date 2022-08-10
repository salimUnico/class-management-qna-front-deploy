import React, { useState } from 'react';
import { Title, Text, Card, TextInput, Button, PasswordInput } from '@mantine/core';
import { EnvelopeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

// styles
import useStyles from '../../styles/index.style';
//functionalities
import axios from '../../helper/axios';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import useAuth from '../../helper/useAuth';

export default function HomePage() {
  const { classes } = useStyles();
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [user, setUser] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleForgot = async () => {
    if (user.password === user.confirmPassword) {
      setLoading(true);
      try {
        const data = await axios.post('/admin/user/forgot-token-reset', { newPassword: user.password, token: router.query.token });
        if (data?.data?.success) {
          showNotification({
            title: 'Success',
            message: 'Check you email',
          });
          setTimeout(() => {
            router.push('/')
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
    } else {
      showNotification({
        title: 'Error',
        color: 'red',
        message: 'Password dont match',
      });
    }
  }


  if (!isLoggedIn) {
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
              label="Password"
              required
              value={user.password}
              onChange={(event) => setUser({ ...user, password: event.currentTarget.value })}
              id="emailuniq"
              icon={<EnvelopeClosedIcon />}
            />
            <PasswordInput
              label="Confirm Password"
              required
              value={user.confirmPassword}
              onChange={(event) => setUser({ ...user, confirmPassword: event.currentTarget.value })}
              id="passworduniq"
              icon={<EnvelopeClosedIcon />}

            />
            <Button loading={loading} onClick={handleForgot}>
              Save
            </Button>
          </Card>
        </div>
      </>
    );
  }
  else {
    router.push('/dashboard')
    return <div></div>
  }
}
