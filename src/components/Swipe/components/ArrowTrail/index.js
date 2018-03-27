import React, { PureComponent } from 'react';
import { Image, View, Text } from 'react-native';
import styled from 'styled-components';
import { container, blockW, blockH, blocks } from 'config/Swipe';

let blockPerSide = blocks * blocks;

let aniOffsetX = container.w / 4;
let aniOffsetY = container.h / 4;

console.log(aniOffsetY);
const Wrapper = styled.View`
    left: -900px;
    height: ${container.h}px;
    width: ${container.w}px;
    transform: rotate(${props => props.angle || 0}deg)   translate(${aniOffsetX}px, -1000px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
`

let imgs = [];
class ArrowTrail extends PureComponent {
    componentWillMount() { 
        if(imgs.length) return;
        
        for (let i = 0; i < blockPerSide; i++) {
            imgs.push(
                <Image
                    style={{height: blockH, width: blockW}}
                    key={`_arrowKey${i}`} 
                    source={require('assets/Swipe/arrow_trail.png')}/>)
        }
    }
    
    render(){
        const { angle } = this.props; 
                    
        return(
            <Wrapper angle={angle}>
                {imgs}
            </Wrapper>    
        )
    }
}

export default ArrowTrail;