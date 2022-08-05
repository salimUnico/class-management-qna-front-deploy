
import { FC, useEffect, useState } from 'react';
import { Title, Text, Card, TextInput, Button, Loader, Table, Modal, useMantineTheme, Popover } from '@mantine/core';
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

    const [note, setNote] = useState({ name: '' });

    const handleGetAllQuestionPaper = async () => {
        setLoading(true);
        try {
            const data = await axios.get('/admin/notes/',);
            if (data?.data?.success) {
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
    const [loadingDel, setLoadingDel] = useState(false);

    const handleQuestionPaperDelete = async (id: string) => {
        setLoadingDel(true);
        try {
            const data = await axios.delete(`/admin/notes/${id}`,);
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    message: 'Notes deleted',
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
                setLoadingDel(false);
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
            setLoadingDel(false);
        }
    }
    useEffect(() => {
        handleGetAllQuestionPaper();
    }, [])

    const handleAddNote = async () => {
        try {
            const data = await axios.post('/admin/notes/', { name: note.name });
            if (data?.data?.success) {
                window.location.reload()
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

        }
    };

    return (
        <div>
            <div className={classes.headerContainer} style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }} >
                <div className={classes.innerHeaderContainer}>
                    <Title className={classes.title} ><Text style={{ color: router.pathname.includes('dashboard') ? 'blue' : 'black' }}
                        onClick={() => router.push('/dashboard')}
                    >Questions</Text></Title>
                    <Title className={classes.title}><Text style={{ color: router.pathname.includes('notes') ? 'blue' : 'black' }}
                        onClick={() => router.push('/notes')}
                    >Notes</Text></Title>
                </div>
                <Popover width={300} position="bottom" withArrow shadow="md" id="popverddnotes">
                    <Popover.Target>
                        <Button>Add Note</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <TextInput id="notename" label="Note Name" onChange={e => setNote({ ...note, name: e.target.value })} />
                        <Button style={{ marginTop: '1rem' }} onClick={handleAddNote}>Add</Button>
                    </Popover.Dropdown>
                </Popover>
            </div>

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
                                                    <td>{dayjs(itm?.createdAt).format('DD-MM-YYYY')}</td>
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