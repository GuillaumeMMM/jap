import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { ExerciseMode, Module } from "../types/module";

@customElement("jap-module-summary")
export class JapModuleSummary extends LitElement {
  static styles = [
    resetCSS,
    sharedCSS,
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

      .button {
        display: inline-block;
        margin-top: 16px;
      }
    `,
  ];

  @property({ type: Object }) module: Module;
  @property({ type: String }) mode: ExerciseMode;
  @property({ type: Object }) onModeChanges: (e: Event) => void;

  render() {
    return html` <div>
        <a href="/modules" class="back link">
          <div>Go back to exercises</div></a
        >
      </div>
      <h1>${this.module.name}</h1>
      <form>
        <label for="mode-select"
          >How many questions do you want to answer ?</label
        >
        <div>
          <select
            name="mode"
            id="mode-select"
            class="select"
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
            <option value="500" .selected=${this.mode === "500"}>
              500 questions
            </option>
          </select>
        </div>
      </form>
      <div>
        <a class="button" href="./exercise"
          ><span aria-hidden="true">👉&nbsp;</span>Start Exercise</a
        >
      </div>`;
  }
}
