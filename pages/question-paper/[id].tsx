// import { FC, useEffect, useState, useRef } from 'react';
// import { Button, Switch, Card, TextInput, Title, Tabs, Popover } from '@mantine/core';
// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, } from '@react-pdf/renderer';
// // import dynamic from 'next/dynamic';
// // const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer'), {
// //     ssr: false
// // });
// // import DatePicker from "react-datepicker";
// import useStyles from '../../styles/question-paper.style';
// import ReactToPrint from 'react-to-print';

// import { showNotification } from '@mantine/notifications';
// import axios from '../../helper/axios';
// import dayjs from 'dayjs';
// import { useRouter } from 'next/router';

// import AnswerTab from '../../components/AnswerTabs';

// import useAuth from '../../helper/useAuth';
// import { HomeIcon } from '@modulz/radix-icons';

// import DatePicker from "react-multi-date-picker"
// import type { RichTextEditorProps } from '@mantine/rte';

// //text editor css important
// // import "react-quill/dist/quill.core.css";
// import { BrandFacebook, BrandInstagram, BrandLinkedin, BrandTwitter, BrandWhatsapp, Message } from 'tabler-icons-react';



// import dynamic from 'next/dynamic';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import 'react-quill/dist/quill.snow.css';
// import Link from 'next/link';


// const customStyle = {
//     page: {
//         display: 'flex',
//         flexDirection: 'column',
//         backgroundColor: '#fff',
//         paddingRight: "3rem",
//         height: "100%",
//         marginBottom: 10,
//         padding: "2rem",
//         paddingTop: 0
//         // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
//     },
//     section: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//         flexGrow: 1,
//         marginTop: "2rem"
//     },
//     topTitle: {
//         fontWeight: 700,
//     },
//     main: {
//         // display: 'flex',
//         // flexDirection: 'column',
//         marginTop: "2rem"
//     },
//     qna: {
//         "display": 'flex',
//         "flexDirection": 'column',
//         "height": "fit-content",
//         "margin": "15px 0",
//     },
//     normal: {

//     },
//     ques: {
//         fontWeight: "bolder",
//         fontSize: "20px",
//     },
//     ans: {

//     },
//     mcqView: {
//         display: 'flex',
//         gap: '2rem',
//         margin: "0.5rem 0",
//         flexWrap: 'wrap',
//     },
//     ansContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//         marginBottom: "1rem"
//     },
// };

// const QuestionPaperPage: FC = () => {
//     const { classes } = useStyles();
//     const router = useRouter();
//     const ref = useRef();
//     const [ansOnOff, setAnsOnOff] = useState(false);
//     const isLoggedIn = useAuth();

//     const [loading, setLoading] = useState(false);
//     const [questionPaperData, setQuestionPaperData] = useState<any>({});
//     const [questionAnswerData, setQuestionAnswerData] = useState([]);

//     const [isClient, setIsClient] = useState(false)

//     const handleGetQuestionPaperData = async (id: any) => {
//         setLoading(true);
//         try {
//             const data = await axios.get(`/admin/question/paper/${id}`,);
//             if (data?.data?.success) {
//   setQuestionPaperData(data?.data?.data)
//   setLoading(false);
//             }
//         } catch (error: any) {
//             if (error?.response?.data) {
//                 showNotification({
//                     title: 'Error',
//                     color: 'red',
//                     message: error?.response?.data?.data ?? 'Someting went wrong',
//                 });
//             } else {
//                 showNotification({
//                     title: 'Error',
//                     color: 'red',
//                     message: error?.message ?? 'Something went wrong ',
//                 });
//             }
//             setLoading(false);
//         }
//     }

