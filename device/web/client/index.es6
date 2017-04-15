import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './app.es6';
import SessionList from './sessionList.es6';
import Session from './session.es6';

ReactDOM.render(
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/sessions" component={SessionList} />
        <Route path="/session/:id" component={Session} />
      </div>
    </BrowserRouter>,
    document.getElementById('root')
);