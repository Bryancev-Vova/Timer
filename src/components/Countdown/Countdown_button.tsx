import { Button } from '@mui/material';
import { StyleButton } from '../../assets/styles/components';
import React from 'react';


interface IBtnSetting {
    isRunning: boolean;
    toggle: () => void;
    reset: () => void;
}

function CountdownButton({ isRunning, toggle, reset }: IBtnSetting) {
    return (
        <StyleButton>
            <Button  
            onClick={toggle}>{isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button 
            color='secondary' 
            onClick={reset}
            >
                Reset
            </Button>
        </StyleButton>
    );
}

export default CountdownButton;
