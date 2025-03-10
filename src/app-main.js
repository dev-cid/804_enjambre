import { LitElement, html } from "lit-element";
import { outlet } from "lit-element-router";

export class Main extends outlet(LitElement) {
  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define("app-main", Main);