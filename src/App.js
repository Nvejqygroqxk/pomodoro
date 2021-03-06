import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [switche, setSwitche] = useState(true);
  const [defaultS, setDefaultS] = useState(1500);
  const [defaultB, setDefaultB] = useState(300);
  

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setSeconds(1500);
    setSwitche(true);
    setDefaultS(1500);
    setDefaultB(300);
    document.getElementById('beep').pause()
    document.getElementById('beep').currentTime = 0;
  }

  function toMinutes(kek) {
    let minutes = Math.floor(kek / 60);
    let seconds = kek % 60;
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return minutes + ':' + seconds
  }

  useEffect(() => {
    if (switche) {
      setSeconds(defaultS)
    }
    else {
      setSeconds(defaultB)
    }
  }, [switche, defaultS, defaultB]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > -1) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      if (seconds === 0) {
        setSwitche(!switche);
        document.getElementById('beep').play()
      }
    }
    else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, seconds]);

  return (
    <div className="App">
      <audio src='/sound.mp3' id='beep'/>

      <div id="timer-label" class="div1">
        {switche ? 'Session' : 'Break'}
      </div>
      <div id="time-left" class="div1">
        {toMinutes(seconds)}
      </div>
      <button id="start_stop" class ="button" onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button id="reset"class ="button"  onClick={reset}>Reset</button>
      <div id="session-label" class="div2">
        Session Length
      </div>
      <div id="session-length" class="div2">
        {Math.floor(defaultS / 60)}
      </div>

      <button id="session-increment" class ="button2" onClick={() => { if (defaultS <= 3540 && !isActive) { setDefaultS(defaultS + 60) } }}>+</button>
      <button id="session-decrement" class ="button2" onClick={() => { if (defaultS >= 120 && !isActive) { setDefaultS(defaultS - 60) } }}>-</button>

      <div id="break-label" class="div2">
        Break Length
      </div>
      <div id="break-length" class="div2">
        {Math.floor(defaultB / 60)}
      </div>

      <button id="break-increment" class ="button2" onClick={() => { if (defaultB <= 3540 && !isActive) { setDefaultB(defaultB + 60) } }}>+</button>
      <button id="break-decrement" class ="button2" onClick={() => { if (defaultB >= 120 && !isActive) { setDefaultB(defaultB - 60) } }}>-</button>

      
    </div>
  );
}


export default App;
