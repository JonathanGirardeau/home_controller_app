import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faTrashAlt)

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
    const onClick = this.handleClick;
    
    return (
      <button type="button" className="list-group-item list-group-item-action" name={name} onClick={onClick}>
        {name}
      </button>
    );
  }
}

class ControlButtons extends Component {
  render() {
    const onButtonClick = this.props.onButtonClick;
    const controls = this.props.controls;
    let buttons = [];
    controls.forEach((control) => {
      buttons.push(<NamedButton name={control.name} onClick={onButtonClick} />);
    });
    return (
      <div className="row text-center align-items-center justify-content-center">
        <div>
          {buttons}
        </div>
      </div>
    );
  }
}
                     
const controls = [
  {name: "Power", commands: ["Power Tv", "Power Sound System"]},
  {name: "Volume Up", commands: ["Volume Up Sound System"]},
  {name: "Volume Down", commands: ["Volume Down Sound System"]},
  {name: "Tv Source", commands: ["Tv Source"]}
];     
                     
const commands = [
  {name: "Power Tv", brand: "SONY", payload: "0", payloadSizeInBits: 0},
  {name: "Power Sound System", brand: "SONY", payload: "0", payloadSizeInBits: 0},
  {name: "Volume Up Sound System", brand: "SONY", payload: "0", payloadSizeInBits: 0},
  {name: "Volume Down Sound System", brand: "SONY", payload: "0", payloadSizeInBits: 0},
  {name: "Tv Source", brand: "SONY", payload: "0", payloadSizeInBits: 0}
];   
  
class ControlsPage extends Component {
  constructor(props) {
    super(props);
    this.handleControlClick = this.handleControlClick.bind(this);
  }
  
  handleControlClick(name) {
    alert('Control ' + name + ' clicked');
  }
  
  render() {
    return (
      <div>
        <br />
        <ControlButtons controls={controls} onButtonClick={this.handleControlClick} />
      </div>
    );
  }
}

class TableBody extends Component {
  render() {
    const rows = this.props.rows;
    const onRowSelectionChange = this.props.onRowSelectionChange;
    return (
      <tbody>
        {Array.from(rows, ([id, row]) =>
          <TableBodyRow id={id} data={row.data} isSelected={row.isSelected} onSelectionChange={onRowSelectionChange} />
        )}
      </tbody>
    );
  }
}

class TableBodyRow extends Component {
  constructor(props) {
    super(props);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }
  
  handleSelectionChange(event) {
    const id = this.props.id;
    const onSelectionChange = this.props.onSelectionChange;
    const isSelected = event.target.checked;
    onSelectionChange(id, isSelected);
  }
    
  render() {
    const id = this.props.id;
    const data = this.props.data;
    const isSelected = this.props.isSelected;
    return (
      <tr key={id}>
        <td>
          <input name={id}
                 type="checkbox"
                 checked={isSelected}
                 onChange={this.handleSelectionChange} />
        </td>
        {data.map(item =>
          <td>{item}</td>
        )}
      </tr>
    );
  }
}
                  
class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }
  
  handleSelectionChange(event) {
    const onSelectionChange = this.props.onSelectionChange;
    const isSelected = event.target.checked;
    onSelectionChange(isSelected);
  }
  
  render() {
    const titles = this.props.titles;
    const areAllRowsSelected = this.props.areAllRowsSelected;
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    return (
      <thead className="thead-dark">
        <tr>
          <th>
            <input type="checkbox"
                   checked={areAllRowsSelected}
                   onChange={this.handleSelectionChange} />
          </th>
          {titles.map(title =>
            <th key={title}>{title}</th>
          )}
        </tr>
      </thead>
    );
  }
}

class TableBar extends Component {
  render() {
    const onAddClick = this.props.onAddClick;
    const onTrashClick = this.props.onTrashClick;
    return (
      <div className="container-fluid m-0 p-2">
        <div className="btn-toolbar">
          <button type="button" className="btn mx-1 btn-light" onClick={onAddClick}>
            <FontAwesomeIcon icon="plus"/>
          </button>
          <button type="button" className="btn mx-1 btn-danger" onClick={onTrashClick}>
            <FontAwesomeIcon icon="trash-alt"/>
          </button>
        </div>
      </div>
    );
  }
}
                  
