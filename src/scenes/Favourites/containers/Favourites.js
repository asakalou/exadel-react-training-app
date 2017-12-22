import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../services/actions';
import {favouritesActions} from '../../../services/store';
import GifItemList from '../../../components/gif/GifItemList';
import {Segment} from 'semantic-ui-react';

import './Favourites.css';

export class Favourites extends Component {

    constructor(props) {
        super(props);

        this.handleRemoveFromFavourites = this.handleRemoveFromFavourites.bind(this);
    }

    componentDidMount() {
        this.props.onLoadFavourites();
    }

    componentWillUnmount() {
        this.props.onLoadFavouritesCancel();
    }

    handleRemoveFromFavourites(id) {
        this.props.onRemoveFromFavorites(id);
    }

    render() {
        return (
            <Segment inverted>

                <GifItemList items={this.props.items}/>

            </Segment>
        );
    }

}

const mapStateToProps = state => {
    const favouritesState = state.favourites;
    return {
        items: favouritesState.items,
        loading: favouritesState.loading,
        error: favouritesState.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadFavourites: () => dispatch(actions.loadFavourites()),
        onRemoveFromFavorites: (id) => dispatch(favouritesActions.removeFromFavourites(id)),
        onLoadFavouritesCancel: () => dispatch(actions.loadFavouritesCancel())
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favourites)
