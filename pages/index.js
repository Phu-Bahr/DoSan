import { Component } from "react";
import io from "socket.io-client";

let socket = io();
class Medium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: "",
      // time: "",
    };
  }

  componentDidUpdate() {
    socket.on("chat message", (msg) => {
      return this.setState({ hello: msg });
    });

    // socket.on("time", (timeString) => {
    //   return this.setState({ time: timeString });
    // });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat message", this.state.hello);
  };

  render() {
    console.log("state", this.state.hello);
    return (
      <>
        <h1>{this.state.hello}</h1>
        {/* <h1>{this.state.time}</h1> */}

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.hello}
            onChange={(e) => this.setState({ hello: e.target.value })}
          />
          <button type="submit">submit</button>
        </form>
      </>
    );
  }
}

export default Medium;

// form and input and state gets sent to handleSubmit
// handle submit takes this.state.hello and emit's it to server
// server then takes that emit, and sends it back out to everyone else
// everyone elses state gets updated somehow on update or did mount?
