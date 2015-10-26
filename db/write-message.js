import { encrypt } from 'sjcl';
import uuid from 'uuid';

import DB from './db';

export default config => {
    const db = DB(config);

    return props => {
        if (props.password) {
            props.message = encrypt(
                props.password,
                props.message
            );
        }

        if (props.title) {
            props.public = true;
        } else {
            props.title = uuid();
        }

        return db(
            `
                insert into messages (
                    "title",
                    "message",
                    "hint",
                    "public"
                ) values (
                    $1, $2, $3, $4
                )
            `,
            [
                props.title,
                props.message,
                props.hint,
                !!props.public
            ]
        ).then(_ => props);
    };
};

