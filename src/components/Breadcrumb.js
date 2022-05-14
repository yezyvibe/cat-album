export default function Breadcrumb({ $target, initialState, onClick }) {
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
      <div>root</div>
      ${this.state
        .map((item) => `<div data-node-id="${item.id}">${item.name}</div>`)
        .join("")}
    `;
  };

  this.render();

  $component.addEventListener("click", (e) => {
    const $node = e.target.closest("div");
    const { nodeId } = $node.dataset;
    if (nodeId) {
      onClick(nodeId);
    } else {
      onClick("root");
    }
  });
}
