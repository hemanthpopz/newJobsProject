import {Component} from 'react'

class EachRadio extends Component {
  render() {
    const {eachSalary, onChangeRadio} = this.props

    const {salaryRangeId} = eachSalary

    const onClickRadio = () => {
      onChangeRadio(salaryRangeId)
    }
    return (
      <li>
        <input
          onClick={onClickRadio}
          name="radio"
          id={eachSalary.salaryRangeId}
          type="radio"
        />
        <label htmlFor={eachSalary.salaryRangeId}>{eachSalary.label}</label>
      </li>
    )
  }
}

export default EachRadio
