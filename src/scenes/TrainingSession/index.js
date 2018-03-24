import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Text } from 'react-native';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Lose from './components/Lose';
import PauseContainer from './components/PauseContainer';
import PauseBtn from './components/PauseBtn';
import Background from './components/Background';
import Progress from './components/Progress';

import PathFinder from '../../components/PathFinder';
import Swipe from '../../components/Swipe';

const UiContainer = styled.View`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Wrapper = styled.View`
    height: 100%;
    width: 100%;
`

class TrainingSession extends Component {
    constructor(props) {
        super(props);
        
        let instProps = {
            toTrain: [],
            active: -1
        }
        
        if (props.plan && props.plan.length) {
            let nextPlan = props.plan.slice();
            let nextActive = nextPlan.shift();
            
            instProps.toTrain = nextPlan;
            instProps.active = nextActive;
        }
        
        this.state = {
            ...instProps,
            pauseActive: false,
            loseActive: false
        }
        
        this.onLose = this.onLose.bind(this);
        this.onWin = this.onWin.bind(this);
    }
    
    onLose() {
        // this.setState(() => ({loseActive: true}))
    }
    
    setPause(isPaused) {
        this.setState(() => ({ pauseActive: isPaused }))
    }
    
    onWin() {
        
    }
    
    
    onNext() {
        const plan = this.state.plan;
        let nextPlan = plan.slice();
        let nextActive = nextPlan.shift();
        this.setState(() => ({toTrain: nextPlan, active: nextActive}))
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.plan != nextProps.plan) {
            let nextPlan = nextProps.plan.slice();
            let nextActive = nextPlan.shift();
            this.setState(() => ({toTrain: nextPlan, active: nextActive}))
        }
    }
    
    componentWillMount() {
        this.trainingProps = { onLose: this.onLose, onWin: this.onWin };
    }
    
    render() {
        const { byid } = this.props;
        const { active, pauseActive } = this.state;
        let Training = cloneElement(legend[byid[active].name], this.trainingProps);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        return(
            <Wrapper>
                <Background />
                
                    
                <UiContainer>
                    <PauseBtn onPress={() => this.setPause(true)}/>
                    <Progress value={3} />
                </UiContainer>
                
                { Training }
                
                { pauseActive &&  <PauseContainer onBack={() => this.setPause(false)}/> }
            </Wrapper>
        )
    }
}

TrainingSession.propTypes = {
    plan: PropTypes.array,
    onFinish: PropTypes.function
}

function mapStateToProps(state) {
    return {
        ids: state.ids,
        byid: state.byid
    }
}

export default connect(mapStateToProps, null)(TrainingSession);

const legend = {
    'PathFinder': <PathFinder />,
    'Swipe': <Swipe />
}