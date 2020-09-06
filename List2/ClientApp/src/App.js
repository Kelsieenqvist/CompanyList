import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import CreateCompany from './components/CreateCompany'
import { Link } from "react-router-dom"
import ListCompanies from './components/ListCompanies'
import UpdateCompany from './components/UpdateCompany'


import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Switch>
                <Layout>
                    <Route exact path='/' component={ListCompanies} />
                    <Route path='/Create' component={CreateCompany} />
                    <Route path='/Update' component={UpdateCompany} />
                </Layout>
            </Switch>
        );
    }
}

