import React from 'react';
import { Container } from 'native-base';
import { Image } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(Container)`
    position: absolute;
    height: 100%;
    width: 100%;
`

const BgImage = styled.Image`
    resize-mode: cover;
    opacity: 0.15;
    flex: 1;
    height: undefined;
    width: undefined;
`
const Background = () => (
    <Wrapper>
        <BgImage 
            
            source={require('assets/images/bg.jpg')} />
    </Wrapper>
)

export default Background;