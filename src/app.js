import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bulma';
import Navbar from './components/common/Navbar';
import Home from './components/crimes/Home';
import IndexRoute from './components/crimes/IndexRoute';
import NewRoute from './components/crimes/NewRoute';
import EditRoute from './components/crimes/EditRoute';

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
              <Route exact path="/crimes/report/:id" component={EditRoute} />
              <Route exact path="/crimes" component={IndexRoute} />
              <Route exact path="/crimes/report" component={NewRoute} />
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
