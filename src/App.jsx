import useGameStore from './store/gameStore';
import LobbySetup from './components/LobbySetup';
import SpinWheel from './components/SpinWheel';
import TeamBuilder from './components/TeamBuilder';
import RatingTracker from './components/RatingTracker';
import ShowdownExport from './components/ShowdownExport';
import StabilizeToggle from './components/StabilizeToggle';
import PhysicsWorld from './physics/PhysicsWorld';
import './index.css';

export default function App() {
  const { phase, players, currentPlayerIndex, resetGame, goToRace, physicsEnabled } = useGameStore();

  return (
    <div className={`app ${physicsEnabled ? 'physics-active' : 'physics-dormant'}`}>
      {/* Animated background background */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <PhysicsWorld enabled={physicsEnabled}>
        {/* Top Bar */}
        <header className="top-bar" style={{ pointerEvents: 'auto' }}>
          <div className="top-bar-left">
            <h1 className="app-logo" onClick={resetGame} style={{ cursor: 'pointer' }}>
              <span className="logo-r">R</span>1400
            </h1>
          </div>
          <nav className="top-bar-nav" style={{ pointerEvents: 'auto' }}>
            {phase !== 'lobby' && (
              <button className="btn btn-ghost" onClick={resetGame}>
                🏠 New Game
              </button>
            )}
            {phase === 'draft' && (
              <button className="btn btn-ghost" onClick={goToRace}>
                🏁 Skip to Race
              </button>
            )}
          </nav>
        </header>

        {/* Main Content */}
        <main className="main-content" style={{ pointerEvents: 'auto' }}>
          {phase === 'lobby' && <LobbySetup />}
          
          {phase === 'draft' && (
            <div className="draft-layout">
              <div className="draft-main">
                <SpinWheel />
              </div>
              <div className="draft-sidebar">
                <h2 className="sidebar-title">Teams</h2>
                <div className="teams-scroll">
                  {players.map((player, i) => (
                    <div
                      key={player.id}
                      className={`team-wrapper ${i === currentPlayerIndex ? 'active-team' : ''}`}
                    >
                      <TeamBuilder playerId={player.id} compact />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {phase === 'race' && (
            <div className="race-layout">
              <RatingTracker />
              <div className="race-teams">
                <h2 className="section-title">Draft Results</h2>
                <div className="race-teams-grid">
                  {players.map(player => (
                    <TeamBuilder key={player.id} playerId={player.id} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Refined Stabilize Toggle */}
        <div style={{ pointerEvents: 'auto' }}>
          <StabilizeToggle />
        </div>
      </PhysicsWorld>

      {/* Overlays */}
      <ShowdownExport />

      {/* Subtle floating particles */}
      <div className="particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--delay': `${i * 1.5}s`,
              '--x': `${8 + (i * 7.5) % 85}%`,
              '--duration': `${15 + (i * 3) % 15}s`,
              '--size': `${2 + (i % 3)}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
