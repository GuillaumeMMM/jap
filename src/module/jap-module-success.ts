import { html, LitElement, css, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import resetCSS from "../styles/reset";
import sharedCSS from "../styles/shared.js";
import { Answer, Module, ModuleCard } from "../types/module";

@customElement("jap-module-success")
export class JapModuleSuccess extends LitElement {
  static styles = [
    resetCSS,
    sharedCSS,
    css`
      p {
        margin: 0.5rem 0;
      }
    `,
  ];

  @property({ type: Object }) module: Module;
  @property({ type: Array }) cards: ModuleCard[];
  @property({ type: Array }) answersRecap: Answer[];

  firstUpdated(): void {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    void fetch(`https://guillaume-postjapuserexercise.web.val.run`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        token,
        exerciseId: this.module.id,
        answers: this.answersRecap,
      }),
    });
  }

  render() {
    const correctCards = this.answersRecap.filter((answer) => answer.isCorrect);

    const recapAggregated: Map<string, { a: string[]; isCorrect: boolean[] }> =
      new Map();
    for (const answer of this.answersRecap) {
      if (recapAggregated.has(answer.q)) {
        recapAggregated.get(answer.q).isCorrect.push(answer.isCorrect);
      } else {
        recapAggregated.set(answer.q, {
          a: answer.a,
          isCorrect: [answer.isCorrect],
        });
      }
    }

    return html`<h1>
        <span aria-hidden="true">🎉</span> Congrats! You finished the exercise
      </h1>
      <p>
        You have ${correctCards.length} correct answers over
        ${this.cards.length} questions.
      </p>
      <a href="/modules" class="link">Back to exercises</a>
      <p>Here is the recap :</p>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from(recapAggregated).map(
            (answer) =>
              html`<tr>
                <td>${answer[0]}</td>
                <td>${answer[1].a.join(" | ")}</td>
                <td>
                  <span class="visually-hidden"
                    >${answer[1].isCorrect.filter((c) => c).length} correct
                    answers and ${answer[1].isCorrect.filter((c) => !c).length}
                    incorrect answers</span
                  >
                  <span aria-hidden="true">
                    ${answer[1].isCorrect
                      .map((correct) => (correct ? "🟢" : "🔴"))
                      .join(" ")}
                  </span>
                </td>
              </tr>`
          )}
        </tbody>
      </table> `;
  }
}
