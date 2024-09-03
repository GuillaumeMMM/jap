import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import resetCSS from "../styles/reset.js";
import sharedCSS from "../styles/shared.js";

@customElement("jap-home")
export class JapHome extends LitElement {
  static styles = [resetCSS, sharedCSS];
  protected render() {
    return html`<h1>Home</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/modules">Modules</a></li>
        </ul>
      </nav>`;
  }
}
