import { useState , useEffect, useRef } from 'react';

const holesArray = Array(9).fill(null);
import GameGrid from './components/GameGrid';

const MOLE_HEAD = "https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png";
const MOLE_HILL = "https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png";

export default function App() {
  const [activeHoles , setActiveHoles] = useState(null);
  const [gameStarted , setGameStarted] = useState(false);
  const [timeLeft , setTimeLeft] = useState(15);
  const [hasClicked , setHasClicked]=useState(false);
  const [score , setScore] = useState(0);
  const moleTimerRef = useRef(null);
  const moleHideRef = useRef(null);
  const countdownRef = useRef(null);


  function scheduleNextMole(){
    const minDelay = 1500; // ms
    const maxDelay = 2000; // ms
    const delay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);

    moleTimerRef.current = setTimeout(() => {
      const random = Math.floor(Math.random() * holesArray.length);
      setActiveHoles(random);
      setHasClicked(false);

      const showDuration = 1200; // how long the mole stays visible
      moleHideRef.current = setTimeout(() => {
        setActiveHoles(null);
      }, showDuration);

      // schedule next appearance
      scheduleNextMole();
    }, delay);
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

  useEffect(() => {
    if (!gameStarted) {
      // clear any running timers when game is not started
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
      if (moleHideRef.current) clearTimeout(moleHideRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      setActiveHoles(null);
      return;
    }

    // start countdown (every 1s)
    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // start mole appearances (recursive timeouts for variable intervals)
    scheduleNextMole();

    return () => {
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
      if (moleHideRef.current) clearTimeout(moleHideRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [gameStarted]);

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black flex flex-col items-center p-4 text-green-400 font-mono">
      
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
      <GameGrid
        holesArray={holesArray}
        activeHoles={activeHoles}
        onHit={scoreUpdate}
        MOLE_HEAD={MOLE_HEAD}
        MOLE_HILL={MOLE_HILL}
      />
    </div>
  );
}
