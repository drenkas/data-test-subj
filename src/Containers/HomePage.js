import React, { Component } from 'react'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'
import { Route, Switch, withRouter } from 'react-router-dom'
import CoinList from '../Components/CoinList.js'
import RegistrationForm from '../Components/RegistrationForm.js'
import LoginForm from '../Components/LoginForm.js'
const { Sider, Content,  } = Layout

class HomePage extends Component {
  state = {}

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    axios.get('/user/').then(response => {
      if (response.data.user) {
        this.props.createUser(response.data.user)
      }
    })
  }

  onClick = (info) => {
    if (info.key === "4") {
      this.props.logout()
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" >
          {this.props.user.authorize && <h2>Hello, {this.props.user.data.username}</h2>}
          </div>
          {this.props.user.authorize ? 
          <Menu onClick={this.onClick}  theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="profile" />
              <span>Home</span>
              <NavLink to="/" />
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="form" />
              <span>Logout</span>
            </Menu.Item>
          </Menu> : 
          <Menu onClick={this.onClick}  theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="profile" />
            <span>Home</span>
            <NavLink to="/" />
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="form" />
            <span>Register</span>
            <NavLink to="/auth/register" />
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="form" />
            <span>Login</span>
            <NavLink to="/auth/login" />
          </Menu.Item>
        </Menu>}
        </Sider>
        <Content style={{ padding: '50px 0', backgroundColor: '#fff' }}>
					<Row>
						<Col span={12} offset={6}>
              <Switch>
                <Route exact path="/" component={ CoinList} />
                <Route exact path="/auth/register" component={RegistrationForm} />
                <Route exact path="/auth/login" component={LoginForm} />
                <Route render={() => <div>Not Found</div>} />
              </Switch>
						</Col>
					</Row>
				</Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
	user: state.user,
})

const mapDispatchToProps = dispatch => {
	return {
    logout: () => dispatch(UserActions.logoutRequest()),
    createUser: (payload) => dispatch(UserActions.createUserSuccess(payload))
	}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage))
