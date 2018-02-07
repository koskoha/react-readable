import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    404 - <Link to="/all">Go home</Link>
  </div>
);

export default NotFoundPage;