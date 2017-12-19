import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Button, Container, Menu, Dropdown} from 'semantic-ui-react';
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import {push} from 'react-router-redux';
import Home from "../scenes/Home";
import Random from "../scenes/Random";
import {Login, Logout, SignUp} from "../scenes/Auth";

const FixedMenu = ({onLogin, onLogout, loggedIn, user}) => (
    <Container>
        <Menu inverted pointing secondary size='large'>
            <Menu.Item>
                <b>GIPHY Search</b>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/'} exact>Home</Menu.Item>
            <Menu.Item as={NavLink} to={'/random'}>Random</Menu.Item>

            {!loggedIn ?
                <Menu.Item position='right'>
                    <Button as='a' inverted onClick={onLogin}>Log In</Button>
                </Menu.Item>
                :
                <Menu.Item position='right'>
                    <Dropdown text={user.email} icon='user' floating labeled button className='icon'>
                        <Dropdown.Menu>
                            <Dropdown.Item text='Profile' onClick={onLogout} />
                            <Dropdown.Divider />
                            <Dropdown.Item text='Log Out' onClick={onLogout} />
                        </Dropdown.Menu>
                    </Dropdown>
                    {/*<Button as='a' inverted onClick={onLogout}>Log Out</Button>*/}
                </Menu.Item>
            }
        </Menu>
    </Container>
);


export class Main extends Component {

    render() {
        return (
            <Fragment>
                <FixedMenu loggedIn={this.props.loggedIn}
                           user={this.props.user}
                           onLogin={this.props.onLogin}
                           onLogout={this.props.onLogout}/>

                <Container>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/random" component={Random}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/join" component={SignUp}/>
                        <Route path="/logout" component={Logout}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch(push('/login')),
        onLogout: () => dispatch(push('/logout'))
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main))

