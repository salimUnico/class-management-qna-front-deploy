import { FC, useEffect, useState, useRef } from 'react';
import { Button, Switch, Card, TextInput, Title, Tabs, Popover, Textarea, FileInput, Text } from '@mantine/core';
import useStyles from '../../styles/question-paper.style';

import { showNotification } from '@mantine/notifications';
import axios from '../../helper/axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { PlusIcon } from '@modulz/radix-icons';
import ReactToPrint from 'react-to-print';

import UploadImage from '../../helper/imageUpload';


const QuestionPaperPage: FC = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const ref = useRef();
    const [ansOnOff, setAnsOnOff] = useState(false);

    const [loading, setLoading] = useState(false);
    const [notesData, setNotesData] = useState<any>({});

    const handleGetNotes = async (id: any) => {
        setLoading(true);
        try {
            const data = await axios.get(`/admin/notes/single/${id}`,);
            if (data?.data?.success) {
                setNotesData(data?.data?.data)
                seteditorOption(data?.data?.data?.json)
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
            handleGetNotes(router?.query?.id)
        }
    }, [router.isReady])

    useEffect(() => {
        // console.log(ansOnOff)
    }, [ansOnOff])
    const [loadingQ, setLoadingQ] = useState(false);

    const handleUpdateNotes = async () => {
        setLoadingQ(true);
        try {
            // const { question, option1, ans, option2, option3, option4 } = qna;
            const data = await axios.put(`/admin/notes/${router.query.id}`, { json: editorOption });
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    color: 'blue',
                    message: "Notes published successfully !",
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

    let mcqAlphas = ['a. ', 'b. ', 'c. ', 'd. ']

    const Doc = () => {
        return (<div style={{
            // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            width: '770px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column'
        }} >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="https://theprayasindia.com/wp-content/uploads/2021/05/Logo-1.png" height={50} width={130} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: 25 }}>Topic: {notesData?.name}</h1>
            </div>
            {
                editorOption.map((item: any, i) => {
                    if (item?.type === 'title') {
                        return <h1 key={item?.id} style={{ fontSize: '40px', fontWeight: 'bold' }}>{item?.value}</h1>
                    }
                    if (item?.type === 'subtitle') {
                        return <h3 key={item?.id} style={{ fontSize: '25px', fontWeight: '400' }}>{item?.value}</h3>
                    }
                    if (item?.type === 'about') {
                        return <p key={item?.id} style={{ fontSize: '16px' }}>{item?.value}</p>
                    }
                    if (item?.type === 'addimg') {
                        return <img key={item?.id} src={item?.value} height={item?.h ?? 400} width={item?.w ?? 450} alt="img" style={{ marginBottom: '1rem', objectFit: 'cover' }} />
                    }
                })
            }
        </div >)
    }

    const [modalData, setmodalData] = useState({
        title: "",
        subtitle: "",
        about: "",
        addimg: ""
    })


    const [editorOption, seteditorOption] = useState([])

    const addOption = (type, data) => {
        seteditorOption((old) => {
            return [...old, {
                id: old.length + 1,
                value: "",
                type,
                ...data
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

    console.log('aaaaaaaaaaa', editorOption)

    return (
        <div className={classes.container}>
            <div style={{ display: "flex", alignItems: "center", position: "sticky", top: 0, width: "100%", zIndex: 1234 }}>
                <Title className={classes.title}><Text>{notesData?.name}</Text></Title>

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
                                addOption("addimg", { h: 10, w: 10 })
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

            <Tabs defaultValue="editor" id='tabid' style={{ width: 1000, margin: "0 auto" }}>
                <Tabs.List>
                    <Tabs.Tab value="editor" >Editor</Tabs.Tab>
                    <Tabs.Tab value="preview" >Preview</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="editor" pt="xs">
                    <main>
                        {/* {
                            !loading ? notesData?.map((itm: any, i) => {
                                return 
                            }) : ''
                        } */}
                        {editorOption.length > 0 && <Card shadow={"xs"} className={classes.questionContainer}>
                            <div className="w-full" style={{ width: 900 }}>
                                {
                                    editorOption.map((item: any, index) => {
                                        return <div>
                                            {
                                                item.type == "title" ? <TextInput
                                                    label="Title"
                                                    required
                                                    value={item.value}
                                                    id="titleinput"
                                                    style={{ marginBottom: "0.5rem", width: "80%" }}

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
                                                            : item.type == "addimg" &&
                                                            <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center', gap: '1rem', borderRadius: '5px' }}>
                                                                <div>
                                                                    <img src={item?.value} height={100} width={140} style={{ objectFit: 'cover' }} />
                                                                </div>
                                                                <div>
                                                                    <FileInput value={item.value} onChange={async (e) => {
                                                                        let refName = `notes_image/${Date.now()}_notes`;
                                                                        const res = await UploadImage(e, refName);
                                                                        // console.log(res)
                                                                        changeValue({ ...item, value: res })
                                                                    }} label={`Add Image`} placeholder="Click Here" accept="image/png,image/jpeg" />
                                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                                        <TextInput label="height" id="height" value={item?.h} onChange={(e) => changeValue({ ...item, h: e.currentTarget.value })} />
                                                                        <TextInput label="width" id="width" value={item?.w} onChange={(e) => changeValue({ ...item, w: e.currentTarget.value })} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                            }
                                            <Button color="red" onClick={() => seteditorOption((old) => old.filter((data: any) => data.id != item.id))}>Delete</Button>
                                        </div>
                                    })
                                }

                                <div style={{ display: "flex", marginTop: "1rem" }}>
                                    <Button size='sm' style={{ width: "100%" }} onClick={handleUpdateNotes} loading={loadingQ}>Save</Button>
                                </div>
                            </div>
                        </Card>}

                    </main>
                </Tabs.Panel>

                <Tabs.Panel value="preview" pt="xs">

                    <main className={classes.rightSide}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                            <div style={{ display: 'flex', gap: '1rem' }}><div>
                                <ReactToPrint
                                    // onBeforePrint={() => { styles.page.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
                                    trigger={() => <Button className="g-font">Download Notes</Button>}
                                    content={() => ref.current}
                                />
                            </div>
                            </div>
                            <div ref={ref}>
                                <Doc />
                            </div>
                        </div>
                    </main>
                </Tabs.Panel>
            </Tabs >


        </div >
    )
}

export default QuestionPaperPage;