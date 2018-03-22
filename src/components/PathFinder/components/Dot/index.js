import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { dotSide } from 'config/PathFinder';

const mainSide = dotSide;
const radius = mainSide/2;

const state = {
    lose: 'lose',
    win: 'win',
    idle: 'idle',
    demo: 'demo'
}

const cl = {
    lose: '#FF7577',
    win: '#77FF75',
    idle: 'white',
    demo: '#ccc'
}

const MainCircle = styled(View)`
  background-color: ${props => props.cl };
  border-radius: ${radius}px;
  height: ${mainSide}px;
  width: ${mainSide}px;
  position: absolute;
  left: ${props => props.x};
  top: ${props => props.y};
`

class Dot extends Component {
    shouldComponentUpdate(nextProps) {
        const differentState = this.props.state != nextProps.state;
        
        return differentState;
    }
    
    render() {
        const { state, x, y } = this.props;
        return(
              <MainCircle
                    x={x}
                    y={y}
                    cl={cl[state]}
                />
        )
    }
}

Dot.propTypes = {
    state: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number
}

export default Dot;