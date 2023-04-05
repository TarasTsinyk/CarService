import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.Context'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1" style={{ padding: '0 2rem' }}>
                <a href="/" className="brand-logo">Car servise </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/add">New vehicle</NavLink></li>
                    <li><NavLink to="/vehicles">My vehicles</NavLink></li>
                    <li><NavLink to="/addmaintance">Add maintance</NavLink></li>
                    <li><NavLink to="/documents">Documents</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}