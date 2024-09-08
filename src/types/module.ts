export type ModuleCard = {
  q: string;
  a: string[];
};

export type Module = {
  id: string;
  name: string;
  cards: ModuleCard[];
  tags: string[];
};

export type Answer = { q: string; isCorrect: boolean };

export type ExerciseMode = "20" | "100" | "500" | "all";
