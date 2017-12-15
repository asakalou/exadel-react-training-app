import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../services/actions';
import GifItem from "../../../components/gif/GifItem";
import Page from "../../../components/layout/Page";

import './Random.css';

export class Random extends Component {

    constructor(props) {
        super(props);

        this.handleToggleTimer = this.handleToggleTimer.bind(this);
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
    }

    componentDidMount() {
        this.props.startTimer();
    }

    componentWillUnmount() {
        this.props.stopTimer();
    }

    handleToggleTimer() {
        if (this.props.timerStarted) {
            this.props.stopTimer();
        } else {
            this.props.startTimer();
        }
    }

    handleIntervalChange(event) {
        event.preventDefault();
        this.props.onIntervalChange(this.intervalInput.value);
    }


    render() {
        const timerButtonTitle = this.props.timerStarted ? 'Stop Timer' : 'Start Timer';

        return (
            <Page header={<h1>Random Gif</h1>}>

                <form onSubmit={this.handleIntervalChange}>
                    <label htmlFor="refreshInterval">Refresh Interval:</label>
                    <input id="refreshInterval"
                           ref={(input) => this.intervalInput = input}
                           type="number"
                           defaultValue={this.props.interval}/>
                    <button>Save</button>
                </form>

                <button type="button" onClick={this.handleToggleTimer}>{timerButtonTitle}</button>
                <button type="button" onClick={this.props.loadRandom}>Get</button>

                {
                    this.props.item != null ?
                        <div><GifItem url={this.props.item.image_url} alt={this.props.item.caption}/></div>
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
        interval: state.random.interval,
        timerStarted: state.random.timerStarted,
        error: state.random.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadRandom: () => dispatch(actions.loadRandom()),
        startTimer: () => dispatch(actions.startTimer()),
        stopTimer: () => dispatch(actions.stopTimer()),
        onIntervalChange: (interval) => dispatch(actions.changeInterval(interval))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Random)
