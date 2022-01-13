import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return(
            <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
                <Link to="/" className="navbar-brand">FoodTracker</Link>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Foods</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Add a new food</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Create User</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
