import {Component} from 'react'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <img
          className="not-found-image"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-des">
          We are sorry the page you are request could not be found
        </p>
      </div>
    )
  }
}

export default NotFound
