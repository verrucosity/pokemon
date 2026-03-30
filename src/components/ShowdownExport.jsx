import useGameStore from '../store/gameStore';

export default function ShowdownExport() {
  const { players, showExport, exportPlayerId, setShowExport } = useGameStore();
  
  if (!showExport) return null;

  const player = players.find(p => p.id === exportPlayerId);
  if (!player) return null;

  const exportText = player.team
    .filter(Boolean)
    .map(pokemon => pokemon.name)
    .join('\n');

  const fullExport = `=== [${player.name}] Race to 1400 Draft ===\n\n` +
    player.team
      .filter(Boolean)
      .map(pokemon => `${pokemon.name}\nAbility: \nEVs: \nNature: \n- \n- \n- \n- \n`)
      .join('\n');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setShowExport(false)}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📋 Showdown Export</h2>
          <button className="modal-close" onClick={() => setShowExport(false)}>✕</button>
        </div>
        
        <p className="modal-subtitle">{player.name}'s Team</p>

        <div className="export-section">
          <h3>Quick Copy (Names Only)</h3>
          <pre className="export-block">{exportText}</pre>
          <button 
            className="btn btn-primary"
            onClick={() => copyToClipboard(exportText)}
          >
            📋 Copy Names
          </button>
        </div>

        <div className="export-section">
          <h3>Showdown Format (Template)</h3>
          <pre className="export-block export-full">{fullExport}</pre>
          <button 
            className="btn btn-primary"
            onClick={() => copyToClipboard(fullExport)}
          >
            📋 Copy Full Template
          </button>
        </div>
      </div>
    </div>
  );
}
