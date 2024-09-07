import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Answer, Module, ModuleCard } from "../types/module";
import "./jap-module-success";
import { createRef, Ref, ref } from "lit/directives/ref.js";

@customElement("jap-module-exercise")
export class JapModuleExercise extends LitElement {
  static styles = [resetCSS, sharedCSS];

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
    setTimeout(() => {
      this.inputRef.value.focus();
    });
  }

  getActionButton() {
    if (this.isLastQ) {
      return nothing;
    } else {
      return html`<button type="button" @click=${this.nextQ}>Next</button>`;
    }
  }

  onInputChange(event) {
    this._typedValue = (event.target as HTMLInputElement).value;
  }

  onSubmitForm(event) {
    event.preventDefault();
    if (this._typedValue.trim().length === 0) {
      return;
    }

    this._isWrong = !this.isCorrectAnswer(
      this.cards[this._currentQIndex],
      this._typedValue
    );

    this.answersRecap.push({
      q: this.cards[this._currentQIndex].q,
      isCorrect: !this._isWrong,
    });

    if (this.isLastQ && !this._isWrong) {
      this._isDone = true;
      return;
    }

    if (this._isWrong) {
      setTimeout(() => {
        this.nextButtonRef.value.focus();
      });
    } else {
      this.nextQ();
    }

    this._typedValue = "";
  }

  isCorrectAnswer(card: ModuleCard, a: string) {
    return card.a.includes(a);
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
        : html`<div><a href="./">Back to exercise</a></div>
            <div>${this._currentQIndex + 1}/${this.cards.length}</div>
            <div>${currentCard.q}</div>
            <form @submit=${this.onSubmitForm}>
              <input
                type="text"
                .value=${this._typedValue}
                @input=${this.onInputChange}
                ${ref(this.inputRef)}
                .disabled=${this._isWrong}
              />
              ${this._isWrong
                ? html`<p>
                    Wrong answer. You should have typed
                    <strong>"${currentCard.a[0]}"</strong>.
                  </p>`
                : nothing}
              ${this._isWrong
                ? html`<button
                    type="button"
                    @click=${this.isLastQ
                      ? () => {
                          this._isDone = true;
                        }
                      : this.nextQ}
                    ${ref(this.nextButtonRef)}
                  >
                    ${this.isLastQ ? "Finish" : "Next"}
                  </button>`
                : html`<button type="submit">Submit</button>`}
            </form>`}
    `;
  }
}
