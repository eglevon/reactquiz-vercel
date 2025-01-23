import { QuestionProps } from './types';

type OptionsProps = QuestionProps;

function Options({ question, dispatch, answer }: OptionsProps) {
    const wasAnswered = answer !== null;

    return (
        <div className='options'>
            {question.options.map((option, index) => (
                <button className={`btn btn-option ${index === answer ? 'answer' : ''} ${wasAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''}`} key={option} disabled={wasAnswered} onClick={() => dispatch({ type: 'newAnswer', payload: index })}>
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
