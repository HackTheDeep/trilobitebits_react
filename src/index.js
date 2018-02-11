import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// All Components
import './index.css';
import HomePage from './components/HomePage'
import NotFound from './components/NotFound'
import About from './components/About'

// App with routing added
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={About} />  
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
