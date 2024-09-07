import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Answers, Module, ModuleCard } from "../types/module";

@customElement("jap-module-success")
export class JapModuleSuccess extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property({ type: Object }) module: Module;
  @property({ type: Array }) cards: ModuleCard[];
  @property({ type: Object }) answersRecap: Answers;

  render() {
    const correctCards = this.module.cards.filter(
      (card) => this.answersRecap.get(card.q)?.isCorrect
    );

    const incorrectCards = this.module.cards.filter(
      (card) => !this.answersRecap.get(card.q)?.isCorrect
    );

    return html`<h1>Exercise finished</h1>
      <div>
        You have ${correctCards.length} correct answers over
        ${this.cards.length} questions.
      </div>
      <a href="./">Back to exercise</a>`;
  }
}
