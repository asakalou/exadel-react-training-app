import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from "../../../components/layout/Page/Page";
import * as actions from "../services/actions";
import GifItemList from "../../../components/gif/GifItemList";

class Home extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
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
        return (
            <Page header={<h1>Home</h1>}>

                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                           value={this.props.query}
                           onChange={this.handleQueryChange}/>
                    <button>Search</button>
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

                {this.props.totalItems ?
                    <div>
                        <button type="button" onClick={this.props.onLoadMore}>Load More</button>
                    </div>
                    : null
                }

            </Page>
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
        onLoadMore:() => {
            dispatch(actions.loadMore())
        },

        onSearch: () => {
            dispatch(actions.search())
        },

        onPageSizeChange: (pageSize) => {
            dispatch(actions.changePageSize(pageSize));
        },

        onQueryChange: (query) => {
            dispatch(actions.queryChange(query))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)