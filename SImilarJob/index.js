import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'

import {ImLocation2} from 'react-icons/im'

import {BsBriefcaseFill} from 'react-icons/bs'

class eachSimilarJob extends Component {
  render() {
    const {EachSimilarJob} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = EachSimilarJob

    console.log(EachSimilarJob)
    return (
      <div className="similar-container">
        <div className="company-logo-container">
          <img className="company-image" src={companyLogoUrl} />
          <div className="company-logo-text">
            <h1 className="company-heading similar-heading">{title}</h1>
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
          <p className="des-text similar-des">Description</p>
          <p className="des-bio similar-bio">{jobDescription}</p>
        </div>
      </div>
    )
  }
}

export default eachSimilarJob
