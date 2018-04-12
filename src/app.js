import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/common/ProtectedRoute';

import 'bulma';
import Navbar from './components/common/Navbar';
import Home from './components/crimes/Home';
import IndexRoute from './components/crimes/IndexRoute';
import NewRoute from './components/crimes/NewRoute';
import EditRoute from './components/crimes/EditRoute';
import ShowRoute from './components/crimes/ShowRoute';

import Profile from './components/users/Profile';
import EditProfile from './components/users/EditProfile';


import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './assets/scss/style.scss';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <section className="section">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/users/:id/edit" component={EditProfile} />

              <Route exact path="/users/:id/" component={Profile} />

              <Route exact path="/crimes/:id/edit" component={EditRoute} />
              <ProtectedRoute path="/crimes/report" component={NewRoute} />
              <Route exact path="/crimes/report" component={NewRoute} />

              <Route exact path="/crimes/:id" component={ShowRoute} />
              <Route exact path="/crimes" component={IndexRoute} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />


            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
