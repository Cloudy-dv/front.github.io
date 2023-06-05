import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Adduser from './components/Adduser';
import Addbook from './components/Addbook';
import Addlibrary from './components/Addlibrary';
import Addrental from './components/Addrental';
import Addreservation from './components/Addreservation';
import Listbook from './components/Listbook';
import Listlibrary from './components/Listlibrary';
import Listrental from './components/Listrental';
import Listreservation from './components/Listreservation';
import Listuser from './components/Listuser';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/book/add">
            <Addbook />
          </Route>
          <Route exact path="/book/list">
            <Listbook />
          </Route>
          <Route exact path="/user/add">
            <Adduser />
          </Route>
          <Route exact path="/user/list">
            <Listuser />
          </Route>
          <Route exact path="/library/add">
            <Addlibrary />
          </Route>
          <Route exact path="/library/list">
            <Listlibrary />
          </Route>
          <Route exact path="/rental/add">
            <Addrental />
          </Route>
          <Route exact path="/rental/list">
            <Listrental />
          </Route>
          <Route exact path="/reservation/add">
            <Addreservation />
          </Route>
          <Route exact path="/reservation/list">
            <Listreservation />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;