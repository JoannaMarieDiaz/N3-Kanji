import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import classes from './Modal.module.css';

const modal = (props) => {
  return (
    <div className="container">
      {props.show ? (
        <div className={classes.Backdrop} onClick={props.clicked}></div>
      ) : null}
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default modal;
