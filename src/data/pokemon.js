// Curated Pokémon dataset organized by Smogon tier
// Each entry: { name, dexId, types, roles }
// dexId used for sprite: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{dexId}.png

export const TIERS = ['Ubers', 'OU', 'UU', 'RU', 'NU', 'PU'];

export const TIER_COLORS = {
  Ubers: '#ff4444',
  OU: '#ff8800',
  UU: '#ffcc00',
  RU: '#44bb44',
  NU: '#4488ff',
  PU: '#aa66cc',
};

export const TIER_WEIGHTS = {
  Ubers: 5,
  OU: 30,
  UU: 25,
  RU: 20,
  NU: 15,
  PU: 5,
};

export const POKEMON_BY_TIER = {
  Ubers: [
    { name: 'Mewtwo', dexId: 150, types: ['Psychic'], roles: ['Special Attacker', 'Setup Sweeper'] },
    { name: 'Kyogre', dexId: 382, types: ['Water'], roles: ['Special Attacker', 'Wall'] },
    { name: 'Groudon', dexId: 383, types: ['Ground'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Rayquaza', dexId: 384, types: ['Dragon', 'Flying'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Dialga', dexId: 483, types: ['Steel', 'Dragon'], roles: ['Special Attacker', 'Hazard Setter'] },
    { name: 'Palkia', dexId: 484, types: ['Water', 'Dragon'], roles: ['Special Attacker'] },
    { name: 'Giratina', dexId: 487, types: ['Ghost', 'Dragon'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Zacian', dexId: 888, types: ['Fairy'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Calyrex-Shadow', dexId: 898, types: ['Psychic', 'Ghost'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Eternatus', dexId: 890, types: ['Poison', 'Dragon'], roles: ['Special Attacker', 'Hazard Setter'] },
    { name: 'Lunala', dexId: 792, types: ['Psychic', 'Ghost'], roles: ['Special Attacker', 'Wall'] },
    { name: 'Solgaleo', dexId: 791, types: ['Psychic', 'Steel'], roles: ['Physical Attacker', 'Wall'] },
    { name: 'Xerneas', dexId: 716, types: ['Fairy'], roles: ['Special Attacker', 'Setup Sweeper'] },
    { name: 'Yveltal', dexId: 717, types: ['Dark', 'Flying'], roles: ['Special Attacker', 'Pivot'] },
    { name: 'Zygarde', dexId: 718, types: ['Dragon', 'Ground'], roles: ['Physical Attacker', 'Setup Sweeper'] },
  ],
  OU: [
    { name: 'Garchomp', dexId: 445, types: ['Dragon', 'Ground'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Dragapult', dexId: 887, types: ['Dragon', 'Ghost'], roles: ['Physical Attacker', 'Speed Control'] },
    { name: 'Heatran', dexId: 485, types: ['Fire', 'Steel'], roles: ['Special Attacker', 'Hazard Setter'] },
    { name: 'Ferrothorn', dexId: 598, types: ['Grass', 'Steel'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Toxapex', dexId: 748, types: ['Poison', 'Water'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Clefable', dexId: 36, types: ['Fairy'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Corviknight', dexId: 823, types: ['Flying', 'Steel'], roles: ['Wall', 'Hazard Remover'] },
    { name: 'Landorus-T', dexId: 645, types: ['Ground', 'Flying'], roles: ['Physical Attacker', 'Hazard Setter', 'Pivot'] },
    { name: 'Tapu Lele', dexId: 786, types: ['Psychic', 'Fairy'], roles: ['Special Attacker'] },
    { name: 'Weavile', dexId: 461, types: ['Dark', 'Ice'], roles: ['Physical Attacker', 'Speed Control'] },
    { name: 'Rillaboom', dexId: 812, types: ['Grass'], roles: ['Physical Attacker', 'Pivot'] },
    { name: 'Volcarona', dexId: 637, types: ['Bug', 'Fire'], roles: ['Special Attacker', 'Setup Sweeper'] },
    { name: 'Tyranitar', dexId: 248, types: ['Rock', 'Dark'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Slowbro', dexId: 80, types: ['Water', 'Psychic'], roles: ['Wall', 'Pivot'] },
    { name: 'Magnezone', dexId: 462, types: ['Electric', 'Steel'], roles: ['Special Attacker'] },
    { name: 'Blissey', dexId: 242, types: ['Normal'], roles: ['Wall'] },
    { name: 'Excadrill', dexId: 530, types: ['Ground', 'Steel'], roles: ['Physical Attacker', 'Hazard Remover', 'Speed Control'] },
    { name: 'Dragonite', dexId: 149, types: ['Dragon', 'Flying'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Kartana', dexId: 798, types: ['Grass', 'Steel'], roles: ['Physical Attacker', 'Speed Control'] },
    { name: 'Rotom-Wash', dexId: 479, types: ['Electric', 'Water'], roles: ['Wall', 'Pivot'] },
    { name: 'Zapdos', dexId: 145, types: ['Electric', 'Flying'], roles: ['Special Attacker', 'Hazard Remover', 'Pivot'] },
    { name: 'Cinderace', dexId: 815, types: ['Fire'], roles: ['Physical Attacker', 'Speed Control', 'Pivot'] },
    { name: 'Bisharp', dexId: 625, types: ['Dark', 'Steel'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Tornadus-T', dexId: 641, types: ['Flying'], roles: ['Special Attacker', 'Pivot', 'Hazard Remover'] },
    { name: 'Tapu Koko', dexId: 785, types: ['Electric', 'Fairy'], roles: ['Special Attacker', 'Speed Control', 'Pivot'] },
  ],
  UU: [
    { name: 'Scizor', dexId: 212, types: ['Bug', 'Steel'], roles: ['Physical Attacker', 'Pivot'] },
    { name: 'Hydreigon', dexId: 635, types: ['Dark', 'Dragon'], roles: ['Special Attacker'] },
    { name: 'Hippowdon', dexId: 450, types: ['Ground'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Tentacruel', dexId: 73, types: ['Water', 'Poison'], roles: ['Hazard Setter', 'Hazard Remover', 'Pivot'] },
    { name: 'Mamoswine', dexId: 473, types: ['Ice', 'Ground'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Salamence', dexId: 373, types: ['Dragon', 'Flying'], roles: ['Physical Attacker', 'Special Attacker', 'Setup Sweeper'] },
    { name: 'Celebi', dexId: 251, types: ['Psychic', 'Grass'], roles: ['Pivot', 'Hazard Setter'] },
    { name: 'Krookodile', dexId: 553, types: ['Ground', 'Dark'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Azumarill', dexId: 184, types: ['Water', 'Fairy'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Lucario', dexId: 448, types: ['Fighting', 'Steel'], roles: ['Physical Attacker', 'Special Attacker', 'Setup Sweeper'] },
    { name: 'Chandelure', dexId: 609, types: ['Ghost', 'Fire'], roles: ['Special Attacker'] },
    { name: 'Aegislash', dexId: 681, types: ['Steel', 'Ghost'], roles: ['Physical Attacker', 'Special Attacker', 'Wall'] },
    { name: 'Mienshao', dexId: 620, types: ['Fighting'], roles: ['Physical Attacker', 'Pivot', 'Speed Control'] },
    { name: 'Infernape', dexId: 392, types: ['Fire', 'Fighting'], roles: ['Physical Attacker', 'Special Attacker', 'Hazard Setter'] },
    { name: 'Togekiss', dexId: 468, types: ['Fairy', 'Flying'], roles: ['Special Attacker', 'Setup Sweeper'] },
    { name: 'Suicune', dexId: 245, types: ['Water'], roles: ['Wall', 'Setup Sweeper'] },
    { name: 'Jirachi', dexId: 385, types: ['Steel', 'Psychic'], roles: ['Wall', 'Hazard Setter', 'Pivot'] },
    { name: 'Gengar', dexId: 94, types: ['Ghost', 'Poison'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Starmie', dexId: 121, types: ['Water', 'Psychic'], roles: ['Special Attacker', 'Hazard Remover', 'Speed Control'] },
    { name: 'Nidoking', dexId: 34, types: ['Poison', 'Ground'], roles: ['Special Attacker', 'Hazard Setter'] },
    { name: 'Heracross', dexId: 214, types: ['Bug', 'Fighting'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Swampert', dexId: 260, types: ['Water', 'Ground'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Metagross', dexId: 376, types: ['Steel', 'Psychic'], roles: ['Physical Attacker'] },
    { name: 'Cobalion', dexId: 638, types: ['Steel', 'Fighting'], roles: ['Physical Attacker', 'Hazard Setter', 'Speed Control'] },
    { name: 'Crawdaunt', dexId: 342, types: ['Water', 'Dark'], roles: ['Physical Attacker', 'Setup Sweeper'] },
  ],
  RU: [
    { name: 'Milotic', dexId: 350, types: ['Water'], roles: ['Wall', 'Special Attacker'] },
    { name: 'Flygon', dexId: 330, types: ['Ground', 'Dragon'], roles: ['Physical Attacker', 'Pivot'] },
    { name: 'Roserade', dexId: 407, types: ['Grass', 'Poison'], roles: ['Special Attacker', 'Hazard Setter'] },
    { name: 'Donphan', dexId: 232, types: ['Ground'], roles: ['Physical Attacker', 'Hazard Setter', 'Hazard Remover'] },
    { name: 'Goodra', dexId: 706, types: ['Dragon'], roles: ['Special Attacker', 'Wall'] },
    { name: 'Noivern', dexId: 715, types: ['Flying', 'Dragon'], roles: ['Special Attacker', 'Speed Control', 'Pivot'] },
    { name: 'Toxicroak', dexId: 454, types: ['Poison', 'Fighting'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Magneton', dexId: 82, types: ['Electric', 'Steel'], roles: ['Special Attacker'] },
    { name: 'Diancie', dexId: 719, types: ['Rock', 'Fairy'], roles: ['Hazard Setter', 'Special Attacker'] },
    { name: 'Crobat', dexId: 169, types: ['Poison', 'Flying'], roles: ['Speed Control', 'Hazard Setter', 'Pivot'] },
    { name: 'Registeel', dexId: 379, types: ['Steel'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Cloyster', dexId: 91, types: ['Water', 'Ice'], roles: ['Physical Attacker', 'Setup Sweeper', 'Hazard Setter'] },
    { name: 'Arcanine', dexId: 59, types: ['Fire'], roles: ['Physical Attacker', 'Pivot'] },
    { name: 'Umbreon', dexId: 197, types: ['Dark'], roles: ['Wall'] },
    { name: 'Braviary', dexId: 628, types: ['Normal', 'Flying'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Bewear', dexId: 760, types: ['Normal', 'Fighting'], roles: ['Physical Attacker'] },
    { name: 'Salazzle', dexId: 758, types: ['Poison', 'Fire'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Blastoise', dexId: 9, types: ['Water'], roles: ['Wall', 'Hazard Remover'] },
    { name: 'Gastrodon', dexId: 423, types: ['Water', 'Ground'], roles: ['Wall'] },
    { name: 'Meowscarada', dexId: 908, types: ['Grass', 'Dark'], roles: ['Physical Attacker', 'Speed Control'] },
    { name: 'Tsareena', dexId: 763, types: ['Grass'], roles: ['Physical Attacker', 'Hazard Remover'] },
    { name: 'Gardevoir', dexId: 282, types: ['Psychic', 'Fairy'], roles: ['Special Attacker'] },
    { name: 'Yanmega', dexId: 469, types: ['Bug', 'Flying'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Espeon', dexId: 196, types: ['Psychic'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Kingdra', dexId: 230, types: ['Water', 'Dragon'], roles: ['Special Attacker', 'Setup Sweeper'] },
  ],
  NU: [
    { name: 'Passimian', dexId: 766, types: ['Fighting'], roles: ['Physical Attacker', 'Pivot'] },
    { name: 'Tauros', dexId: 128, types: ['Normal'], roles: ['Physical Attacker', 'Speed Control'] },
    { name: 'Drapion', dexId: 452, types: ['Poison', 'Dark'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Vaporeon', dexId: 134, types: ['Water'], roles: ['Wall'] },
    { name: 'Sandslash', dexId: 28, types: ['Ground'], roles: ['Physical Attacker', 'Hazard Setter', 'Hazard Remover'] },
    { name: 'Decidueye', dexId: 724, types: ['Grass', 'Ghost'], roles: ['Physical Attacker', 'Hazard Remover'] },
    { name: 'Snorlax', dexId: 143, types: ['Normal'], roles: ['Wall', 'Physical Attacker'] },
    { name: 'Vileplume', dexId: 45, types: ['Grass', 'Poison'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Inteleon', dexId: 818, types: ['Water'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Copperajah', dexId: 879, types: ['Steel'], roles: ['Physical Attacker', 'Wall'] },
    { name: 'Hariyama', dexId: 297, types: ['Fighting'], roles: ['Physical Attacker', 'Wall'] },
    { name: 'Xatu', dexId: 178, types: ['Psychic', 'Flying'], roles: ['Pivot', 'Hazard Remover'] },
    { name: 'Steelix', dexId: 208, types: ['Steel', 'Ground'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Talonflame', dexId: 663, types: ['Fire', 'Flying'], roles: ['Physical Attacker', 'Speed Control', 'Hazard Remover'] },
    { name: 'Rotom-Mow', dexId: 479, types: ['Electric', 'Grass'], roles: ['Special Attacker', 'Pivot'] },
    { name: 'Pangoro', dexId: 675, types: ['Fighting', 'Dark'], roles: ['Physical Attacker'] },
    { name: 'Vanilluxe', dexId: 584, types: ['Ice'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Garbodor', dexId: 569, types: ['Poison'], roles: ['Hazard Setter', 'Wall'] },
    { name: 'Mudsdale', dexId: 750, types: ['Ground'], roles: ['Physical Attacker', 'Wall'] },
    { name: 'Hitmontop', dexId: 237, types: ['Fighting'], roles: ['Physical Attacker', 'Hazard Remover', 'Pivot'] },
    { name: 'Weezing', dexId: 110, types: ['Poison'], roles: ['Wall'] },
    { name: 'Palossand', dexId: 770, types: ['Ghost', 'Ground'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Oricorio', dexId: 741, types: ['Fire', 'Flying'], roles: ['Special Attacker', 'Setup Sweeper'] },
    { name: 'Silvally', dexId: 773, types: ['Normal'], roles: ['Physical Attacker', 'Pivot'] },
    { name: 'Arboliva', dexId: 899, types: ['Grass', 'Normal'], roles: ['Special Attacker', 'Wall'] },
  ],
  PU: [
    { name: 'Pyroar', dexId: 668, types: ['Fire', 'Normal'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Froslass', dexId: 478, types: ['Ice', 'Ghost'], roles: ['Hazard Setter', 'Speed Control'] },
    { name: 'Jellicent', dexId: 593, types: ['Water', 'Ghost'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Swoobat', dexId: 528, types: ['Psychic', 'Flying'], roles: ['Setup Sweeper', 'Speed Control'] },
    { name: 'Electrode', dexId: 101, types: ['Electric'], roles: ['Speed Control', 'Special Attacker'] },
    { name: 'Mawile', dexId: 303, types: ['Steel', 'Fairy'], roles: ['Physical Attacker', 'Setup Sweeper'] },
    { name: 'Haunter', dexId: 93, types: ['Ghost', 'Poison'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Leafeon', dexId: 470, types: ['Grass'], roles: ['Physical Attacker'] },
    { name: 'Poliwrath', dexId: 62, types: ['Water', 'Fighting'], roles: ['Physical Attacker', 'Wall'] },
    { name: 'Dugtrio', dexId: 51, types: ['Ground'], roles: ['Physical Attacker', 'Speed Control'] },
    { name: 'Whiscash', dexId: 340, types: ['Water', 'Ground'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Primeape', dexId: 57, types: ['Fighting'], roles: ['Physical Attacker', 'Speed Control'] },
    { name: 'Golurk', dexId: 623, types: ['Ground', 'Ghost'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Basculin', dexId: 550, types: ['Water'], roles: ['Physical Attacker', 'Speed Control'] },
    { name: 'Skuntank', dexId: 435, types: ['Poison', 'Dark'], roles: ['Physical Attacker', 'Hazard Setter'] },
    { name: 'Persian', dexId: 53, types: ['Normal'], roles: ['Speed Control', 'Pivot'] },
    { name: 'Corsola', dexId: 222, types: ['Water', 'Rock'], roles: ['Wall', 'Hazard Setter'] },
    { name: 'Chatot', dexId: 441, types: ['Normal', 'Flying'], roles: ['Special Attacker', 'Speed Control'] },
    { name: 'Lanturn', dexId: 171, types: ['Water', 'Electric'], roles: ['Special Attacker', 'Pivot'] },
    { name: 'Raichu', dexId: 26, types: ['Electric'], roles: ['Special Attacker', 'Speed Control'] },
  ],
};

export function getRandomTier(bannedTiers = []) {
  const available = TIERS.filter(t => !bannedTiers.includes(t));
  if (available.length === 0) return null;
  
  const totalWeight = available.reduce((sum, t) => sum + TIER_WEIGHTS[t], 0);
  let roll = Math.random() * totalWeight;
  
  for (const tier of available) {
    roll -= TIER_WEIGHTS[tier];
    if (roll <= 0) return tier;
  }
  return available[available.length - 1];
}

export function getRandomPokemon(tier, excludeNames = []) {
  const pool = POKEMON_BY_TIER[tier].filter(p => !excludeNames.includes(p.name));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getSpriteUrl(dexId) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexId}.png`;
}
