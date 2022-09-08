// @ts-nocheck
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
import { BrandDribbble, BrandFacebook, BrandInstagram, BrandLinkedin, BrandTwitter, BrandWhatsapp, BrandYoutube, Message } from 'tabler-icons-react';

import dynamic from 'next/dynamic';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false },index);
// import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';

//table
// import ReactQuill from 'react-quill-with-table';
// import QuillBetterTable from 'quill-better-table';
// const ReactQuill = dynamic(() => import('react-quill-with-table'), {
//     ssr: false,
// });
// const QuillBetterTable = dynamic(() => import('quill-better-table'), {
//     ssr: false,
// });

// import "react-quill-with-table/dist/quill.snow.css";
// import "react-quill-with-table/dist/quill.bubble.css";

import TextEditor from '../../components/TextEditor';
// import 'jodit/build/jodit.min.css'

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
                updateData = data?.data?.data?.json;

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
            const data = await axios.put(`/admin/notes/${router.query.id}`, { json: updateData });
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

            <div className="watermark-container" >
                <img src='/prayas.jpg' />
            </div>

            <div className='logo-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="https://theprayasindia.com/wp-content/uploads/2021/05/Logo-1.png" height={100} width={250} style={{ objectFit: "contain" }} />
            </div>

            <table className='border-none'>
                <thead  className='border-none'>
                    <tr className='border-none'><td className='border-none'>
                        <div className="header-space"></div>

                    </td></tr>
                </thead>
                <tbody className='border-none'>
                    <tr className='border-none'><td  className='border-none'>

                        <div className="container w-full" style={{}}>
                            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h1 style={{ margin: 0, fontSize: 25 }}>Topic: {notesData?.name}</h1>
                            </div> */}
                            {
                                editorOption.map((item: any, i) => {
                                    return <>
                                        {
                                            item?.type === 'title' ? <h1 key={item?.id} style={{ fontSize: '40px', fontWeight: 'bold', marginTop: 0, textAlign: "center" }}>{item?.value}</h1> :
                                                item?.type === 'subtitle' ? <h3 key={item?.id} style={{ fontSize: '25px', fontWeight: 400 }}>{item?.value}</h3> :
                                                    item?.type === 'about' ? <div style={{ marginLeft: '-1rem' }} className="w-fill jodit-wysiwyg" key={item?.id} dangerouslySetInnerHTML={{ __html: item?.value }} /> :
                                                        item?.type === 'addimg' ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <img key={item?.id} src={item?.value} height={item?.h ?? 400} width={item?.w ?? 450} alt="img" style={{ marginBottom: '1rem', objectFit: 'cover' }} />
                                                        </div> : null
                                        }
                                    </>
                                })
                            }
                        </div>

                    </td></tr>
                </tbody>
                <tfoot className='border-none'>
                    <tr className='border-none'><td className='border-none'>
                        <div className="footer-space"></div>
                    </td></tr>
                </tfoot>
            </table>

            <footer className='print-footer-container flex flex-col items-center border-none '>
                <div className="top w-full flex items-center justify-between">
                    <a href='mailto:info@theprayasindia.com' target={"_blank"} className='contain'>
                        <Message strokeWidth={2} color='#85053f' />
                        <span>info@theprayasindia.com</span>
                    </a>
                    <div className='contain'>
                        <BrandWhatsapp strokeWidth={2} color='#85053f' />
                        <span><a href='tel:7710013217'>+91-7710013217</a> / <a href='tel:9892560176'>9892560176</a></span>
                    </div>
                    <div className='contain'>
                        <span>Follow Us</span>
                        <div style={{ marginLeft: "0.5rem" }}>
                            <a style={{ color: "#85053f" }} href="https://www.facebook.com/ThePrayasIndiaedu/" target={"_blank"}><BrandFacebook strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} /></a>
                            <a style={{ color: "#85053f" }} href="http://instagram.com/theprayasindia/" target={"_blank"}><BrandInstagram strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} /></a>
                            <a style={{ color: "#85053f" }} href="https://www.youtube.com/c/ThePrayasePathshala" target={"_blank"}><BrandYoutube strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} /></a>
                            {/* <a style={{ color: "#85053f" }} href="https://www.theprayasindia.com/" target={"_blank"}><BrandDribbble strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} /></a> */}
                            <a style={{ color: "#85053f" }} href="https://www.linkedin.com/in/the-prayas-india-552a83110/" target={"_blank"}><BrandLinkedin strokeWidth={2} color='#85053f' /></a>
                        </div>
                    </div>
                </div>
                <div className="bottom w-full">
                    <a style={{ color: "white" }} href='https://theprayasindia.com' target={"_blank"}>
                        <h2>https://theprayasindia.com'</h2>
                    </a>
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
                .print-footer-container a{
                    color: black;
                    text-decoration: none;
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
    let updateData = editorOption;

    const addOption = (type, data) => {
        seteditorOption((old) => {
            let finalArr = [...old, {
                id: old?.length ? old[old?.length - 1]?.id + 1 : old.length - 1,
                value: "",
                type,
                ...data
            }]
            updateData = finalArr;
            return finalArr;
        })
    }

    const changeValue = (data, i) => {
        // let finalArr = editorOption.map((item) => {
        //     if (item.id == data.id) {
        //         return data;
        //     } else {
        //         return item;
        //     }
        // })


        // let finalArr = [...editorOption];
        // finalArr[i].value = data.value;
        // seteditorOption(finalArr)

        // finalArr[i].value = data.value;
        updateData[i].value = data.value;
    }


    return (
        <div className={classes.container}>
            <div style={{ display: "flex", alignItems: "center", position: "sticky", top: 0, width: "100%", zIndex: 1234, background: '#fff' }}>
                <Link href={"/notes"}><a style={{ marginTop: '1rem', marginLeft: '2rem', cursor: 'pointer' }}><HomeIcon height={31} width={31} /></a></Link>
                <Title className={classes.title} style={{ paddingLeft: "1rem" }} ><Text>{notesData?.name}</Text></Title>
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
                                                    defaultValue={item.value}
                                                    id="titleinput"
                                                    style={{ marginBottom: "0.5rem", width: "80%" }}

                                                    onChange={(e) => changeValue({ value: e.currentTarget.value }, index)}
                                                />
                                                    : item.type == "subtitle" ? <TextInput
                                                        label="Sub Title"
                                                        required
                                                        defaultValue={item.value}
                                                        onChange={(e) => changeValue({ value: e.currentTarget.value }, index)}
                                                        id="subtitleinput"
                                                        style={{ marginBottom: "0.5rem" }}
                                                    />
                                                        : item.type == "about" ? <>
                                                            {/* <ReactQuill theme="snow" style={{ margin: "1rem 0" }}
                                                                modules={{
                                                                    toolbar: [
                                                                        [{ header: [1, 2, false] }],
                                                                        ["bold", "italic", "underline", "strike", "blockquote"],
                                                                        [{ list: "ordered" }, { list: "bullet" }],
                                                                        [{ 'color': [] }, { 'background': [] }]
                                                                    ]
                                                                }}
                                                                formats={[
                                                                    "header",
                                                                    "bold",
                                                                    "italic",
                                                                    "underline",
                                                                    "strike",
                                                                    "blockquote",
                                                                    "list",
                                                                    "bullet",
                                                                    "indent",
                                                                    "color",
                                                                    "background"
                                                                ]}

                                                                defaultValue={item.value}
                                                                onChange={(e) => {
                                                                    if (item.value !== e) {
                                                                        changeValue({ value: e },index)
                                                                        console.log(e)
                                                                    }
                                                                }} /> */}
                                                            {/* <Textarea
                                                                label="Paragraph"
                                                                required
                                                                defaultValue={item.value}
                                                                onChange={(e) => changeValue({ value: e.currentTarget.value },index)}
                                                                id="aboutinput"
                                                                style={{ marginBottom: "0.5rem" }}
                                                            /> */}

                                                            <TextEditor content={item.value} setContent={(e) => {
                                                                changeValue({ value: e }, index);
                                                            }}  />
                                                        </>
                                                            : item.type == "addimg" &&
                                                            <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center', gap: '1rem', borderRadius: '5px' }}>
                                                                <div>
                                                                    <img src={item?.value} height={100} width={140} style={{ objectFit: 'cover' }} />
                                                                </div>
                                                                <div>
                                                                    <FileInput defaultValue={item.value} onChange={async (e) => {
                                                                        let refName = `notes_image/${Date.now()}_notes`;
                                                                        const res = await UploadImage(e, refName);
                                                                        // console.log(res)
                                                                        changeValue({ value: res })
                                                                    }} label={`Add Image`} placeholder="Click Here" accept="image/png,image/jpeg" />
                                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                                        <TextInput label="height" id="height" defaultValue={item?.h} onChange={(e) => changeValue({ h: e.currentTarget.value }, index)} />
                                                                        <TextInput label="width" id="width" defaultValue={item?.w} onChange={(e) => changeValue({ w: e.currentTarget.value }, index)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                            }
                                            <Button color="red"
                                                // onClick={() => seteditorOption((old) => old.filter((data: any) => data.id != item.id))}
                                                onClick={() => {
                                                    updateData = updateData.filter((data: any) => data.id != item.id);
                                                    seteditorOption(updateData);
                                                }}
                                                style={{ marginBottom: "1rem",marginTop: "1rem" }}
                                            >Delete</Button>
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

// export async function getStaticProps(context) {
//     return {
//         props: {}, // will be passed to the page component as props
//     }
// }