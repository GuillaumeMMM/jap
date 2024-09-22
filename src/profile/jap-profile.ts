import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import resetCSS from "../styles/reset.js";
import sharedCSS from "../styles/shared.js";
import { setDocumentTitle } from "../utils/document.js";
import "./jap-profile-login.js";
import { consume } from "@lit/context";
import { UserContext, userContext } from "../contexts/userContext.js";
import { User } from "../types/user.js";

@customElement("jap-profile")
export class JapProfile extends LitElement {
  @consume({ context: userContext }) userContext: UserContext;

  static styles = [resetCSS, sharedCSS, css``];

  @state() isLoggedIn = Boolean(localStorage.getItem("profile"));

  onLogin = (username: string, token: string) => {
    this.isLoggedIn = true;
    localStorage.setItem("profile", JSON.stringify({ username }));
    localStorage.setItem("token", token);
    this.userContext.setUser({ username });
  };

  capitalizeFirstLetter(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  }

  render() {
    setDocumentTitle(`Profile`);

    return html` ${this.isLoggedIn
      ? html`<h1>
            Welcome
            ${this.capitalizeFirstLetter(
              JSON.parse(localStorage.getItem("profile")).username
            )} <span aria-hidden="true">👋</span>
          </h1>
          <a class="link" href="../">Back</a>`
      : html`<jap-profile-login
          .onLogin=${this.onLogin}
        ></jap-profile-login>`}`;
  }
}
