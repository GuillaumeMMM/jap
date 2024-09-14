export type ModuleCard = {
  q: string;
  a: string[];
};

export type ModuleTag = {
  label: string;
  emoji?: string;
};

export type Module = {
  id: string;
  name: string;
  cards: ModuleCard[];
  tags: ModuleTag[];
};

export type Answer = { q: string; a: string[]; isCorrect: boolean };

export type ExerciseMode = "20" | "100" | "500" | "all";
