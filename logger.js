import fs from 'fs';
import Logger from 'bunyan'
import logFormat from 'bunyan-format'

export default name => { 
    const simpleOut = logFormat({
        outputMode: 'short',
        color: true
    });

    const logger = Logger.createLogger({
        level: 'debug',
        name: name,
        streams: [
            { stream: simpleOut }
        ]
    });

    return logger;
};

