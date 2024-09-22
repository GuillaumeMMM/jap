import "urlpattern-polyfill";
import { Router } from "@lit-labs/router";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "./src/home/jap-home";
import "./src/layout/jap-layout";
import "./src/modules/jap-modules";
import "./src/module/jap-module";
import "./src/profile/jap-profile";
import { provide } from "@lit/context";
import { UserContext, userContext } from "./src/contexts/userContext";
import { User } from "./src/types/user";

@customElement("jap-app")
export class App extends LitElement {
  @provide({ context: userContext })
  public userContext: UserContext = {
    user: null,
    setUser: function (user) {
      this.user = user;
    },
  };
  private _routes = new Router(this, [
    { path: "/", render: () => html`<jap-modules></jap-modules>` },
    { path: "/modules", render: () => html`<jap-modules></jap-modules>` },
    { path: "/profile", render: () => html`<jap-profile></jap-profile>` },
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
