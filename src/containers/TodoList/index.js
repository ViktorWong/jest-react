import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import './style.css'

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
  delBtn = (index) => {
    const newList = [...this.state.undoList]
    newList.splice(index,1)
    this.setState({
      undoList:newList
    })
  }
  render() {
    const {undoList} = this.state
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList list={undoList} delBtn={this.delBtn}/>
      </div>
    );
  }
}
