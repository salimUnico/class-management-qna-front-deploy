// import { FC } from 'react';
// import { Title, Text, Card, TextInput, Button } from '@mantine/core';
// import { useRouter } from 'next/router';

// import useStyles from '../../styles/notes.style';

// const Index: FC = () => {
//     const { classes } = useStyles();
//     const router = useRouter();
//     return (
//         <div>
//            <Card className={classes.headerContainer} shadow="xs">
//                 <div className={classes.innerHeaderContainer}>
//                     <Title className={classes.title} ><Text style={{ color: router.pathname.includes('dashboard') ? 'blue' : 'black' }}
//                         onClick={() => router.push('/dashboard')}
//                     >Questions</Text></Title>
//                     <Title className={classes.title}><Text style={{ color: router.pathname.includes('notes') ? 'blue' : 'black' }}
//                         onClick={() => router.push('/notes')}
//                     >Notes</Text></Title>
//                 </div>
//             </Card>
//         </div>
//     );
// };

// export default Index;




import { FC, useEffect, useState } from 'react';
import { Title, Text, Card, TextInput, Button, Loader, Table, Modal, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';

import useStyles from '../../styles/dashboard.style';

import { showNotification } from '@mantine/notifications';
import axios from '../../helper/axios';
import dayjs from 'dayjs';


const Notes: FC = () => {
    const theme = useMantineTheme();

    const { classes } = useStyles();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [questionData, setQuestionData] = useState([]);

    const handleGetAllQuestionPaper = async () => {
        setLoading(true);
        try {
            const data = await axios.get('/admin/question/paper',);
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    message: 'All Question paper loaded',
                });
                setQuestionData(data?.data?.data)
                setLoading(false);
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
    const handleQuestionPaperDelete = async (id: string) => {
        console.log(id)
    }
    useEffect(() => {
        handleGetAllQuestionPaper();
    }, [])



    return (
        <div>
            <Card className={classes.headerContainer} shadow="xs">
                <div className={classes.innerHeaderContainer}>
                    <Title className={classes.title} ><Text style={{ color: router.pathname.includes('dashboard') ? 'blue' : 'black' }}
                        onClick={() => router.push('/dashboard')}
                    >Questions</Text></Title>
                    <Title className={classes.title}><Text style={{ color: router.pathname.includes('notes') ? 'blue' : 'black' }}
                        onClick={() => router.push('/notes')}
                    >Notes</Text></Title>
                </div>
            </Card>

            <main>
                <Title className={classes.title} ><Text style={{ padding: '1rem' }}>All Notes</Text></Title>
                <div className={classes.main}>
                    {
                        !loading ?
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Note Name</th>
                                        <th>Created on</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        questionData?.map((itm: any) => {
                                            return (
                                                <tr key={itm._id}>
                                                    <td>{itm?.name}</td>
                                                    <td>{itm?.subject}</td>
                                                    <td>
                                                        <Button onClick={() => router.push(`/notes/${itm?._id}`)} variant="light">View</Button>
                                                        {" "}
                                                        <Button onClick={() => handleQuestionPaperDelete(itm?._id)} color="red" variant='outline'>Delete</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>
                            :
                            <Loader />
                    }
                </div>
            </main>
        </div >
    );
};

export default Notes;