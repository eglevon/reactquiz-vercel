import { ActionProps } from './types';

type NextButtonProps = {
    dispatch: React.Dispatch<ActionProps>;
    answer: number | null;
    index: number;
    numQuestions: number;
};

function NextButton({ dispatch, answer, index, numQuestions }: NextButtonProps) {
    if (answer === null) return null;

    if (index < numQuestions - 1)
        return (
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>
                Next
            </button>
        );

    if (index === numQuestions - 1)
        return (
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'finish' })}>
                Finish
            </button>
        );
}

export default NextButton;
