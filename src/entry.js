import React, { createElement } from 'react';
import { render } from 'react-dom';

import Main from './main';

render(
    <Main message={window.message} />, 
    window.container
);

