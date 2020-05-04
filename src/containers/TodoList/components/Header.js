import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <input type="text" data-test="input" value={value} />
      </div>
    );
  }
}
