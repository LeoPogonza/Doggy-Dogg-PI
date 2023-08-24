import { Route, Switch } from 'react-router-dom';
import './App.css';
import { LandingPage, Home, Details, NewDog } from './views';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/new" component={NewDog} />
        <Route exact path="/home/:id" component={Details} />
      </Switch>
    </div>
  );
}

export default App;
