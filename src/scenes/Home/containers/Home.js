import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../services/actions';
import {favouritesActions} from '../../../services/store';
import GifItemList from '../../../components/gif/GifItemList';
import {Button, Input, Segment} from 'semantic-ui-react';

import './Home.scss';

export class Home extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    componentDidMount() {
        this.props.onSearch();
    }

    componentWillUnmount() {
        this.props.onLoadCancel();
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSearch();
    }

    handleQueryChange(event) {
        this.props.onQueryChange(event.target.value);
    }

    render() {
        let itemsFoundDescription;

        if (this.props.totalItems != null) {
            itemsFoundDescription = `${this.props.totalItems} found. Showing ${this.props.items.length}`;
        } else {
            itemsFoundDescription = `Showing ${this.props.items.length}`;
        }

        return (
            <Segment inverted>

                <form className="ui form inverted gs-home-query-form" onSubmit={this.handleSubmit}>
                    <Input fluid
                           className="gs-home-query"
                           onChange={this.handleQueryChange}
                           value={this.props.query}
                           placeholder='Search gifs...'
                           action={{icon: 'search'}}/>
                </form>

                {this.props.initialized ?
                    <div>{itemsFoundDescription}</div>
                    : null
                }

                <GifItemList fav={this.props.loggedIn}
                             items={this.props.items}
                             favouriteItems={this.props.favouriteItems}
                             onFavClick={this.props.onToggleFavourite}/>

                {this.props.hasMoreItems ?
                    <Button className="load-more-btn"
                            fluid
                            inverted
                            loading={this.props.loading}
                            onClick={this.props.onLoadMore}>
                        {this.props.loading ? 'Loading' : 'Load More'}
                    </Button>
                    : null
                }

            </Segment>
        );
    }

}

const mapStateToProps = state => {
    const homeState = state.home;
    return {
        loggedIn: state.auth.loggedIn,
        query: homeState.tempQuery,
        items: homeState.items,
        favouriteItems: state.favourites.itemsIds,
        totalItems: homeState.totalItems,
        hasMoreItems: homeState.hasMoreItems,
        pageSize: homeState.pageSize,
        loading: homeState.loading,
        initialized: homeState.initialized
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadMore: () => dispatch(actions.loadMore()),
        onSearch: () => dispatch(actions.search()),
        onPageSizeChange: (pageSize) => dispatch(actions.changePageSize(pageSize)),
        onQueryChange: (query) => dispatch(actions.queryChange(query)),
        onLoadCancel: (query) => dispatch(actions.loadCancel()),
        onToggleFavourite: (item) => dispatch(favouritesActions.toggleFavouriteItem(item))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)