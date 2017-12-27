import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../services/actions';
import GifItem from '../../../components/gif/GifItem';
import {Button, Form, Grid, Input, Segment} from 'semantic-ui-react';

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
            <Segment inverted>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Form inverted onSubmit={this.handleIntervalChange}>
                                <Form.Field inline>
                                    <label htmlFor="refreshInterval">Refresh Interval:</label>
                                    <Input id="refreshInterval"
                                           ref={(input) => this.intervalInput = input}
                                           type="number"
                                           min={5}
                                           defaultValue={this.props.interval}/>
                                </Form.Field>

                                <Button>Save</Button>
                            </Form>

                            <button type="button" onClick={this.handleToggleTimer}>{timerButtonTitle}</button>
                            <button type="button" onClick={this.props.loadRandom}>Get</button>
                        </Grid.Column>
                        <Grid.Column>
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
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Segment>
        );
    }

}

const mapStateToProps = state => {
    const randomState = state.random;
    return {
        item: randomState.item,
        interval: randomState.interval,
        timerStarted: randomState.timerStarted,
        error: randomState.error
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
