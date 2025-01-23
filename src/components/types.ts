export type QuestionType = {
    question: string;
    options: string[];
    correctOption?: number;
    points?: number;
    id?: string;
};

export type QuestionProps = {
    question: QuestionType;
    dispatch: React.Dispatch<ActionProps>;
    answer?: number | null;
};

export type StateProps = {
    questions: QuestionType[];
    status: 'loading' | 'ready' | 'active' | 'finished' | 'error';
    index: number;
    answer: number | null;
    points: number;
    highscore: number;
    secondsRemaining: number;
};

export type ActionProps = { type: 'dataReceived'; payload: QuestionType[] } | { type: 'dataFailed'; payload: string } | { type: 'start' } | { type: 'newAnswer'; payload: number } | { type: 'nextQuestion' } | { type: 'finish' } | { type: 'restart' } | { type: 'tick' };

export type DispatchProps = (action: ActionProps) => void;
