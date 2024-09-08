import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Answer, Module, ModuleCard } from "../types/module";

@customElement("jap-module-success")
export class JapModuleSuccess extends LitElement {
  static styles = [
    resetCSS,
    sharedCSS,
    css`
      .success {
        margin: 0.5rem 0;
      }
    `,
  ];

  @property({ type: Object }) module: Module;
  @property({ type: Array }) cards: ModuleCard[];
  @property({ type: Array }) answersRecap: Answer[];

  render() {
    const correctCards = this.answersRecap.filter((answer) => answer.isCorrect);

    return html`<h1>Exercise finished</h1>
      <div class="success">
        You have ${correctCards.length} correct answers over
        ${this.cards.length} questions.
      </div>
      <a href="/modules" class="link">Back to exercises</a>`;
  }
}
