import React, { Component, PureComponent } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internal: "",
      msg: "default",
      obj: {
        current: 0
      }
    };

    this.func = this.func.bind(this);
  }

  func() {
    console.log("new 8");
  }

  internalChange() {
    this.setState({ internal: "new" });
  }

  objChange() {
    this.setState({ obj: { current: "new" } });
  }

  render() {
    console.log("parent re-render");
    return (
      <div>
        <ChildOne msg={this.state} />
        <ChildTwo msg={this.state} />
        <ChildThree msg={this.state.msg} />
        <Child4 msg={this.state.msg} />
        <Child5 obj={this.state.obj} />
        <Child6 obj={this.state.obj} />
        <Child7 ft={this.func} />
        <Child8 ft={this.func} />
        <button onClick={this.internalChange.bind(this)}>
          internal change
        </button>
        <button onClick={this.objChange.bind(this)}>obj change</button>
      </div>
    );
  }
}

class ChildOne extends Component {
  //shouldComponentUpdate(nextProps, nextState){
  //console.log('insert your break point here')
  // you will find  that this.props != nextProps,
  // becuase when parent gets re-rendered triggered by setState, it builds it
  // new VDOM, which is ReactElement(s);
  // the nextProps is the prop passed to the new ReactElement, and obviously
  // nextProps and this.props points to different object and thus they are not shalldow equal
  // to each other.
  // child gets re-rendered
  //}
  render() {
    console.log("childOne re-render");
    const { msg } = this.props;
    return <h1>ChildOne msg:{msg.msg}</h1>;
  }
}

class ChildTwo extends PureComponent {
  render() {
    console.log("childTwo re-render");
    const { msg } = this.props;
    return <h1>ChildTwo msg:{msg.msg}</h1>;
  }
}

class ChildThree extends Component {
  render() {
    console.log("childThree re-render");
    const { msg } = this.props;
    return <h1>ChildTwo msg:{msg}</h1>;
  }
}

class Child4 extends PureComponent {
  render() {
    console.log("child4 re-render");
    const { msg } = this.props;
    return <h1>Child4 msg:{msg}</h1>;
  }
}

class Child5 extends Component {
  render() {
    console.log("child5 re-render");
    const { obj } = this.props;
    return <h1>Child5 msg:{obj.current}</h1>;
  }
}

class Child6 extends PureComponent {
  render() {
    console.log("child6 re-render");
    const { obj } = this.props;
    return <h1>Child6 msg:{obj.current}</h1>;
  }
}

class Child7 extends Component {
  render() {
    console.log("child7 re-render");
    const { ft } = this.props;
    {
      ft();
    }
    return <h1>Child7 msg</h1>;
  }
}

class Child8 extends PureComponent {
  render() {
    console.log("child8 re-render");
    const { ft } = this.props;
    {
      ft();
    }
    return <h1>Child8 msg</h1>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
