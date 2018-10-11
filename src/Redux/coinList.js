import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	fetchListSuccess: ['payload'],
	fetchListRequest: null,
	fetchListFailure: null,
})

export const CoinListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	list: {
	},
	isFetching: false
})

/* ------------- Reducers ------------- */

export const fetchListSuccess = (state, action) => {
	return state.merge({
		list: action.payload,
		isFetching: false
	})
}

export const fetchListRequest = (state, action) => {
	return state.merge({isFetching: true})
}

export const fetchListFailure = (state, action) => {
	return state.merge({isFetching: false})
}

/* ------------- Hookup Reducers To Types ------------- */

export const CoinListReducer = createReducer(INITIAL_STATE, {
	[Types.FETCH_LIST_SUCCESS]: fetchListSuccess,
	[Types.FETCH_LIST_REQUEST]: fetchListRequest,
	[Types.FETCH_LIST_FAILURE]: fetchListFailure,
})