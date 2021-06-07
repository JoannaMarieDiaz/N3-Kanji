import React from 'react';

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

  return <React.Fragment>{inputs}</React.Fragment>;
};

export default inputHandler;
