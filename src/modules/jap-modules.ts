import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Task } from "@lit/task";
import resetCSS from "../styles/reset.js";
import sharedCSS from "../styles/shared.js";
import { setDocumentTitle } from "../utils/document.js";
import { Module } from "../types/module.js";

@customElement("jap-modules")
export class JapModules extends LitElement {
  static styles = [
    resetCSS,
    sharedCSS,
    css`
      .modules {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem 0;
      }

      .module {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        background: var(--color-primary-light);
        background: linear-gradient(
          28deg,
          var(--color-primary) 10%,
          var(--color-primary-light) 100%
        );
        padding: 1rem;
        border-radius: 1.5rem;
        width: 350px;
        max-width: 100%;
        min-height: 150px;
        position: relative;
        box-shadow: 2px 2px 27px -32px rgba(0, 0, 0, 0.75);
        color: white;

        transition: padding ease-out 0.1s;
      }

      li:nth-child(even) > .module {
        background: var(--color-secondary-light);
        background: linear-gradient(
          28deg,
          var(--color-secondary) 10%,
          var(--color-secondary-light) 100%
        );
      }

      li:nth-child(even) .badge {
        background-color: var(--color-secondary-transparent);
      }

      li:nth-child(even) .decoration {
        color: var(--color-secondary-transparent);
      }

      h2 {
        font-weight: 500;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .module:hover {
        background: var(--color-primary);
        padding: 1rem 1.3rem;
      }

      .module:hover .decoration {
        top: 15px;
      }

      .module:hover > .module-title {
        text-decoration: underline;
      }

      .badges {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .badge {
        background-color: var(--color-primary-transparent);
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 0.75rem;
      }

      .decoration {
        position: absolute;
        top: 10px;
        right: 10px;
        color: var(--color-primary-transparent);
        font-size: 4rem;
        line-height: 1;
        transition: top ease-out 0.1s;
      }

      .title-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .arrow {
        display: flex;
        align-items: center;
      }
    `,
  ];

  private _modulesTask = new Task(this, {
    task: async ([], { signal }) => {
      const response = await fetch(
        "https://guillaume-getjapmodules.web.val.run",
        { signal }
      );
      return response.json();
    },
    args: () => [],
  });
  render() {
    setDocumentTitle(`Exercises`);

    return html`
      <h1>Exercises</h1>
      ${this._modulesTask.render({
        pending: () => html`<p>Loading exercises...</p>`,
        complete: (data: { modules: Module[] }) => html`
          <ul class="modules">
            ${data.modules.reverse().map(
              (module) =>
                html`<li>
                  <a href="/module/${module.id}/" class="module">
                    <div class="badges">
                      ${module.tags.map(
                        (t) =>
                          html`<span class="badge"
                            >${t.emoji &&
                            html`<span aria-hidden="true"
                              >${t.emoji}&nbsp;</span
                            >`}${t.label}</span
                          >`
                      )}
                    </div>
                    <div class="decoration" aria-hidden="true">
                      ${module.cards[0].q}
                    </div>
                    <div class="title-container">
                      <h2 class="module-title">${module.name}</h2>
                      <div class="arrow" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <polygon
                            fill="currentColor"
                            points="11.293 4.707 17.586 11 4 11 4 13 17.586 13 11.293 19.293 12.707 20.707 21.414 12 12.707 3.293 11.293 4.707"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </li>`
            )}
          </ul>
        `,
        error: (e) => html`<p>Error: ${e}</p>`,
      })}
    `;
  }
}
