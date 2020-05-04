import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleKeyUp = (e) => {
    const { value } = this.state;
    if (e.keyCode === 13 && value) {
      typeof this.props.addUndoItem === "function" &&
        this.props.addUndoItem(this.state.value);
      this.setState({
        value: "",
      });
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div className="header-container">
        <span className="header-title">TodoList</span>
        <input
          className="header-input"
          type="text"
          data-test="header-input"
          value={value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}
