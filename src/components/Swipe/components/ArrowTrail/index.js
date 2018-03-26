import React, { PureComponent } from 'react';
import { Image, View, Text } from 'react-native';
import styled from 'styled-components';
import { imgW, arrowTrailW } from 'config/Swipe';

let paddingR = 0;
let containerW = arrowTrailW;
const Wrapper = styled.View`
    background-color: crimson;
    padding-right: ${paddingR}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transform: rotate(${props => props.angle || 0}deg) scale(0.15);
`

let VerticalContainer = styled.View`
    height: ${arrowTrailW};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


let HorizontalContainer = styled.View`
    height: ${arrowTrailW};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`



    // right: 0;
    // width: ${containerW}px
    // position: absolute;

let repeatImgs;
class ArrowTrail extends PureComponent {
    componentWillMount() {
        //build repeat imgs
        
        let imgs = ~~((containerW-paddingR) / imgW);
        
        repeatImgs = [];
        let offset  = 0;
        for (let i = 0; i < imgs; i++) {
            repeatImgs.push( 
                <Image 
                    key={`swiperImg${i}`}
                    source={require('assets/Swiper/arrow_trail.png')}
                    /> 
            )
        }
        
        offset += imgW;
    }
    
    render(){
        
        //{ repeatImgs && repeatImgs}
        const { angle } = this.props; 
        return(
            <Wrapper angle={angle}>
                <VerticalContainer>
                    {repeatImgs}
                </VerticalContainer>
                <HorizontalContainer>
                    {repeatImgs}
                </HorizontalContainer>
            </Wrapper>    
        )
    }
}

export default ArrowTrail;