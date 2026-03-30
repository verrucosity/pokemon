import { useState } from 'react';
import useGameStore from '../store/gameStore';

export default function RatingTracker() {
  const { players, updateRating } = useGameStore();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const sortedPlayers = [...players].sort((a, b) => b.currentRating - a.currentRating);
  const winner = sortedPlayers.find(p => p.isWinner);

  const startEdit = (player) => {
    setEditingId(player.id);
    setEditValue(String(player.currentRating));
  };

  const commitEdit = (playerId) => {
    const rating = parseInt(editValue, 10);
    if (!isNaN(rating)) {
      updateRating(playerId, rating);
    }
    setEditingId(null);
  };

  const getProgressPercent = (rating) => {
    const min = 1000;
    const max = 1400;
    return Math.min(100, Math.max(0, ((rating - min) / (max - min)) * 100));
  };

  const getProgressColor = (percent) => {
    if (percent >= 100) return '#00e676';
    if (percent >= 75) return '#00e5ff';
    if (percent >= 50) return '#ffd740';
    if (percent >= 25) return '#ff8a65';
    return '#ff5252';
  };

  return (
    <div className="rating-tracker">
      <div className="tracker-header">
        <h2 className="tracker-title">
          <span className="title-icon">🏆</span>
          Race to 1400
        </h2>
        {winner && (
          <div className="winner-banner animate-bounce-in">
            <span className="winner-crown">👑</span>
            <span className="winner-name">{winner.name}</span>
            <span className="winner-text">Wins!</span>
          </div>
        )}
      </div>

      <div className="leaderboard">
        {sortedPlayers.map((player, rank) => {
          const progress = getProgressPercent(player.currentRating);
          const color = getProgressColor(progress);
          
          return (
            <div
              key={player.id}
              className={`leaderboard-row ${player.isWinner ? 'is-winner' : ''}`}
              style={{ animationDelay: `${rank * 0.08}s` }}
            >
              <div className="rank-badge">
                {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`}
              </div>
              
              <div className="player-info">
                <span className="lb-player-name">{player.name}</span>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${color}66, ${color})`,
                    }}
                  />
                  <div className="progress-markers">
                    <span className="marker" style={{ left: '0%' }}>1000</span>
                    <span className="marker" style={{ left: '50%' }}>1200</span>
                    <span className="marker target" style={{ left: '100%' }}>1400</span>
                  </div>
                </div>
              </div>

              <div className="rating-display">
                {editingId === player.id ? (
                  <form onSubmit={(e) => { e.preventDefault(); commitEdit(player.id); }}>
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="rating-input"
                      autoFocus
                      onBlur={() => commitEdit(player.id)}
                      min={0}
                      max={9999}
                    />
                  </form>
                ) : (
                  <button
                    className="rating-value"
                    onClick={() => startEdit(player)}
                    style={{ color }}
                    title="Click to update rating"
                  >
                    {player.currentRating}
                  </button>
                )}
              </div>

              {player.isWinner && <span className="winner-sparkle">✨</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
