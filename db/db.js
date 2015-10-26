import {
    reject,
    resolve,
    defer
} from 'bluebird';
import pg from 'pg';

var connection = null;

export default config => {
    if (!config.logger) {
        throw new Error('Missing logger');
    }

    if (!config.connection) {
        throw new Error('Missing connection');
    }

    return (query, params) => {
        const deferred = defer();

        pg.connect(config.connection, (error, client, done) => {
            if (error) { return deferred.reject(error); }

            client.query(query, params, (error, data) => {
                if (error) { return deferred.reject(error); }

                deferred.resolve(data);
            });
        });


        return deferred.promise;
    };
};

const getConnection = config => {
    if (connection) { return resolve(connection); }


    pg.connect(config.connection, (error, client, done) => {
        if (error) { return reject(error); }
    });

};

