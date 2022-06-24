import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Provider extends Component {

    static childContextTypes = {
        store: PropTypes.object
    }

    constructor(props, context){
        super(props, context)
        // 这里写错了。
        this.store = props.store
    }

    getChildContext() {
      return { store: this.store }
    }

  render() {
    return this.props.children
  }
}
