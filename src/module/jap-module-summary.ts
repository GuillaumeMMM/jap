import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { ExerciseMode, Module } from "../types/module";

@customElement("jap-module-summary")
export class JapModuleSummary extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property({ type: Object }) module: Module;
  @property({ type: String }) mode: ExerciseMode;
  @property({ type: Object }) onModeChanges: (e: Event) => void;

  render() {
    return html`${this.module.name}
      <div><a href="/modules">Back to modules</a></div>
      <form>
        <label for="mode-select">Choose a mode:</label>
        <select name="mode" id="mode-select" @change=${this.onModeChanges}>
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
      </form>
      <div><a href="./exercise">Start Exercise</a></div>`;
  }
}
