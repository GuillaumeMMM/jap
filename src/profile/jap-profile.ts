import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import resetCSS from "../styles/reset.js";
import sharedCSS from "../styles/shared.js";
import { setDocumentTitle } from "../utils/document.js";
import "./jap-profile-login.js";
import { consume } from "@lit/context";
import { UserContext, userContext } from "../contexts/userContext.js";
import { Task } from "@lit/task";
import { User } from "../types/user.js";

@customElement("jap-profile")
export class JapProfile extends LitElement {
  @consume({ context: userContext }) userContext: UserContext;

  static styles = [resetCSS, sharedCSS, css``];

  @state() isLoggedIn = Boolean(localStorage.getItem("token"));

  onLogin = (username: string, token: string) => {
    this.isLoggedIn = true;
    localStorage.setItem("token", token);
    this.userContext.setUser({ username });
  };

  capitalizeFirstLetter(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  }

  private _userTask = new Task(this, {
    task: async ([isLoggedIn], { signal }) => {
      if (!isLoggedIn) {
        return;
      }
      const response = await fetch(
        `https://guillaume-getjapme.web.val.run?token=${localStorage.getItem(
          "token"
        )}`,
        { signal }
      );
      return response.json();
    },
    args: () => [this.isLoggedIn],
  });

  render() {
    setDocumentTitle(`Profile`);

    return html`${this.isLoggedIn
      ? this._userTask.render({
          pending: () => html`<p>Loading your profile...</p>`,
          complete: (data: { user: User }) => html`<h1>
              Welcome ${this.capitalizeFirstLetter(data.user.username)}
              <span aria-hidden="true">👋</span>
            </h1>
            <a class="link" href="../">Back</a>`,
          error: (e) => html`<p>Error: ${e}</p>`,
        })
      : html`<jap-profile-login
          .onLogin=${this.onLogin}
        ></jap-profile-login>`}`;
  }
}
