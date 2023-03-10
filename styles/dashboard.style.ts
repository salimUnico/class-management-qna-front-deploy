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
    },
    innerHeaderContainer: {
        display: 'flex',
        gap: '1rem',
    },
    headerContainer: {
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        padding: '1rem'
    },
    main: {
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
    },
}));
