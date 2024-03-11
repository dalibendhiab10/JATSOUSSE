import { useState, useEffect } from 'react';

const Timer = () => {
  const targetDate = new Date('2024-03-12T00:00:00').getTime();
  // Calculate the time remaining until the target date
  const calculateTimeRemaining = () => {
    const difference = +new Date(targetDate) - +new Date();
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      hours,
      minutes,
      seconds
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
        <div className="countdown-timer" >
        <div className="box" style={{ color:'#fcfcfc'}}>
        <p className="time" key="hours" style={{ color:'#fcfcfc'}}>{timeRemaining.hours}</p>
          <p className="label" style={{ color:'#fcfcfc'}}>Hours</p>
        </div>
        <div className="box"  style={{ color:'#fcfcfc'}}>
          <p className="time" key="minutes" style={{ color:'#fcfcfc'}}>{timeRemaining.minutes}</p>
          <p className="label" style={{ color:'#fcfcfc'}}>Minutes</p>
        </div>
        <div className="box" style={{ color:'#fcfcfc'}}>
          <p className="time" key="seconds" style={{ color:'#fcfcfc'}}>{timeRemaining.seconds}</p>
          <p className="label" style={{ color:'#fcfcfc'}} >Seconds</p>
        </div>
      </div>
    </>
    )
}
export default Timer