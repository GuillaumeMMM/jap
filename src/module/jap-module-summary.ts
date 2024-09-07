import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Module } from "../types/module";

@customElement("jap-module-summary")
export class JapModuleSummary extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property({ type: Object }) module: Module;

  render() {
    return html`${this.module.name}
      <div><a href="/modules">Back to modules</a></div>
      <div><a href="./exercise">Run Exercise</a></div>`;
  }
}
