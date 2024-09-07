import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import { Task } from "@lit/task";
import sharedCSS from "../styles/shared.js";
import "./jap-module-summary";
import "./jap-module-exercise";
import "./jap-module-container";
import { Module } from "../types/module";

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

  render() {
    return html`${this._modulesTask.render({
      pending: () => html`<p>Loading module...</p>`,
      complete: (data: Module) => {
        return html`<jap-module-container
          .module=${data}
        ></jap-module-container>`;
      },
      error: (e) => html`<p>Error: ${e}</p>`,
    })}`;
  }
}
