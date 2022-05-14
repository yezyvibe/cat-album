import Breadcrumb from "./components/Breadcrumb.js";
import ImageModal from "./components/ImageModal.js";
import Nodes from "./components/Nodes.js";
import { request } from "./utils/api.js";

const cache = {};

export default function App({ $target, initialState }) {
  this.state = {
    fetchItems: [],
    currentItems: [],
    isRoot: true,
    directories: [],
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
    } else {
      nodes.setState({
        ...this.state,
        isRoot: this.state.isRoot,
        items: this.state.fetchItems,
      });
    }
    breadcrumb.setState(this.state.directories);
    imageModal.setState(this.state.modalImgPath);
  };

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.directories,
    onClick: (nodeId) => {
      let nextDirectories = this.state.directories;
      const clickedNodeIndex = nextDirectories.findIndex(
        (node) => node.id === nodeId
      );
      if (clickedNodeIndex > -1) {
        nextDirectories = nextDirectories.slice(0, clickedNodeIndex + 1);
      } else {
        nextDirectories = [];
      }
      this.setState({
        ...this.state,
        isRoot: nodeId === "root" ? true : false,
        currentItems: cache[nodeId],
        directories: nodeId === "root" ? [] : nextDirectories,
      });
    },
  });

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      items: this.state.fetchItems,
    },
    onClick: async (node, nodeId) => {
      if (!cache[nodeId]) {
        const result = await request(nodeId);
        cache[nodeId] = result;
      }
      const nextDirectories =
        this.state.directories.findIndex((node) => node.id === nodeId) > -1
          ? this.state.directories
          : [...this.state.directories, node];
      this.setState({
        ...this.state,
        isRoot: false,
        currentItems: cache[nodeId],
        directories: nextDirectories,
      });
    },
    onModalClick: async (filePath) => {
      this.setState({
        ...this.state,
        modalImgPath: filePath,
      });
    },
    onBackClick: () => {
      const nextDirectories = this.state.directories;
      nextDirectories.pop();
      const prevNodeId =
        nextDirectories.length === 0
          ? "root"
          : nextDirectories[nextDirectories.length - 1].id;
      this.setState({
        ...this.state,
        isRoot: prevNodeId === "root" ? true : false,
        directories: nextDirectories,
        currentItems: cache[prevNodeId],
      });
    },
  });

  const imageModal = new ImageModal({
    $target,
    initialState: this.state.modalImgPath,
    onModalClose: () => {
      this.setState({
        ...this.state,
        modalImgPath: null,
      });
    },
  });

  const init = async () => {
    const result = await request();
    this.setState({
      ...this.state,
      fetchItems: result,
    });
    cache["root"] = this.state.fetchItems;
  };
  init();
}
