import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import { Task } from "@lit/task";
import sharedCSS from "../styles/shared.js";
import { Routes } from "@lit-labs/router/routes.js";
import "./jap-module-summary";

@customElement("jap-module")
export class JapModule extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property() moduleId?: string;

  private _modulesTask = new Task(this, {
    task: async ([], { signal }) => {
      const response = await fetch(
        `https://guillaume-getjapmodules.web.val.run?id=${this.moduleId}`,
        { signal }
      );
      return response.json();
    },
    args: () => [this.moduleId],
  });

  private _routes = new Routes(this, [
    {
      path: "",
      render: () =>
        html`${this._modulesTask.render({
          pending: () => html`<p>Loading module...</p>`,
          complete: (data) => html`
            <jap-module-summary .module=${data}></jap-module-summary>
          `,
          error: (e) => html`<p>Error: ${e}</p>`,
        })}`,
    },
    {
      path: "exercise",
      render: () => html`exercise`,
    },
  ]);

  render() {
    return html`${this._routes.outlet()}`;
  }
}
