import React from "react";
import Sidebar from "react-sidebar";
import Button from 'react-bootstrap/Button'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.Open = this.Open.bind(this);
  }
 
  Open(open) {
    this.setState({ sidebarOpen: open });
  }
 
  render() {
    return (
      <Sidebar
        sidebar={this.props.content}
        open={this.state.sidebarOpen}
        onSetOpen={this.Open}
        styles={{ sidebar: { background: "white" } }}
      >
      <Button variant="outline-light"onClick={() => this.Open(true)}>
          More
        </Button>
      </Sidebar>
    );
  }
}
 
export default App;