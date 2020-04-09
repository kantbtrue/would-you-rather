import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

const Header = (props) => {
    const { authedUsername, authedUserImg } = props;

    const handleLogOut = () => {
        props.dispatch(setAuthedUser(null));
    }

    return (
        <header className="header" id="header">
            <nav className="navbar navbar-expand p-0">
                <div className="collapse navbar-collapse menu">
                    {/* Menu */}
                    <ul className="navbar-nav nav nav-tabs menu-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to='/' className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/add' className="nav-link">New Question</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/leaderboard' className="nav-link">Leader Board</NavLink>
                        </li>
                    </ul>
                    {/* End Menu */}
                    {/* Menu Author */}
                    <ul className="navbar-nav menu-author ml-auto">
                        <li className="nav-item text-white">
                            <div className="row align-items-center">
                                <div className="col-auto p-0">
                                    <img src={authedUserImg} className=" menu-author__img rounded-circle" alt=""/>
                                </div>
                                <div className="col pl-2 sm-font-size">
                                    Hello, {authedUsername}
                                    <div className=" menu-author__logout">
                                        <button type="button" onClick={handleLogOut} className="text-white p-0 bg-transparent border-0 sm-font-size">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {/*  End Menu Author */}
                </div>
            </nav>
        </header>
    );
}

function mapStateToProps ({users, authedUser}) {
    return {
        authedUsername: users[authedUser].name,
        authedUserImg: users[authedUser].avatarURL
    }
}

export default connect(mapStateToProps)(Header);