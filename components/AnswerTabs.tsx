import { useState } from 'react';
import { Button, Switch, Card, TextInput, Title, } from '@mantine/core';

const AnswerTab = ({ question, option1, option3, option2, option4, ans, isUpdate }) => {
    const [qna, setQna] = useState({
        question: '',
        option1: '', option3: '', option2: '', option4: '', ans: '',
    })
    const [loading, setLoading] = useState(false);

    return (<Card shadow="xs" style={{ display: 'flex', flexDirection: 'column', gap: "1rem" }}>
        <TextInput
            onChange={e => setQna({ ...qna, question: e.target.value })}
            defaultValue={question}
            label="Question" style={{ width: '400px' }} id="subject"
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
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
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
            label="Correct Answer" style={{ width: '400px' }} id="subject"
        />{
            isUpdate ?
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                    // onClick={handleQuestionUpdate}
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
                // onClick={handleQuestionUpdate}
                >
                    Add new
                </Button>
        }
    </Card>)
}

export default AnswerTab;