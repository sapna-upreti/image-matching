import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
  <div className="app-container">
    <header>
      <Link to="/">
        <img className="logo" src="/img/logo.jpg" alt="Logo" />
      </Link>
    </header>
    <div className="app-content">{props.children}</div>
    <footer className="col-sm-12 text-center">
      <div>This image matcher, matches the images with the dataset <a href="http://nodexperts.com" target="_blank">&copy; NodeXperts 2017</a></div>
    </footer>
  </div>
);

export default Layout;
