import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../services/actions';
import GifItem from "../../../components/gif/GifItem";
import Page from "../../../components/layout/Page";

class Random extends Component {

    render() {
        return (
            <Page header={<h1>Random Gif</h1>}>
                <button type="button" onClick={this.props.loadRandom}>Random</button>

                {
                    this.props.item != null ?
                        <div><GifItem item={this.props.item}/></div>
                        : ''
                }

                {
                    this.props.error != null ?
                        <div>An error occurred: {this.props.error}</div>
                        : ''
                }
            </Page>
        );
    }

}

const mapStateToProps = state => {
    return {
        item: state.random.item,
        error: state.random.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadRandom: () => {
            dispatch(actions.loadRandom())
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Random)
