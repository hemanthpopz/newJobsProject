import {Component} from 'react'

class SkillsComponent extends Component {
  render() {
    const {eachSkill} = this.props

    console.log(eachSkill)

    return (
      <li className="skill-li">
        <img src={eachSkill.image_url} className="each-skill-image" />
        <p className="skill-name">{eachSkill.name}</p>
      </li>
    )
  }
}

export default SkillsComponent
