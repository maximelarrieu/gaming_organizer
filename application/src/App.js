import './App.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "react-datetime/css/react-datetime.css";

import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import GameList from './components/GameList.jsx';
import GameDetails from './components/GameDetails.jsx';
import EventList from './components/EventList.jsx';
import EventDetails from './components/EventDetails.jsx';
import EventCreate from './components/EventCreate.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

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
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
