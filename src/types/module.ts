export type ModuleCard = {
  q: string;
  a: string[];
};

export type Module = {
  id: string;
  name: string;
  cards: ModuleCard[];
};

export type Answers = Map<string, { isCorrect: boolean }>;
