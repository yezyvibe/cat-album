export default function Breadcrumb({ $target, initialState }) {
  this.state = initialState;

  const $component = document.createElement("nav");
  $component.className = "Breadcrumb";
  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $component.innerHTML = `
      ${this.state.map((item) => `<div>${item}</div>`).join("")}
    `;
  };

  this.render();
}
