import WriteMessage from './write-message';
import Logger from '../logger';

const logger = Logger('run-write-message');

WriteMessage({
    connection: 'posgres://localhost:5432/cryptogem',
    logger
})({
    title: 'doghouse',
    message: 'the titanic was a big ship',
    password: '123'
})

