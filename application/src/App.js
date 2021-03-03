import './App.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import NavBar from './components/NavBar';
import Home from './components/Home';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EventCreate from './components/EventCreate';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={GameList} />
        <Route exact path="/games/:id" component={GameDetails} />
        <Route exact path="/events" component={EventList} />
        <Route exact path="/events/:id/create" component={EventCreate} />
        <Route exact path="/events/:id" component={EventDetails} />
      </Switch>
    </Router>
  );
}

export default App;
