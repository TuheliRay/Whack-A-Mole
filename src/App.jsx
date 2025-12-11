import {useState , useEffect} from 'react';
const holesArray = Array(9).fill(null);
const MOLE_HEAD = "https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png";
const MOLE_HILL = "https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png";
export default function App() {
  const [activeHoles , setActiveHoles] = useState(null);
  const [gameStarted , setGameStarted] = useState(false);
  function randomHole(){
    const random = Math.floor(Math.random() * holesArray.length);
    setActiveHoles(random);
  }
  function gameStart(){
    setGameStarted(true);
  }
  useEffect(()=>{
    if (!gameStarted) return;
    const interval = setInterval(() => {
    randomHole(); 
  }, 1000);
  const timeout = setTimeout(()=>{
    clearInterval(interval);
    setGameStarted(false);
    setActiveHoles(null);
  } , 15000);
    return () => 
    {
      clearInterval(interval);
      clearTimeout(timeout);
    }
  },[gameStarted])
  return (
    <>
    <div className = "game-section">
    <h3>Score : 0</h3>
    <button onClick = {gameStart}>Start Game</button>
    <h3>Time Left : 0</h3>
    </div>
    <div className="grid">
     {holesArray.map((_ , index) => (
        <div className="mole" key={index}>
          {(activeHoles===index) && <img
            className="mole-img mole-head"
            src={MOLE_HEAD}
          />}
          <img
            className="mole-img mole-hill"
            src={MOLE_HILL}
          />
        </div>
      ))}
    </div>
    </>
  );
}
