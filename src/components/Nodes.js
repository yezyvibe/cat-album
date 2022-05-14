export default function Nodes({
  $target,
  initialState,
  onClick,
  onModalClick,
  onBackClick,
}) {
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
      ${
        !this.state.isRoot
          ? `<div class="Node"><img src="./assets/prev.png"></div>`
          : ""
      }

      ${this.state.items
        .map(
          (item) => `
        <div class="Node" data-node-id="${item.id}">
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

    if (nodeId) {
      const currentNode = this.state.items.find((item) => item.id === nodeId);
      if (currentNode.type === "DIRECTORY") {
        onClick(currentNode, nodeId);
      } else if (currentNode.type === "FILE" && currentNode.filePath) {
        onModalClick(currentNode.filePath);
      }
    } else {
      onBackClick();
    }
  });
}
