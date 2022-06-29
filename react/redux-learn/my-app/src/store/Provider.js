import React, { Component } from "react";
import PorpTypes from "prop-types";

export default class Rrovider extends Component {
  static childContextTypes = {
    store: PorpTypes.object,
  };
  constructor(props, context) {
    super(props);
    this.store = props.store;
  }
  render() {
    return this.props.children;
  }
}
