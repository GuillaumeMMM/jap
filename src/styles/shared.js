import { css } from "lit";

export default css`
  * {
    box-sizing: border-box;
  }

  h1,
  h2 {
    font-weight: 600;
  }
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .link {
    color: var(--color-primary);
    background-color: var(--color-primary-transparent);
    padding: 1px 2px;
    border-radius: 3px;
  }

  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
  }

  .button {
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.375rem 1rem;
    line-height: 1.5rem;
    background-color: var(--color-primary-transparent-2);
    color: black;
    text-decoration: none;
    border-radius: 1.5rem;
    border: 2px solid var(--color-primary);
    font-size: 1rem;
  }

  .button:hover {
    background-color: var(--color-primary-transparent);
  }

  select {
    display: block;
    cursor: pointer;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    line-height: 1.5rem;
    background-color: var(--color-primary-transparent);
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 2px solid var(--color-primary);
    border-radius: 0.25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: 1rem;
  }

  select:hover {
    background-color: var(--color-primary-transparent-2);
  }

  input[type="text"],
  input[type="password"] {
    border: 2px solid var(--color-primary);
    border-radius: 0.25rem;
    font-size: 16px;
    padding: 0.375rem 0.75rem;
    line-height: 1.5rem;
    background-color: var(--color-primary-transparent);
  }

  td,
  th {
    padding: 0.5rem;
    border: 1px solid var(--color-secondary);
  }

  th,
  :nth-child(even) > td {
    background-color: var(--color-secondary-transparent);
  }

  .visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
`;
