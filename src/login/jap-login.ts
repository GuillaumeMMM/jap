import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import resetCSS from "../styles/reset.js";
import sharedCSS from "../styles/shared.js";

@customElement("jap-login")
export class JapLogin extends LitElement {
  static styles = [
    resetCSS,
    sharedCSS,
    css`
      fieldset {
        margin-top: 2rem;
      }
      .users {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
      }
    `,
  ];

  @state() selectedUser = null;

  onChangeRadio = (user) => {
    this.selectedUser = user;
  };

  protected render() {
    return html`<h1>Login</h1>
      <form>
        <fieldset>
          <legend>Who are you ?</legend>

          <div class="users">
            <div
              class="input-radio"
              @click=${(e) => {
                e.preventDefault();
                this.onChangeRadio("genevieve");
              }}
            >
              <label for="genevieve">Genevieve</label>
              <div aria-hidden="true" class="input-radio-icon">👩</div>
              <input
                type="radio"
                id="genevieve"
                ?checked=${this.selectedUser === "genevieve"}
                @input=${(e) => this.onChangeRadio("genevieve")}
              />
            </div>

            <div
              class="input-radio"
              @click=${(e) => {
                e.preventDefault();
                this.onChangeRadio("guillaume");
              }}
            >
              <label for="guillaume">Guillaume</label>
              <div aria-hidden="true" class="input-radio-icon">🤵‍♂️</div>
              <input
                type="radio"
                id="guillaume"
                ?checked=${this.selectedUser === "guillaume"}
                @input=${(e) => this.onChangeRadio("guillaume")}
              />
            </div>
          </div>
        </fieldset>
      </form>`;
  }
}
