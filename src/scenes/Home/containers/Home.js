import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from "../services/actions";
import GifItemList from "../../../components/gif/GifItemList";
import {Button, Form, Input, Segment} from 'semantic-ui-react';

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
            <Segment inverted>

                <Form inverted onSubmit={this.handleSubmit}>
                    <Input fluid
                           onChange={this.handleQueryChange}
                           placeholder='Search gifs...'
                           action={{icon: 'search'}}/>
                </Form>


                {/*<div>*/}
                {/*<label htmlFor="pageSize">Page Size:</label>*/}
                {/*<input id="pageSize" type="text"*/}
                {/*value={this.props.pageSize}*/}
                {/*onChange={this.handlePageSizeChange}/>*/}
                {/*</div>*/}

                {this.props.initialized ?
                    <div>{this.props.totalItems} found. Showing {this.props.items.length}</div>
                    : null
                }

                <Segment inverted>
                    <GifItemList items={this.props.items}/>
                </Segment>

                {showLoadMoreButton ?
                    <Segment inverted>
                        <Button className="load-more-btn"
                                fluid
                                inverted
                                loading={this.props.loading}
                                onClick={this.props.onLoadMore}>
                            {this.props.loading ? 'Loading' : 'Load More'}
                        </Button>
                    </Segment>
                    : null
                }

            </Segment>
        );
    }

}

const mapStateToProps = state => {
    const homeState = state.home;
    return {
        query: homeState.tempQuery,
        items: homeState.items,
        totalItems: homeState.totalItems,
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
        onLoadCancel: (query) => dispatch(actions.loadCancel())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)