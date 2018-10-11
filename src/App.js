import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './Store'
/* import CoinListWrapper from './Containers/CoinListWrapper' */
import HomePage from './Containers/HomePage'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store'
import './App.css'
import 'antd/dist/antd.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Provider store={store}>
					<ConnectedRouter history={history}> 
						<div>
							<HomePage />
						</div>
					</ConnectedRouter>
				</Provider>
			</div>
		);
	}
}

export default App;
