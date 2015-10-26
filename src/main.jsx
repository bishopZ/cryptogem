import React from 'react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes';

export default React.createClass({
    render() {
        return (
            <Router history={createBrowserHistory()}
                createElement={(Component, props) => {
                    props.message = window.message;
                    return <Component {...props} />;
                }}>
                {routes}
            </Router>
        );
    }
});

