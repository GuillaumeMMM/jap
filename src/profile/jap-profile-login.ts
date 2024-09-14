import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import resetCSS from "../styles/reset.js";
import sharedCSS from "../styles/shared.js";

@customElement("jap-profile-login")
export class JapProfileLogin extends LitElement {
  static styles = [
    resetCSS,
    sharedCSS,
    css`
      .form {
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .form-row label {
        display: block;
      }

      .form-button {
        width: fit-content;
      }

      .error-message {
        color: var(--color-error);
      }
    `,
  ];

  @property({ type: Object }) onLogin: (
    username: string,
    token: string
  ) => void;

  @state() error: string;
  @state() usernameValue: string = "";
  @state() passwordValue: string = "";

  onInputUsername = (event: InputEvent) => {
    this.usernameValue = (event.target as HTMLInputElement).value;
  };

  onInputPassword = (event: InputEvent) => {
    this.passwordValue = (event.target as HTMLInputElement).value;
  };

  onFormSubmit = async (e: Event) => {
    this.error = "";
    e.preventDefault();
    const response = await fetch(`https://guillaume-postjaplogin.web.val.run`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: this.usernameValue.toLowerCase(),
        password: this.passwordValue,
      }),
    });
    const content = await response.json();
    if (content.message === "Login successful") {
      this.onLogin(this.usernameValue, content.token);
    } else {
      this.error = content.message;
    }

    this.usernameValue = "";
    this.passwordValue = "";
  };

  render() {
    return html` <h1 class="title">Login to your account</h1>
      <form class="form" @submit=${this.onFormSubmit}>
        <div class="form-row">
          <label for="username">Username</label>
          <input
            class="form-input"
            type="text"
            id="username"
            .value=${this.usernameValue}
            @input=${this.onInputUsername}
            required
          />
        </div>
        <div class="form-row">
          <label for="password">Password</label>
          <input
            class="form-input"
            type="password"
            id="password"
            .value=${this.passwordValue}
            @input=${this.onInputPassword}
            required
          />
        </div>
        <button class="button form-button" type="submit">
          Login <span aria-hidden="true">&nbsp;🔑</span>
        </button>
        <div role="alert" class="error-message">
          ${this.error ? this.error : ""}
        </div>
      </form>`;
  }
}
