import React, { Component } from "react";
import Header from "./components/Header";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: [],
    };
  }
  addUndoItem = (value) => {
    this.setState((prev) => ({
      undoList: [...prev.undoList, value],
    }));
  };
  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        {this.state.undoList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    );
  }
}
