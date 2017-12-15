import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from "../services/actions";
import GifItemList from "../../../components/gif/GifItemList";

import './Home.scss';

export class Home extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
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

    handlePageSizeChange(event) {
        this.props.onPageSizeChange(event.target.value);
    }

    render() {
        const showLoadMoreButton = !!this.props.totalItems
            && (this.props.items.length < this.props.totalItems);

        return (
            <div>
                <h1>Home</h1>
                <form className="query-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="query">Query:</label>
                    <input id="query"
                           type="text"
                           value={this.props.query}
                           onChange={this.handleQueryChange}/>
                    <button className="search-btn">Search</button>
                </form>

                <div>
                    <label htmlFor="pageSize">Page Size:</label>
                    <input id="pageSize" type="text"
                           value={this.props.pageSize}
                           onChange={this.handlePageSizeChange}/>
                </div>

                <div>
                    {this.props.totalItems} found. Showing {this.props.items.length}
                </div>

                <div>
                    <GifItemList items={this.props.items}/>
                </div>

                {showLoadMoreButton ?
                    <div>
                        <button className="load-more-btn" type="button" onClick={this.props.onLoadMore}>Load More</button>
                    </div>
                    : null
                }

            </div>
        );
    }

}

const mapStateToProps = state => {
    const homeState = state.home;
    return {
        query: homeState.tempQuery,
        items: homeState.items,
        totalItems: homeState.totalItems,
        pageSize: homeState.pageSize
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadMore:() => dispatch(actions.loadMore()),
        onSearch: () => dispatch(actions.search()),
        onPageSizeChange: (pageSize) => dispatch(actions.changePageSize(pageSize)),
        onQueryChange: (query) => dispatch(actions.queryChange(query)),
        onLoadCancel: (query) => dispatch(actions.loadCancel())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)