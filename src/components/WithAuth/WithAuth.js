import React, {Component} from 'react';
import {connect} from 'react-redux';

const WithAuthComponent = (MyComponent) => {

    return class WrappedComponent extends Component {

        constructor(props) {
            super(props);

            this.state = {
                date : new Date(),
                loggedIn: false
            }
        }

        render() {
            return (
                <div><MyComponent {...this.props} {...this.state}/></div>
            );
        }

    }

};

const Header = ({date, loggedIn}) => {
    return (
        <div>{date.toString()} {loggedIn}</div>
    );
};

export class RenderProps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date : new Date(),
            loggedIn: false
        }
    }

    render() {
        return this.props.children(this.state);
    }
}

export default WithAuthComponent(Header);
