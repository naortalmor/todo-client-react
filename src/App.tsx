import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import HomeComponent from './components/todo/home/home.connector';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomeComponent></HomeComponent>
      </Provider>
    );
  }

  

}

export default App;