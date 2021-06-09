import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ResultBox.module.css';

const resultBox = (props) => {
  let textEvent = {};
  if (props.result === true) {
    textEvent = {
      btnText: 'Next',
      h3Text: 'Good Work!',
      btnEvent: props.next,
      class: 'btn btn-primary',
    };
  } else if (props.result === false) {
    textEvent = {
      btnText: 'Continue',
      h3Text: 'Try again',
      btnEvent: props.clear,
      class: 'btn btn-warning',
    };
  }
  return (
    <React.Fragment>
      <h3>{textEvent.h3Text}</h3>
      <button onClick={textEvent.btnEvent} className={textEvent.class}>
        <Link
          className={classes.Link}
          to={props.show === false ? '/' : '/resultBox'}
        >
          {textEvent.btnText}
        </Link>
      </button>
    </React.Fragment>
  );
};

export default resultBox;
