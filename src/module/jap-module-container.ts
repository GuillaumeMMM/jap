import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Routes } from "@lit-labs/router/routes.js";
import "./jap-module-summary";
import "./jap-module-exercise";
import { ExerciseMode, Module, ModuleCard } from "../types/module";

@customElement("jap-module-container")
export class JapModuleContainer extends LitElement {
  @property({ type: Object }) module: Module;
  @state() mode: ExerciseMode = "all";

  private cards: ModuleCard[] | null = null;

  shuffleCards(cards: ModuleCard[]) {
    let remainingCards = [...cards];
    const newCards = [];
    while (remainingCards.length > 0) {
      const randIndex = Math.trunc(Math.random() * remainingCards.length);
      newCards.push(remainingCards[randIndex]);
      remainingCards.splice(randIndex, 1);
    }
    return newCards;
  }

  getCardsCount(cards: ModuleCard[], count: number) {
    let newCards = [];
    for (let i = 0; i < count; i++) {
      newCards.push({ ...cards[Math.trunc(Math.random() * cards.length)] });
    }
    return newCards;
  }

  buildExerciseCards() {
    this.cards = this.shuffleCards(
      this.mode === "all"
        ? [...this.module.cards]
        : this.getCardsCount(this.module.cards, Number(this.mode))
    );
  }

  onModeChanges = (event) => {
    this.mode = event.target.value;
  };

  onStartExercise = (event) => {
    event.preventDefault();
    this._routes.goto("exercise");
  };

  private _routes = new Routes(this, [
    {
      path: "",
      render: () =>
        html`<jap-module-summary
          .module=${this.module}
          .onModeChanges=${this.onModeChanges}
          .mode=${this.mode}
          .onStartExercise=${this.onStartExercise}
        ></jap-module-summary>`,
    },
    {
      path: "exercise",
      render: () =>
        html`<jap-module-exercise
          .module=${this.module}
          .cards=${this.cards ?? this.module.cards}
        ></jap-module-exercise>`,
    },
  ]);

  render() {
    this.buildExerciseCards();

    return html`${this._routes.outlet()}`;
  }
}
