import React from 'react'

import {
  resetContext,
  getContext,
} from 'kea'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  HashRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

import { CardGame } from './CardGame/CardGame'
import { Scene } from './VN/Scene'

resetContext({
  createStore: {},
  plugins: [],     // additional kea plugins
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
