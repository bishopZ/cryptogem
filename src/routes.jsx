import React from 'react'
import {
    Link,
    IndexRoute,
    Route,
} from 'react-router'

import Create from './create';
import About from './about';
import Search from './search';
import Show from './show';
import Shell from './shell';

export default (
    <Route path='/' component={Shell}>
        <IndexRoute component={Create} />
        <Route path='about' component={About} />
        <Route path='search' component={Search} />
        <Route path=':gem' component={Show} />
    </Route>
);

