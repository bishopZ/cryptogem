import React from 'react';

export default _ =>
    <div>
        <h2>
            Cryptogem is a client side encryption/decryption app
            that supports fallbacking back to server-side encryption/decryption.
        </h2>

        <p>
            This property makes it nice for using with tor, where users may not have javascript enabled.

            All encryption is done by the <a href='http://bitwiseshiftleft.github.io/sjcl/'>stanford's sjcl</a> library.
        </p>
    </div>;

