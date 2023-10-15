import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />

        <div className="content-container">
          <h1 className="home-main-heading">
            Find The job That Fits Your Life{' '}
          </h1>
          <p className="home-des">
            Millions Of peoples are searching for jobs slary information,company
            reviews.Find the job that fits your abilities and potetial
          </p>
          <Link to="/jobs">
            <button className="jobs-btn">Find jobs</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
