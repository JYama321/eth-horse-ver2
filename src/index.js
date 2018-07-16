import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import history from './utils/history'
import configureStore from './configureStore'
import { AppContainer } from 'react-hot-loader'
const initialState = {};
const store = configureStore(initialState, history);


ReactDOM.render(
    <Provider store={store}>
        <AppContainer>
            <Router>
                <Route path='*' component={App}/>
            </Router>
        </AppContainer>
    </Provider>,
    document.getElementById('root')
);
