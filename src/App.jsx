import { useState , useEffect } from 'react';

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
    if(hasClicked) return;
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
        else return prev-1;
      });
    }, 2000);
  
    return () => {clearInterval(interval)}
  },[gameStarted])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center p-4 text-green-400 font-mono">
      
      {/* Header Section */}
      <div className="w-full max-w-md bg-black/70 rounded-2xl p-4 mb-20 shadow-[0_0_30px_#00ff9c] flex justify-between items-center text-sm sm:text-base">
        <h3 className="tracking-widest">Score: <span className="text-white">{score}</span></h3>

        {!gameStarted && 
          <button 
            onClick={gameStart}
            className="px-4 py-2 bg-green-500 text-black rounded-xl font-bold hover:bg-green-400 transition active:scale-95"
          >
            Start
          </button>
        }

        <h3 className="tracking-widest">Time: <span className="text-white">{timeLeft}</span>s</h3>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-xs sm:max-w-sm">
        {holesArray.map((_ , index) => (
          <div 
            className="relative w-full aspect-square bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-inner flex items-center justify-center"
            key={index}
          >
            {(activeHoles===index) && 
              <img 
                onClick={scoreUpdate}
                className="absolute top-1 sm:top-2 w-14 sm:w-16 cursor-pointer animate-bounce active:scale-90"
                src={MOLE_HEAD}
              />
            }

            <img
              className="absolute bottom-0 w-16 sm:w-20"
              src={MOLE_HILL}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
