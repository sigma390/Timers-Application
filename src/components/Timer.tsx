import Container from './UI/Container.tsx';
import { useTimersContext, type Timer as TimerProps } from '../store/timers-context.tsx';
import { useEffect, useRef, useState } from 'react';



export default function Timer({name, duration}:TimerProps) {
  const interval = useRef<number | null>(null);
  const [remaining, setRemaining ] = useState(duration*1000);
  const {isRunning} = useTimersContext();

  

  //step 3 stop the timer
  if (remaining <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  //step 2 use effect for rendering
  useEffect(()=>{
    let timer:number;
    //to handle start stop action
    //step 4
    if (isRunning) {
       timer =  setInterval(function x(){
        setRemaining(prev => prev - 50);
        interval.current = timer;
        
      },50);
      
    }
    else if (!isRunning && interval.current) {
      clearInterval(interval.current);
    }




    //set timoeout step 1
   

    return () => clearInterval(timer);
  },[isRunning]) //step 5 pass the dependancy , means whatevr changes in useEffect


  
  const remtt = (remaining/1000).toFixed(2); // decimal points and to show the timer is decreasing


  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration*1000} value={remaining}/></p>
      <p>{remtt}</p>
    </Container>
  );
}
