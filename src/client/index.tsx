import React from 'react'

import ReactDOM from 'react-dom'
import { resetContext, getContext } from 'kea' // 👈 add this
import { Provider } from 'react-redux' // 👈 add this

import { CardGame } from './CardGame/CardGame'

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
    <CardGame />
  </Provider>,
  document.getElementsByTagName('main')[0]
)
