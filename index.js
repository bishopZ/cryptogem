import React from 'react';
import express from 'express';
import { urlencoded } from 'body-parser';
import { join } from 'path';
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'

import WriteMessage from './db/write-message';
import GetMessage from './db/get-message';
import routes from './src/routes';
import Logger from './logger';

const logger = Logger('cryptogem');
const config = {
    logger,
    connection: 'posgres://localhost:5432/cryptogem'
};

var app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/html'));

app.use(express.static(
    join(__dirname, 'public')
));

app.use(urlencoded({ extended: false }));

app.post('/save', (req, res, next) => {
    if (!req.body.message) {
        throw new Error('Invalid request');
    }

    WriteMessage(config)(req.body)
        .then(
            data => res.redirect(`/${data.title}`),
            next
        );
});

app.all('/:message', (req, res, next) => {
    GetMessage(config)(
        req.params.message,
        req.body && req.body.password
    )
    .then(
        null,
        data => {
            if (req.body) {
                data.password = req.body.password;
                data.error = 'Incorrect Password';
                res.status(401);
            }

            return data;
        }
    )
    .then(
        message => {
            req.cryptoGemMessage = message;
            next();
        },
        _ => next()
    );
});

app.all('*', (req, res) => {
    match(
        { routes, location: req.url },
        (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(
                    302,
                    redirectLocation.pathname + redirectLocation.search
                );
            } else if (renderProps) {
                renderProps.createElement = (Component, props) => {
                    props.message = req.cryptoGemMessage;
                    return <Component {...props} />;
                };

                res.render(
                    'index',
                    {
                        message: req.cryptoGemMessage || {},
                        component: renderToString(
                            <RoutingContext {...renderProps} />
                        )
                    }
                );
            } else {
                res.status(404).send('Not found');
            }
        }
    );
});

app.use((err, req, res, next) => { 
    if (err.stack) {
        logger.error({ error: err }, err.stack);
    } else {
        logger.error(err);
    }
});

app.listen(8888);

