import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorText: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()

    this.toGetData()
  }

  toGetData = async () => {
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'

    const data = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)

    const result = await response.json()

    if (response.ok) {
      const {history} = this.props

      history.replace('/')

      const token = result.jwt_token
      Cookies.set('jwt_token', token, {
        expires: 30,
      })
    } else {
      this.setState({
        errorText: result.error_msg,
      })
    }
  }

  render() {
    const {errorText} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-form-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="username">USERNAME</label> <br />
            <input
              onChange={this.onChangeUsername}
              placeholder="username"
              id="username"
              type="text"
            />{' '}
            <br />
            <label htmlFor="password">PASSWORD</label> <br />
            <input
              onChange={this.onChangePassword}
              className="password-input"
              placeholder="password"
              id="password"
              type="password"
            />{' '}
            <p className="error-text">{errorText}</p>
            <button className="login-btn" type="submit">
              Login{' '}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
