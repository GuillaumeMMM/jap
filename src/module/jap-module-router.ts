import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Routes } from "@lit-labs/router/routes.js";
import "./jap-module-summary";
import "./jap-module-exercise";
import { Module } from "../types/module";

@customElement("jap-module-router")
export class JapModuleRouter extends LitElement {
  @property({ type: Object }) module?: Module;

  private _routes = new Routes(this, [
    {
      path: "",
      render: () =>
        html`<jap-module-summary .module=${this.module}></jap-module-summary>`,
    },
    {
      path: "exercise",
      render: () =>
        html`<jap-module-exercise
          .module=${this.module}
        ></jap-module-exercise>`,
    },
  ]);

  render() {
    return html`${this._routes.outlet()}`;
  }
}
