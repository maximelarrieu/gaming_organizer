import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/games/:id" component={GameDetails} />
        <Route path="/games" component={GameList} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
