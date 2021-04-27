import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { NavLink } from 'reactstrap'
import { Quiz } from './Quiz.js';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            IsUserAuthenticated: false,
            IsQuizReady: false
        };
    }

    async componentDidMount() {
        this.setState({ IsUserAuthenticated: await authService.isAuthenticated() });
    }

    handleStartClick = () => {
        this.setState({
            IsQuizReady: true
        });
    }

    render() {
        const registerPath = `${ApplicationPaths.Register}`;
        const loginPath = `${ApplicationPaths.Login}`;
        return (
            <div>
                {this.state.IsUserAuthenticated ?
                    <div>
                        {this.state.IsQuizReady
                            ? (
                                <Quiz />
                            )
                            : (
                                <div>
                                    <h3 className="mt-5 mb-3 p-1">Now it is time to check your knowlegde!</h3>
                                    <p>Good luck !</p>
                                    <button className="btn btn-info" style={{ width: 200 }} onClick={this.handleStartClick}>Start Quiz</button>
                                </div>
                            )}
                    </div> :
                    <div>
                        <h3 className="mt-5 mb-3 p-1">Welcome to the QUIZ App !</h3>
                        <p>To play this quiz you will have to create an account on this webpage. </p>
                        <p>If you already have an account, click on the login button and enter your login information.</p>

                        <p>
                            <button className="btn btn-info">
                                <NavLink className="text-light" style={{ width: 200 }} tag={Link} to={registerPath}>Register</NavLink>
                            </button>
                        </p>
                        <p>
                            <button className="btn btn-info" >
                                <NavLink tag={Link} className="text-light" style={{ width: 200 }} to={loginPath}>Login</NavLink>
                            </button>
                        </p>
                    </div>
                }
            </div>
        );
    }
}
