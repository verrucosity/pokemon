import { useState } from 'react';
import useGameStore from '../store/gameStore';
import { TIERS, TIER_COLORS, POKEMON_BY_TIER, getSpriteUrl } from '../data/pokemon';
import PhysicsBody from '../physics/PhysicsBody';

export default function SpinWheel() {
  const { 
    players, currentPlayerIndex, spinResult, spinPhase,
    spinForTier, spinForPokemon, acceptPick, useReroll, rules
  } = useGameStore();
  
  const [wheelRotation, setWheelRotation] = useState(0);
  const [pokemonWheelRotation, setPokemonWheelRotation] = useState(0);
  const currentPlayer = players[currentPlayerIndex];
  const canReroll = currentPlayer && currentPlayer.rerollsUsed < rules.rerollsPerPlayer;
  const picksRemaining = currentPlayer ? currentPlayer.team.filter(s => s === null).length : 0;
  const pickNumber = currentPlayer ? 7 - picksRemaining : 0;

  const handleSpinTier = () => {
    const spins = 3 + Math.random() * 5;
    setWheelRotation(prev => prev + spins * 360 + Math.random() * 360);
    spinForTier();
  };

  const handleSpinPokemon = () => {
    const spins = 3 + Math.random() * 5;
    setPokemonWheelRotation(prev => prev + spins * 360 + Math.random() * 360);
    spinForPokemon();
  };

  const handleReroll = () => {
    useReroll();
  };

  const availableTiers = TIERS.filter(t => !rules.bannedTiers.includes(t));

  return (
    <div className="spin-area">
      {/* Current Player Banner */}
      <PhysicsBody id="player-banner" restitution={0.8}>
        <div className="current-player-banner">
          <span className="banner-label">Drafting</span>
          <span className="banner-name">{currentPlayer?.name}</span>
          <span className="banner-picks">Pick {pickNumber + 1} of 6</span>
        </div>
      </PhysicsBody>

      <div className="wheels-container">
        {/* Tier Wheel */}
        <PhysicsBody id="tier-wheel-box">
          <div className="wheel-section">
            <h3 className="wheel-label">Tier Wheel</h3>
            <div className="wheel-frame">
              <div className="wheel-pointer">▼</div>
              <div
                className="wheel"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: spinPhase === 'spinning-tier' ? 'transform 2s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                }}
              >
                {availableTiers.map((tier, i) => {
                  const angle = (360 / availableTiers.length) * i;
                  return (
                    <div
                      key={tier}
                      className="wheel-segment"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        '--segment-color': TIER_COLORS[tier],
                        '--segment-count': availableTiers.length,
                      }}
                    >
                      <span className="segment-text">{tier}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {spinPhase === 'idle' && (
              <button
                id="spin-tier-btn"
                className="btn btn-spin"
                onClick={handleSpinTier}
              >
                🎰 Spin for Tier
              </button>
            )}
          </div>
        </PhysicsBody>

        {/* Result Display */}
        <div className="spin-result-area">
          {spinResult?.tier && (
            <PhysicsBody id="tier-result-badge">
              <div className="tier-result animate-bounce-in" style={{
                '--tier-color': TIER_COLORS[spinResult.tier],
              }}>
                <span className="result-label">Tier</span>
                <span className="result-value tier-badge">{spinResult.tier}</span>
              </div>
            </PhysicsBody>
          )}

          {spinResult?.pokemon && (
            <PhysicsBody id="pkmn-result-card" restitution={0.5}>
              <div className="pokemon-result animate-bounce-in">
                <img
                  src={getSpriteUrl(spinResult.pokemon.dexId)}
                  alt={spinResult.pokemon.name}
                  className="result-sprite"
                />
                <span className="result-pokemon-name">{spinResult.pokemon.name}</span>
                <div className="result-types">
                  {spinResult.pokemon.types.map(type => (
                    <span key={type} className={`type-badge type-${type.toLowerCase()}`}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </PhysicsBody>
          )}

          {/* Action Buttons */}
          <div className="spin-actions">
            {spinPhase === 'tier-result' && (
              <PhysicsBody id="spin-pkmn-btn-box">
                <button
                  id="spin-pokemon-btn"
                  className="btn btn-spin btn-pop"
                  onClick={handleSpinPokemon}
                >
                  🎰 Spin for Pokémon
                </button>
              </PhysicsBody>
            )}

            {spinPhase === 'pokemon-result' && (
              <PhysicsBody id="accept-actions-box">
                <div className="accept-actions">
                  <button
                    id="accept-pick-btn"
                    className="btn btn-accept btn-pop"
                    onClick={acceptPick}
                  >
                    ✅ Accept
                  </button>
                  {canReroll && (
                    <button
                      id="reroll-btn"
                      className="btn btn-reroll btn-pop"
                      onClick={handleReroll}
                    >
                      🔄 Reroll ({rules.rerollsPerPlayer - currentPlayer.rerollsUsed})
                    </button>
                  )}
                </div>
              </PhysicsBody>
            )}

            {(spinPhase === 'spinning-tier' || spinPhase === 'spinning-pokemon') && (
              <div style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.85rem',
                fontStyle: 'italic',
                animation: 'pulse-glow 1s ease-in-out infinite',
              }}>
                Spinning...
              </div>
            )}
          </div>
        </div>

        {/* Pokémon Wheel (visual only) */}
        {spinResult?.tier && spinPhase !== 'idle' && (
          <PhysicsBody id="pkmn-pool-wheel">
            <div className="wheel-section">
              <h3 className="wheel-label">{spinResult.tier} Pool</h3>
              <div className="wheel-frame">
                <div className="wheel-pointer">▼</div>
                <div
                  className="wheel"
                  style={{
                    transform: `rotate(${pokemonWheelRotation}deg)`,
                    transition: spinPhase === 'spinning-pokemon' ? 'transform 2s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                  }}
                >
                  {POKEMON_BY_TIER[spinResult.tier].slice(0, 12).map((pkmn, i) => {
                    const count = Math.min(12, POKEMON_BY_TIER[spinResult.tier].length);
                    const angle = (360 / count) * i;
                    return (
                      <div
                        key={pkmn.name}
                        className="wheel-segment"
                        style={{
                          transform: `rotate(${angle}deg)`,
                          '--segment-color': TIER_COLORS[spinResult.tier],
                          '--segment-count': count,
                        }}
                      >
                        <span className="segment-text segment-text-sm">{pkmn.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </PhysicsBody>
        )}
      </div>
    </div>
  );
}
