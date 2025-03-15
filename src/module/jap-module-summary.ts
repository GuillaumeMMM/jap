import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import sharedCSS from "../styles/shared.js";
import { ExerciseMode, Module } from "../types/module";

@customElement("jap-module-summary")
export class JapModuleSummary extends LitElement {
  static styles = [
    ...sharedCSS,
    css`
      .back {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      h1 {
        margin: 1rem 0;
      }

      .select {
        margin: 0.5rem 0;
      }

      .mdf-button {
        display: inline-block;
        margin-top: 16px;
      }

      p {
        margin: 1rem 0 0.5rem 0;
      }
    `,
  ];

  @property({ type: Object }) module: Module;
  @property({ type: String }) mode: ExerciseMode;
  @property({ type: Object }) onModeChanges: (e: Event) => void;

  render() {
    return html` <div>
        <a href="/modules" class="back mdf-link">
          <div>Go back to exercises</div></a
        >
      </div>
      <h1>${this.module.name}</h1>
      <form>
        <div class="mdf-select-control">
          <label for="mode-select"
            >How many questions do you want to answer ?</label
          >
          <select
            name="mode"
            id="mode-select"
            class="mdf-select"
            @change=${this.onModeChanges}
          >
            <option value="all" .selected=${this.mode === "all"}>
              Every question once
            </option>
            <option value="20" .selected=${this.mode === "20"}>
              20 questions
            </option>
            <option value="100" .selected=${this.mode === "100"}>
              100 questions
            </option>
            <option value="200" .selected=${this.mode === "200"}>
              200 questions
            </option>
            <option value="500" .selected=${this.mode === "500"}>
              500 questions
            </option>
          </select>
        </div>
      </form>
      <div>
        <a class="mdf-button" href="./exercise"
          >Start the exercise<span aria-hidden="true">&nbsp;📚</span></a
        >
      </div>
      <p>List of questions in this exercise :</p>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          ${this.module.cards.map(
            (card) =>
              html`<tr>
                <td>${card.q}</td>
                <td>${card.a.join(" | ")}</td>
              </tr>`
          )}
        </tbody>
      </table>`;
  }
}
