import './App.css';
import React, {useState, useEffect} from "react"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "react-datetime/css/react-datetime.css";
import {useDispatch, useSelector, Provider} from 'react-redux'
import store from './store'
import { history } from "./helpers/history";
import { clearMessage } from "./actions/message";

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
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if(currentUser) {
      console.log("connected")
      console.log(currentUser)
    }
  }, [currentUser])

  // const logOut = () => {
  //   dispatch(logout());
  // };

  return (
    // <Provider store={store}>
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/games/user/:user" component={GameList} />
        <Route exact path="/games/:id" component={GameDetails} />
        <Route exact path="/events" component={EventList} />
        <Route exact path="/events/:id/create" component={EventCreate} />
        <Route exact path="/events/:id" component={EventDetails} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
    // </Provider>
  );
}

export default App;
