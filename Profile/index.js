import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const ApiStatus = {
  success: 'SUCCESS',
  faliure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Profile extends Component {
  state = {
    ProfileDetals: '',
    apiStatus: ApiStatus.success,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      apiStatus: ApiStatus.inProgress,
    })
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const url = 'https://apis.ccbp.in/profile'

    const response = await fetch(url, options)

    const result = await response.json()

    console.log(response)

    const mainData = {
      name: result.profile_details.name,
      profileImageUrl: result.profile_details.profile_image_url,
      shortBio: result.profile_details.short_bio,
    }
    if (response.ok) {
      this.setState({
        ProfileDetals: mainData,
        apiStatus: ApiStatus.success,
      })
    } else if (response.ok === false) {
      this.setState({apiStatus: ApiStatus.faliure})
    }
  }

  failureView = () => <button className="retry-btn">Retry</button>

  inProgressView = () => (
    <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
  )

  successView = () => {
    const {ProfileDetals} = this.state

    const {name, profileImageUrl, shortBio} = ProfileDetals

    return (
      <div className="profile-container">
        <img className="profile-pic" src={profileImageUrl} />
        <p className="name">{name}</p>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case ApiStatus.success:
        return this.successView()
      case ApiStatus.faliure:
        return this.failureView()
      case ApiStatus.inProgress:
        return this.inProgressView()
      default:
        return null
    }
  }
}

export default Profile
