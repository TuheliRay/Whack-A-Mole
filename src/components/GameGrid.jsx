export default function GameGrid({ holesArray, activeHoles, onHit, MOLE_HEAD, MOLE_HILL }) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-xs sm:max-w-sm">
      {holesArray.map((_ , index) => (
        <div 
          onClick={() => { if (activeHoles === index) onHit(); }}
          className={`relative w-full aspect-square bg-linear-to-b from-gray-800 to-gray-900 rounded-2xl shadow-inner flex items-center justify-center ${activeHoles===index ? 'cursor-pointer' : ''}`}
          key={index}
        >
          {(activeHoles===index) && 
            <img 
              className="absolute top-1 sm:top-2 w-14 sm:w-16 animate-bounce active:scale-90"
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
  );
}
