import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Routes } from "@lit-labs/router/routes.js";
import "./jap-module-summary";
import "./jap-module-exercise";
import { Module, ModuleCard } from "../types/module";

@customElement("jap-module-container")
export class JapModuleContainer extends LitElement {
  @property({ type: Object }) module: Module;

  @state() _cards = null;

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

  protected firstUpdated(): void {
    this._cards = this.shuffleCards(this.module.cards).slice(0, 2);
  }

  private _routes = new Routes(this, [
    {
      path: "",
      render: () =>
        html`<jap-module-summary .module=${this.module}></jap-module-summary>`,
    },
    {
      path: "exercise",
      render: () =>
        html`<jap-module-exercise
          .module=${this.module}
          .cards=${this._cards ?? this.module.cards}
        ></jap-module-exercise>`,
    },
  ]);

  render() {
    return html`${this._routes.outlet()}`;
  }
}
