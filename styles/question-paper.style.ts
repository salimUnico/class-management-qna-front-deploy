import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    title: {
        padding: '1rem 0rem 0rem 2rem',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: 31,
        fontWeight: 900,
        letterSpacing: -1,
        [theme.fn.smallerThan('md')]: {
            fontSize: 25,
        },
        // cursor: 'pointer',
    },
    container: {
        display: 'flex',
        flexDirection: "column",
        gap: '1rem'
    },
    questionContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
    },
    leftSide: {
        display: 'flex',
        gap: '1rem',
        padding: '2rem',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    rightSide: {
        // display: 'flex',
        padding: '2rem'
    }
}));
