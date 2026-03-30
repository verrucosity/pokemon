import { getSpriteUrl, TIER_COLORS } from '../data/pokemon';

export default function PokemonCard({ pokemon, tier, size = 'normal', showRoles = false }) {
  if (!pokemon) {
    return (
      <div className={`pokemon-card empty-card ${size}`}>
        <div className="empty-slot-icon">?</div>
        <span className="empty-slot-text">Empty Slot</span>
      </div>
    );
  }

  const tierColor = TIER_COLORS[tier || pokemon.tier];

  return (
    <div
      className={`pokemon-card ${size}`}
      style={{ '--card-accent': tierColor }}
    >
      <div className="card-tier-badge" style={{ background: tierColor }}>
        {tier || pokemon.tier}
      </div>
      <div className="card-sprite-container">
        <img
          src={getSpriteUrl(pokemon.dexId)}
          alt={pokemon.name}
          className="card-sprite"
          loading="lazy"
        />
      </div>
      <h4 className="card-name">{pokemon.name}</h4>
      <div className="card-types">
        {pokemon.types.map(type => (
          <span key={type} className={`type-badge type-${type.toLowerCase()}`}>
            {type}
          </span>
        ))}
      </div>
      {showRoles && pokemon.roles && (
        <div className="card-roles">
          {pokemon.roles.map(role => (
            <span key={role} className="role-tag">{role}</span>
          ))}
        </div>
      )}
    </div>
  );
}
