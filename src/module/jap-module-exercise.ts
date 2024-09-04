import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Module } from "../types/module";

@customElement("jap-module-exercise")
export class JapModuleExercise extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property({ type: Object }) module: Module;

  render() {
    return html`exercise <a href="./">- Back</a>
      <ul>
        ${this.module.cards.map((c) => html`<li>${c.q}</li>`)}
      </ul>`;
  }
}
