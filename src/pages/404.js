import React from 'react';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <div>
    <h1>404 Page Not Found</h1>
    <p>I'm sorry, but that page doesn&#39;t exist...</p>
    <p>
      However, I could <Link to="/">guide you home</Link>.
    </p>
  </div>
);

export default NotFoundPage;
