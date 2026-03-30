import { useState } from 'react';
import useGameStore from '../store/gameStore';
import { TIERS, TIER_COLORS } from '../data/pokemon';
import PhysicsBody from '../physics/PhysicsBody';

export default function LobbySetup() {
  const [playerName, setPlayerName] = useState('');
  const { players, addPlayer, removePlayer, rules, updateRules, startDraft } = useGameStore();

  const handleAddPlayer = (e) => {
    e.preventDefault();
    const name = playerName.trim();
    if (!name) return;
    
    // Validation
    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      alert('This name is already taken!');
      return;
    }

    if (players.length < 8) {
      addPlayer(name);
      setPlayerName('');
    }
  };

  const toggleBannedTier = (tier) => {
    const banned = rules.bannedTiers.includes(tier)
      ? rules.bannedTiers.filter(t => t !== tier)
      : [...rules.bannedTiers, tier];
    updateRules({ bannedTiers: banned });
  };

  const canStart = players.length >= 2;

  return (
    <div className="lobby-container">
      <div className="lobby-header">
        <h1 className="lobby-title">
          <span className="title-race">RACE</span>
          <span className="title-to">to</span>
          <span className="title-1400">1400</span>
        </h1>
        <p className="lobby-subtitle">Pokémon Draft Challenge</p>
      </div>

      <div className="lobby-grid">
        {/* Players Panel */}
        <PhysicsBody id="players-panel">
          <div className="glass-panel">
            <h2 className="panel-title">
              <span>👥</span>
              <span>Players</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                {players.length}/8
              </span>
            </h2>
            <form onSubmit={handleAddPlayer} className="add-player-form">
              <input
                id="player-name-input"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter player name..."
                className="glass-input"
                maxLength={20}
                autoComplete="off"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!playerName.trim() || players.length >= 8}
              >
                Add
              </button>
            </form>
            <div className="player-list">
              {players.map((player, i) => (
                <div key={player.id} className="player-chip">
                  <span className="player-number">{i + 1}</span>
                  <span className="player-name">{player.name}</span>
                  <button
                    className="remove-player-btn"
                    onClick={() => removePlayer(player.id)}
                    aria-label={`Remove ${player.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {players.length === 0 && (
                <p className="empty-hint">Add 2–8 players to begin drafting</p>
              )}
            </div>
          </div>
        </PhysicsBody>

        {/* Rules Panel */}
        <PhysicsBody id="rules-panel">
          <div className="glass-panel">
            <h2 className="panel-title">
              <span>⚙️</span>
              <span>Draft Rules</span>
            </h2>
            
            <div className="rule-row">
              <label className="rule-label">
                <input
                  type="checkbox"
                  checked={rules.allowDuplicates}
                  onChange={(e) => updateRules({ allowDuplicates: e.target.checked })}
                  className="rule-checkbox"
                />
                <span>Allow duplicate Pokémon</span>
              </label>
            </div>

            <div className="rule-row">
              <label className="rule-label">
                <input
                  type="checkbox"
                  checked={rules.globalPool}
                  onChange={(e) => updateRules({ globalPool: e.target.checked })}
                  className="rule-checkbox"
                />
                <span>Global draft pool</span>
              </label>
            </div>

            <div className="rule-row">
              <label className="rule-label">
                <span>Rerolls per player</span>
                <select
                  value={rules.rerollsPerPlayer}
                  onChange={(e) => updateRules({ rerollsPerPlayer: Number(e.target.value) })}
                  className="glass-select"
                >
                  {[0, 1, 2, 3, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="rule-section">
              <p className="rule-section-title">Banned Tiers</p>
              <div className="tier-toggles">
                {TIERS.map(tier => (
                  <button
                    key={tier}
                    className={`tier-toggle ${rules.bannedTiers.includes(tier) ? 'banned' : ''}`}
                    style={{
                      '--tier-color': TIER_COLORS[tier],
                    }}
                    onClick={() => toggleBannedTier(tier)}
                  >
                    {tier}
                    {rules.bannedTiers.includes(tier) && <span className="ban-x"> ✕</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PhysicsBody>
      </div>

      <PhysicsBody id="start-btn-container" restitution={0.6}>
        <button
          id="start-draft-btn"
          className="btn btn-start"
          disabled={!canStart}
          onClick={startDraft}
        >
          {canStart ? '🎲 Start Draft' : `Need ${2 - players.length} more player${2 - players.length !== 1 ? 's' : ''}`}
        </button>
      </PhysicsBody>
    </div>
  );
}
