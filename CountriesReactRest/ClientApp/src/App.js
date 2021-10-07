import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Country } from './components/Country';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';




import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
            <Layout>
              <Route exact path='/' component={Home} />
              <Route path='/Country/:id' component={Country} />

            </Layout>

    );
  }
}