//     const handleGetAnswerPaperData = async (id: any) => {
//         setLoading(true);
//         try {
//             const data = await axios.get(`/admin/question/ans/paper/${id}`,);
//             if (data?.data?.success) {
//                 setQuestionAnswerData(data?.data?.data)
//                 setLoading(false);
//             }
//         } catch (error: any) {
//             if (error?.response?.data) {
//                 showNotification({
//                     title: 'Error',
//                     color: 'red',
//                     message: error?.response?.data?.data ?? 'Someting went wrong',
//                 });
//             } else {
//                 showNotification({
//                     title: 'Error',
//                     color: 'red',
//                     message: error?.message ?? 'Something went wrong ',
//                 });
//             }
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if (router.isReady) {
//             handleGetAnswerPaperData(router?.query?.id);
//             handleGetQuestionPaperData(router?.query?.id)
//             setIsClient(true)
//         }
//     }, [router.isReady])

//     const [modalData, setmodalData] = useState({
//         name: "",
//         subject: "",
//         marks: "",
//         // datte: ""

//         tbc: "",
//         serialno: "",
//         timeallowed: "",
//         testbookletseries: "",
//         bannerLabel: "",
//         bannerInstructionFirst: null
//     })
//     const [loadingQ, setLoadingQ] = useState(false);

//     let mcqAlphas = ['a: ', 'b: ', 'c: ', 'd: ', 'e:', 'f:', 'g:', 'h:', 'i:']

//     const Doc = () => {
//         return (<div style={{
//             width: '1000px',
//             paddingLeft: "3rem",
//             paddingRight: "3rem",
//             display: 'flex',
//             flexDirection: 'column',
//             position: 'relative'
//         }}>

//             <div className="watermark-container">
//                 <img src='/prayas.jpg' />
//             </div>

//             <div className='logo-container question' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <img src="https://theprayasindia.com/wp-content/uploads/2021/05/Logo-1.png" height={100} width={250} style={{ objectFit: "contain" }} />
//             </div>


//             <table>
//                 <thead>
//                     <tr><td>
//                         <div className="header-space"></div>
//                     </td></tr>
//                 </thead>
//                 <tbody>
//                     <tr><td>

//                         {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                             <img src="https://theprayasindia.com/wp-content/uploads/2021/05/Logo-1.png" height={70} width={160} />
//                         </div> */}
//                         <div className="w-full text-center bannerlabel" >
//                             <h3>{questionPaperData.bannerLabel}</h3>
//                         </div>

//                         <div className="w-full flex align-center justify-between header-container">
//                             <div className="left flex flex-col justify-between ">
//                                 <div className='info-contain'>
//                                     <h3 style={{ marginBottom: "0.5rem" }} >
//                                         <span className='bolder key'>T.B.C:</span>
//                                         <span className='value'>{questionPaperData.tbc}</span>
//                                     </h3>
//                                     <h3 className='bolder'>
//                                         <span className='bolder key'>Serial No:</span>
//                                         <span className='value'>{questionPaperData.serialno}</span>
//                                     </h3>
//                                 </div>

//                                 <div className='info-contain'>
//                                     <h3 className='bolder'>
//                                         <span className='bolder key'>Time Allowed:</span>
//                                         <span className='value'>{questionPaperData.timeallowed}</span>
//                                     </h3>
//                                 </div>
//                             </div>
//                             <div className="center flex flex-col text-center justify-center">
//                                 <h2 className='font-none'>{questionPaperData.name}</h2>
//                                 <h2 className="bolder">{questionPaperData.subject}</h2>

//                             </div>
//                             <div className="right  flex flex-col justify-between ">
//                                 <div className="info-contain">
//                                     <h3 className='  flex items-center flex-col text-center'><span className="bolder">Test Booklet Series</span><span className="bolder carc-container">{questionPaperData.testbookletseries}</span></h3>
//                                 </div>
//                                 <div className='info-contain'>
//                                     <h3 className='bolder'>
//                                         <span className='bolder key'>Maximum Marks:</span>
//                                         <span className='value'>{questionPaperData.marks}</span>
//                                     </h3>
//                                 </div>
//                             </div>

//                         </div>

//                         <div className="w-fill ql-editor" dangerouslySetInnerHTML={{ __html: questionPaperData.bannerInstructionFirst }} />

//                         <div className="w-full text-center bannerlabel" style={{ marginTop: "2rem" }} >
//                             <h3>{questionPaperData.bannerLabel}</h3>
//                         </div>


//                         <div style={customStyle.main}>
//                             {questionAnswerData?.map((itm: any, i: any) => {
//                                 return (
//                                     <div key={i} style={customStyle.qna}>
//                                         <h3 style={customStyle.ques}>{Number(i) + 1}. {itm?.question}</h3>
//                                         {
//                                             itm?.type === "normal" ? <div style={customStyle.normal}>
//                                                 {
//                                                     ansOnOff && <p style={{ fontSize: "18px" }}><span className='bolder'>Ans: </span><span style={{ marginLeft: "0.5rem" }}>{itm?.ans}</span></p>
//                                                 }
//                                             </div> :
//                                                 <div style={customStyle.ansContainer}>
//                                                     <div style={customStyle.mcqView}>{
//                                                         itm?.mcq?.map((itm: any, i) => {
//                                                             return itm && <p style={{ fontSize: "18px", }} ><span className='bolder'>{mcqAlphas[i]} </span><span>{itm}</span></p>
//                                                         })
//                                                     }</div>
//                                                     {itm.questionimage && <img src={itm?.questionimage?.url} width={itm?.questionimage?.width} height={itm?.questionimage?.height} style={{}} />}

//                                                     {
//                                                         ansOnOff && <p style={{ fontSize: "18px" }}><span className='bolder'>Ans: </span><span style={{ marginLeft: "0.5rem" }}>{itm?.ans}</span></p>
//                                                     }
//                                                 </div>
//                                         }
//                                         {ansOnOff && itm.answerimage && <img src={itm?.answerimage?.url} width={itm?.answerimage?.width} height={itm?.answerimage?.height} style={{}} />}
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </td></tr>
//                 </tbody>
//                 <tfoot>
//                     <tr><td>
//                         <div className="footer-space"></div>
//                     </td></tr>
//                 </tfoot>
//             </table>



//             <footer className='print-footer-container flex flex-col items-center'>
//                 <div className="top w-full flex items-center justify-between">
//                     <a href='/sasasasas' target={"_blank"} className='contain'>
//                         <Message strokeWidth={2} color='#85053f' />
//                         <span>info@theprayasindia.com</span>
//                     </a>
//                     <div className='contain'>
//                         <BrandWhatsapp strokeWidth={2} color='#85053f' />
//                         <span><a href='tel:7710013217'>+91-7710013217</a> / <a href='tel:9892560176'>9892560176</a></span>
//                     </div>
//                     <div className='contain'>
//                         <span>Follow Us</span>
//                         <div style={{ marginLeft: "0.5rem" }}>
//                             <a style={{ color: "#85053f" }} href="https://www.unicoglobal.in/" target={"_blank"}><BrandFacebook strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} /></a>
//                             <a style={{ color: "#85053f" }} href="https://www.unicoglobal.in/" target={"_blank"}><BrandInstagram strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} /></a>
//                             <a style={{ color: "#85053f" }} href="https://www.unicoglobal.in/" target={"_blank"}><BrandTwitter strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} /></a>
//                             <a style={{ color: "#85053f" }} href="https://www.unicoglobal.in/" target={"_blank"}><BrandLinkedin strokeWidth={2} color='#85053f' /></a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bottom w-full">
//                     <a style={{ color: "white" }} href='www.theprayasindia.com/e-pathshala' target={"_blank"}>
//                         <h2>www.theprayasindia.com/e-pathshala</h2>
//                     </a>
//                 </div>
//             </footer>

//             <style jsx>{`
//                 .watermark-container {
//                     position: absolute;
//                     height: 100%;
//                     width: 100%;
//                     z-index: -1;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center

//                 }
//                 .watermark-container img{
//                     height: 400px;
//                     width: 400px;
//                     opacity: 0.2;
//                 }


//                 .logo-container{
//                     margin-bottom: 2rem;
//                 }

//                 .logo-container::before,
//                 .logo-container::after{
//                     display: inline-block;
//                     content: "";
//                     border-top: .3rem solid #85053f;
//                     width: 100%;
//                     transform: translateY(1rem);
//                 }


//                 .print-footer-container {
//                     margin-top: 2rem;
//                 }
//                 .print-footer-container a{
//                     color: black;
//                     text-decoration: none;
//                 }

//                 .print-footer-container .top .contain{
//                     display: flex;
//                     align-items: center;
//                 }

//                 .print-footer-container .top .contain span{
//                     font-weight: bold;
//                     font-size: 18px;
//                     font-family: sans-serif;
//                     margin-left: 0.5rem;
//                 }

//                 .print-footer-container .bottom {
//                     background: #85053f;
//                     margin-top: 0.5rem;

//                 }

//                 .print-footer-container .bottom h2{
//                     color: white;
//                     font-size: 16px;
//                     text-align: center;
//                 }


//             `}</style>


//             <style jsx>{`
//                     *{
//                         margin: 0;
//                         padding: 0;
//                         font-family: sans-serif;
//                     }

//                     @page { 
//                         size: auto;
//                     } 


//                     .flex{
//                         display: flex;
//                     }
//                     .items-center{
//                         align-items: center;
//                     }
//                     .justify-between{
//                         justify-content: space-between;
//                     }
//                     .justify-center{
//                         justify-content: center;
//                     }


//                     .bolder{
//                         font-weight: bolder;
//                     }
//                     .font-none{
//                         font-weight: 100;
//                     }

//                     .flex-col{
//                         flex-direction: column;
//                     }


//                     .header-container{
//                         height: 180px;
//                         margin-bottom: 1rem;
//                         border-bottom: 1px solid black;
//                         padding: 0.5rem;
//                     }
//                     .info-contain .key{
//                         font-size: 20px;
//                     }
//                     .info-contain .value{
//                         font-size: 18px;
//                         margin-left: 0.5rem;
//                         font-weight: 100;
//                     }

//                     .carc-container{
//                         font-size: 3rem;
//                         border: 2px solid;
//                         width: 100px;
//                         text-align: center;
//                     }


//                     .bannerlabel{
//                         border: 1px solid black;
//                         border-left: none;
//                         border-right: none;
//                         margin-bottom: 1rem;
//                         padding: 0.5rem;

//                         margin: 1rem 0;
//                     }

//                     .text-center{
//                         text-align: center;
//                     }

//              `}</style>

//         </div>
//         )
//     }

//     // let RichTextValue = questionPaperData.bannerInstructionFirst;
//     // function RichText(props: RichTextEditorProps) {
//     //     // const [RichTextValue] = useState("")

//     //     if (typeof window !== 'undefined') {
//     //         // eslint-disable-next-line import/extensions, global-require
//     //         const { RichTextEditor } = require('@mantine/rte');
//     //         return <RichTextEditor value={RichTextValue} onChange={(e) => {
//     //             RichTextValue = e;
//     //         }}  {...props} />;
//     //     }

//     //     // Render anything as fallback on server, e.g. loader or html content without editor
//     //     return null;
//     // }


//     const handleUpdateQuestionPaper = async () => {
//         setLoadingQ(true);
//         try {
//             // const { question, option1, ans, option2, option3, option4 } = qna;
//             const data = await axios.put(`/admin/question/paper/${router.query.id}`, {
//                 name: modalData.name || questionPaperData.name,
//                 subject: modalData.subject || questionPaperData?.subject,
//                 marks: modalData.marks || questionPaperData?.marks,

//                 tbc: modalData.tbc || questionPaperData?.tbc,
//                 serialno: modalData.serialno || questionPaperData?.serialno,
//                 timeallowed: modalData.timeallowed || questionPaperData?.timeallowed,
//                 testbookletseries: modalData.testbookletseries || questionPaperData?.testbookletseries,
//                 bannerLabel: modalData.bannerLabel || questionPaperData?.bannerLabel,

//                 bannerInstructionFirst: modalData.bannerInstructionFirst || questionPaperData?.bannerInstructionFirst,
//                 bannerInstructionSecond: "null"
//             });
//             if (data?.data?.success) {
//                 showNotification({
//                     title: 'Success',
//                     color: 'blue',
//                     message: "Question Answer updated successfully !",
//                 });
//                 setLoadingQ(false);
//                 setTimeout(() => {
//                     window.location.reload();
//                 }, 500)
//             }
//         } catch (error: any) {
//             if (error?.response?.data) {
//                 showNotification({
//                     title: 'Error',
//                     color: 'red',
//                     message: error?.response?.data?.data || 'Someting went wrong',
//                 });
//             } else {
//                 showNotification({
//                     title: 'Error',
//                     color: 'red',
//                     message: error?.message || 'Something went wrong ',
//                 });
//             }
//             setLoadingQ(false);
//         }
//     }

//     return (
//         <div style={customStyle.container}>
//             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#fff', paddingBottom: '1rem', top: '0', position: 'sticky', zIndex: 12233 }}>
//                 <Link href={"/dashboard"}><a><HomeIcon height={31} width={31} style={{ marginTop: '1rem', marginLeft: '2rem', marginRight: '-1rem', cursor: 'pointer' }} /></a></Link>
//                 <Title style={customStyle.title} ><Text>{questionPaperData.name}</Text></Title>
//                 <div style={{ marginTop: '1rem' }}>
//                     <Popover width={900} position="bottom" withArrow shadow="md" id="popverddnotes" >
//                         <Popover.Target>
//                             <Button>Add Question</Button>
//                         </Popover.Target>
//                         <Popover.Dropdown>
//                             <AnswerTab qpid={router?.query?.id} isUpdate={false} />
//                         </Popover.Dropdown>
//                     </Popover>
//                 </div>
//             </div>

//             <Tabs defaultValue="editor" id='tabid' style={{ width: 900, margin: "0 auto" }}>
//                 <Tabs.List>
//                     <Tabs.Tab value="editor" >Editor</Tabs.Tab>
//                     <Tabs.Tab value="preview" >Preview</Tabs.Tab>
//                 </Tabs.List>

//                 <Tabs.Panel value="editor" pt="xs" >
//                     <main style={customStyle.leftSide}>
//                         <Card shadow={"xs"} style={customStyle.questionContainer}>
//                             <div className="w-full">
//                                 <div className="w-full" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
//                                     <TextInput
//                                         label="Name"
//                                         required
//                                         // value={modalData.subject}
//                                         defaultValue={questionPaperData.name}
//                                         onChange={(event) => setmodalData({ ...modalData, name: event.currentTarget.value })}
//                                         id="nameinput"
//                                         style={{ width: 300 }}
//                                     />
//                                     <TextInput
//                                         label="Subject"
//                                         required
//                                         // value={modalData.subject}
//                                         defaultValue={questionPaperData.subject}
//                                         onChange={(event) => setmodalData({ ...modalData, subject: event.currentTarget.value })}
//                                         id="subjectinput"
//                                         style={{ width: 300 }}
//                                     />
//                                     <TextInput
//                                         label="Marks"
//                                         required
//                                         // value={modalData.marks}
//                                         defaultValue={questionPaperData.marks}
//                                         onChange={(event) => setmodalData({ ...modalData, marks: event.currentTarget.value })}
//                                         id="marksinput"
//                                         style={{ width: 300 }}
//                                         type="number"
//                                     />
//                                 </div>
//                                 <div className="w-full" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: "1rem" }}>
//                                     <TextInput
//                                         label="T.B.C"
//                                         required
//                                         // value={modalData.tbc}
//                                         defaultValue={questionPaperData.tbc}
//                                         onChange={(event) => setmodalData({ ...modalData, tbc: event.currentTarget.value })}
//                                         id="tbcinput"
//                                         style={{ width: 300 }}
//                                     />

//                                     <TextInput
//                                         label="Serial No"
//                                         required
//                                         // value={modalData.tbc}
//                                         defaultValue={questionPaperData.serialno}
//                                         onChange={(event) => setmodalData({ ...modalData, serialno: event.currentTarget.value })}
//                                         id="serialnoinput"
//                                         style={{ width: 300 }}
//                                     />
//                                     <TextInput
//                                         label="Time Allowed"
//                                         required
//                                         // value={modalData.timeallowed}
//                                         defaultValue={questionPaperData.timeallowed}
//                                         onChange={(event) => setmodalData({ ...modalData, timeallowed: event.currentTarget.value })}
//                                         id="timeallowedinput"
//                                         style={{ width: 300 }}
//                                     />

//                                     {/* <div style={{ display: "flex", flexDirection: "column" }}>
//                                     <label>Date</label>
//                                     <DatePicker style={{ width: "100%", height: 40 }}
//                                         value={questionPaperData.date}
//                                         onChange={(event: any) => {
//                                             setmodalData({ ...modalData, date: event })
//                                         }}
//                                     />
//                                 </div> */}
//                                 </div>

//                                 <div className="w-full" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: "1rem" }}>
//                                     <TextInput
//                                         label="Test Booklet Series"
//                                         required
//                                         // value={modalData.testbookletseries}
//                                         defaultValue={questionPaperData.testbookletseries}
//                                         onChange={(event) => setmodalData({ ...modalData, testbookletseries: event.currentTarget.value })}
//                                         id="testbookletseriesinput"
//                                         style={{ width: 300 }}
//                                     />
//                                     <TextInput
//                                         label="Banner Label"
//                                         required
//                                         // value={modalData.bannerLabel}
//                                         defaultValue={questionPaperData.bannerLabel}
//                                         onChange={(event) => setmodalData({ ...modalData, bannerLabel: event.currentTarget.value })}
//                                         id="bannerLabelinput"
//                                         style={{ width: "100%" }}
//                                     />
//                                 </div>

//                                 <div className="w-full" style={{ gap: '1rem', marginTop: "1rem" }}>
//                                     {/* <RichText controls={[
//                                         ['bold', 'italic', 'underline'],
//                                         ['unorderedList', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
//                                         ['sup', 'sub'],
//                                         ['alignLeft', 'alignCenter', 'alignRight'],
//                                     ]} /> */}


// <ReactQuill theme="snow" style={{ margin: "1rem 0" }}
//     modules={{
//         toolbar: [
//             [{ header: [1, 2, 3, 4, 5, 6, false] }],
//             ["bold", "italic", "underline", "strike", "blockquote"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             [{ 'color': [] }, { 'background': [] }],
//             [{ 'align': [] }],
//         ]
//     }}
//     formats={[
//         "header",
//         "bold",
//         "italic",
//         "underline",
//         "strike",
//         "blockquote",
//         "list",
//         "bullet",
//         "indent",
//         "color",
//         "background",
//         "align"
//     ]}

//     value={modalData.bannerInstructionFirst || questionPaperData.bannerInstructionFirst}
//     onChange={(e) => {
//         setmodalData({ ...modalData, bannerInstructionFirst: e })
//     }} />
//                                 </div>

//                                 <div style={{ display: "flex", marginTop: "1rem" }}>
//                                     <Button size='sm' style={{ width: "100%" }} onClick={handleUpdateQuestionPaper}>Save</Button>
//                                 </div>

//                             </div>
//                         </Card>

//                         {
//                             questionAnswerData?.map((itm: any, i: Number) => {
//                                 return <AnswerTab
//                                     id={itm?._id}
//                                     qpid={router?.query?.id}
//                                     question={itm?.question}
//                                     questionimage={itm.questionimage || null}

//                                     option1={itm?.mcq[0]}
//                                     option2={itm?.mcq[1]}
//                                     option3={itm?.mcq[2]}
//                                     option4={itm?.mcq[3]}
//                                     option5={itm?.mcq[4]}
//                                     option6={itm?.mcq[5]}
//                                     option7={itm?.mcq[6]}
//                                     option8={itm?.mcq[7]}
//                                     ans={itm?.ans}
//                                     answerimage={itm.answerimage || null}

//                                     isUpdate={true}
//                                 />
//                             })
//                         }
//                     </main>
//                 </Tabs.Panel>

//                 <Tabs.Panel value="preview" pt="xs">
//                     <main style={customStyle.rightSide}>
//                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//                             <div style={{ display: 'flex', gap: '1rem' }}>
//                                 <Switch onChange={e => setAnsOnOff(!ansOnOff)} onLabel="ANS" offLabel="ANS" size="md" id="swid" label="Show Answers on/off" />
//                                 {/* {
//                                     isClient && <PDFDownloadLink document={<Doc />} fileName="question.pdf">
//                                         {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Question Paper')}
//                                     </PDFDownloadLink>
//                                 } */}
//                                 <ReactToPrint
//                                     // onBeforePrint={() =>style { customStyle.page.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
//                                     trigger={() => <Button className="g-font">Download Question Paper</Button>}
//                                     content={() => ref.current}
//                                 />
//                             </div>
//                             <div ref={ref}>
//                                 <Doc />
//                             </div>
//                         </div>
//                     </main>
//                 </Tabs.Panel>
//             </Tabs>
//         </div>
//     )

// }

// export default QuestionPaperPage;
























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
import { HomeIcon } from '@modulz/radix-icons';
import type { RichTextEditorProps } from '@mantine/rte';

//text editor css important
// import "react-quill/dist/quill.core.css";
import { BrandDribbble, BrandFacebook, BrandInstagram, BrandLinkedin, BrandTwitter, BrandWhatsapp, BrandYoutube, Message } from 'tabler-icons-react';

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';


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
        marks: "",
        // datte: ""

        tbc: "",
        serialno: "",
        timeallowed: "",
        testbookletseries: "",
        bannerLabel: "",
        bannerInstructionFirst: null
    })
    const [loadingQ, setLoadingQ] = useState(false);

    let mcqAlphas = ['a: ', 'b: ', 'c: ', 'd: ', 'e:', 'f:', 'g:', 'h:', 'i:']

    const Doc = () => {
        return (<div style={{
            width: '1000px',
            paddingLeft: "3rem",
            paddingRight: "3rem",
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>

            <div className="watermark-container">
                <img src='/prayas.jpg' />
            </div>

            <div className='logo-container question' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

                        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="https://theprayasindia.com/wp-content/uploads/2021/05/Logo-1.png" height={70} width={160} />
                        </div> */}
                        <div className="w-full text-center bannerlabel" >
                            <h3>{questionPaperData.bannerLabel}</h3>
                        </div>

                        <div className="w-full flex align-center justify-between header-container">
                            <div className="left flex flex-col justify-between ">
                                <div className='info-contain'>
                                    <h3 style={{ marginBottom: "0.5rem" }} >
                                        <span className='bolder key'>T.B.C:</span>
                                        <span className='value'>{questionPaperData.tbc}</span>
                                    </h3>
                                    <h3 className='bolder'>
                                        <span className='bolder key'>Serial No:</span>
                                        <span className='value'>{questionPaperData.serialno}</span>
                                    </h3>
                                </div>

                                <div className='info-contain'>
                                    <h3 className='bolder'>
                                        <span className='bolder key'>Time Allowed:</span>
                                        <span className='value'>{questionPaperData.timeallowed}</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="center flex flex-col text-center justify-center">
                                <h2 className='font-none'>{questionPaperData.name}</h2>
                                <h2 className="bolder">{questionPaperData.subject}</h2>

                            </div>
                            <div className="right  flex flex-col justify-between ">
                                <div className="info-contain">
                                    <h3 className='  flex items-center flex-col text-center'><span className="bolder">Test Booklet Series</span><span className="bolder carc-container">{questionPaperData.testbookletseries}</span></h3>
                                </div>
                                <div className='info-contain'>
                                    <h3 className='bolder'>
                                        <span className='bolder key'>Maximum Marks:</span>
                                        <span className='value'>{questionPaperData.marks}</span>
                                    </h3>
                                </div>
                            </div>

                        </div>

                        <div className="w-fill ql-editor" dangerouslySetInnerHTML={{ __html: questionPaperData.bannerInstructionFirst }} />

                        <div className="w-full text-center bannerlabel" style={{ marginTop: "2rem" }} >
                            <h3>{questionPaperData.bannerLabel}</h3>
                        </div>


                        <div style={{ marginTop: "2rem" }}>
                            {questionAnswerData?.map((itm: any, i: Number) => {
                                return (
                                    <div key={itm?._id} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: "fit-content",
                                        margin: "15px 0",
                                    }}>
                                        <h3 style={{
                                            fontWeight: "bolder",
                                            fontSize: "20px",
                                        }}>{Number(i) + 1}. {itm?.question}</h3>
                                        {
                                            itm?.type === "normal" ? <div>
                                                {
                                                    ansOnOff && <p style={{ fontSize: "18px" }}><span className='bolder'>Ans: </span><span style={{ marginLeft: "0.5rem" }}>{itm?.ans}</span></p>
                                                }
                                            </div> :
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    marginBottom: "1rem"
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        gap: '2rem',
                                                        margin: "0.5rem 0",
                                                        flexWrap: 'wrap',
                                                    }}>{
                                                            itm?.mcq?.map((itm: any, i) => {
                                                                return itm && <p style={{ fontSize: "18px", }} ><span className='bolder'>{mcqAlphas[i]} </span><span>{itm}</span></p>
                                                            })
                                                        }</div>
                                                    {itm.questionimage && <img src={itm?.questionimage?.url} width={itm?.questionimage?.width} height={itm?.questionimage?.height} style={{}} />}

                                                    {
                                                        ansOnOff && <p style={{ fontSize: "18px" }}><span className='bolder'>Ans: </span><span style={{ marginLeft: "0.5rem" }}>{itm?.ans}</span></p>
                                                    }
                                                </div>
                                        }
                                        {ansOnOff && itm.answerimage && <img src={itm?.answerimage?.url} width={itm?.answerimage?.width} height={itm?.answerimage?.height} style={{}} />}
                                    </div>
                                )
                            })}
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
                    <a href='/sasasasas' target={"_blank"} className='contain'>
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
                            <a style={{ color: "#85053f" }} href="https://www.theprayasindia.com/" target={"_blank"}><BrandDribbble strokeWidth={2} color='#85053f' style={{ marginRight: "0.3rem" }} /></a>
                            <a style={{ color: "#85053f" }} href="https://www.linkedin.com/in/the-prayas-india-552a83110/" target={"_blank"}><BrandLinkedin strokeWidth={2} color='#85053f' /></a>
                        </div>
                    </div>
                </div>
                <div className="bottom w-full">
                    <a style={{ color: "white" }} href='www.theprayasindia.com/e-pathshala' target={"_blank"}>
                        <h2>www.theprayasindia.com/e-pathshala</h2>
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


            <style jsx>{`
       *{
           margin: 0;
           padding: 0;
           font-family: sans-serif;
       }

       @page { 
           size: auto;
       } 


       .flex{
           display: flex;
       }
       .items-center{
           align-items: center;
       }
       .justify-between{
           justify-content: space-between;
       }
       .justify-center{
           justify-content: center;
       }


       .bolder{
           font-weight: bolder;
       }
       .font-none{
           font-weight: 100;
       }

       .flex-col{
           flex-direction: column;
       }


       .header-container{
           height: 180px;
           margin-bottom: 1rem;
           border-bottom: 1px solid black;
           padding: 0.5rem;
       }
       .info-contain .key{
           font-size: 20px;
       }
       .info-contain .value{
           font-size: 18px;
           margin-left: 0.5rem;
           font-weight: 100;
       }

       .carc-container{
           font-size: 3rem;
           border: 2px solid;
           width: 100px;
           text-align: center;
       }


       .bannerlabel{
           border: 1px solid black;
           border-left: none;
           border-right: none;
           margin-bottom: 1rem;
           padding: 0.5rem;

           margin: 1rem 0;
       }

       .text-center{
           text-align: center;
       }

`}</style>

        </div >
        )
    }

    // let RichTextValue = questionPaperData.bannerInstructionFirst;
    // function RichText(props: RichTextEditorProps) {
    //     // const [RichTextValue] = useState("")
    //     if (typeof window !== 'undefined') {
    //         // eslint-disable-next-line import/extensions, global-require
    //         const { RichTextEditor } = require('@mantine/rte');
    //         return <RichTextEditor {...props} />;
    //     }
    //     // Render anything as fallback on server, e.g. loader or html content without editor
    //     return null;
    // }


    const handleUpdateQuestionPaper = async () => {
        setLoadingQ(true);
        try {
            // const { question, option1, ans, option2, option3, option4 } = qna;
            const data = await axios.put(`/admin/question/paper/${router.query.id}`, {
                name: modalData.name || questionPaperData.name,
                subject: modalData.subject || questionPaperData?.subject,
                marks: modalData.marks || questionPaperData?.marks,

                tbc: modalData.tbc || questionPaperData?.tbc,
                serialno: modalData.serialno || questionPaperData?.serialno,
                timeallowed: modalData.timeallowed || questionPaperData?.timeallowed,
                testbookletseries: modalData.testbookletseries || questionPaperData?.testbookletseries,
                bannerLabel: modalData.bannerLabel || questionPaperData?.bannerLabel,

                bannerInstructionFirst: modalData.bannerInstructionFirst || questionPaperData?.bannerInstructionFirst,
                bannerInstructionSecond: "null"
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
                    message: error?.response?.data?.data || 'Someting went wrong',
                });
            } else {
                showNotification({
                    title: 'Error',
                    color: 'red',
                    message: error?.message || 'Something went wrong ',
                });
            }
            setLoadingQ(false);
        }
    }

    return (
        <div className={classes.container}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#fff', paddingBottom: '1rem', top: '0', position: 'sticky', zIndex: 12233 }}>
                <Link href={"/dashboard"}><a><HomeIcon height={31} width={31} style={{ marginTop: '1rem', marginLeft: '2rem', marginRight: '-1rem', cursor: 'pointer',color: "black" }} /></a></Link>
                <Title className={classes.title} ><Text>{questionPaperData.name}</Text></Title>
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
                            <div className="w-full">
                                <div className="w-full" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <TextInput
                                        label="Name"
                                        required
                                        // value={modalData.subject}
                                        defaultValue={questionPaperData.name}
                                        onChange={(event) => setmodalData({ ...modalData, name: event.currentTarget.value })}
                                        id="nameinput"
                                        style={{ width: 300 }}
                                    />
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
                                </div>
                                <div className="w-full" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: "1rem" }}>
                                    <TextInput
                                        label="T.B.C"
                                        required
                                        // value={modalData.tbc}
                                        defaultValue={questionPaperData.tbc}
                                        onChange={(event) => setmodalData({ ...modalData, tbc: event.currentTarget.value })}
                                        id="tbcinput"
                                        style={{ width: 300 }}
                                    />

                                    <TextInput
                                        label="Serial No"
                                        required
                                        // value={modalData.tbc}
                                        defaultValue={questionPaperData.serialno}
                                        onChange={(event) => setmodalData({ ...modalData, serialno: event.currentTarget.value })}
                                        id="serialnoinput"
                                        style={{ width: 300 }}
                                    />
                                    <TextInput
                                        label="Time Allowed"
                                        required
                                        // value={modalData.timeallowed}
                                        defaultValue={questionPaperData.timeallowed}
                                        onChange={(event) => setmodalData({ ...modalData, timeallowed: event.currentTarget.value })}
                                        id="timeallowedinput"
                                        style={{ width: 300 }}
                                    />

                                    {/* <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label>Date</label>
                                    <DatePicker style={{ width: "100%", height: 40 }}
                                        value={questionPaperData.date}
                                        onChange={(event: any) => {
                                            setmodalData({ ...modalData, date: event })
                                        }}
                                    />
                                </div> */}
                                </div>

                                <div className="w-full" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: "1rem" }}>
                                    <TextInput
                                        label="Test Booklet Series"
                                        required
                                        // value={modalData.testbookletseries}
                                        defaultValue={questionPaperData.testbookletseries}
                                        onChange={(event) => setmodalData({ ...modalData, testbookletseries: event.currentTarget.value })}
                                        id="testbookletseriesinput"
                                        style={{ width: 300 }}
                                    />
                                    <TextInput
                                        label="Banner Label"
                                        required
                                        // value={modalData.bannerLabel}
                                        defaultValue={questionPaperData.bannerLabel}
                                        onChange={(event) => setmodalData({ ...modalData, bannerLabel: event.currentTarget.value })}
                                        id="bannerLabelinput"
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                <div className="w-full" style={{ gap: '1rem', marginTop: "1rem" }}>
                                    {/* <RichText value={RichTextValue} controls={[
                                        ['bold', 'italic', 'underline'],
                                        ['unorderedList', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                                        ['sup', 'sub'],
                                        ['alignLeft', 'alignCenter', 'alignRight'],
                                    ]} onChange={(e) => {
                                        RichTextValue = e;
                                    }} /> */}




                                    <ReactQuill theme="snow" style={{ margin: "1rem 0" }}
                                        modules={{
                                            toolbar: [
                                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                                ["bold", "italic", "underline", "strike", "blockquote"],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                [{ 'color': [] }, { 'background': [] }],
                                                [{ 'align': [] }],
                                            ],
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
                                            "background",
                                            "align"
                                        ]}

                                        value={modalData.bannerInstructionFirst || questionPaperData.bannerInstructionFirst}
                                        onChange={(e) => {
                                            setmodalData({ ...modalData, bannerInstructionFirst: e })
                                        }} />

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
                                    questionimage={itm.questionimage || null}

                                    option1={itm?.mcq[0]}
                                    option2={itm?.mcq[1]}
                                    option3={itm?.mcq[2]}
                                    option4={itm?.mcq[3]}
                                    option5={itm?.mcq[4]}
                                    option6={itm?.mcq[5]}
                                    option7={itm?.mcq[6]}
                                    option8={itm?.mcq[7]}
                                    ans={itm?.ans}
                                    answerimage={itm.answerimage || null}

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
                                    // onBeforePrint={() =>style { styles.page.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
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