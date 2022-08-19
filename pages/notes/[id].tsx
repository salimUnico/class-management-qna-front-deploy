import { FC, useEffect, useState, useRef } from 'react';
import { Button, Switch, Card, TextInput, Title, Tabs, Popover, Textarea, FileInput, Text } from '@mantine/core';
import useStyles from '../../styles/question-paper.style';

import { showNotification } from '@mantine/notifications';
import axios from '../../helper/axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { PlusIcon, EnvelopeClosedIcon } from '@modulz/radix-icons';
import ReactToPrint from 'react-to-print';

import UploadImage from '../../helper/imageUpload';
import { HomeIcon } from '@modulz/radix-icons';
import { BrandFacebook, BrandInstagram, BrandLinkedin, BrandTwitter, BrandWhatsapp, Message } from 'tabler-icons-react';


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
            width: '1000px',
            padding: '3rem',
            paddingTop: "0",
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }} className="page-container">

            <div className="watermark-container">
                <img src='/unico.png' />
            </div>

            <div className='logo-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="https://theprayasindia.com/wp-content/uploads/2021/05/Logo-1.png" height={100} width={250} style={{ objectFit: "contain" }} />
            </div>

            <table>
                <thead>
                    <tr><td>
                        <div className="header-space"></div>

                    </td></tr>
                </thead>
                <tbody>
                    <tr><td>

                        <div className="container w-full">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h1 style={{ margin: 0, fontSize: 25 }}>Topic: {notesData?.name}</h1>
                            </div>
                            {
                                editorOption.map((item: any, i) => {
                                    return <>
                                        {
                                            item?.type === 'title' ? <h1 key={item?.id} style={{ fontSize: '40px', fontWeight: 'bold' }}>{item?.value}</h1> :
                                                item?.type === 'subtitle' ? <h3 key={item?.id} style={{ fontSize: '25px', fontWeight: 400 }}>{item?.value}</h3> :
                                                    item?.type === 'about' ? <p key={item?.id} style={{ fontSize: '16px' }}>{item?.value}</p> :
                                                        item?.type === 'addimg' ? <img key={item?.id} src={item?.value} height={item?.h ?? 400} width={item?.w ?? 450} alt="img" style={{ marginBottom: '1rem', objectFit: 'cover' }} /> :
                                                            null
                                        }
                                    </>
                                })
                            }
                        </div>

                    </td></tr>
                </tbody>
                <tfoot>
                    <tr><td>
                        <div className="footer-space"></div>
                    </td></tr>
                </tfoot>
            </table>

            <footer className='print-footer-container flex flex-col items-center'>
                <div className="top w-full flex items-center justify-between">
                    <div className='contain'>
                        <Message strokeWidth={2} color='#85053f' />
                        <span>info@theprayasindia.com</span>
                    </div>
                    <div className='contain'>
                        <BrandWhatsapp strokeWidth={2} color='#85053f' />
                        <span>+91-7710013217 / 9892560176</span>
                    </div>
                    <div className='contain'>
                        <span>Follow Us</span>
                        <div style={{ marginLeft: "0.5rem" }}>
                            <BrandFacebook strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} />
                            <BrandInstagram strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} />
                            <BrandTwitter strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} />
                            <BrandLinkedin strokeWidth={2} color='#85053f' />
                        </div>
                    </div>
                </div>
                <div className="bottom w-full">
                    <h2>www.theprayasindia.com/e-pathshala</h2>
                </div>
            </footer>

            <style jsx>{`
                .watermark-container {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    z-index: -1;
                    display: flex;
                    align-items: center;
                    justify-content: center
                    
                }
                .watermark-container img{
                    height: 400px;
                    width: 400px;
                    opacity: 0.2;
                }


                .logo-container{
                    margin-bottom: 2rem;
                }

                .logo-container::before,
                .logo-container::after{
                    display: inline-block;
                    content: "";
                    border-top: .3rem solid #85053f;
                    width: 100%;
                    transform: translateY(1rem);
                }


                .print-footer-container {
                    margin-top: 2rem;
                }

                .print-footer-container .top .contain{
                    display: flex;
                    align-items: center;
                }

                .print-footer-container .top .contain span{
                    font-weight: bold;
                    font-size: 18px;
                    font-family: sans-serif;
                    margin-left: 0.5rem;
                }

                .print-footer-container .bottom {
                    background: #85053f;
                    margin-top: 0.5rem;

                }

                .print-footer-container .bottom h2{
                    color: white;
                    font-size: 16px;
                    text-align: center;
                }
            
            
            `}</style>

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
                id: old?.length ? old[old?.length - 1]?.id + 1 : old.length - 1,
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


    return (
        <div className={classes.container}>
            <div style={{ display: "flex", alignItems: "center", position: "sticky", top: 0, width: "100%", zIndex: 1234, background: '#fff' }}>
                <HomeIcon height={31} width={31} style={{ marginTop: '1rem', marginLeft: '2rem', marginRight: '-1rem', cursor: 'pointer' }} onClick={() => router.push('/notes')} />
                <Title className={classes.title}><Text>{notesData?.name}</Text></Title>
                <Popover width={200} position="bottom" withArrow shadow="md" id='addPopover'>
                    <Popover.Target>
                        <Button leftIcon={<PlusIcon />} style={{ marginLeft: "2rem", marginTop: "1rem" }} >Add</Button>
                    </Popover.Target>
                    <Popover.Dropdown >
                        <div className='popover-container' style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}>
                            <span onClick={() => {
                                addOption("title", "")
                            }} className={`option`}>Create Title </span>
                            <span onClick={() => {
                                addOption("subtitle", "")
                            }} className={`option `}>Create Sub title</span>
                            <span onClick={() => {
                                addOption("about", "")
                            }} className={`option`}>Create paragrah</span>
                            <span onClick={() => {
                                addOption("addimg", { h: 210, w: 510 })
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
                                                            label="Paragraph"
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
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: "3rem" }}><div>
                                <ReactToPrint
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