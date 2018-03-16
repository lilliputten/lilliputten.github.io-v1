// import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default function connectToState(inst) {
  const Connected = connect(inst.stateToProps, dispatch => {
    return {
      ...bindActionCreators(inst.actions || {}, dispatch),
      dispatch
    };
  })// (inst);

  return Connected;
};
