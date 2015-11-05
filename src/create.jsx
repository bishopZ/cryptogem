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
                <div className='input-group'>
                        <div className='input-item'>
                            <label htmlFor='title'>Title:</label>
                            <input type='text' name='title'
                                value={this.state.title}
                                onChange={this.handleTitleChange} />
                        </div>

                        <div className='input-item'>
                            <label htmlFor='message'>Message:</label>
                            <textarea  name='message'
                                value={this.state.message}
                                onChange={this.handleMessageChange}
                                onKeyUp={this.handleTextareaExpand} />
                        </div>

                        <div className='input-item'>
                            <label htmlFor='password'>Password:</label>
                            <input  type='password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handlePasswordChange} />
                        </div>

                        <div className='input-item center-text wrap-text'>
                            <p>{encrypted}</p>
                        </div>

                        <div className='input-item'>
                            <button>Submit</button>
                        </div>
                    </div>
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
    },

    handleTextareaExpand({ target }) {
        target.style.overflow = 'hidden';
        target.style.height = 'auto';
        target.style.height = target.scrollHeight + 'px';
    }
});
