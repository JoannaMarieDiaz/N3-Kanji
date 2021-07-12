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
    <div className="resultBoxDiv">
      <h3>{textEvent.h3Text}</h3>
      <button onClick={textEvent.btnEvent} className={textEvent.class}>
        <Link
          className={classes.Link}
          to={'/inputHandler'}
          style={{
            // border: '1px solid black',
            padding: '25% 20% 25% 20%',
            marginRight: '30px',
          }}
        >
          {textEvent.btnText}
        </Link>
      </button>
    </div>
  );
};

export default resultBox;
