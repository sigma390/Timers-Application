import Container from './UI/Container.tsx';
import { useTimersContext, Timer as TimerProps } from '../store/timers-context.tsx';
import { useEffect, useRef, useState } from 'react';

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remaining, setRemaining] = useState(duration * 1000);
  const timerCtx = useTimersContext();

  // Function to start the timer
  const startTimer = () => {
    if (interval.current) return; // Timer already started
    interval.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 0) {
          clearInterval(interval.current!);
          interval.current = null;
          return 0;
        }
        return prev - 50;
      });
    }, 50);
  };

  // Function to stop the timer
  const stopTimer = () => {
    clearInterval(interval.current!);
    interval.current = null;
  };

  // Handle start button click
  const handleStart = () => {
    timerCtx.startTimers();
    startTimer();
  };

  // Handle stop button click
  const handleStop = () => {
    timerCtx.stopTimers();
    stopTimer();
  };

  // Effect to handle timer running
  useEffect(() => {
    if (timerCtx.isRunning) {
      startTimer();
    } else {
      stopTimer();
    }
    // Cleanup interval on unmount
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [timerCtx.isRunning]);

  // Format remaining time
  const remtt = (remaining / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration * 1000} value={remaining} /></p>
      <p>{remtt}</p>
      <div className=' flex flex-row justify-center'>
        <button className='text-2xl' onClick={timerCtx.isRunning?handleStart:handleStop}>{timerCtx.isRunning?' Running ':'Paused'}</button>
        
      </div>
    </Container>
  );
}
