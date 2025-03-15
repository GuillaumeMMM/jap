import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import sharedCSS from "../styles/shared.js";

@customElement("jap-layout")
export class JapLayout extends LitElement {
  static styles = [
    ...sharedCSS,
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
