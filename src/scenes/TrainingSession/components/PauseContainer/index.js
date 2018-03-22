import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'native-base'
import styled from 'styled-components';
import { black, green, darkGreen } from 'config/colors';

let opacity = 0.3;
const Overlay = styled(View)`
    position: absolute;
    background-color: 'rgba(0, 0, 0, ${opacity})'
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Body = styled(View)`
    background-color: white;
    width: 80%;
    padding: 15px;
`

const BtnContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`
let size = 65;
let side = 100;
const MyIcon = styled(Icon)`
    font-size: ${size};
    color: white;
`
const MyBtn = styled(Button)`
    border-radius: 999px;
    height: ${side}px;
    width: ${side}px;
    background-color: ${darkGreen};
    display: flex;
    justify-content: center;
    align-items: center;
`

let titleSize = 32;
const Title = styled(Text)`
    margin: auto;
    font-size: ${titleSize}px;
    margin-bottom: 15px;
    font-family: Roboto;
`

class PauseContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { onBack } = this.props;
        return(
            <Overlay>
                <Body>
                    <Title>Paused</Title>
                    <BtnContainer>
                       <MyBtn onPress={() => {}}>
                            <View style={{marginBottom: 5}}>
                                <MyIcon ios='ios-home' android="md-home" />
                            </View>
                        </MyBtn>
                        <MyBtn onPress={onBack}>
                           <View style={{marginLeft: 5}}>
                                <MyIcon  ios='ios-play' android="md-play" />
                            </View>
                        </MyBtn>
                    </BtnContainer>
             
                </Body>
            </Overlay>
        )   
    }
}

export default PauseContainer;