import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../services/actions';
import {Button, Container, Form, Header, Input, Message} from "semantic-ui-react";
import {Redirect} from "react-router-dom";

import '../../components/Auth.css';


export class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onJoin(this.state.email, this.state.password);
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
                    <Header as={'h2'} inverted>Join GIPHY Search</Header>

                    {this.props.error ?
                        <Message error content={this.props.error}/>
                        : null
                    }

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
                                   placeholder='Password'/>
                        </Form.Field>

                        <Form.Field>
                            <Button fluid type="submit" color="blue">Join</Button>
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
        onJoin: (email, password) => dispatch(actions.register(email, password)),
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)