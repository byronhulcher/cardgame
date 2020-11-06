import React from 'react'

import ReactDOM from 'react-dom'
import {
  HashRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { resetContext, getContext } from 'kea' // 👈 add this
import { Provider } from 'react-redux' // 👈 add this

import { CardGame } from './CardGame/CardGame'
import { Scene } from './VN/Scene'

resetContext({
  createStore: {
    // options for redux (e.g. middleware, reducers, ...)
  },
  plugins: [
    // additional kea plugins
  ],
})


ReactDOM.render(
  <Provider store={getContext().store}>
    <HashRouter>
      <Switch>
        <Route path="/vn">
          <Scene />
        </Route>
        <Route path="/cards">
          <CardGame />
        </Route>
        <Route>
          <h1>Actual Card Game VN Prototype</h1>
          <h1>
            <ul>
              <Link to="vn"><li>VN</li></Link>
              <Link to="cards"><li>Cards</li></Link>
            </ul>
          </h1>
        </Route>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementsByTagName('main')[0]
)
