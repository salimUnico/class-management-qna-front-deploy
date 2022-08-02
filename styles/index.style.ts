import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 37,
    fontWeight: 900,
    letterSpacing: -1,
    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },
  card: {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  forgot: {
    fontWeight: 500,
    cursor: 'pointer',
  },
}));
