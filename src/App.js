import logo from './logo.svg';
import './App.css';
import Login from './Login/Login'
import {Route, Switch} from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route  path='/login' component={Login} />
        <Route  path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
