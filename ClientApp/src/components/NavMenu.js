import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import authService from './api-authorization/AuthorizeService';
import '../custom.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            id: '',
            isAdmin: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    async componentDidMount() {
        if (authService.isAuthenticated()) {
            const userId = await authService.getUserId();
            this.setState({ id: userId });

            const token = await authService.getAccessToken();
            const response = await fetch(`api/role/${userId}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data[0] === "admin") {
                this.setState({ isAdmin: true });
            }
        }
    }

    render() {
        return (
            <header>
                <Navbar className=" navbar navbar-expand-lg navbar-dark bg-dark" >
                    <Container>
                        <NavbarBrand tag={Link} to="/"><i aria-hidden="true" className="mr-auto">QUIZ App</i></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/highscores">High Scores</NavLink>
                                </NavItem>
                                {
                                    (this.state.isAdmin) ?
                                        <NavItem>
                                            <NavLink tag={Link} to="/admin">Admin</NavLink>
                                        </NavItem>
                                        : <span></span>
                                }
                                <LoginMenu></LoginMenu>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
