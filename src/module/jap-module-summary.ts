import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";

@customElement("jap-module-summary")
export class JapModuleSummary extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property() module?: any;

  render() {
    console.log(this.module);
    return html`summary ${this.module.name}
      <a href="./exercise">Run Exercise</a>`;
  }
}
