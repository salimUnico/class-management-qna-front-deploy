import { FC, useEffect, useState, useRef } from 'react';
import { Button, Switch, Card, TextInput, Title, Tabs, Popover } from '@mantine/core';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, } from '@react-pdf/renderer';
// import dynamic from 'next/dynamic';
// const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer'), {
//     ssr: false
// });
// import DatePicker from "react-datepicker";
import useStyles from '../../styles/question-paper.style';
import ReactToPrint from 'react-to-print';

import { showNotification } from '@mantine/notifications';
import axios from '../../helper/axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import AnswerTab from '../../components/AnswerTabs';

import useAuth from '../../helper/useAuth';

import DatePicker from "react-multi-date-picker"

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        margin: 10,
        padding: 30,
        width: '770px',
        // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexGrow: 1
    },
    topTitle: {
        fontWeight: 700,
    },
    main: {
        display: 'flex',
        flexDirection: 'column'
    },
    qna: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 15
    },
    normal: {

    },
    ques: {
        fontWeight: 500
    },
    ans: {

    },
    mcqView: {
        display: 'flex',
        gap: '2rem',
        margin: 5,
        flexWrap: 'wrap'
    },
    ansContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
});

const QuestionPaperPage: FC = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const ref = useRef();
    const [ansOnOff, setAnsOnOff] = useState(false);
    const isLoggedIn = useAuth();

    const [loading, setLoading] = useState(false);
    const [questionPaperData, setQuestionPaperData] = useState<any>({});
    const [questionAnswerData, setQuestionAnswerData] = useState([]);

    const [isClient, setIsClient] = useState(false)

    const handleGetQuestionPaperData = async (id: any) => {
        setLoading(true);
        try {
            const data = await axios.get(`/admin/question/paper/${id}`,);
            if (data?.data?.success) {
                setQuestionPaperData(data?.data?.data)
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
    }

    const handleGetAnswerPaperData = async (id: any) => {
        setLoading(true);
        try {
            const data = await axios.get(`/admin/question/ans/paper/${id}`,);
            if (data?.data?.success) {
                setQuestionAnswerData(data?.data?.data)
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
    }

    useEffect(() => {
        if (router.isReady) {
            handleGetAnswerPaperData(router?.query?.id);
            handleGetQuestionPaperData(router?.query?.id)
            setIsClient(true)
        }
    }, [router.isReady])

    const [modalData, setmodalData] = useState({
        name: "",
        subject: "",
        date: "",
        marks: ""
    })
    const [loadingQ, setLoadingQ] = useState(false);

    const handleUpdateQuestionPaper = async () => {
        setLoadingQ(true);
        try {
            // const { question, option1, ans, option2, option3, option4 } = qna;
            const data = await axios.put(`/admin/question/paper/${router.query.id}`, {
                subject: modalData?.subject !== '' ? modalData?.subject : questionPaperData?.subject,
                date: modalData?.date !== '' ? dayjs(modalData?.date).toISOString() : questionPaperData?.date,
                marks: modalData?.marks !== '' ? modalData?.marks : questionPaperData?.marks
            });
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    color: 'blue',
                    message: "Question Answer updated successfully !",
                });
                setLoadingQ(false);
                setTimeout(() => {
                    window.location.reload();
                }, 500)
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
            setLoadingQ(false);
        }
    }

    let mcqAlphas = ['a. ', 'b. ', 'c. ', 'd. ', 'e.', 'f.', 'g.', 'h.', 'i.']

    const Doc = () => {
        return (<Document>
            <Page size="A4" style={styles.page} >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="https://theprayasindia.com/wp-content/uploads/2021/05/Logo-1.png" height={70} width={160} />
                </div>
                <View style={styles.section}>
                    <Text style={styles.topTitle}>Date : {dayjs(questionPaperData?.date).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.topTitle}>Subject : {questionPaperData?.subject}</Text>
                    <Text style={styles.topTitle}>Marks : {questionPaperData?.marks}</Text>
                </View>

                <View style={styles.main}>
                    {questionAnswerData?.map((itm: any, i: Number) => {
                        return (
                            <View key={itm?._id} style={styles.qna}>
                                <Text style={styles.ques}>{Number(i) + 1}. {itm?.question}</Text>
                                {
                                    itm?.type === "normal" ? <View style={styles.normal}>
                                        {
                                            ansOnOff && <Text>Ans: {itm?.ans}</Text>
                                        }
                                    </View> :
                                        <View style={styles.ansContainer}>
                                            <View style={styles.mcqView}>{
                                                itm?.mcq?.map((itm: any, i) => {
                                                    return itm && <Text key={itm}>{mcqAlphas[i]}{itm}</Text>
                                                })
                                            }</View>
                                            {
                                                ansOnOff && <Text>Ans: {itm?.ans}</Text>
                                            }
                                        </View>
                                }
                            </View>
                        )
                    })}
                </View>
            </Page>
        </Document>)
    }


    return (
        <div className={classes.container}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#fff', paddingBottom: '1rem', top: '0', position: 'sticky', zIndex: 12233 }}>
                <Title className={classes.title}><Text>{questionPaperData.name}</Text></Title>
                <div style={{ marginTop: '1rem' }}>
                    <Popover width={900} position="bottom" withArrow shadow="md" id="popverddnotes" >
                        <Popover.Target>
                            <Button>Add Question</Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <AnswerTab qpid={router?.query?.id} isUpdate={false} />
                        </Popover.Dropdown>
                    </Popover>
                </div>
            </div>

            <Tabs defaultValue="editor" id='tabid' style={{ width: 900, margin: "0 auto" }}>
                <Tabs.List>
                    <Tabs.Tab value="editor" >Editor</Tabs.Tab>
                    <Tabs.Tab value="preview" >Preview</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="editor" pt="xs" >
                    <main className={classes.leftSide}>
                        <Card shadow={"xs"} className={classes.questionContainer}>
                            <div className="w-full" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <TextInput
                                    label="Subject"
                                    required
                                    // value={modalData.subject}
                                    defaultValue={questionPaperData.subject}
                                    onChange={(event) => setmodalData({ ...modalData, subject: event.currentTarget.value })}
                                    id="subjectinput"
                                    style={{ width: 300 }}
                                />
                                <TextInput
                                    label="Marks"
                                    required
                                    // value={modalData.marks}
                                    defaultValue={questionPaperData.marks}
                                    onChange={(event) => setmodalData({ ...modalData, marks: event.currentTarget.value })}
                                    id="marksinput"
                                    style={{ width: 300 }}
                                    type="number"
                                />

                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label>Date</label>
                                    <DatePicker style={{ width: "100%", height: 40 }}
                                        value={questionPaperData.date}
                                        onChange={(event: any) => {
                                            setmodalData({ ...modalData, date: event })
                                        }}
                                    />
                                </div>


                                <div style={{ display: "flex", marginTop: "1rem" }}>
                                    <Button size='sm' style={{ width: "100%" }} onClick={handleUpdateQuestionPaper}>Save</Button>
                                </div>
                            </div>
                        </Card>

                        {
                            questionAnswerData?.map((itm: any, i: Number) => {
                                return <AnswerTab
                                    id={itm?._id}
                                    qpid={router?.query?.id}
                                    question={itm?.question}
                                    option1={itm?.mcq[0]}
                                    option2={itm?.mcq[1]}
                                    option3={itm?.mcq[2]}
                                    option4={itm?.mcq[3]}
                                    option5={itm?.mcq[4]}
                                    option6={itm?.mcq[5]}
                                    option7={itm?.mcq[6]}
                                    option8={itm?.mcq[7]}
                                    ans={itm?.ans}
                                    isUpdate={true}
                                />
                            })
                        }
                    </main>
                </Tabs.Panel>

                <Tabs.Panel value="preview" pt="xs">
                    <main className={classes.rightSide}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Switch onChange={e => setAnsOnOff(!ansOnOff)} onLabel="ANS" offLabel="ANS" size="md" id="swid" label="Show Answers on/off" />
                                {/* {
                                    isClient && <PDFDownloadLink document={<Doc />} fileName="question.pdf">
                                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Question Paper')}
                                    </PDFDownloadLink>
                                } */}
                                <ReactToPrint
                                    // onBeforePrint={() => { styles.page.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
                                    trigger={() => <Button className="g-font">Download Question Paper</Button>}
                                    content={() => ref.current}
                                />
                            </div>
                            <div ref={ref}>
                                <Doc />
                            </div>
                        </div>
                    </main>
                </Tabs.Panel>
            </Tabs>
        </div>
    )

}

export default QuestionPaperPage;