import {Component} from 'react'

class EachCheckBox extends Component {
  render() {
    const {eachItem, onChangeCheckbox} = this.props

    const {employmentTypeId, label} = eachItem

    const onClickCheckbox = () => {
      onChangeCheckbox(employmentTypeId)
    }
    return (
      <li>
        <input
          onClick={onClickCheckbox}
          id={eachItem.employmentTypeId}
          type="checkbox"
        />
        <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
      </li>
    )
  }
}

export default EachCheckBox
