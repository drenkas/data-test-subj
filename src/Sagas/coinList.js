import { call, put } from 'redux-saga/effects'
import CoinListTypes from '../Redux/coinList'
import { showNotification } from '../Components/showNotif'
import * as Api from '../api/Api'

export const fetchList = function * (action) {
	try {
		const response = yield call(Api.getFetch, 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
		if (response.status === 200) {
			const list = response.data
			
			yield put(CoinListTypes.fetchListSuccess(list))
		}
		else {
			let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'
			showNotification('error', msg, desc, () => {}, 2)
			yield put(CoinListTypes.fetchListFailure())
		}
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, () => {}, 2)
		yield put(CoinListTypes.fetchListFailure())
	}
}

