import { css, unsafeCSS } from "lit";
import { kit } from "@guillaumemmm/marquedefabrique/build/kit.js";
import { reset } from "@guillaumemmm/marquedefabrique/build/reset.js";

export default [
  unsafeCSS(reset),
  unsafeCSS(kit),
  css`
    a:focus-visible,
    button:focus-visible {
      outline: 2px solid var(--mdf-color-primary);
      outline-offset: 3px;
    }

    td,
    th {
      padding: 0.5rem;
      border: 1px solid var(--mdf-color-secondary);
    }

    th,
    :nth-child(even) > td {
      background-color: var(--mdf-color-secondary-transparent);
    }
  `,
];
