export const ROLES = [
  'Physical Attacker',
  'Special Attacker',
  'Wall',
  'Hazard Setter',
  'Hazard Remover',
  'Speed Control',
  'Pivot',
  'Setup Sweeper',
];

export const ROLE_ICONS = {
  'Physical Attacker': '⚔️',
  'Special Attacker': '🔮',
  'Wall': '🛡️',
  'Hazard Setter': '🪨',
  'Hazard Remover': '🧹',
  'Speed Control': '⚡',
  'Pivot': '🔄',
  'Setup Sweeper': '🚀',
};

export const CRITICAL_ROLES = ['Hazard Setter', 'Speed Control', 'Wall'];

export function analyzeTeam(team) {
  const warnings = [];
  const roleCount = {};
  let physicalCount = 0;
  let specialCount = 0;

  ROLES.forEach(r => { roleCount[r] = 0; });

  team.forEach(pokemon => {
    if (!pokemon) return;
    pokemon.roles.forEach(role => {
      roleCount[role] = (roleCount[role] || 0) + 1;
    });
    if (pokemon.roles.includes('Physical Attacker')) physicalCount++;
    if (pokemon.roles.includes('Special Attacker')) specialCount++;
  });

  if (team.filter(Boolean).length >= 3) {
    if (roleCount['Hazard Setter'] === 0) {
      warnings.push({ type: 'warning', icon: '🪨', text: 'No hazard setter!' });
    }
    if (roleCount['Speed Control'] === 0) {
      warnings.push({ type: 'warning', icon: '⚡', text: 'No speed control!' });
    }
    if (roleCount['Wall'] === 0) {
      warnings.push({ type: 'info', icon: '🛡️', text: 'No defensive wall' });
    }
    if (roleCount['Hazard Remover'] === 0) {
      warnings.push({ type: 'info', icon: '🧹', text: 'No hazard removal' });
    }
    if (physicalCount >= 4 && specialCount === 0) {
      warnings.push({ type: 'warning', icon: '⚠️', text: 'All physical attackers — easily walled!' });
    }
    if (specialCount >= 4 && physicalCount === 0) {
      warnings.push({ type: 'warning', icon: '⚠️', text: 'All special attackers — easily walled!' });
    }
  }

  return { warnings, roleCount, physicalCount, specialCount };
}
