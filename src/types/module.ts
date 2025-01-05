export type ModuleCard = {
  q: string;
  a: string[];
  indication?: string;
};

export type ModuleTag = {
  label: string;
  emoji?: string;
};

export type Module = {
  id: string;
  name: string;
  cards: ModuleCard[];
  sign: string;
  tags: ModuleTag[];
};

export type Modules = Omit<Module, "cards">[];

export type Answer = { q: string; a: string[]; isCorrect: boolean };

export type ExerciseMode = "20" | "100" | "200" | "500" | "all";
