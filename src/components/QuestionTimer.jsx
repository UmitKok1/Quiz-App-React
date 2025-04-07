import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {

        setRemainingTime(timeout);

        const timer = setTimeout(onTimeout, timeout);

        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [timeout, onTimeout]);

    return <progress id="question-time" max={timeout} value={remainingTime} />;
}
