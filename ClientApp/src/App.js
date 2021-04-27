import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Highscores } from './components/Highscores';
import { Admin } from './components/Admin';

import './custom.css';

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = { isReady: false };
    }

    handleStartClick = () => {
        document.getElementById('StartBtn').style.display = 'none';
        this.setState({
            isReady: true
        });
    }

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <AuthorizeRoute path='/highscores' component={Highscores} />
                <AuthorizeRoute path='/admin' component={Admin} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
