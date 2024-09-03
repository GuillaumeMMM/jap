import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import { Task } from "@lit/task";
import sharedCSS from "../styles/shared.js";

@customElement("jap-module")
export class JapModule extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property() moduleId?: string;

  private _modulesTask = new Task(this, {
    task: async ([], { signal }) => {
      const id = new URL(location.href).searchParams.get("id");
      const response = await fetch(
        `https://guillaume-getjapmodules.web.val.run?id=${this.moduleId}`,
        { signal }
      );
      return response.json();
    },
    args: () => [this.moduleId],
  });

  /* private _routes = new Routes(this, [
    {
      path: "",
      render: () => html`<h1>Module</h1>
        ${this._modulesTask.render({
          pending: () => html`<p>Loading module...</p>`,
          complete: (data) => html`
            <h2>${data.name}</h2>
            <ul>
              ${data.cards.map(
                (card) => html`<li>${card.q} -> ${card.a[0]}</li>`
              )}
            </ul>
          `,
          error: (e) => html`<p>Error: ${e}</p>`,
        })}`,
    },
  ]); */

  render() {
    return html`<h1>Module</h1>
      ${this._modulesTask.render({
        pending: () => html`<p>Loading module...</p>`,
        complete: (data) => html`
          <h2>${data.name}</h2>
          <ul>
            ${data.cards.map(
              (card) => html`<li>${card.q} -> ${card.a[0]}</li>`
            )}
          </ul>
        `,
        error: (e) => html`<p>Error: ${e}</p>`,
      })}`;
  }
}
