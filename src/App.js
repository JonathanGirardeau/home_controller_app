import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

class NamedButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.onClick(this.props.name);
  }
  
  render() {
    const name = this.props.name;
    const image = this.props.image;
    const onClick = this.handleClick;
    
    return (
      <button type="button" class="list-group-item list-group-item-action" name={name} onClick={onClick}>
        {name}
      </button>
    );
  }
}

class CommandButtons extends Component {
  render() {
    const onButtonClick = this.props.onButtonClick;
    const commands = this.props.commands;
    let buttons = [];
    commands.forEach((command) => {
      buttons.push(<NamedButton name={command.name} onClick={onButtonClick} />);
    });
    return (
      <div class="row text-center align-items-center justify-content-center">
        <div>
          {buttons}
        </div>
      </div>
    );
  }
}
                     
const commands = [
  {name: "Power"},
  {name: "Volume Up"},
  {name: "Volume Down"},
  {name: "Tv Source"},
];   

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}
  
class CommandsPage extends Component {
  constructor(props) {
    super(props);
    this.handleCommandClick = this.handleCommandClick.bind(this);
  }
  
  handleCommandClick(name) {
    alert('Command ' + name + ' clicked');
  }
  
  render() {
    return (
      <div>
        <br />
        <CommandButtons commands={commands} onButtonClick={this.handleCommandClick} />
      </div>
    );
  }
}
  
class SettingsPage extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Settings...</h1>
      </div>
    );
  }
}
  
class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light  bg-light">
          <Link className="navbar-brand" to="/">Home Controller</Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Commands">Commands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
  
class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/Commands' component={CommandsPage}/>
          <Route exact path='/Settings' component={SettingsPage} />
        </Switch>
      </main>
    );
  }
}

class App extends Component {
  render() {
    return (
    <div>
      <Header />
      <Main />
    </div>
    );
  }
}

export default App;
