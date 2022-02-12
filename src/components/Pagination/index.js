import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import './index.css'

const buttonsList = [
  {
    id: 1,
    displayText: '1',
  },
  {
    id: 2,
    displayText: '2',
  },
  {
    id: 3,
    displayText: '3',
  },
  {
    id: 4,
    displayText: '4',
  },
  {
    id: 5,
    displayText: '5',
  },
]

const Pagination = props => {
  const onClickDecrement = () => {
    const {decrementActivePage} = props
    decrementActivePage()
  }

  const onClickIncrement = () => {
    const {incrementActivePage} = props
    incrementActivePage()
  }

  const onClickButton = event => {
    const {updateActivePage} = props
    const number = parseInt(event.target.id, 10)
    updateActivePage(number)
  }

  const {activePage} = props

  return (
    <div className="pagination-counter-container">
      <button
        type="button"
        onClick={onClickDecrement}
        className="pagination-counter-button"
      >
        <FaLessThan />
      </button>
      <div className="pagination-count">
        {buttonsList.map(each => (
          <button
            type="button"
            key={each.id}
            id={each.id}
            className={activePage === each.id ? 'active button' : 'button'}
            onClick={onClickButton}
          >
            {each.displayText}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClickIncrement}
        className="pagination-counter-button"
      >
        <FaGreaterThan />
      </button>
    </div>
  )
}

export default Pagination
