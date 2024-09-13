import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './Main';





function component(id: any) {
  var element = document.createElement('div');
  element.id = id;
  return element;
}

var element = component('root');
document.body.appendChild(element);


const render = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(Main);

if (module.hot) {
  module.hot.accept('./Main', () => {
    const NextMain = require('./Main').Main;
    render(NextMain);
  });
}