import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import GameList from './components/GameList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/games" component={GameList} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
