import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import { imgW, arrowTrailW } from 'config/Swipe';

let paddingR = 0;
let containerW = arrowTrailW;

const Wrapper = styled.View`
    padding-right: ${paddingR}px;
    right: 0;
    background-color: crimson;
    width: ${containerW}px
    position: absolute;
    display: flex;
    flex-direction: row;
`

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
        return(
            <Wrapper>
                { repeatImgs && repeatImgs}
            </Wrapper>    
        )
    }
}

export default ArrowTrail;