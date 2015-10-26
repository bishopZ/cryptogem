import React from 'react';
import { Link } from 'react-router';

export default ({ children }) =>
    <div>
        <header style={{ }}>
            <Link to='/'>cryptogem</Link>
            {' '}
            <Link to='/about'>about</Link>
        </header>

        <main>
            {children}
        </main>
    </div>;

