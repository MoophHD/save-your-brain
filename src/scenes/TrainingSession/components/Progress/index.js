import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

class Progress extends Component {
    render() {
        const { value } = this.props;
        return(
            <Text>{value}</Text>
        )
    }
}

Progress.propTypes = {
    value: PropTypes.number
}

export default Progress;