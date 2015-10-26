import React from 'react';
import { encrypt } from 'sjcl';

export default React.createClass({
    getInitialState() {
        return {
            title: '',
            message: '',
            password: '',
            encrypted: ''
        };
    },

    render() {
        var { encrypted } = this.state;
        if (encrypted) {
            try {
                encrypted = JSON.parse(encrypted).ct;
            } catch(e) {}
        }
        return (
            <form action='/save' method='POST'>
                <p>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' name='title'
                        value={this.state.title}
                        onChange={this.handleTitleChange} />
                </p>

                <p>
                    <label htmlFor='message'>Message:</label>
                    <textarea name='message'
                        value={this.state.message}
                        onChange={this.handleMessageChange} />
                </p>

                <p>
                    <label htmlFor='password'>Password:</label>
                    <input type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handlePasswordChange} />
                </p>

                <p>{encrypted}</p>

                <button>Submit</button>
            </form>
        );
    },

    handleTitleChange({ target }) {
        var { value } = target;
        value = value.replace(/ /g, '-');
        this.setState({ title: value });
    },

    handleMessageChange({ target }) {
        const { value } = target;
        var encrypted = null;

        try {
            encrypted = encrypt(this.state.password, value);
        } catch(e) {};

        this.setState({ message: value, encrypted });
    },

    handlePasswordChange({ target }) {
        const { value } = target;
        var encrypted = null;

        try {
            encrypted = encrypt(value, this.state.message);
        } catch(e) {};

        this.setState({ password: value, encrypted });
    }
});

