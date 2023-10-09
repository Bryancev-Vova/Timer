import React, {useState} from 'react';
import Slider from '@mui/material/Slider';
import { Input } from '@mui/joy';



interface CountdownInputProps {
    onSetTime: (minutes: number, seconds: number) => void;
    disabled: boolean;
  }
  export default function CountdownInput({ onSetTime, disabled }: CountdownInputProps) {
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
  
    const handleMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMinutes = Number(event.target.value);
      if (newMinutes >= 0 && newMinutes <= 720) {
        setMinutes(newMinutes);
        onSetTime(newMinutes, seconds);
      }
    };
  
    const handleSeconds = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSeconds = Number(event.target.value);
      if (newSeconds >= 0 && newSeconds < 60) {
        setSeconds(newSeconds);
        onSetTime(minutes, newSeconds);
      }
    };
  
    const handleSlider = (event: Event, newValue: number | number[]) => {
      const newMinutes = Math.floor((newValue as number) / 4);
      const newSeconds = ((newValue as number) % 4) * 15;
      setMinutes(newMinutes);
      setSeconds(newSeconds);
      onSetTime(newMinutes, newSeconds);
    };
  
    return (
      <div ><h3>minutes</h3>
        <Input sx={{width: 150, marginLeft: '100px'}} color="primary" variant="soft"  placeholder='asfasf'
          disabled={disabled}
          onChange={handleMinutes}
          value={minutes}
                  type='number'
        />
        <h3>seconds</h3>
        <Input  sx={{width: 150,  marginLeft: '100px' }} color="primary" variant="soft"
          disabled={disabled}
          onChange={handleSeconds}
          value={seconds}
                  type='number'
        />
        <Slider
        sx={{width: 350, }}
          disabled={disabled}
          onChange={handleSlider}
          value={minutes * 4 + Math.floor(seconds / 15)}
          min={0}
          max={2880}
        />
      </div>
    );
  }
  