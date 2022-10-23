import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router} from "react-router";
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

ReactDOM.render(
    <React.Fragment>
        <Router history={history}>
            <App/>
        </Router>
    </React.Fragment>,
    document.getElementById('root'),
);
