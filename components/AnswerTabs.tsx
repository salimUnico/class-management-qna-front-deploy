import { useState } from 'react';
import { Button, Switch, Card, TextInput, Title, FileInput } from '@mantine/core';

import { showNotification } from '@mantine/notifications';
import axios from '../helper/axios';

import UploadImage from '../helper/imageUpload';
import DeleteImage from '../helper/imageDelete';


const AnswerTab = ({ question, questionimage, option1, option3, option2, option4, option5, option6, option7, option8, ans, answerimage, isUpdate, id, qpid }: any) => {
    const [qna, setQna] = useState({
        question: '',
        questionImage: {
            url: questionimage?.url,
            file: null,
            height: questionimage?.height || 0,
            width: questionimage?.width || 0
        },
        option1: '', option3: '', option2: '', option4: '',
        option5: '', option6: '', option7: '', option8: '',
        ans: '',
        answerImage: {
            url: answerimage?.url,
            file: null,
            height: answerimage?.height || 0,
            width: answerimage?.width || 0
        },
    })
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleQAAdd = async () => {
        setLoadingAdd(true);

        const { question, questionImage, option1, ans, answerImage, option2, option3, option4, option5, option6, option7, option8 } = qna;
        let body = {
            qpid: qpid,
            question: question,

            ans: ans,
            type: "mcq",
            mcq: [option1, option2, option3, option4, option5, option6, option7, option8]
        }
        if (qna.questionImage.file) {
            let refName = `question_image/${Date.now()}_question`;
            const questionImgUrl = await UploadImage(qna.questionImage.file, refName);

            body["questionimage"] = { ...questionImage, url: questionImgUrl }
        }
        if (qna.answerImage.file) {
            let refName = `question_image/${Date.now()}_answer`;
            const answerUrl = await UploadImage(qna.answerImage.file, refName);

            body["answerimage"] = { ...answerImage, url: answerUrl }
        }


        try {

            const data = await axios.post(`/admin/question/ans`, body);
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    color: 'blue',
                    message: "Question Answer added !",
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

    const handleQAUpdate = async () => {
        setLoadingUpdate(true);
        try {
            // const { question, option1, ans, option2, option3, option4 } = qna;
            const body = {
                question: qna.question !== '' ? qna.question : question,
                ans: qna.ans !== '' ? qna.ans : ans,
                type: "mcq",
                mcq: [
                    qna.option1 !== '' ? qna.option1 : option1,
                    qna.option2 !== '' ? qna.option2 : option2,
                    qna.option3 !== '' ? qna.option3 : option3,
                    qna.option4 !== '' ? qna.option4 : option4,
                    qna.option5 !== '' ? qna.option5 : option5,
                    qna.option6 !== '' ? qna.option6 : option6,
                    qna.option7 !== '' ? qna.option7 : option7,
                    qna.option8 !== '' ? qna.option4 : option4,
                ]
            }
            if(questionimage){
                body["questionimage"] = { ...qna.questionImage }
            }
            if(answerimage){
                body["answerimage"] = { ...qna.answerImage }
            }
            if (qna.questionImage.file) {
                let refName = `question_image/${Date.now()}_question`;
                const questionImgUrl = await UploadImage(qna.questionImage.file, refName);
    
                body["questionimage"] = { ...qna.questionImage, url: questionImgUrl }
            }
            if (qna.answerImage.file) {
                let refName = `question_image/${Date.now()}_answer`;
                const answerUrl = await UploadImage(qna.answerImage.file, refName);
    
                body["answerimage"] = { ...qna.answerImage, url: answerUrl }
            }


            const data = await axios.put(`/admin/question/ans/${id}`, body);
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    color: 'blue',
                    message: "Question Answer updated successfully !",
                });
                setLoadingUpdate(false);
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
            setLoadingUpdate(false);
        }
    }

    const handleQADelete = async () => {
        setLoadingDelete(true);

        if (questionimage) {
            await DeleteImage(questionimage.url)
        }
        if (answerimage) {
            await DeleteImage(answerimage.url)
        }

        try {
            // const { question, option1, ans, option2, option3, option4 } = qna;
            const data = await axios.delete(`/admin/question/ans/${id}`);
            if (data?.data?.success) {
                showNotification({
                    title: 'Success',
                    color: 'blue',
                    message: "Question Answer Deleted successfully !",
                });
                setLoadingDelete(false);
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
            setLoadingDelete(false);
        }
    }


    return (<Card shadow="xs" style={{ display: 'flex', flexDirection: 'column', gap: "1rem" }}>
        <TextInput
            onChange={e => setQna({ ...qna, question: e.target.value })}
            defaultValue={question}
            label="Question" style={{ width: '100%' }} id="subject"
        />
        <div className="w-full flex items-center " style={{ marginBottom: "1rem" }}>
            <FileInput
                placeholder="Select Question Image (optional)"
                label="Select Question Image (optional)"
                required
                style={{ width: "40%" }}

                onChange={async (e) => {
                    setQna({ ...qna, questionImage: { ...qna.questionImage, file: e } })
                }}
            />
            <TextInput
                onChange={e => setQna({ ...qna, questionImage: { ...qna.questionImage, width: Number(e.target.value) } })}
                defaultValue={qna.questionImage?.width}
                label="Image Width" style={{ width: '28%', margin: "0 0.5rem" }} id="subject"
            />
            <TextInput
                onChange={e => setQna({ ...qna, questionImage: { ...qna.questionImage, height: Number(e.target.value) } })}
                defaultValue={qna.questionImage?.height}
                label="Image Height" style={{ width: '28%' }} id="subject"
            />

            {isUpdate && questionimage && <img style={{ marginLeft: "0.5rem",objectFit: "cover" }} src={qna.questionImage.url}  height={"100"} width={"100"} />}

        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
            <TextInput
                defaultValue={option1}
                onChange={e => setQna({ ...qna, option1: e.target.value })}
                label="Option 1" style={{ width: '190px' }} id="makrs"
            />
            <TextInput
                defaultValue={option2}
                onChange={e => setQna({ ...qna, option2: e.target.value })}

                label="Option 2" style={{ width: '190px' }} id="makrs"
            />
            <TextInput
                defaultValue={option3}
                onChange={e => setQna({ ...qna, option3: e.target.value })}

                label="Option 3" style={{ width: '190px' }} id="makrs"
            />
            <TextInput
                defaultValue={option4}
                onChange={e => setQna({ ...qna, option4: e.target.value })}

                label="Option 4" style={{ width: '190px' }} id="makrs"
            />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
            <TextInput
                defaultValue={option5}
                onChange={e => setQna({ ...qna, option5: e.target.value })}
                label="Option 5" style={{ width: '190px' }} id="makrss"
            />
            <TextInput
                defaultValue={option6}
                onChange={e => setQna({ ...qna, option6: e.target.value })}

                label="Option 6" style={{ width: '190px' }} id="makrsds"
            />
            <TextInput
                defaultValue={option7}
                onChange={e => setQna({ ...qna, option7: e.target.value })}

                label="Option 7" style={{ width: '190px' }} id="mafdkrs"
            />
            <TextInput
                defaultValue={option8}
                onChange={e => setQna({ ...qna, option8: e.target.value })}

                label="Option 8" style={{ width: '190px' }} id="makdfdrs"
            />
        </div>
        <TextInput
            defaultValue={ans}
            onChange={e => setQna({ ...qna, ans: e.target.value })}
            label="Correct Answer" style={{ width: "100%" }} id="subject"
        />

        <div className="w-full flex items-center " style={{ marginBottom: "1rem" }}>
            <FileInput
                placeholder="Select Answer Image (optional)"
                label="Select Answer Image (optional)"
                required
                style={{ width: "40%" }}

                onChange={async (e) => {
                    setQna({ ...qna, answerImage: { ...qna.answerImage, file: e } })
                }}
            />
            <TextInput
                onChange={e => setQna({ ...qna, answerImage: { ...qna.answerImage, width: Number(e.target.value) } })}
                defaultValue={qna.answerImage?.width}
                label="Image Width" style={{ width: '28%', margin: "0 0.5rem" }} id="subject"
            />
            <TextInput
                onChange={e => setQna({ ...qna, answerImage: { ...qna.answerImage, height: Number(e.target.value) } })}
                defaultValue={qna.answerImage?.height}
                label="Image Height" style={{ width: '28%' }} id="subject"
            />
            {isUpdate && answerimage && <img style={{ marginLeft: "0.5rem",objectFit: "cover" }} src={qna.answerImage.url}  height={"100"} width={"100"} />}
        </div>

        {
            isUpdate ?
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        onClick={handleQAUpdate}
                        loading={loadingAdd}
                    >
                        Update
                    </Button>
                    <Button
                        onClick={handleQADelete}
                        loading={loadingDelete}
                        color="red"
                    >
                        Delete
                    </Button>
                </div>
                :
                <Button
                    onClick={handleQAAdd}
                    loading={loadingAdd}
                >
                    Add new
                </Button>
        }
    </Card>)
}

export default AnswerTab;