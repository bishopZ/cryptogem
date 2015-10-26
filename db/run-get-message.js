import GetMessage from './get-message';
import Logger from '../logger';

const logger = Logger('run-get-message');

GetMessage({
    connection: 'posgres://localhost:5432/cryptogem',
    logger
})('cool')
    .then(data => data.message)

