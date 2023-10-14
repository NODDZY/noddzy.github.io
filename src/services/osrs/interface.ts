export interface PlayerInfoResponse {
  id: number;
  username: string;
  displayName: string;
  type: string;
  status: string;
  country: string | null;
  exp: number;
  registeredAt: string;
  updatedAt: string;
  lastChangedAt: string;
  lastImportedAt: string;
  latestSnapshot: Snapshot;
  combatLevel: number;
}

export interface Snapshot {
  id: number;
  playerId: number;
  createdAt: string;
  importedAt: string | null;
  data: {
    skills: RuneScapeSkillsList;
  };
}

export interface RunescapeSkill {
  metric: string;
  experience: number;
  rank: number;
  level: number;
}

export interface RuneScapeSkillsList {
  overall: RunescapeSkill;
  attack: RunescapeSkill;
  strength: RunescapeSkill;
  defence: RunescapeSkill;
  ranged: RunescapeSkill;
  prayer: RunescapeSkill;
  magic: RunescapeSkill;
  hitpoints: RunescapeSkill;
  farming: RunescapeSkill;
  fishing: RunescapeSkill;
  hunter: RunescapeSkill;
  mining: RunescapeSkill;
  woodcutting: RunescapeSkill;
  cooking: RunescapeSkill;
  crafting: RunescapeSkill;
  fletching: RunescapeSkill;
  herblore: RunescapeSkill;
  runecraft: RunescapeSkill;
  smithing: RunescapeSkill;
  agility: RunescapeSkill;
  construction: RunescapeSkill;
  firemaking: RunescapeSkill;
  slayer: RunescapeSkill;
  thieving: RunescapeSkill;
  // Add sailing when released
}
