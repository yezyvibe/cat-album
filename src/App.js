import Breadcrumb from "./components/Breadcrumb.js";
import ImageModal from "./components/ImageModal.js";
import Nodes from "./components/Nodes.js";
import { request } from "./utils/api.js";

export default function App({ $target, initialState }) {
  this.state = {
    fetchItems: [],
    currentItems: [],
    isRoot: true,
    directories: ["root"],
    modalImgPath: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    if (this.state.isRoot === false) {
      nodes.setState({
        ...this.state,
        isRoot: this.state.isRoot,
        items: this.state.currentItems,
      });
      breadcrumb.setState(this.state.directories);
    } else {
      nodes.setState({
        ...this.state,
        isRoot: this.state.isRoot,
        items: this.state.fetchItems,
      });
    }
    imageModal.setState(this.state.modalImgPath);
  };

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.directories,
  });

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      items: this.state.fetchItems,
    },
    onClick: async (nodeId, nodeName) => {
      const result = await request(nodeId);
      this.setState({
        ...this.state,
        isRoot: false,
        currentItems: result,
        directories: [...this.state.directories, nodeName],
      });
    },
    onModalClick: async (filePath) => {
      console.log("모달이벤트", filePath);
      this.setState({
        ...this.state,
        modalImgPath: filePath,
      });
    },
  });

  const imageModal = new ImageModal({
    $target,
    initialState: this.state.modalImgPath,
  });

  const init = async () => {
    const result = await request();
    this.setState({
      ...this.state,
      fetchItems: result,
    });
  };
  init();
}
