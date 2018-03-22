import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

class Hp extends Component {
    render() {
        const { value } = this.props;
        return(
            <Text>{value}</Text>
        )
    }
}

Hp.propTypes = {
    value: PropTypes.number
}

export default Hp;