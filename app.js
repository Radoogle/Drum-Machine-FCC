 import React from 'react'
 import ReactDOM from 'react-dom'
// import { Provider, connect } from 'react-redux'
// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

// import rootReducer from './redux/reducers'
 import App from './components/App'

const BANK = [
  {
    keyCode: 81,
    keyName: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyName: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyName: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyName: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyName: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyName: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyName: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyName: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyName: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div id="display">{this.props.text}</div>;
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <button className="drum-pad">Q</button>;
  }
}

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (BANK.some((el) => el.keyCode == e.keyCode)) {
      //this.setState({ text: e.key });
      this.playSound(
        BANK.filter((el) => {
          if (el.keyCode == e.keyCode) return el.keyName;
        })
      );
    }
  }
  playSound(e) {
    let id;
    if (e[0]) id = e[0].keyName;
    else id = e.target.textContent;
    const sound = document.getElementById(id);
    sound.currentTime = 0;
    sound.play();
    this.props.updateDisplay(sound.parentNode.id.replace(/-/g, " "));
  }
  render() {
    let padBank;
    padBank = BANK.map((pad, i) => {
      return (
        <button className="drum-pad" id={pad.id} onClick={this.playSound}>
          {pad.keyName}
          <audio className="clip" id={pad.keyName} src={pad.url}></audio>
        </button>
      );
    });
    return <div id="pad">{padBank}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "power on"
    };
    this.display = this.display.bind(this);
  }

  display(name) {
    this.setState({
      text: name
    });
  }

  render() {
    return (
      <div id="controls">
        <Display text={this.state.text} />
        <Pad updateDisplay={this.display} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => { 
    ReactDOM.render(<App />, document.getElementById("drum-machine"));
    var br = document.createElement("br");
    document.getElementById("Heater-3").after(br);
    var br = document.createElement("br");
    document.getElementById("Open-HH").after(br);
    var btn = document.getElementsByClassName("drum-pad");
    btn[3].style.marginLeft = "50px";
    btn[6].style.marginLeft = "100px";
})