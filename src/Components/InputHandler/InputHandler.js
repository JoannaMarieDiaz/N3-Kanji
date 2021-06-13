import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import classes from '../Form/Form.module.css';

const inputHandler = (props) => {
  const inputs = props.choices.map((keys, i) => (
    <div key={i}>
      {' '}
      <input
        className="m-1 radioInput"
        type="radio"
        id={i}
        name={props.questionKey}
        value={keys}
        onChange={props.changed}
      />
      <label htmlFor={i}>
        <p className="m-1" style={{ fontSize: '0.9rem' }}>
          {keys.substr(0, 40)}
        </p>
      </label>
    </div>
  ));

  return (
    <React.Fragment>
      {inputs}{' '}
      <button
        style={{ width: '8rem' }}
        type="submit"
        className="btn btn-success m-2"
        onClick={props.formHandler}
      >
        <Link className={classes.Link} to="/resultBox">
          {' '}
          Submit answer
        </Link>
      </button>
    </React.Fragment>
  );
};

export default inputHandler;
