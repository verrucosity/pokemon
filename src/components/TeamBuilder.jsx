import useGameStore from '../store/gameStore';
import PokemonCard from './PokemonCard';
import { analyzeTeam } from '../data/roles';

export default function TeamBuilder({ playerId, compact = false }) {
  const { players, setShowExport } = useGameStore();
  const player = players.find(p => p.id === playerId);
  
  if (!player) return null;

  const { warnings } = analyzeTeam(player.team);
  const filledSlots = player.team.filter(Boolean).length;

  return (
    <div className={`team-builder ${compact ? 'compact' : ''}`}>
      <div className="team-header">
        <h3 className="team-player-name">{player.name}'s Team</h3>
        <span className="team-count">{filledSlots}/6</span>
      </div>

      <div className="team-grid">
        {player.team.map((pokemon, i) => (
          <div key={i} className="team-slot">
            <PokemonCard
              pokemon={pokemon}
              tier={pokemon?.tier}
              size={compact ? 'small' : 'normal'}
              showRoles={!compact}
            />
          </div>
        ))}
      </div>

      {/* Team Warnings */}
      {warnings.length > 0 && !compact && (
        <div className="team-warnings">
          {warnings.map((warning, i) => (
            <div
              key={i}
              className={`warning-tooltip ${warning.type}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="warning-icon">{warning.icon}</span>
              <span className="warning-text">{warning.text}</span>
            </div>
          ))}
        </div>
      )}

      {filledSlots > 0 && (
        <button
          className="btn btn-export-small"
          onClick={() => setShowExport(true, playerId)}
        >
          📋 Export
        </button>
      )}
    </div>
  );
}
