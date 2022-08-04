import { FC, useEffect, useState } from 'react';
import { Button, Switch, Card, TextInput, Title, Tabs, Popover, Textarea, FileInput } from '@mantine/core';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, } from '@react-pdf/renderer';
// import dynamic from 'next/dynamic';
// const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer'), {
//     ssr: false
// });
// import DatePicker from "react-datepicker";
import useStyles from '../../styles/question-paper.style';

import { showNotification } from '@mantine/notifications';
import axios from '../../helper/axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import AnswerTab from '../../components/AnswerTabs';


import DatePicker from "react-multi-date-picker"
import { PlusIcon } from '@modulz/radix-icons';

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

    const Doc = () => {
        return (<Document>
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
                                    itm?.type === "normal" ? <View style={styles.normal}>
                                        {
                                            ansOnOff && <Text>Ans: {itm?.ans}</Text>
                                        }
                                    </View> :
                                        <View style={styles.ansContainer}>
                                            <View style={styles.mcqView}>{
                                                itm?.mcq?.map((itm: any, i) => {
                                                    return <Text key={itm}>{mcqAlphas[i]}{itm}</Text>
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

    const [modalData, setmodalData] = useState({
        title: "",
        subtitle: "",
        about: "",
        addimg: ""
    })


    const [editorOption, seteditorOption] = useState([])

    const addOption = (type) => {
        seteditorOption((old) => {
            return [...old, {
                id: old.length + 1,
                value: "",
                type
            }]
        })
    }

    const changeValue = (data) => {
        let finalArr = editorOption.map((item) => {
            if (item.id == data.id) {
                return data;
            } else {
                return item;
            }
        })

        seteditorOption(finalArr)
    }

    console.log('aaaaaaaaaaa',editorOption)

    return (
        <div className={classes.container}>
            <div style={{ display: "flex", alignItems: "center", position: "sticky", top: 0, width: "100%", zIndex: 1234 }}>
                <Title className={classes.title}><Text>{questionPaperData.name}</Text></Title>

                <Popover width={200} position="bottom" withArrow shadow="md" id='addPopover'>
                    <Popover.Target>
                        <Button leftIcon={<PlusIcon />} style={{ marginLeft: "2rem", marginTop: "1rem" }} >Add</Button>
                    </Popover.Target>
                    <Popover.Dropdown >
                        <div className='popover-container' style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}>
                            <span onClick={() => {
                                addOption("title")
                            }} className={`option`}>Create Title </span>
                            <span onClick={() => {
                                addOption("subtitle")
                            }} className={`option `}>Create Sub title</span>
                            <span onClick={() => {
                                addOption("about")
                            }} className={`option`}>Create paragrah</span>
                            <span onClick={() => {
                                addOption("addimg")
                            }} className={`option`}>Add Image</span>
                        </div>
                    </Popover.Dropdown>
                    <style jsx>{`
                        .popover-container .option{
                            margin-bottom: 0.8rem;
                            cursor: pointer;
                        }

                        .popover-container .option:hover{
                            color: gray;
                        }
                        
                        `}</style>
                </Popover>

            </div>

            <Tabs defaultValue="editor" id='tabid' style={{ width: 500, margin: "0 auto" }}>
                <Tabs.List>
                    <Tabs.Tab value="editor" >Editor</Tabs.Tab>
                    <Tabs.Tab value="preview" >Preview</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="editor" pt="xs">
                    <main>
                        {editorOption.length > 0 && <Card shadow={"xs"} className={classes.questionContainer}>


                            <div className="w-full" style={{ width: 400 }}>
                                {
                                    editorOption.map((item, index) => {
                                        return <div >
                                            {
                                                item.type == "title" ? <TextInput
                                                    label="Title"
                                                    required
                                                    value={item.value}
                                                    id="titleinput"
                                                    style={{ marginBottom: "0.5rem",width: "80%" }}

                                                    onChange={(e) => changeValue({ ...item, value: e.currentTarget.value })}
                                                />
                                                    : item.type == "subtitle" ? <TextInput
                                                        label="Sub Title"
                                                        required
                                                        value={item.value}
                                                        onChange={(e) => changeValue({ ...item, value: e.currentTarget.value })}
                                                        id="subtitleinput"
                                                        style={{ marginBottom: "0.5rem" }}
                                                    />
                                                        : item.type == "about" ? <Textarea
                                                            label="About"
                                                            required
                                                            value={item.value}
                                                            onChange={(e) => changeValue({ ...item, value: e.currentTarget.value })}
                                                            id="aboutinput"
                                                            style={{ marginBottom: "0.5rem" }}
                                                        />
                                                            : item.type == "addimg" && <FileInput value={item.value} onChange={(e) => changeValue({ ...item, value: e })} label="Add Image" placeholder="Click Here" accept="image/png,image/jpeg" />
                                            }
                                            <Button color="red" onClick={() => seteditorOption((old) => old.filter((data) => data.id != item.id))}>Delete</Button>
                                        </div>
                                    })
                                }



                                <div style={{ display: "flex", marginTop: "1rem" }}>
                                    <Button size='sm' style={{ width: "100%" }}>Save</Button>
                                </div>
                            </div>
                        </Card>}

                    </main>
                </Tabs.Panel>

                <Tabs.Panel value="preview" pt="xs">


                    <main className={classes.rightSide}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Switch onChange={e => setAnsOnOff(!ansOnOff)} onLabel="ANS" offLabel="ANS" size="md" id="swid" label="Show Answers on/off" />
                                {
                                    isClient && <PDFDownloadLink document={<Doc />} fileName="question.pdf">
                                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Question Paper')}
                                    </PDFDownloadLink>
                                }
                            </div>
                            <Doc />
                        </div>
                    </main>
                </Tabs.Panel>
            </Tabs>


        </div>
    )
}

export default QuestionPaperPage;