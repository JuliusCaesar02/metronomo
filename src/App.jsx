
import { useEffect, useState } from 'react';
import './App.scss';
var metronomo = new Audio("/metronomo.wav");

function App() {

  const [slide, setSlide] = useState(100);
  const [startPlay, setStartPlay] = useState(false) //esegui solo se è stato premuto il pulsante play che lo setta a true

  useEffect(()=>{
    var intervallo = 0;

    function play(){
      intervallo = setInterval(function(){
        metronomo.currentTime = 0
        metronomo.play()
      }, (60/slide)*1000 )
      console.log('play', intervallo)
    }
    function stop (){
      clearInterval(intervallo);
    }
  
    if(startPlay){
      play()
    }
    return function cleanUp(){
      console.log('cleanup', intervallo)
      stop();
    }
  }, [slide, startPlay]) 
//30 300
  return (
    <>
    <div>
      <input type="range" id='slider' min="30" max="300" value={slide} onChange={(ev)=> {
        setSlide(ev.target.value);
        }}/>
      
      <div className="bottoni">
        <button onClick={()=> { 
          setStartPlay(true)
          }}>Play</button>

        <h1>{slide} BPM</h1>

        <button onClick={()=> {
          setStartPlay(false);
        }}>Stop</button>
      </div>
      

      
    </div>
    </>
  );
}

export default App;
