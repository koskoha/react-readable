import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h1>Error 404</h1> <br/>
    Page not found! <br/>
    <h3><Link to="/all">Go home</Link></h3>
  </div>
);

export default NotFoundPage;