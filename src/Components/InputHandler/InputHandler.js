import React from 'react';

const inputHandler = (props) => {
  console.log(props);
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
      <label for={i}>
        <p className="m-1" style={{ fontSize: '1.8vw' }}>
          {keys.substr(0, 40)}
        </p>
      </label>
    </div>
  ));

  return <React.Fragment>{inputs}</React.Fragment>;
};

export default inputHandler;
