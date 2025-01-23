import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';
import { StateProps, ActionProps, QuestionType } from './types';

const SECS_PER_QUESTION = 30;

const initialState: StateProps = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: 0,
};

function reducer(state: StateProps, action: ActionProps): StateProps {
    switch (action.type) {
        case 'dataReceived':
            return { ...state, questions: action.payload, status: 'ready' };

        case 'dataFailed':
            return { ...state, status: 'error' };

        case 'start': {
            const secondsRemaining = state.questions.length * (SECS_PER_QUESTION || 0);
            return { ...state, status: 'active', secondsRemaining };
        }

        case 'newAnswer': {
            const question = state.questions[state.index];
            if (!question) {
                console.error('Invalid question index:', state.index);
                return state;
            }
            const isCorrect = action.payload === question.correctOption;
            return {
                ...state,
                answer: action.payload,
                points: isCorrect ? state.points + (question.points || 0) : state.points,
            };
        }

        case 'nextQuestion':
            return { ...state, index: state.index + 1, answer: null };

        case 'finish':
            return {
                ...state,
                status: 'finished',
                highscore: Math.max(state.points, state.highscore),
            };

        case 'restart':
            return { ...initialState, questions: state.questions, status: 'ready' };

        case 'tick': {
            if (state.secondsRemaining === 0) {
                return { ...state, status: 'finished' };
            }
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
            };
        }

        default:
            console.error('Unknown action');
            return state;
    }
}

export default function App() {
    const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer<React.Reducer<StateProps, ActionProps>>(reducer, initialState);

    const numQuestions: number = questions.length;
    const maxPossiblePoints: number = questions.reduce((prev: number, cur: QuestionType) => prev + (cur.points || 0), 0);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response: Response = await fetch('http://localhost:8000/questions');

                if (!response.ok) {
                    throw Error({ message: `HTTP error! Status: ${response.status}` });
                }

                const data: QuestionType[] = await response.json();
                dispatch({ type: 'dataReceived', payload: data });
            } catch (err) {
                console.error('Failed to fetch questions:', err);
                dispatch({ type: 'dataFailed', payload: err as string });
            }
        }

        fetchQuestions();
    }, []);

    return (
        <div className='app'>
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error message={'Error'} />}
                {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
                {status === 'active' && (
                    <>
                        <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
                        <Question question={questions[index]} dispatch={dispatch} answer={answer} />

                        <Footer>
                            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                            <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
                        </Footer>
                    </>
                )}
                {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} />}
            </Main>
        </div>
    );
}
