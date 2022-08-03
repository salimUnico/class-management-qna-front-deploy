import { FC, useEffect, useState } from 'react';
import { Button, Switch, Card, TextInput, Title, } from '@mantine/core';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, } from '@react-pdf/renderer';
// import dynamic from 'next/dynamic';
// const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer'), {
//     ssr: false
// });
import DatePicker from "react-datepicker";
import useStyles from '../../styles/question-paper.style';

import { showNotification } from '@mantine/notifications';
import axios from '../../helper/axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import AnswerTab from '../../components/AnswerTabs';

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        width: '700px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
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

    const [ansOnOff, setAnsOnOff] = useState(false);

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

    useEffect(() => {
        console.log(ansOnOff)
    }, [ansOnOff])

    const handleQuestionUpdate = async () => {

    }
    const handleAddQA = async () => {

    }

    let mcqAlphas = ['a. ', 'b. ', 'c. ', 'd. ']
    return (
        <div className={classes.container}>
            <Title className={classes.title}><Text>{questionPaperData.name}</Text></Title>
            <main className={classes.leftSide}>
                <Card shadow={"xs"} className={classes.questionContainer}>
                    <TextInput placeholder={questionPaperData.subject} label="Question Paper Subject" style={{ width: '400px' }} id="subject" />
                    <TextInput placeholder={questionPaperData.marks} label="Total Marks" style={{ width: '400px' }} id="makrs" />
                    <DatePicker
                        className="datepicker"
                    // selected={startDate} onChange={(date:Date) => setStartDate(date)} 
                    />
                    <Button onClick={handleQuestionUpdate}>Save</Button>
                </Card>
                <AnswerTab />
                {
                    questionAnswerData?.map((itm: any, i: Number) => {
                        return <AnswerTab
                            question={itm?.question}
                            option1={itm?.mcq[0]}
                            option2={itm?.mcq[1]}
                            option3={itm?.mcq[2]}
                            option4={itm?.mcq[3]}
                            ans={itm?.ans}
                            isUpdate={true}
                        />
                    })
                }
            </main>
            <main className={classes.rightSide}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Switch onChange={e => setAnsOnOff(!ansOnOff)} onLabel="ANS" offLabel="ANS" size="md" id="swid" label="Show Answers on/off" />
                    <Document>
                        <Page size="A4" style={styles.page}>

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
                                                ansOnOff && (
                                                    itm?.type === "normal" ? <View style={styles.normal}>
                                                        <Text>Ans: {itm?.ans}</Text>
                                                    </View> :
                                                        <View style={styles.ansContainer}>
                                                            <View style={styles.mcqView}>{
                                                                itm?.mcq?.map((itm: any, i) => {
                                                                    return <Text key={itm}>{mcqAlphas[i]}{itm}</Text>
                                                                })
                                                            }</View>
                                                            <Text>Ans: {itm?.ans}</Text>
                                                        </View>

                                                )
                                            }
                                        </View>
                                    )
                                })}
                            </View>
                        </Page>
                    </Document>
                </div>
            </main>
        </div>
    )
}

export default QuestionPaperPage;