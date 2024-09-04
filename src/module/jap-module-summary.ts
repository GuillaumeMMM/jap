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
    return html`summary ${this.module.name}
      <a href="./exercise">Run Exercise</a>`;
  }
}
