import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import resetCSS from "../styles/reset.js";

@customElement("jap-layout")
export class JapLayout extends LitElement {
  static styles = [
    resetCSS,
    css`
      .jap-main {
        padding: 1rem;
      }
    `,
  ];
  protected render() {
    return html`<main class="jap-main"><slot></slot></main>`;
  }
}
