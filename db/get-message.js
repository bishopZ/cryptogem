import { decrypt } from 'sjcl';
import DB from './db';

export default config => {
    const db = DB(config);

    return (title, password) => db(
        'select * from messages where title = $1',
        [ title ]
    )
    .then(data => {
        if (!data.rows) {
            throw new Error('No message found');
        }

        return data.rows[0];
    })
    .then(data => {
        if (password) {
            try {
                data.decrypted = decrypt(password, data.message);
            } catch(e) {
                throw data;
            }

            return data;
        }

        return data;
    });
};

