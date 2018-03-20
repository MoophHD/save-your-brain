import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Svg, Polyline } from 'react-native-svg';
import { PanResponder } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'config/metrics';
import ActiveLine from './components/ActiveLine';
import Vector from 'components/Vector';

let lastAnchor = '0,0';
let anchors = [];

class MyLine extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.path != nextProps.path) {
            //
            let nextPath = nextProps.path.split(' ');
            
            lastAnchor = new Vector(...nextPath[nextPath.length - 1].split(','));
        }
    }
    
    
    render() {
        const { path, target } = this.props;
        return(
                <Svg height={DEVICE_HEIGHT} width={DEVICE_WIDTH}>
                   {path && 
                        <Polyline  
                            points={path}
                            fill="none"
                            stroke="black"
                            strokeWidth="3"/>
                    }
                    
                    {path && 
                        <ActiveLine
                            anchor={lastAnchor}
                            target={target}
                        />
                    }
                </Svg>
       
        )
    }
}





                
MyLine.propTypes = {
    path: PropTypes.string
}

export default MyLine;