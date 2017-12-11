import React, {Component} from "react";
import PropTypes from 'prop-types';

const propTypes = {
    header: PropTypes.node,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node
};

class Page extends Component {

    render() {
        return (
            <div>
                <header>{this.props.header}</header>
                <div>{this.props.children}</div>
                <footer>{this.props.footer}</footer>
            </div>
        );
    }

}
Page.propTypes = propTypes;

export default Page;