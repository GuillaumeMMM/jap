import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Module, ModuleCard } from "../types/module";
import "./jap-module-success";
import { createRef, Ref, ref } from "lit/directives/ref.js";

@customElement("jap-module-exercise")
export class JapModuleExercise extends LitElement {
  static styles = [resetCSS, sharedCSS];

  @property({ type: Object }) module: Module;

  @state() _currentQIndex: number = 0;
  @state() _typedValue: string = "";
  @state() _isDone: boolean = false;
  @state() _isWrong: boolean = false;
  @state() _cards: ModuleCard[] = [];

  inputRef: Ref<HTMLInputElement> = createRef();
  nextButtonRef: Ref<HTMLButtonElement> = createRef();
  isLastQ: boolean = false;

  firstUpdated() {
    this.inputRef.value.focus();

    this._cards = this.shuffleCards(this.module.cards);
  }

  shuffleCards(cards: ModuleCard[]) {
    let remainingCards = [...cards];
    const newCards = [];
    while (remainingCards.length > 0) {
      const randIndex = Math.trunc(Math.random() * remainingCards.length);
      newCards.push(remainingCards[randIndex]);
      remainingCards.splice(randIndex, 1);
    }
    return newCards;
  }

  nextQ() {
    this._currentQIndex++;
    this._isWrong = false;
    this.isLastQ = this._currentQIndex === this._cards.length - 1;
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

    this._isWrong = !this.isCorrectAnswer(
      this._cards[this._currentQIndex],
      this._typedValue
    );

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
    const currentCard =
      this._cards.length > 0
        ? this._cards[this._currentQIndex]
        : this.module.cards[this._currentQIndex];
    return html`
      ${this._isDone
        ? html`<jap-module-success .module=${this.module}></jap-module-success>`
        : html`<div><a href="./">Back to exercise</a></div>
            <div>${this._currentQIndex + 1}/${this._cards.length}</div>
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
