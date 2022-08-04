import { useState } from 'react';
import { Button, Switch, Card, TextInput, Title, } from '@mantine/core';

import { showNotification } from '@mantine/notifications';
import axios from '../helper/axios';

const AnswerTab = ({ question, option1, option3, option2, option4, ans, isUpdate, id, qpid }: any) => {
    const [qna, setQna] = useState({
        question: '',
        option1: '', option3: '', option2: '', option4: '', ans: '',
    })
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleQAAdd = async () => {
        setLoadingAdd(true);
        try {
            const { question, option1, ans, option2, option3, option4 } = qna;
            const data = await axios.post(`/admin/question/ans`, {
                qpid: qpid,
                question: question,
                ans: ans,
                type: "mcq",
                mcq: [option1, option2, option3, option4]
            });
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
            const data = await axios.put(`/admin/question/ans/${id}`, {
                question: qna.question !== '' ? qna.question : question,
                ans: qna.ans !== '' ? qna.ans : ans,
                type: "mcq",
                mcq: [
                    qna.option1 !== '' ? qna.option1 : option1,
                    qna.option2 !== '' ? qna.option2 : option2,
                    qna.option3 !== '' ? qna.option3 : option3,
                    qna.option4 !== '' ? qna.option4 : option4]
            });
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


    return (<Card shadow="xs" style={{ display: 'flex', flexDirection: 'column', gap: "1rem" }}>
        <TextInput
            onChange={e => setQna({ ...qna, question: e.target.value })}
            defaultValue={question}
            label="Question" style={{ width: '100%F' }} id="subject"
        />
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

        <TextInput
            defaultValue={ans}
            onChange={e => setQna({ ...qna, ans: e.target.value })}
            label="Correct Answer" style={{ width: '100%' }} id="subject"
        />{
            isUpdate ?
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        onClick={handleQAUpdate}
                        loading={loadingAdd}
                    >
                        Update
                    </Button>
                    <Button
                        // onClick={handleQuestionUpdate}
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