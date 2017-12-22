import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../services/actions';
import {Button, Container, Form, Header, Input, Message} from "semantic-ui-react";
import {Redirect} from "react-router-dom";
import {push} from 'react-router-redux';
import {CSSTransitionGroup} from "react-transition-group";

import '../../components/Auth.css';


export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillUnmount() {
        this.props.onClearAuthFormState();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onLogin(this.state.email, this.state.password);
    }

    handleInputChange(field, value) {
        this.setState({
            [field]: value
        });
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to={'/'}/>
        }

        return (
            <Container className="gs-auth">

                <div className="gs-auth__form">
                    <Header as={'h2'} inverted>GIPHY Search</Header>


                    <CSSTransitionGroup
                        component="div"
                        transitionName="example"
                        transitionEnterTimeout={1500}
                        transitionLeaveTimeout={700}>
                        {this.props.error ?
                            <Message error content={this.props.error}/>
                            : null
                        }
                    </CSSTransitionGroup>

                    <Form inverted onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Email</label>
                            <Input onChange={(event) => {
                                this.handleInputChange('email', event.target.value)
                            }}
                                   fluid
                                   placeholder='Email'/>
                        </Form.Field>

                        <Form.Field>
                            <label>Password</label>
                            <Input onChange={(event) => {
                                this.handleInputChange('password', event.target.value)
                            }}
                                   fluid
                                   type="password"
                                   placeholder='Password'/>
                        </Form.Field>

                        <Form.Field>
                            <Button fluid type="submit" color="blue">Log in</Button>
                        </Form.Field>

                        <Form.Field>
                            <Button type="button"
                                    onClick={this.props.onJoin}
                                    color="grey"
                                    inverted>Join</Button>
                        </Form.Field>


                    </Form>
                </div>
            </Container>
        );

    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        loggedIn: state.auth.loggedIn,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClearAuthFormState: () => dispatch(actions.clearAuthFormState()),
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        onJoin: () => dispatch(push('/join'))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)