import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'

import {ImLocation2} from 'react-icons/im'

import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'

import SkillsComponent from '../Skills'

import SimilarJobs from '../SImilarJob'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class EachParticularJob extends Component {
  state = {
    eachJob: '',
    similarJobs: [],
    isApiStatus: true,
  }

  componentDidMount() {
    this.getEachJob()
  }

  getEachJob = async () => {
    this.setState({
      isApiStatus: apiStatus.inProgress,
    })
    const {match} = this.props

    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    const result = await response.json()

    const MainData = {
      companyLogoUrl: result.job_details.company_logo_url,
      employmentType: result.job_details.employment_type,
      id: result.job_details.id,
      jobDescription: result.job_details.job_description,
      location: result.job_details.location,
      packagePerAnnum: result.job_details.package_per_annum,
      rating: result.job_details.rating,
      title: result.job_details.title,
      companyWebsiteUrl: result.job_details.company_website_url,
      lifeAtCompany: result.job_details.life_at_company,
      skills: result.job_details.skills,
    }

    const Similarjobs = result.similar_jobs.map(eachSimilar => ({
      companyLogoUrl: eachSimilar.company_logo_url,
      employmentType: eachSimilar.employment_type,
      id: eachSimilar.id,
      jobDescription: eachSimilar.job_description,
      location: eachSimilar.location,
      packagePerAnnum: eachSimilar.package_per_annum,
      rating: eachSimilar.rating,
      title: eachSimilar.title,
    }))

    if (response.ok) {
      this.setState({
        eachJob: MainData,
        similarJobs: Similarjobs,
        isApiStatus: apiStatus.success,
      })
    } else if (response.ok === false) {
      this.setState({
        isApiStatus: apiStatus.failure,
      })
    }
  }

  toShowContent = () => {
    const {eachJob, similarJobs, isApiStatus} = this.state

    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      lifeAtCompany,
      skills,
    } = eachJob

    return (
      <div className="each-particular-container">
        <Header />
        <div className="result-each-container">
          <div className="each-main-container">
            <div className="company-logo-container">
              <img className="company-image" src={companyLogoUrl} />
              <div className="company-logo-text">
                <h1 className="company-heading">{title}</h1>
                <div className="star-container">
                  <AiFillStar className="star" />
                  <p className="star-text">{rating}</p>
                </div>
              </div>
            </div>
            <div className="detail-container">
              <div className="location-employment-container">
                <div className="location-container">
                  <ImLocation2 className="location" />
                  <p className="location-text">{location}</p>
                </div>
                <div className="location-container">
                  <BsBriefcaseFill className="location" />
                  <p className="location-text">{employmentType}</p>
                </div>
              </div>
              <div className="package-container">
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
            <div className="description-container">
              <div className="website-logo">
                <p className="des-text">Description</p>
                <Link className="visit" to={companyWebsiteUrl}>
                  Visit
                </Link>
              </div>
              <p className="des-bio each-job-des">{jobDescription}</p>
            </div>
            <p className="skills">Skills</p>
            <ul className="skill-ul">
              {skills !== undefined
                ? skills.map(eachSkill => (
                    <SkillsComponent eachSkill={eachSkill} />
                  ))
                : null}
            </ul>
            <p className="company-text">Life at Company</p>
            <div className="company-container">
              {lifeAtCompany !== undefined ? (
                <p className="company-des">{lifeAtCompany.description}</p>
              ) : null}
              {lifeAtCompany !== undefined ? (
                <img
                  className="each-company-image"
                  src={lifeAtCompany.image_url}
                />
              ) : null}
            </div>
          </div>

          <p className="similar">Similar Jobs</p>
          <ul className="each-similar-ul-class">
            {similarJobs !== undefined
              ? similarJobs.map(eachSimilarJob => (
                  <SimilarJobs EachSimilarJob={eachSimilarJob} />
                ))
              : null}
          </ul>
        </div>
      </div>
    )
  }

  toShowProgress = () => (
    <div className="loader-display-container">
      <Header />
      <div className="loader-container">
        <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
      </div>
    </div>
  )

  failedViewMain = () => (
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

  render() {
    const {isApiStatus} = this.state

    switch (isApiStatus) {
      case apiStatus.success:
        return this.toShowContent()

      case apiStatus.failure:
        return this.failedViewMain()

      case apiStatus.inProgress:
        return this.toShowProgress()

      default:
        return null
    }
  }
}

export default EachParticularJob
