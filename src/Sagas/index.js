import { all, takeEvery } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { CoinListTypes } from '../Redux/coinList'
import { UserTypes } from '../Redux/user'

/* ------------- Sagas ------------- */

import { createUser, registerUser, logout, } from './user'
import { fetchList} from './coinList'


export default function * root () {
	yield all([
		takeEvery(CoinListTypes.FETCH_LIST_REQUEST, fetchList),
		takeEvery(UserTypes.CREATE_USER_REQUEST, createUser),
		takeEvery(UserTypes.REGISTER_USER_REQUEST, registerUser),
		takeEvery(UserTypes.LOGOUT_REQUEST, logout)
	])
}