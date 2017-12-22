import React, {Component} from 'react';
import {connect} from 'react-redux';

const WithAuth = (MyComponent) => {

    return class WrappedComponent extends Component {
        constructor(props) {
            super(props);

            this.state = { loggedIn: false }
        }

        render() {
            return (
                <div><MyComponent {...this.props} {...this.state}/></div>
            );
        }
    }

};

const Header = ({loggedIn}) => {
    return (
        <div>{loggedIn ? 'Logged In' : 'Not Logged In'}</div>
    );
};

export default WithAuth(Header);



export class RenderProps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }

    render() {
        return this.props.children(this.state);
    }
}


const Header = () => {
    return (
        <RenderProps>
            {(loggedIn) => {
                return <div>{loggedIn ? 'Logged In' : 'Not Logged In'}</div>
            }}
        </RenderProps>
    );
};



