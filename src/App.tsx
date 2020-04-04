import React from 'react';
import './App.css';
import TodosContainerComponent from './components/todos-container.component';

import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="row ctr">
        <TodosContainerComponent></TodosContainerComponent>
      </div>
    </Provider>
  );
}

export default App;
