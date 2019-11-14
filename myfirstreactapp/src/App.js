import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import LoginComponent from './App/Login/loginComponent';
import DashboardComponent from './App/Dashboard/DashboardComponent';

class App extends Component {
  constructor(props) {
    super(props);    
}
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' component={LoginComponent}></Route>
            <div>
              <Route path='/dashboard' component={DashboardComponent}></Route>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