class Table extends Component {
  constructor(props) {
    super(props);
    
    const data = this.props.data;
    let rowsStatic = new Map();
    data.forEach((dataLine) => rowsStatic.set(dataLine[0], {data: dataLine}));
    this.rowsStatic = rowsStatic;
    
    let selectedRows = {};
    rowsStatic.forEach((row, id) => {
      selectedRows[id] = false;
    });
    this.state = {selectedRows: selectedRows};
    
    this.handleRowSelectionChange = this.handleRowSelectionChange.bind(this);
    this.handleAllRowsSelectionChange = this.handleAllRowsSelectionChange.bind(this);
    this.handleTrashClick = this.handleTrashClick.bind(this);
    this.areAllRowsSelected = this.areAllRowsSelected.bind(this);
  }
  
  handleRowSelectionChange(id, isSelected) {
    let selectedRows = this.state.selectedRows;
    selectedRows[id] = isSelected;
    this.setState({selectedRows: selectedRows});
  }
  
  handleAllRowsSelectionChange(areSelected) {
    let selectedRows = this.state.selectedRows;
    for (var id in selectedRows) {
      selectedRows[id] = areSelected;
    }
    this.setState({selectedRows: selectedRows});
  }
  
  handleAddClick() {
    alert('add');
  }
  
  handleTrashClick() {
    alert('trash');
  }
  
  areAllRowsSelected() {
    for (var id in this.state.selectedRows) {
      if(this.state.selectedRows[id] === false) { return false; }
    }
    return true;
  }
  
  render() {
    const columnTitles = this.props.columnTitles;
    const selectedRows = this.state.selectedRows;
    let rowsDynamic = this.rowsStatic;
    rowsDynamic.forEach((row, id) => row.isSelected = selectedRows[id]);
    const areAllRowsSelected = this.areAllRowsSelected();
    return (
      <div>
        <TableBar onAddClick={this.handleAddClick} onTrashClick={this.handleTrashClick} />
        <table className="table table-striped">
          <TableHeader titles={columnTitles} 
                       areAllRowsSelected={areAllRowsSelected} 
                       onSelectionChange={this.handleAllRowsSelectionChange} />
          <TableBody rows={rowsDynamic} 
                     onRowSelectionChange={this.handleRowSelectionChange} />
        </table>
      </div>
    );
  }
}

class ControlsSettingsPage extends Component {
  render() {
    const controls = this.props.controls;
    const columnTitles = ['Control', 'Commands'];
    let rows = [];
    controls.forEach((control) => {
      rows.push([control.name, 
                 control.commands.join(", ")]);
    });
    return (
      <Table columnTitles={columnTitles} data={rows} />
    );
  }
}

class CommandsSettingsPage extends Component {
  render() {
    const commands = this.props.commands;
    let columnTitles = ['Command', 'Brand', 'Payload', 'Size of payload in bits'];
    let rows = [];
    commands.forEach((command) => {
      rows.push([command.name, 
                 command.brand,
                 command.payload,
                 command.payloadSizeInBits]);
    });
    return (
      <Table columnTitles={columnTitles} data={rows} />
    );
  }
}

class SettingsHeader extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-controls-tab" data-toggle="tab" href="#nav-controls" role="tab" aria-controls="nav-controls" aria-selected="true">Controls</a>
            <a className="nav-item nav-link" id="nav-commands-tab" data-toggle="tab" href="#nav-commands" role="tab" aria-controls="nav-commands" aria-selected="false">Commands</a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-controls" role="tabpanel" aria-labelledby="nav-controls-tab">
            <ControlsSettingsPage controls={controls}/>
          </div>
          <div className="tab-pane fade" id="nav-commands" role="tabpanel" aria-labelledby="nav-commands-tab">
            <CommandsSettingsPage commands={commands}/>
          </div>
        </div>
      </div>
    );
  }
}

class SettingsMain extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/Controls' component={ControlsSettingsPage} />
          <Route exact path='/Commands' component={CommandsSettingsPage} />
        </Switch>
      </main>
    );
  }
}
  
class SettingsPage extends Component {
  render() {
    return (
      <div>
      <SettingsHeader />
      <SettingsMain />
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
              <Link className="nav-link" to="/Controls">Controls</Link>
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
          <Route exact path='/' component={ControlsPage} />
          <Route exact path='/Controls' component={ControlsPage} />
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
