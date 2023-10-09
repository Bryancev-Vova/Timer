import React, { useState, useEffect } from 'react';
import { Typography, TextField } from '@mui/material';
import { Box } from '../../assets/styles/components';
import CountdownButton from './Countdown_button';
import CountdownInput from './Countdown_input';


const Countdown: React.FC = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [minutesInput, setMinutesInput] = useState(0);
    const [secondsInput, setSecondsInput] = useState(0);

    const [isRunning, setIsRunning] = useState(false);
   
    function playAudio() {
        const audioUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3';
        const audio = new Audio(audioUrl);
        audio
            .play()
            .then(() => {
                console.log('Аудио воспроизводится');
            })
            .catch(error => {
                console.error('Произошла ошибка при воспроизведении аудио:', error);
            });
    }

    // Обновляем минуты и секунды при изменении input
    useEffect(() => {
        setMinutes(minutesInput);
        setSeconds(secondsInput);
    }, [minutesInput, secondsInput]);

    // Таймер
    useEffect(() => {
        let interval: NodeJS.Timer;
        if (isRunning) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(interval);
                    playAudio();
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    // Сброс таймера
    const reset = () => {
        setMinutesInput(0);
        setSecondsInput(0);
        setIsRunning(false);
        
        
    };

    // Переключение таймера
    const toggle = () => {
        if (!isRunning) {
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
    };
    const handleSetTime = (minutes: number, seconds: number) => {
        setMinutesInput(minutes);
        setSecondsInput(seconds);
      };


    return (
        <Box>
            <h1>Countdown</h1>
            <CountdownInput onSetTime={handleSetTime} disabled={isRunning}/>
            <Typography  variant='h4'>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
            <CountdownButton isRunning={isRunning} toggle={toggle} reset={reset} />
        </Box>
    );
};

export default Countdown;
