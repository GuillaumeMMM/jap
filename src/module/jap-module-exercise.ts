import { html, LitElement, nothing, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Answer, Module, ModuleCard } from "../types/module";
import "./jap-module-success";
import { createRef, Ref, ref } from "lit/directives/ref.js";

@customElement("jap-module-exercise")
export class JapModuleExercise extends LitElement {
  static styles = [
    resetCSS,
    sharedCSS,
    css`
      .question-container {
        display: flex;
        flex-direction: column;
      }

      .question {
        font-size: 6rem;
      }

      .form-row {
        display: flex;
        align-items: center;
      }

      .form-row > input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .form-row > .button {
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .error {
        color: var(--color-error);
        margin-top: 0.5rem;
      }
    `,
  ];

  @property({ type: Object }) module: Module;
  @property({ type: Array }) cards: ModuleCard[];

  @state() _currentQIndex: number = 0;
  @state() _typedValue: string = "";
  @state() _isDone: boolean = false;
  @state() _isWrong: boolean = false;

  inputRef: Ref<HTMLInputElement> = createRef();
  nextButtonRef: Ref<HTMLButtonElement> = createRef();
  isLastQ: boolean = false;
  answersRecap: Answer[] = [];

  firstUpdated() {
    this.inputRef.value.focus();
  }

  nextQ() {
    this._currentQIndex++;
    this._isWrong = false;
    this.isLastQ = this._currentQIndex === this.cards.length - 1;
    this.inputRef.value.focus();
  }

  onInputChange(event) {
    this._typedValue = (event.target as HTMLInputElement).value;
  }

  onSubmitForm(event) {
    event.preventDefault();
    if (this._typedValue.trim().length === 0 || this._isWrong) {
      return;
    }

    if (this.isLastQ) {
      this._isDone = true;
    }

    this._isWrong = !this.isCorrectAnswer(
      this.cards[this._currentQIndex],
      this._typedValue
    );

    this.answersRecap.push({
      q: this.cards[this._currentQIndex].q,
      a: this.cards[this._currentQIndex].a,
      isCorrect: !this._isWrong,
    });

    if (this.isLastQ && !this._isWrong) {
      this._isDone = true;
      return;
    }

    if (this._isWrong) {
      this.nextButtonRef.value.focus();
    } else {
      this.nextQ();
    }

    this._typedValue = "";
  }

  isCorrectAnswer(card: ModuleCard, a: string) {
    return card.a
      .map((answer) => answer.toLowerCase())
      .includes(a.toLowerCase());
  }

  render() {
    const currentCard = this.cards[this._currentQIndex];

    return html`
      ${this._isDone
        ? html`<jap-module-success
            .module=${this.module}
            .cards=${this.cards}
            .answersRecap=${this.answersRecap}
          ></jap-module-success>`
        : html`<div><a href="./" class="link">Go back to exercise</a></div>
            <div>${this._currentQIndex + 1}/${this.cards.length}</div>
            <div class="question-container">
              <div class="question">${currentCard.q}</div>
              <form @submit=${this.onSubmitForm}>
                <div class="form-row">
                  <input
                    type="text"
                    .value=${this._typedValue}
                    @input=${this.onInputChange}
                    ${ref(this.inputRef)}
                    spellcheck="false"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                  />
                  <button
                    class="button"
                    type=${this._isWrong ? "button" : "submit"}
                    ${ref(this.nextButtonRef)}
                    @click=${this._isWrong
                      ? this.isLastQ
                        ? () => {
                            this._isDone = true;
                          }
                        : this.nextQ
                      : () => {}}
                  >
                    ${this._isWrong
                      ? this.isLastQ
                        ? "Finish"
                        : "Next"
                      : "Submit"}
                  </button>
                </div>
                ${this._isWrong
                  ? html`<p role="alert" class="error">
                      Wrong answer. You should have typed
                      <strong>"${currentCard.a[0]}"</strong>.
                    </p>`
                  : nothing}
              </form>
            </div> `}
    `;
  }
}
