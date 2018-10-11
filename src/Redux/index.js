import { combineReducers } from 'redux'
import { CoinListReducer } from './coinList'
import { UserReducer } from './user'

export const reducers = combineReducers({
  user: UserReducer,
  coinlist: CoinListReducer
})
