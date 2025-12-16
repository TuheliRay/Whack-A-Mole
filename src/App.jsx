import {useState , useEffect} from 'react';
const holesArray = Array(9).fill(null);
const MOLE_HEAD = "https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png";
const MOLE_HILL = "https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png";
export default function App() {
  const [activeHoles , setActiveHoles] = useState(null);
  const [gameStarted , setGameStarted] = useState(false);
  const [timeLeft , setTimeLeft] = useState(15);
  const [hasClicked , setHasClicked]=useState(false);
  const [score , setScore] = useState(0);
  function randomHole(){
    const random = Math.floor(Math.random() * holesArray.length);
    setActiveHoles(random);
    setHasClicked(false);
  }
  function gameStart(){
    setTimeLeft(15);
    setScore(0);
    setGameStarted(true);
  }
  function scoreUpdate(){
    if(hasClicked)
    return;
    setHasClicked(true);
    setScore(prevScore => prevScore + 1);
  }
  useEffect(()=>{
    if (!gameStarted) return;
    const interval = setInterval(() => {
    randomHole(); 
    setTimeLeft((prev) => {
  if(prev<=1){
    clearInterval(interval);
    setGameStarted(false);
    setActiveHoles(null);
    return 0;
  }
  else
  return prev-1;
  });
  }, 2000);
  
    return () => {clearInterval(interval)}
  },[gameStarted])
  return (
    <>
    <div className = "game-section">
    <h3>Score : {score}</h3>
    {!gameStarted && <button onClick = {gameStart}>Start Game</button>}
    <h3>Time Left : {timeLeft}</h3>
    </div>
    <div className="grid">
     {holesArray.map((_ , index) => (
        <div className="mole" key={index}>
          {(activeHoles===index) && <img onClick={scoreUpdate}
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
