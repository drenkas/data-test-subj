import React, { Component } from 'react'
import { SpinLoader } from 'react-css-loaders'
import { connect } from 'react-redux'
import { List } from 'antd'
import CoinListActions from '../Redux/coinList'

class CoinList extends Component {

	componentDidMount() {
		this.props.fetchList()
	}

	render() {
		const coinList = this.props.list
		if (this.props.isFetching)
			return (<SpinLoader />)
		else return (
			<div>
				<List
					itemLayout="horizontal"
					dataSource={coinList}
					renderItem={item => (
					<List.Item>
						<List.Item.Meta
						title={`${item.ccy} --  ${item.base_ccy}`}
						description={`BUY:  ${item.buy}   SALE:  ${item.sale}`}
						
						/>
					</List.Item>
					)}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	list: state.coinlist.list,
	isFetching: state.coinlist.isFetching
})

const mapDispatchToProps = dispatch => {
	return {
		fetchList: () => dispatch(CoinListActions.fetchListRequest())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinList)
