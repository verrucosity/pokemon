import { create } from 'zustand';
import { getRandomTier, getRandomPokemon } from '../data/pokemon';

const createPlayer = (name, id) => ({
  id,
  name,
  team: [null, null, null, null, null, null],
  currentRating: 1000,
  rerollsUsed: 0,
  isWinner: false,
});

const useGameStore = create((set, get) => ({
  // Phase: 'lobby' | 'draft' | 'race'
  phase: 'lobby',

  // Players
  players: [],
  
  // Draft state
  currentPlayerIndex: 0,
  currentPickIndex: 0,
  spinResult: null, // { tier, pokemon } or null
  spinPhase: 'idle', // 'idle' | 'spinning-tier' | 'tier-result' | 'spinning-pokemon' | 'pokemon-result'
  draftedPool: [], // names of all drafted pokemon (for global pool mode)

  // Rules
  rules: {
    allowDuplicates: false,
    bannedTiers: [],
    rerollsPerPlayer: 1,
    globalPool: true, // if true, once a pokemon is drafted, no one else can get it
  },

  // UI state
  physicsEnabled: false,
  showExport: false,
  exportPlayerId: null,

  // Actions
  addPlayer: (name) => set(state => ({
    players: [...state.players, createPlayer(name, Date.now() + Math.random())],
  })),

  removePlayer: (id) => set(state => ({
    players: state.players.filter(p => p.id !== id),
  })),

  updateRules: (newRules) => set(state => ({
    rules: { ...state.rules, ...newRules },
  })),

  startDraft: () => set({
    phase: 'draft',
    currentPlayerIndex: 0,
    currentPickIndex: 0,
    spinResult: null,
    spinPhase: 'idle',
  }),

  spinForTier: () => {
    const { rules } = get();
    const tier = getRandomTier(rules.bannedTiers);
    set({ spinPhase: 'spinning-tier' });
    
    setTimeout(() => {
      set({ 
        spinResult: { tier, pokemon: null },
        spinPhase: 'tier-result',
      });
    }, 2000);
  },

  spinForPokemon: () => {
    const { spinResult, rules, draftedPool } = get();
    if (!spinResult?.tier) return;
    
    const excludeNames = rules.globalPool ? draftedPool : [];
    const pokemon = getRandomPokemon(spinResult.tier, excludeNames);
    
    set({ spinPhase: 'spinning-pokemon' });
    
    setTimeout(() => {
      set({
        spinResult: { ...spinResult, pokemon },
        spinPhase: 'pokemon-result',
      });
    }, 2000);
  },

  acceptPick: () => {
    const { spinResult, currentPlayerIndex, players, draftedPool } = get();
    if (!spinResult?.pokemon) return;

    const updatedPlayers = [...players];
    const player = { ...updatedPlayers[currentPlayerIndex] };
    const team = [...player.team];
    
    const emptySlot = team.findIndex(slot => slot === null);
    if (emptySlot === -1) return;
    
    team[emptySlot] = { ...spinResult.pokemon, tier: spinResult.tier };
    player.team = team;
    updatedPlayers[currentPlayerIndex] = player;

    const newDraftedPool = [...draftedPool, spinResult.pokemon.name];

    // Move to next player
    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    let nextPickIndex = get().currentPickIndex;
    
    // If we've gone through all players, increment pick index
    if (nextPlayerIndex === 0) {
      nextPickIndex++;
    }

    // Check if draft is complete (all players have 6)
    const draftComplete = updatedPlayers.every(p => p.team.every(slot => slot !== null));

    set({
      players: updatedPlayers,
      draftedPool: newDraftedPool,
      currentPlayerIndex: nextPlayerIndex,
      currentPickIndex: nextPickIndex,
      spinResult: null,
      spinPhase: 'idle',
      phase: draftComplete ? 'race' : 'draft',
    });
  },

  useReroll: () => {
    const { currentPlayerIndex, players, rules } = get();
    const player = players[currentPlayerIndex];
    
    if (player.rerollsUsed >= rules.rerollsPerPlayer) return false;

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = {
      ...player,
      rerollsUsed: player.rerollsUsed + 1,
    };

    set({
      players: updatedPlayers,
      spinResult: null,
      spinPhase: 'idle',
    });
    return true;
  },

  updateRating: (playerId, rating) => set(state => ({
    players: state.players.map(p => 
      p.id === playerId 
        ? { ...p, currentRating: Math.max(0, Math.min(9999, rating)), isWinner: rating >= 1400 }
        : p
    ),
  })),

  togglePhysics: () => set(state => ({ physicsEnabled: !state.physicsEnabled })),

  setShowExport: (show, playerId = null) => set({
    showExport: show,
    exportPlayerId: playerId,
  }),

  goToRace: () => set({ phase: 'race' }),

  resetGame: () => set({
    phase: 'lobby',
    players: [],
    currentPlayerIndex: 0,
    currentPickIndex: 0,
    spinResult: null,
    spinPhase: 'idle',
    draftedPool: [],
    rules: {
      allowDuplicates: false,
      bannedTiers: [],
      rerollsPerPlayer: 1,
      globalPool: true,
    },
    showExport: false,
    exportPlayerId: null,
  }),
}));

export default useGameStore;
