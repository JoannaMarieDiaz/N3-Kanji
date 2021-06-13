import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './Form.module.css';
import _ from 'lodash';
import { Link, Route, Switch } from 'react-router-dom';
import ResultBox from '../ResultBox/ResultBox';
import InputHandler from '../InputHandler/InputHandler';
import Modal from '../Modal/Modal';

const Form = (props) => {
  const [choices, setChoices] = useState([]);
  const [chooseAnswer, setChooseAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { next } = props;

  // A fucntion handler after submitting form
  const formHandler = (e) => {
    e.preventDefault();
    const value = chooseAnswer;
    if (value === props.correctAnswer) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);
    } else {
      setIsCorrect(false);
    }
  };

  // Clear input fields
  const clearInputHandler = () => {
    Array.from(document.querySelectorAll('.radioInput')).forEach(
      (input) => (input.value = '')
    );
  };

  //Handle choose input value
  const getInputRadioHandler = (e) => {
    setChooseAnswer(e.target.value);
  };

  useEffect(() => {
    // // setting choices
    const currentChoices = props[props.questionKey];
    const arrayOfNewChoice = [];
    const arrayOfNewCorrect = [];

    Object.values(currentChoices).every((all) => {
      return all === props.correctAnswer
        ? arrayOfNewCorrect.push(all)
        : arrayOfNewChoice.push(all);
    });

    // mixed rand choice value and correct answer
    const randChoices = _.sampleSize(arrayOfNewChoice, 3);

    const arrayOfChoices = randChoices.concat(props.correctAnswer);

    // Set variable values
    setChoices(_.shuffle(arrayOfChoices));
    // eslint-disable-next-line
  }, [next]);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const restarHandler = () => {
    setShowModal(!showModal);
    setScore(0);
    document.querySelector('#score').textContent = 0;
    props.onClickedNext();
  };

  return (
    <React.Fragment>
      <div
        style={{
          marginLeft: '10%',
          top: '5%',
          position: 'absolute',
        }}
      >
        <h2 className={classes.score}>
          Score: <span id="score">{score}</span>
        </h2>
      </div>
      <div className={classes.Card}>
        <div className="m-2">
          <form>
            <Switch>
              <Route path="/inputHandler" exact>
                <h4 style={{ fontSize: '1rem' }}>{props.question}</h4>
                <InputHandler
                  questionKey={props.questionKey}
                  choices={choices}
                  changed={getInputRadioHandler}
                />
                <button
                  style={{ width: '8rem' }}
                  type="submit"
                  className="btn btn-success m-2"
                  onClick={formHandler}
                >
                  <Link className={classes.Link} to="/resultBox">
                    {' '}
                    Submit answer
                  </Link>
                </button>
              </Route>
              <Route path="/resultBox">
                <ResultBox
                  result={isCorrect}
                  clear={clearInputHandler}
                  next={props.onClickedNext}
                  show={props.show}
                />
              </Route>
            </Switch>
          </form>
        </div>
      </div>
      <Modal clicked={modalHandler} show={showModal}>
        <h3 className="m-2">
          <strong>Your Score:</strong>
        </h3>
        <h2 className="m-4 text-success text-center fs-1">{score}</h2>
        <h2 className="m-4 text-center">
          Your average score today:{' '}
          <span className="text-primary m-2">
            {Math.floor((score / 645) * 100)}%
          </span>
        </h2>
        <button className="btn btn-success m-2" onClick={restarHandler}>
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            to="/inputHandler"
          >
            Restart?
          </Link>
        </button>
      </Modal>
      <div
        style={{
          width: '100px',
          margin: '0 auto',
        }}
      >
        <button
          className="btn btn-warning m-3"
          style={{
            width: '100%',
          }}
          onClick={modalHandler}
        >
          Quit
        </button>
      </div>
    </React.Fragment>
  );
};

export default Form;
