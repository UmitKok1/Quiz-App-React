import questions from "../questions";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";

export default function Question
    ({
        index,
        onSelectAnswer,
        onSkipAnswer
    }
    ) {
    const [answer, setAnswer] = useState({
        selectAnswer: '',
        isCorrect: null
    });

    let timer = 10000;
    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }
    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: questions[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }
    return <div id="question">
        <QuestionTimer
            key={timer}
            timeout={timer}
            onTimeout={answer.selectAnswer === '' ? onSkipAnswer : null}
            mode={answerState}
        />
        <h2>{questions[index].text}</h2>
        <Answers
            answers={questions[index].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer}
        />
    </div>
}