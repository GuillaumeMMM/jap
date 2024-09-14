import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import resetCSS from "../styles/reset.js";
import sharedCSS from "../styles/shared.js";
import { setDocumentTitle } from "../utils/document.js";
import "./jap-profile-login.js";

@customElement("jap-profile")
export class JapProfile extends LitElement {
  static styles = [resetCSS, sharedCSS, css``];

  @state() isLoggedIn = Boolean(localStorage.getItem("profile"));

  onLogin = (username: string, token: string) => {
    this.isLoggedIn = true;
    localStorage.setItem("profile", JSON.stringify({ username, token }));
  };

  render() {
    setDocumentTitle(`Profile`);

    return html` ${this.isLoggedIn
      ? html`<h1>Profile</h1>
          <div>
            logged in as ${JSON.parse(localStorage.getItem("profile")).username}
          </div>`
      : html`<jap-profile-login
          .onLogin=${this.onLogin}
        ></jap-profile-login>`}`;
  }
}
