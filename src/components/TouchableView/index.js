import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';

const Triggerable = styled.TouchableHighlight`
`

const TouchableView = ({ onPress, children, ...props}) => {
    return (
        <Triggerable
            onPress={() => onPress()}
            {...props} >
            <View>
                { children }
            </View>
        </Triggerable>
        )
}
TouchableView.propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.node
}

export default TouchableView;