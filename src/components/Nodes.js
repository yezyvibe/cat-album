export default function Nodes({ $target, initialState, onClick }) {
  this.state = initialState;
  const $component = document.createElement("div");
  $component.className = "Nodes";
  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const directoryImgPath = "./assets/directory.png";
    const filePathImgPath = "./assets/file.png";
    $component.innerHTML = `
      ${this.state.items
        .map(
          (item) => `
        <div class="Node" data-node-id="${item.id}" data-node-name="${
            item.name
          }">
          <img src="${
            item.type === "DIRECTORY" ? directoryImgPath : filePathImgPath
          }">
          <div>${item.name}</div>
        </div>
      `
        )
        .join("")}
    `;
  };

  this.render();

  $component.addEventListener("click", (e) => {
    const div = e.target.closest("div");
    const { nodeId } = div.dataset;
    const { nodeName } = div.dataset;
    if (nodeId && nodeName) {
      onClick(parseInt(nodeId), nodeName);
    }
  });
}
