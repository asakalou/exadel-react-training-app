import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Button, Container, Dropdown, Icon, Menu} from 'semantic-ui-react';
import {NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {push} from 'react-router-redux';
import Home from '../../scenes/Home/index';
import Random from '../../scenes/Random/index';
import Favourites from '../../scenes/Favourites/index';
import {Login, Logout, SignUp} from '../../scenes/Auth/index';
import * as mainActions from '../services/actions';

import './Main.css';

const FixedMenu = ({onLogin, onLogout, loggedIn, user, favouritesCount}) => {
    return (
        <Container>
            <Menu inverted pointing secondary size='large'>
                <Menu.Item>
                    <b>GIPHY Search</b>
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/'} exact>Home</Menu.Item>
                <Menu.Item as={NavLink} to={'/random'}>Random</Menu.Item>

                {loggedIn ?
                    <Menu.Item as={NavLink} to={'/favourites'}>
                        Favourites&nbsp;{favouritesCount ?
                        <span>(<Icon name="star"/>{favouritesCount})</span> : null}</Menu.Item>
                    : null
                }

                {!loggedIn ?
                    <Menu.Item position='right'>
                        <Button as='a' inverted onClick={onLogin}>Log In</Button>
                    </Menu.Item>
                    :
                    <Menu.Item position='right'>
                        <Dropdown text={user.email} icon='user' floating labeled button className='icon'>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Profile' onClick={onLogout}/>
                                <Dropdown.Divider/>
                                <Dropdown.Item text='Log Out' onClick={onLogout}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                }
            </Menu>
        </Container>
    );
};


export class Main extends Component {

    componentDidMount() {
        // request for all the actions related to app initialisation
        this.props.onInitApp();
    }

    render() {
        // if app is not initialised do not show anything
        // this one is coming from main state in store
        // see main reducer
        if (!this.props.initialised) {
            return null;
        }

        return (
            <Fragment>
                <FixedMenu loggedIn={this.props.loggedIn}
                           user={this.props.user}
                           favouritesCount={this.props.favouritesCount}
                           onLogin={this.props.onLogin}
                           onLogout={this.props.onLogout}/>

                <Container>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/random" component={Random}/>

                        {
                            // That's a tricky part. We can hide this route for unauthorised users
                            // and they will be redirected directly to home page

                            this.props.loggedIn ?
                            <Route path="/favourites" component={Favourites}/> : null
                        }

                        <Route path="/login" component={Login}/>
                        <Route path="/join" component={SignUp}/>
                        <Route path="/logout" component={Logout}/>
                        <Redirect to="/"/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        initialised: state.main.initialised,
        favouritesCount: state.favourites.totalItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitApp: () => dispatch(mainActions.initApp()),
        onLogin: () => dispatch(push('/login')),
        onLogout: () => dispatch(push('/logout'))
    }
};

// using withRouter due to https://github.com/ReactTraining/react-router/issues/4671
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main))

