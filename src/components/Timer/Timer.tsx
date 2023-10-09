import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Button, Typography } from '@mui/material';
import { StyleTimer } from '../../assets/styles/components';

const Timer: React.FC = React.memo(() => {
    const [active, setActive] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval: any = null;
        if (active) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!active && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [active, time]);

    const start = useCallback(() => {
        setActive(prevState => !prevState);
    }, []);

    const reset = useCallback(() => {
        setTime(0);
        setActive(false);
    }, []);

    const formatTime = useCallback(() => {
        const getTime = (ms: number) => {
            const minutes = Math.floor((ms / 1000 / 60) % 60);
            const seconds = Math.floor((ms / 1000) % 60);
            const milliseconds = ms % 1000;
            return [minutes, seconds, milliseconds];
        };

        const [minutes, seconds, milliseconds] = getTime(time);

        return `${minutes}:${seconds}:${milliseconds}`;
    }, [time]);

    return (
        <StyleTimer>
            <Typography variant='h3'>Timer</Typography>
            <Typography variant='h4'>{formatTime()}</Typography>
            <Button variant='contained' color='success' onClick={start}>
                {active ? 'pause' : 'start'}
            </Button>
            <Button variant='contained' color='error' onClick={reset}>
                Reset
            </Button>
            <hr></hr>
        </StyleTimer>
    );
});

export default Timer;
