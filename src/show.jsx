import React from 'react';

import { decrypt } from 'sjcl';

export default React.createClass({
    getInitialState() {
        if (!this.props.message) { return {}; }

        return {
            error: this.props.message.error,
            decrypted: this.props.message.decrypted,
            password: this.props.message.password
        };
    },

    render() {
        if (this.state.decrypted) {
            return <p>{this.state.decrypted}</p>;
        } else {
            return (
                <form method='POST'>
                    {this.state.error}
                    <label htmlFor='password'>
                        Password:
                        <input type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange} />
                    </label>
                </form>
            );
        }
    },

    handleChange(e) {
        const { value } = e.target;
        var decrypted = null;

        try {
            decrypted = decrypt(
                value,
                this.props.message.message
            );
        } catch (e) {}

        this.setState({
            password: value,
            decrypted
        });
    }
});

