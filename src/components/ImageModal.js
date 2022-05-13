export default function ImageModal({ $target, initialState }) {
  this.state = initialState;
  const $component = document.createElement("div");
  $component.className = "Modal ImageViewer";
  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const IMAGE_FILE_PATH =
      "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

    $component.innerHTML = `
    ${
      this.state
        ? `<div class="content">
          <img src="${this.state ? `${IMAGE_FILE_PATH}${this.state}` : ""}">
        </div>`
        : ""
    }
    `;
    $component.style.display = this.state ? "block" : "none";
  };
  this.render();

  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      $component.style.display = "none";
    }
  });
  // window.addEventListener("click", (e) => {
  //   const $node = e.target.closest(".content")
  //   if (!$node) {
  //     $component.style.display = "none"
  //   }
  // })
}
