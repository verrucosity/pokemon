import useGameStore from '../store/gameStore';

export default function StabilizeToggle() {
  const { physicsEnabled, togglePhysics } = useGameStore();

  return (
    <button
      id="stabilize-toggle"
      className={`stabilize-btn ${physicsEnabled ? 'chaos' : 'stable'}`}
      onClick={togglePhysics}
      title={physicsEnabled ? 'Stabilize UI' : 'Unleash Chaos'}
    >
      <span className="stabilize-icon">
        {physicsEnabled ? '🌀' : '📌'}
      </span>
      <span className="stabilize-text">
        {physicsEnabled ? 'Stabilize' : 'Chaos Mode'}
      </span>
    </button>
  );
}
