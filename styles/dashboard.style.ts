import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: 31,
        fontWeight: 900,
        letterSpacing: -1,
        [theme.fn.smallerThan('md')]: {
            fontSize: 25,
        },
        cursor: 'pointer',
        ':hover': {
            color: 'blue'
        }
    },
    headerContainer: {
        display: 'flex',
        gap: '1rem',
        padding: '1rem'
    }

}));
