import { FC } from 'react';
import { Title, Text, Card, TextInput, Button } from '@mantine/core';
import { useRouter } from 'next/router';

import useStyles from '../../styles/notes.style';

const Index: FC = () => {
    const { classes } = useStyles();
    const router = useRouter();
    return (
        <div>
            <Card className={classes.headerContainer} shadow="xs">
                <Title className={classes.title} ><Text style={{ color: router.pathname.includes('dashboard') ? 'blue' : 'black' }}
                    onClick={() => router.push('/dashboard')}
                >Questions</Text></Title>
                <Title className={classes.title}><Text style={{ color: router.pathname.includes('notes') ? 'blue' : 'black' }}
                    onClick={() => router.push('/notes')}
                >Notes</Text></Title>
            </Card>
        </div>
    );
};

export default Index;