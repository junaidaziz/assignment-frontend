import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index'

let store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

export {
  store
}
