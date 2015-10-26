import Bluebird from 'bluebird';
import webpack from 'webpack';

import config from './webpack.config';

webpack(config, (error, stats) => {
    if (error) { console.error(error); }

    console.log(stats.toString());
});

