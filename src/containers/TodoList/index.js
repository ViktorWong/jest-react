import React, { Component } from "react";
import Header from "./components/Header";
import UndoList from "./components/UndoList";
import "./style.css";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: [],
    };
  }
  addUndoItem = (value) => {
    this.setState((prev) => ({
      undoList: [...prev.undoList, {
        value,
        status:'0'
      }],
    }));
  };
  delBtn = (index) => {
    const newList = [...this.state.undoList];
    newList.splice(index, 1);
    console.log(newList)
    this.setState({
      undoList: newList,
    });
  };

  changeStatus = (index) => {
    console.log(index)
    const { undoList } = this.state;
    const newList = undoList.map((v,i)=>{
      if(i !== index){
        return {
          ...v,
          status:"0"
        }
      }
      return {
        ...v,
        status:"1"
      }
    })
    this.setState({
      undoList: newList
    });
  };

  handleBlur = (index) => {
    const { undoList } = this.state;
    const newList = undoList.map((v,i) => {
      if(i !== index){
        return v
      }
      return {
        ...v,
        status:"0"
      }
    })
    this.setState({
      undoList: newList
    });
  }

  valueChange = (index,value) => {
    console.log(index,value)
    const { undoList } = this.state;
    const newList = undoList.map((v,i) => {
      if(i === index){
        return {
          ...v,
          value
        }
      }
      return v
    })
    this.setState({
      undoList: newList
    });
  }
  render() {
    const { undoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList
          list={undoList}
          delBtn={this.delBtn}
          changeStatus={this.changeStatus}
          handleBlur={this.handleBlur}
          valueChange={this.valueChange}
        />
      </div>
    );
  }
}
