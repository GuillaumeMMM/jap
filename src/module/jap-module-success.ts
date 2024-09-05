import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Module } from "../types/module";

@customElement("jap-module-success")
export class JapModuleSuccess extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property({ type: Object }) module: Module;

  render() {
    return html`success \\o/<a href="./">Back to exercise</a>`;
  }
}
