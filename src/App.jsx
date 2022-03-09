
import { useEffect, useState } from 'react';
import './App.scss';
var metronomo = new Audio("/metronomo.wav");  

function App() {

  const [slide, setSlide] = useState(100);  //useState per gestire i valori dello slider
  const [startPlay, setStartPlay] = useState(false) //Per eseguire lo useEffect solo se è stato premuto il pulsante play che lo setta a true

  useEffect(()=>{
    var intervallo = 0;

    function play(){  //Funzione per far partire il metronomo
      intervallo = setInterval(function(){  
        metronomo.play();
      }, (60/slide)*1000 )  //Trasforma i battiti per minuto (ottenuti dallo slider) in intervalli di millisecondi
    }
    function stop (){ //Funzione che ferma il metronomo
      clearInterval(intervallo);
    }
  
    if(startPlay){  //Se il bottone è stato premuto fai partire il metronomo
      play();
    }
    return function cleanUp(){  //Funzione per pulire lo useEffect ed evitare che partano più metronomi quando si cambia velocità
      stop();
    }
  }, [slide, startPlay])  //useEffect che aggiorna il set intervall quando cambia il valore dello slider [slide] o è stato premuto un button [startPlay]

  return (
    <>
      <input type="range" id='slider' min="30" max="300" onChange={(ev)=> {
        setSlide(ev.target.value);  //Aggiorna il valore di slide quando viene utilizzato lo slider
        }}/>
      
      <div className="bottoni">
        <button onClick={()=> { //Pulsante che onClick cambia lo useState startPlay a true per far partire il metronomo alla velocità attuale dello slider
          setStartPlay(true);
          }}>Play</button>

         <h1>{slide} BPM</h1>

         <button onClick={()=> { 
             setStartPlay(false);
         }}>Stop</button>
      </div>   
    </>
  );
}

export default App;
