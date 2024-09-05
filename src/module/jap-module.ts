import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import { Task } from "@lit/task";
import sharedCSS from "../styles/shared.js";
import "./jap-module-summary";
import "./jap-module-exercise";
import "./jap-module-router";
import { Module, ModuleCard } from "../types/module";

@customElement("jap-module")
export class JapModule extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property() moduleId?: string;

  @state() _moduleCards: ModuleCard[] = [];

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
        this._moduleCards = [...data.cards];
        return html`<jap-module-router
          .module=${data}
          .cards=${this._moduleCards}
        ></jap-module-router>`;
      },
      error: (e) => html`<p>Error: ${e}</p>`,
    })}`;
  }
}
