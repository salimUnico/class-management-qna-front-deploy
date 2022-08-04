import { FC, useEffect, useState } from 'react';
import { Title, Text, Card, TextInput, Button, Loader, Table, Modal, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';

import useStyles from '../../styles/dashboard.style';

import { showNotification } from '@mantine/notifications';
import axios from '../../helper/axios';
import dayjs from 'dayjs';

//modal
import DatePicker from "react-multi-date-picker"


const Index: FC = () => {
    const theme = useMantineTheme();

    const { classes } = useStyles();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [questionData, setQuestionData] = useState([]);
    const [loadingDel, setLoadingDel] = useState(false);

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
        setLoadingDel(true);
        try {
            const data = await axios.delete(`/admin/question/paper/${id}`,);
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    message: 'Question paper deleted',
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


    //Create Question Paper Modal
    const [addQuestionPaperModal, setaddQuestionPaperModal] = useState<boolean>(false)
    const [modalData, setmodalData] = useState({
        name: "",
        subject: "",
        date: new Date(),
        marks: ""
    })
    const [loadingAdd, setLoadingAdd] = useState(false);

    const handleAddQuestionPaper = async () => {
        setLoadingAdd(true);
        try {
            const data = await axios.post(`/admin/question/paper`, {
                ...modalData
            });
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    color: 'blue',
                    message: "Question paper added !",
                });
                setLoadingAdd(false);
                window.location.reload();
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
            setLoadingAdd(false);
        }
    }

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
                <Button onClick={() => setaddQuestionPaperModal(true)}>Create Question Paper</Button>
            </Card>

            <Modal
                centered
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}

                size={"lg"}
                opened={addQuestionPaperModal}
                onClose={() => setaddQuestionPaperModal(false)}
                style={{ borderRadius: "50px" }}

                withCloseButton={false}
                id="addQuestionPaperModal"
            >
                <div className="w-full">
                    <h3 className="text-xl text-gray-900  mb-5" style={{ marginTop: "-0.3rem" }}>Create Question Paper</h3>

                    <TextInput
                        label="Name"
                        required
                        value={modalData.name}
                        onChange={(event) => setmodalData({ ...modalData, name: event.currentTarget.value })}
                        id="nameinput"
                        style={{ marginBottom: "0.5rem" }}
                    />
                    <TextInput
                        label="Subject"
                        required
                        value={modalData.subject}
                        onChange={(event) => setmodalData({ ...modalData, subject: event.currentTarget.value })}
                        id="subjectinput"
                        style={{ marginBottom: "0.5rem" }}
                    />
                    <TextInput
                        label="Marks"
                        required
                        value={modalData.marks}
                        onChange={(event) => setmodalData({ ...modalData, marks: event.currentTarget.value })}
                        id="marksinput"
                        style={{ marginBottom: "0.5rem" }}
                        type="number"
                    />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Date</label>
                        <DatePicker style={{ width: "100%", height: 40 }} value={modalData.date} onChange={(event: any) => setmodalData({ ...modalData, date: dayjs(event).toISOString() })} />
                    </div>


                    <div style={{ display: "flex", marginTop: "1rem" }}>
                        <Button size='sm' onClick={handleAddQuestionPaper}>Save</Button>
                        <Button color={"red"} size="sm" ml={5} onClick={() => setaddQuestionPaperModal(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal>


            <main>
                <Title className={classes.title} ><Text style={{ padding: '1rem' }}>All Question Papers</Text></Title>
                <div className={classes.main}>
                    {
                        !loading ?
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Question paper name</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Marks</th>
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
                                                    <td>{dayjs(itm?.date).format('DD-MM-YYYY')}</td>
                                                    <td>{itm?.marks}</td>
                                                    <td>
                                                        <Button onClick={() => router.push(`/question-paper/${itm?._id}`)} variant="light">View</Button>
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

export default Index;