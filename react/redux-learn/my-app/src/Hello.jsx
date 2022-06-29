import React from 'react'
import { connect } from 'react-redux'

function Hello (props) {
  return <div>{props.counter.count}<button onClick={() => props.addCount()}>add</button></div>
}

const mapStateToProps = (state) => ({counter: state.counter})

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: () => dispatch({type: "ADD_COUNT"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello)
