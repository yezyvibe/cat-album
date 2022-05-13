import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import { request } from "./utils/api.js";

export default function App({ $target, initialState }) {
  this.state = {
    fetchItems: [],
    currentItems: [],
    isRoot: true,
    directories: ["root"],
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
      console.log(this.state);
    },
  });
  const init = async () => {
    const result = await request();
    this.setState({
      ...this.state,
      fetchItems: result,
    });
    console.log(this.state);
  };
  init();
}
