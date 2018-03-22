import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'state/configureStore';
import TrainingSession from './scenes/TrainingSession';
import { Font, AppLoading } from "expo";
import { Root } from 'native-base';
import { StatusBar } from 'react-native';

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }
  
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isLoaded: true });
  }
  
  render() {
    return (
      <Provider store={store}>
        <Root>
          <StatusBar hidden />
          { this.state.isLoaded && <TrainingSession plan={[0]}/> }
        </Root>
      </Provider>
  )

  }
}


export default App;