import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Task } from "@lit/task";
import resetCSS from "../styles/reset.js";
import sharedCSS from "../styles/shared.js";

@customElement("jap-modules")
export class JapModules extends LitElement {
  static styles = [resetCSS, sharedCSS];

  private _modulesTask = new Task(this, {
    task: async ([], { signal }) => {
      const response = await fetch(
        "https://guillaume-getjapmodules.web.val.run",
        { signal }
      );
      return response.json();
    },
    args: () => [],
  });
  render() {
    return html`
      <h1>Modules</h1>
      ${this._modulesTask.render({
        pending: () => html`<p>Loading modules...</p>`,
        complete: (data) => html`
          <ul>
            ${data.modules.map(
              (module) =>
                html`<li>
                  <a href="/module/${module.id}/">${module.name}</a>
                </li>`
            )}
          </ul>
        `,
        error: (e) => html`<p>Error: ${e}</p>`,
      })}
    `;
  }
}
