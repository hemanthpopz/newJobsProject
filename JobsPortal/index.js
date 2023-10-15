import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'

import Cookies from 'js-cookie'

import Header from '../Header'

import Profile from '../Profile'

import EachCheckBox from '../EachCheckBox'

import EachJobs from '../EachJobs'

import EachRadio from '../EachRadio'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusView = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobsPortal extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusView.success,
    searchInput: '',
    searchQuery: '',
    checkbox: [],
    radio: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusView.inProgress,
    })
    const {searchQuery, checkbox, radio} = this.state

    const joinedUrl = checkbox.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${joinedUrl}&minimum_package=${radio}&search=${searchQuery}`

    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    const result = await response.json()

    const mainData = result.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    if (response.ok) {
      this.setState({
        productsList: mainData,
        apiStatus: apiStatusView.success,
      })
    } else if (response.ok === false) {
      this.setState({
        apiStatus: apiStatusView.failure,
      })
    }
  }

  onChangeCheckbox = event => {
    this.setState(
      Previous => ({checkbox: [...Previous.checkbox, event]}),
      this.getJobs,
    )
  }

  onChangeRadio = ID => {
    this.setState({radio: ID}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  noJobsFoundView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-des">
        We could not found any jobs, try other filters
      </p>
    </div>
  )

  onClickSearch = () => {
    const {searchInput} = this.state
    this.setState(
      {
        searchQuery: searchInput,
      },
      this.getJobs,
    )
  }

  toSowContent = () => {
    const {productsList, searchQuery} = this.state
    console.log(searchQuery)

    return (
      <ul className="each-job-ul">
        {productsList.map(each => (
          <EachJobs each={each} />
        ))}
      </ul>
    )
  }

  onClickRetryBtn = () => {
    this.getJobs()
  }

  failedView = () => (
    <div className="failed-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failed-view-image"
      />

      <h1 className="failed-view-heading">Oops! Something Went Wrong</h1>
      <p className="failed-des">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onClickRetryBtn} className="retry-btn">
        Retry
      </button>
    </div>
  )

  ToShowMainContent = () => {
    const {apiStatus, productsList} = this.state

    const toShowJobs =
      productsList.length === 0 ? this.noJobsFoundView() : this.toSowContent()

    switch (apiStatus) {
      case apiStatusView.success:
        return toShowJobs

      case apiStatusView.failure:
        return this.failedView()

      case apiStatusView.inProgress:
        return (
          <div className="loader-container">
            <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {productsList, checkbox, searchInput, apiStatus} = this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="main-jobs-container">
          <div className="first-preference-container">
            <div className="main-search-container">
              <div className="search-container">
                <div className="jobs-form">
                  <input
                    onKeyDown={this.onChangeSearchInput}
                    className="profile-input"
                    placeholder="search"
                    type="search"
                  />
                </div>
                <div className="icon-container">
                  <AiOutlineSearch
                    onClick={this.onClickSearch}
                    className="search-icon"
                  />
                </div>
              </div>
            </div>
            <div className="main-content-container">
              <Profile />
            </div>
            <div className="employment-container">
              <ul>
                <li>
                  <p className="employment-text">Type of Employment</p>
                </li>
                {employmentTypesList.map(eachItem => (
                  <EachCheckBox
                    onChangeCheckbox={this.onChangeCheckbox}
                    eachItem={eachItem}
                  />
                ))}
              </ul>

              <ul>
                <li>
                  <p className="employment-text">Salary Range</p>
                </li>
                {salaryRangesList.map(eachSalary => (
                  <EachRadio
                    onChangeRadio={this.onChangeRadio}
                    eachSalary={eachSalary}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="second-preference-container">
            <div className="main-search-container lg-search-container">
              <div className="search-container">
                <div className="jobs-form">
                  <input
                    onKeyDown={this.onChangeSearchInput}
                    className="profile-input"
                    placeholder="search"
                    type="search"
                  />
                </div>
                <div className="icon-container">
                  <AiOutlineSearch
                    onClick={this.onClickSearch}
                    className="search-icon"
                  />
                </div>
              </div>
            </div>
            {this.ToShowMainContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPortal
