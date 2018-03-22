import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import styled from 'styled-components';
import { black } from 'config/colors';
import { View } from 'react-native';
import TouchableView from 'components/TouchableView';

let side = 60;
let size = 25;

const Btn = styled(TouchableView)`
    height: ${side}px;
    width: ${side}px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PauseIcon = styled(Icon)`
    font-size: ${size};
`

const PauseBtn = ({ onPress }) => (
    <Btn 
        underlayColor={'white'}
        onPress={onPress}>
        <PauseIcon ios='ios-pause' android="md-pause"/>
    </Btn>
)


PauseBtn.propTypes = {
    onPress: PropTypes.func
}

export default PauseBtn;