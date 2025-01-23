import Options from './Options';
import { QuestionProps } from './types';

function Question({ question, dispatch, answer }: QuestionProps) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;
