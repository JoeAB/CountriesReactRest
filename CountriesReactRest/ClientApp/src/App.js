import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
              <Layout>
                  <Route path='/' component={Home} />
              </Layout>

    );
  }
}
