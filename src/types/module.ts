export type ModuleCard = {
  q: string;
  a: string[];
};

export type Module = {
  id: string;
  name: string;
  cards: ModuleCard[];
};

export type Answer = { q: string; isCorrect: boolean };

export type ExerciseMode = "20" | "100" | "500";
