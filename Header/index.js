import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

class Header extends Component {
  OnClickLogOutBtn = () => {
    const {history} = this.props
    const token = Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav>
        <Link to="/">
          <img
            className="home-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="sm-nav-items">
          <Link to="/">
            <li>
              <AiFillHome />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill />
            </li>
          </Link>

          <li>
            <button className="logout-sm-btn" onClick={this.OnClickLogOutBtn}>
              <FiLogOut />
            </button>
          </li>
        </ul>

        <ul className="lg-nav-items">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
        </ul>

        <button onClick={this.OnClickLogOutBtn} className="logout-btn">
          Logout
        </button>
      </nav>
    )
  }
}

export default withRouter(Header)
