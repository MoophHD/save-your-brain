import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Svg, Polyline } from 'react-native-svg';
import { PanResponder } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'config/metrics';
import Vector from 'components/Vector';


class MyLine extends Component {
    shouldComponentUpdate(nextProps) {
        const differentPath = this.props.path != nextProps.path;
        
        return differentPath;
    }
    
    render() {
        const { path } = this.props;
        return(
                <Svg height={DEVICE_HEIGHT} width={DEVICE_WIDTH}>
                   {path && 
                        <Polyline  
                            points={path}
                            fill="none"
                            stroke="black"
                            strokeWidth="3"/>
                    }
                </Svg>
       
        )
    }
}
                
MyLine.propTypes = {
    path: PropTypes.string
}

export default MyLine;