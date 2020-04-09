import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    render () {
        return(
            <div className="error">
                <h1>OOPSS! Page Not Found</h1>
                <p>The page you are looking for has not been found.</p>
                <Link exact to="/">back to home page</Link>
            </div>
        );
    }
}

export default NotFound;