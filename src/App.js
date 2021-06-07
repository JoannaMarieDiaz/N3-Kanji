// import style from './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import Kanji from './Components/Kanji/Kanji';
import Form from './Components/Form/Form';
import myData from './data.json';
import Modal from './Components/Modal/Modal';

class App extends Component {
  state = {
    next: false,
    keys: [],
    kanji: '',
    onyomi: '',
    kunyomi: '',
    english: '',
    example: [],
    correctAnswer: '',
    show: true,
    question: '',
    questionKey: '',
    htmlForm: '',
  };

  componentDidMount() {
    // To set keys ans kanjis on an array
    const kanjis = [];
    const allKanjiValue = [];
    Object.entries(myData).map(([keys, values]) => {
      // eslint-disable-next-line
      return kanjis.push(keys), allKanjiValue.push(values);
    });
    const rand = Math.floor(Math.random() * kanjis.length);

    let on = [];
    let kun = [];
    let eng = [];
    let ex = [];
    // getting all data values
    Object.values(allKanjiValue).map((values) => {
      return (
        on.push(values.onyomi),
        kun.push(values.kunyomi),
        eng.push(values.english),
        ex.push(values.example)
      );
    });

    this.setState({
      onyomi: on,
      kunyomi: kun,
      english: eng,
      keys: [...kanjis],
      correctAnswer: 'チョウ, テイ, チン, トウ, チ',
      next: !this.state.next,
      kanji: kanjis[rand],
    });
  }

  nextHandler = () => {
    // for one kanji that will be display
    const rand = Math.floor(Math.random() * this.state.keys.length);

    // for question and correct answer
    const keysOfQuestions = Object.keys(myData[this.state.kanji]).filter(
      (key) => key !== 'example'
    );

    const keyRandNumber = Math.floor(Math.random() * keysOfQuestions.length);
    const passQuestionKey = keysOfQuestions[keyRandNumber];

    if (passQuestionKey === 'onyomi') {
      this.setState({ question: 'What is the onyomi reading for this kanji?' });
    } else if (passQuestionKey === 'kunyomi') {
      this.setState({ question: 'What is the kunyomi reading of this kanji?' });
    } else if (passQuestionKey === 'english') {
      this.setState({ question: 'What is the english meaning of this kanji?' });
    }

    const kanjiKey = this.state.keys[rand];

    // new objects on correct answers without example
    const correctAnswers = myData[kanjiKey];
    const { example, ...newCorrect } = correctAnswers;

    this.setState({
      kanji: kanjiKey,
      correctAnswer: newCorrect[passQuestionKey],
      questionKey: passQuestionKey,
      example: example,
      next: !this.state.next,
      show: false,
    });
    this.formHandler();
  };

  formHandler = async () => {
    const result = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(
          <Form
            onyomi={this.state.onyomi}
            kunyomi={this.state.kunyomi}
            english={this.state.english}
            question={this.state.question}
            length={this.state.keys.length}
            correctAnswer={this.state.correctAnswer}
            onClickedNext={this.nextHandler}
            questionKey={this.state.questionKey}
            next={this.state.next}
          />
        );
      })
    );
    this.setState({ htmlForm: result });
  };

  closeModalHandler = () => {
    this.setState({
      show: false,
    });
    this.nextHandler();
  };

  render() {
    return (
      <div className="container m-3">
        <Modal clicked={this.closeModalHandler} show={this.state.show}>
          <h3>Anki Kanji App</h3>
          <h3 className="m-4">Choose the correct answer!</h3>
          <button className="btn btn-success m-2" onClick={this.nextHandler}>
            Click to start
          </button>
        </Modal>

        <div>
          <Kanji kanjiRand={this.state.kanji} examples={this.state.example} />
        </div>

        <div>{this.state.htmlForm}</div>
      </div>
    );
  }
}

export default App;
