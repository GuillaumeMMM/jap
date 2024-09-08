import "urlpattern-polyfill";
import { Router } from "@lit-labs/router";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "./src/home/jap-home";
import "./src/layout/jap-layout";
import "./src/modules/jap-modules";
import "./src/module/jap-module";

@customElement("jap-app")
export class App extends LitElement {
  private _routes = new Router(this, [
    { path: "/", render: () => html`<jap-modules></jap-modules>` },
    { path: "/modules", render: () => html`<jap-modules></jap-modules>` },
    {
      path: "/module/:id/*",
      render: (params) => {
        return html`<jap-module moduleId=${ifDefined(params.id)}></jap-module>`;
      },
    },
  ]);

  render() {
    return html`<jap-layout>${this._routes.outlet()}</jap-layout>`;
  }
}
