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
            const data = await axios.get('/admin/user',);
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
    const handleQuestionPaperDelete = async (id: string) => {
        setLoadingDel(true);
        try {
            const data = await axios.delete(`/admin/user/${id}`,);
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
        email: "",
        role: "admin",
        password: "",
        telephone: "",
        gender: "male"
    })
    const [loadingAdd, setLoadingAdd] = useState(false);

    const handleAddQuestionPaper = async () => {
        setLoadingAdd(true);
        try {

            const data = await axios.post(`/admin/user/new`, modalData);
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    color: 'blue',
                    message: "New user added",
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
                    <Title className={classes.title}><Text style={{ color: router.pathname.includes('user-management') ? 'blue' : 'black' }}
                        onClick={() => router.push('/user-management')}
                    >User-Management</Text></Title>
                    <Title className={classes.title}><Text style={{ color: router.pathname.includes('logout') ? 'blue' : 'black' }}
                        onClick={() => {
                            localStorage.removeItem('tokenexpiry');
                            localStorage.removeItem('user');
                            localStorage.removeItem('token');
                            localStorage.removeItem('islogged');
                            router.push('/')
                        }}
                    >Logout</Text></Title>
                </div>
                <Button onClick={() => setaddQuestionPaperModal(true)}>Create User</Button>

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
                    <h3 className="text-xl text-gray-900  mb-5" style={{ marginTop: "-0.3rem" }}>Create New User</h3>

                    <TextInput
                        label="Name"
                        required
                        value={modalData.name}
                        onChange={(event) => setmodalData({ ...modalData, name: event.currentTarget.value })}
                        id="nameisdnput"
                        style={{ marginBottom: "0.5rem" }}
                    />
                    <TextInput
                        label="Email"
                        required
                        value={modalData.email}
                        onChange={(event) => setmodalData({ ...modalData, email: event.currentTarget.value })}
                        id="subjecsdtinput"
                        style={{ marginBottom: "0.5rem" }}
                    />
                    <TextInput
                        label="Telephone"
                        required
                        value={modalData.telephone}
                        onChange={(event) => setmodalData({ ...modalData, telephone: event.currentTarget.value })}
                        id="marksisdnput"
                        style={{ marginBottom: "0.5rem" }}
                        type="number"
                    />

                    <TextInput
                        label="Password"
                        required
                        value={modalData.password}
                        onChange={(event) => setmodalData({ ...modalData, password: event.currentTarget.value })}
                        id="markspinput"
                        style={{ marginBottom: "0.5rem" }}
                    // type="number"
                    />

                    <div style={{ display: "flex", marginTop: "1rem" }}>
                        <Button size='sm' onClick={handleAddQuestionPaper}>Save</Button>
                        <Button color={"red"} size="sm" ml={5} onClick={() => setaddQuestionPaperModal(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal>


            <main>
                <Title className={classes.title} ><Text style={{ padding: '1rem' }}>All users</Text></Title>
                <div className={classes.main}>
                    {
                        !loading ?
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Telephone</th>
                                        <th>Role</th>
                                        {
                                            JSON.parse(localStorage.getItem('user')).role == 'superadmin' &&
                                            <th>Action</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        questionData?.map((itm: any) => {
                                            return (
                                                <tr key={itm._id}>
                                                    <td>{itm?.name}</td>
                                                    <td>{itm?.email}</td>
                                                    <td>{itm?.telephone}</td>
                                                    <td>{itm?.role}</td>
                                                    <td>
                                                        {/* <Button onClick={() => router.push(`/question-paper/${itm?._id}`)} variant="light">View</Button> */}
                                                        {" "}
                                                        {
                                                            JSON.parse(localStorage.getItem('user')).role == 'superadmin' && <Button onClick={() => handleQuestionPaperDelete(itm?._id)} color="red" variant='outline'>Delete</Button>
                                                        }
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